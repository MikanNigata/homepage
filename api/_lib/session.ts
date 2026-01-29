import crypto from "node:crypto";
import { parseCookies, serializeCookie } from "./cookies.js";

export type SessionPayload = {
  sub: string;
  username: string;
  globalName?: string | null;
  avatar?: string | null;
  exp: number;
};

const SESSION_COOKIE = "lt_session";
const STATE_COOKIE = "lt_oauth_state";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;
const STATE_MAX_AGE_SECONDS = 60 * 5;

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf8");
}

function sign(value: string, secret: string) {
  return base64UrlEncode(crypto.createHmac("sha256", secret).update(value).digest());
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

function isSecureCookie() {
  const baseUrl = process.env.APP_BASE_URL ?? "";
  if (baseUrl.startsWith("https://")) {
    return true;
  }
  return process.env.NODE_ENV === "production";
}

function createToken(payload: SessionPayload, secret: string) {
  const data = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(`v1.${data}`, secret);
  return `v1.${data}.${signature}`;
}

function verifyToken(token: string, secret: string): SessionPayload | null {
  const [version, data, signature] = token.split(".");
  if (version !== "v1" || !data || !signature) {
    return null;
  }

  const expected = sign(`${version}.${data}`, secret);
  if (!safeEqual(signature, expected)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(data)) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function createStateCookie(state: string) {
  return serializeCookie(STATE_COOKIE, state, {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: "Lax",
    path: "/",
    maxAge: STATE_MAX_AGE_SECONDS,
  });
}

export function clearStateCookie() {
  return serializeCookie(STATE_COOKIE, "", {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: "Lax",
    path: "/",
    maxAge: 0,
  });
}

export function readStateCookie(req: { headers?: { cookie?: string } }) {
  const cookies = parseCookies(req.headers?.cookie);
  return cookies[STATE_COOKIE] ?? null;
}

export function createSessionCookie(payload: SessionPayload, secret: string) {
  return serializeCookie(SESSION_COOKIE, createToken(payload, secret), {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: "Lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export function clearSessionCookie() {
  return serializeCookie(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: isSecureCookie(),
    sameSite: "Lax",
    path: "/",
    maxAge: 0,
  });
}

export function readSession(req: { headers?: { cookie?: string } }, secret: string) {
  const cookies = parseCookies(req.headers?.cookie);
  const token = cookies[SESSION_COOKIE];
  if (!token) {
    return null;
  }
  return verifyToken(token, secret);
}
