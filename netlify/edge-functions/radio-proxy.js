// Túnel https -> http para radios en vivo. Uso: /radio-proxy?url=http://host:puerto/stream
// Solo permite el servidor de FANTOMS (no es un proxy abierto).
const ALLOWED = new Set(["157.245.247.5:8000"]);

export default async (request) => {
  const target = new URL(request.url).searchParams.get("url");
  let u;
  try { u = new URL(target); } catch (_) { return new Response("url inválida", { status: 400 }); }
  if (u.protocol !== "http:" && u.protocol !== "https:") return new Response("no permitido", { status: 400 });
  if (!ALLOWED.has(u.host)) return new Response("host no permitido", { status: 403 });
  let upstream;
  try {
    upstream = await fetch(u.toString(), { headers: { "Icy-MetaData": "0", "User-Agent": "LeonVexStudio/1.0" } });
  } catch (_) { return new Response("Radio no disponible", { status: 502 }); }
  if (!upstream.ok || !upstream.body) return new Response("Radio no disponible", { status: 502 });
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
      "Cache-Control": "no-store, no-transform",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = { path: "/radio-proxy" };

