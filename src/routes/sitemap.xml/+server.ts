import stopNames from "$lib/server/stopNames.json";
export async function GET() {
  return new Response(
    `
		<?xml version="1.0" encoding="UTF-8" ?>
		<urlset
			xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
			xmlns:xhtml="https://www.w3.org/1999/xhtml"
			xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
			xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
			xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
			xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
		>
        <url>
            <loc>https://www.comijede.cz</loc>
            <changefreq>monthly</changefreq>
            <lastmod>2023-11-23T23:00:07.279Z</lastmod>
        </url>
			${stopNames
        .map((name) => {
          return `<url>
                            <loc>https://www.comijede.cz/station/${name}</loc>
                            <changefreq>always</changefreq>
                        </url>`;
        })
        .join("\n")}
		</urlset>`.trim(),
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
