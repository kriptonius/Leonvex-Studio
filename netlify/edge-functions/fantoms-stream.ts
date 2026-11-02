// Túnel https -> http para la radio FANTOMS (transmite en vivo, sin guardar nada en memoria)
export default async (_request: Request) => {
  const upstream = await fetch("http://157.245.247.5:8000/stream", {
    headers: { "Icy-MetaData": "0", "User-Agent": "LeonVexStudio/1.0" },
  });
  if (!upstream.ok || !upstream.body) {
    return new Response("Radio no disponible", { status: 502 });
  }
  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": upstream.headers.get("content-type") || "audio/mpeg",
      "Cache-Control": "no-store, no-transform",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = { path: "/fantoms-stream" };
