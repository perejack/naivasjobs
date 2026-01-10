import { promises as fs } from "node:fs";
import path from "node:path";

const DEFAULT_BASE_URL = "https://www.naivasjobs.site";

const resolveBaseUrl = () => {
  const raw = process.env.SITE_URL || process.env.PUBLIC_SITE_URL || process.env.VERCEL_URL || DEFAULT_BASE_URL;
  const withScheme = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  return withScheme.replace(/\/+$/, "");
};

const xmlEscape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");

const routes = [
  { path: "/", changefreq: "daily", priority: 1.0 },
  { path: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
  { path: "/terms-of-service", changefreq: "yearly", priority: 0.3 },
  { path: "/refund-policy", changefreq: "yearly", priority: 0.3 },
  { path: "/contact-us", changefreq: "yearly", priority: 0.4 },
];

const buildSitemapXml = ({ baseUrl, lastModIso }) => {
  const urlEntries = routes
    .map((r) => {
      const loc = r.path === "/" ? `${baseUrl}/` : `${baseUrl}${r.path}`;
      return [
        "  <url>",
        `    <loc>${xmlEscape(loc)}</loc>`,
        `    <lastmod>${xmlEscape(lastModIso)}</lastmod>`,
        `    <changefreq>${xmlEscape(r.changefreq)}</changefreq>`,
        `    <priority>${r.priority.toFixed(1)}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");
};

const buildSitemapIndexXml = ({ baseUrl, lastModIso }) => {
  const sitemapLoc = `${baseUrl}/sitemap.xml`;

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    "<sitemapindex xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    "  <sitemap>",
    `    <loc>${xmlEscape(sitemapLoc)}</loc>`,
    `    <lastmod>${xmlEscape(lastModIso)}</lastmod>`,
    "  </sitemap>",
    "</sitemapindex>",
    "",
  ].join("\n");
};

const ensureRobotsHasSitemap = async ({ distDir, baseUrl }) => {
  const robotsPath = path.join(distDir, "robots.txt");
  const sitemapLine = `Sitemap: ${baseUrl}/sitemap-index.xml`;

  let content = "";
  try {
    content = await fs.readFile(robotsPath, "utf8");
  } catch {
    content = "User-agent: *\nAllow: /\n";
  }

  const normalized = content.replace(/\r\n/g, "\n");
  const hasSitemap = normalized
    .split("\n")
    .some((l) => l.trim().toLowerCase() === sitemapLine.toLowerCase());

  if (!hasSitemap) {
    const suffix = normalized.endsWith("\n") ? "" : "\n";
    await fs.writeFile(robotsPath, `${normalized}${suffix}${sitemapLine}\n`, "utf8");
  }
};

const main = async () => {
  const baseUrl = resolveBaseUrl();
  const distDir = path.resolve(process.cwd(), "dist");
  const lastModIso = new Date().toISOString();

  await fs.mkdir(distDir, { recursive: true });

  const sitemapXml = buildSitemapXml({ baseUrl, lastModIso });
  const sitemapIndexXml = buildSitemapIndexXml({ baseUrl, lastModIso });

  await Promise.all([
    fs.writeFile(path.join(distDir, "sitemap.xml"), sitemapXml, "utf8"),
    fs.writeFile(path.join(distDir, "sitemap-index.xml"), sitemapIndexXml, "utf8"),
  ]);

  await ensureRobotsHasSitemap({ distDir, baseUrl });
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
