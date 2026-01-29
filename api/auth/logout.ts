import { clearSessionCookie } from "../_lib/session.js";
import { sendJson } from "../_lib/http.js";

export default function handler(
  req: { method?: string },
  res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  res.setHeader("Set-Cookie", clearSessionCookie());
  return sendJson(res, 200, { ok: true });
}
