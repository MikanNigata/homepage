import { clearStateCookie, createSessionCookie, readStateCookie, SESSION_MAX_AGE_SECONDS, type SessionPayload } from "../_lib/session.js";
import { sendJson } from "../_lib/http.js";

type DiscordUser = {
  id: string;
  username: string;
  global_name?: string | null;
  avatar?: string | null;
};

export default async function handler(
  req: { method?: string; url?: string; headers?: { host?: string; "x-forwarded-proto"?: string; cookie?: string } },
  res: { statusCode: number; setHeader: (name: string, value: string | string[]) => void; end: (body?: string) => void },
) {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  const sessionSecret = process.env.SESSION_SECRET;

  const proto = req.headers?.["x-forwarded-proto"] ?? "http";
  const host = req.headers?.host ?? "localhost";
  const fallbackBaseUrl = `${proto}://${host}`;
  const appBaseUrl = (process.env.APP_BASE_URL ?? fallbackBaseUrl).replace(/\/$/, "");

  if (!clientId || !clientSecret || !redirectUri || !sessionSecret) {
    return sendJson(res, 500, { error: "Missing OAuth configuration." });
  }

  const url = new URL(req.url ?? "", fallbackBaseUrl);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return sendJson(res, 400, { error: `OAuth error: ${error}` });
  }

  const storedState = readStateCookie(req);
  if (!code || !state || !storedState || state !== storedState) {
    return sendJson(res, 400, { error: "Invalid OAuth state." });
  }

  const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    return sendJson(res, 502, { error: "Failed to exchange OAuth token." });
  }

  const tokenData = (await tokenRes.json()) as { access_token?: string };
  if (!tokenData.access_token) {
    return sendJson(res, 502, { error: "Missing access token." });
  }

  const userRes = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!userRes.ok) {
    return sendJson(res, 502, { error: "Failed to fetch Discord user." });
  }

  const user = (await userRes.json()) as DiscordUser;
  const now = Math.floor(Date.now() / 1000);
  const session: SessionPayload = {
    sub: user.id,
    username: user.username,
    globalName: user.global_name ?? null,
    avatar: user.avatar ?? null,
    exp: now + SESSION_MAX_AGE_SECONDS,
  };

  res.statusCode = 302;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Set-Cookie", [createSessionCookie(session, sessionSecret), clearStateCookie()]);
  res.setHeader("Location", `${appBaseUrl}/events/lt-1/register`);
  res.end();
}
