export async function onRequest(context) {
  const url = new URL(context.request.url);
  
  // Replace the host with the Vercel backend
  const targetUrl = "https://che-resource-hub.vercel.app" + url.pathname + url.search;
  
  // Clone request headers
  const headers = new Headers(context.request.headers);
  
  // Create a new request object to forward to Vercel
  const forwardRequest = new Request(targetUrl, {
    method: context.request.method,
    headers: headers,
    body: context.request.body,
    redirect: "manual"
  });
  
  try {
    const response = await fetch(forwardRequest);
    return response;
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
