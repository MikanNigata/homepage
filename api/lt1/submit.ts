import { readSession } from "../_lib/session.js";
import { findForbiddenReason } from "../_lib/validation.js";
import { readJson, sendJson } from "../_lib/http.js";

type SubmitPayload = {
  title?: string;
  description?: string;
};

export default async function handler(
  req: { method?: string; headers?: { cookie?: string } } & AsyncIterable<Uint8Array>,
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

  let body: SubmitPayload;
  try {
    body = await readJson<SubmitPayload>(req);
  } catch {
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
