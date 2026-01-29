export async function readJson<T = unknown>(
  req: AsyncIterable<Uint8Array> & { body?: unknown },
) {
  if (req.body !== undefined) {
    if (typeof req.body === "string") {
      return JSON.parse(req.body) as T;
    }
    if (req.body instanceof Buffer) {
      return JSON.parse(req.body.toString("utf8")) as T;
    }
    if (typeof req.body === "object" && req.body !== null) {
      return req.body as T;
    }
  }

  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf8").trim();
  if (!body) {
    return {} as T;
  }
  return JSON.parse(body) as T;
}

export function sendJson(res: { setHeader: (name: string, value: string) => void; statusCode: number; end: (body?: string) => void }, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}
