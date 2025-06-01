import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const { searchParams } = new URL(_req.url);
  const target = searchParams.get("url");

  if (!target || !target.startsWith("http")) {
    return new Response("Invalid or missing `url` parameter", { status: 400 });
  }

  const proxyRes = await fetch(target);
  const html = await proxyRes.text();

  return new Response(html, {
    headers: {
      "content-type": "text/html",
      "x-frame-options": "", // strip framing protection
      "content-security-policy": "" // strip CSP
    }
  });
};