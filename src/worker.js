export default {
    async fetch(request, env, ctx) {
      const url = new URL(request.url);
  
      // Force correct MIME type for XML
      if (url.pathname.endsWith(".xml")) {
        const res = await env.ASSETS.fetch(request);
        return new Response(res.body, {
          headers: {
            "Content-Type": "application/xml; charset=UTF-8",
            ...Object.fromEntries(res.headers),
          },
        });
      }
  
      // Pass through everything else
      return env.ASSETS.fetch(request);
    },
  };
  