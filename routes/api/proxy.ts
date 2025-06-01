import { HandlerContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
  const { searchParams } = new URL(_req.url);
  const target = searchParams.get("url");

  if (!target || !/^https?:\/\//.test(target)) {
    return new Response("Invalid or missing `url` parameter", { status: 400 });
  }

  try {
    const proxyRes = await fetch(target, {
      method: "GET",
      headers: {
        // 🎭 Pretend to be a real browser
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "Referer": "https://www.google.com/",
        "DNT": "1",
        "Connection": "keep-alive",
      },
    });

    const contentType = proxyRes.headers.get("content-type") ?? "text/html";
    const body = await proxyRes.text();

    return new Response(body, {
      status: proxyRes.status,
      headers: {
        "content-type": contentType,
        "x-frame-options": "", // 🧼 remove X-Frame-Options
        "content-security-policy": "", // 🧼 remove CSP
        "access-control-allow-origin": "*", // allow iframe use
      },
    });
  } catch (err) {
    return new Response(`Error fetching target: ${err.message}`, { status: 500 });
  }
};
