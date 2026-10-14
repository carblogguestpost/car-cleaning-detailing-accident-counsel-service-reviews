Deno.serve((req) => {
  const url = new URL(req.url);
  let path = decodeURIComponent(url.pathname);

  if (path === "/") {
    path = "/index.html";
  }

  try {
    return new Response(
      Deno.readFileSync(`.${path}`),
      {
        headers: {
          "content-type": getContentType(path),
        },
      },
    );
  } catch {
    return new Response("Not Found", { status: 404 });
  }
});

function getContentType(path: string): string {
  if (path.endsWith(".html")) return "text/html; charset=utf-8";
  if (path.endsWith(".css")) return "text/css; charset=utf-8";
  if (path.endsWith(".js")) return "application/javascript";
  if (path.endsWith(".xml")) return "application/xml";
  if (path.endsWith(".txt")) return "text/plain";
  if (path.endsWith(".json")) return "application/json";

  return "application/octet-stream";
}
