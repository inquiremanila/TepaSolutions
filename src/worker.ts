export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const userAgent = request.headers.get("user-agent") || "";

    // Detect bots
    const isBot =
      /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|LinkedInBot/i.test(
        userAgent
      );

    if (isBot) {
      // Correct way to build prerender URL
      const prerenderUrl =
        "https://service.prerender.io/" + new URL(request.url).href;

      return fetch(prerenderUrl, {
        headers: {
          "User-Agent": userAgent,
          "X-Prerender-Token": env.PRERENDER_TOKEN,
        },
      });
    }

    // Default: serve your assets
    return env.ASSETS.fetch(request);
  },
};
