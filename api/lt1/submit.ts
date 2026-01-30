import { readSession } from "../_lib/session.js";
import { findForbiddenReason } from "../_lib/validation.js";
import { PayloadTooLargeError, readJson, sendJson } from "../_lib/http.js";
import { checkRateLimit } from "../_lib/rateLimit.js";

type SubmitPayload = {
  title?: string;
  description?: string;
};

export default async function handler(
  req: { method?: string; headers?: { cookie?: string; "x-forwarded-for"?: string } } & AsyncIterable<Uint8Array>,
  res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    return sendJson(res, 500, { error: "Missing session secret." });
  }

  const session = readSession(req, sessionSecret);
  if (!session) {
    return sendJson(res, 401, { error: "Sign in with Discord first." });
  }

  const forwardedFor = req.headers?.["x-forwarded-for"];
  const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : "";
  const rateKey = `lt1:submit:${session.sub}${ip ? `:${ip}` : ""}`;
  const limit = checkRateLimit(rateKey, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    res.setHeader("Retry-After", Math.ceil(limit.retryAfterMs / 1000).toString());
    return sendJson(res, 429, { error: "Too many submissions. Please wait and try again." });
  }

  let body: SubmitPayload;
  try {
    body = await readJson<SubmitPayload>(req, { maxBytes: 16 * 1024 });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return sendJson(res, 413, { error: "Payload too large." });
    }
    return sendJson(res, 400, { error: "Invalid JSON." });
  }

  const title = (body.title ?? "").toString().trim();
  const description = (body.description ?? "").toString().trim();

  if (!title) {
    return sendJson(res, 400, { error: "Title is required." });
  }
  if (title.length > 100) {
    return sendJson(res, 400, { error: "Title is too long." });
  }
  if (description.length > 1000) {
    return sendJson(res, 400, { error: "Description is too long." });
  }

  const titleProblem = findForbiddenReason(title);
  const descriptionProblem = findForbiddenReason(description);
  if (titleProblem || descriptionProblem) {
    return sendJson(res, 400, { error: "URLs and @ mentions are not allowed." });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return sendJson(res, 500, { error: "Webhook is not configured." });
  }

  const displayName = session.globalName
    ? `${session.globalName} (${session.username})`
    : session.username;

  const embed = {
    title: "LT Submission",
    color: 0x111827,
    fields: [
      { name: "Title", value: title },
      { name: "Description", value: description || "N/A" },
      { name: "Submitted by", value: `${displayName}\nID: ${session.sub}` },
    ],
    timestamp: new Date().toISOString(),
  };

  console.log(`[LT1] Submission: ${displayName} (${session.sub}) - ${title}`);

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [embed],
      allowed_mentions: { parse: [] },
    }),
  });

  if (!response.ok) {
    console.error(`[LT1] Failed to send webhook: ${response.status} ${response.statusText}`);
    return sendJson(res, 502, { error: "Failed to deliver to Discord." });
  }

  return sendJson(res, 200, { ok: true });
}
