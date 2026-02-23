import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.naivasjobs.site";

type Meta = {
  title: string;
  description: string;
  robots?: string;
};

const ROUTE_META: Record<string, Meta> = {
  "/": {
    title: "Naivas Careers - Join Kenya's Leading Supermarket Chain | Apply Now",
    description:
      "Join Naivas Supermarket, Kenya's top retail employer. Competitive salaries KSh 17K-34K, medical benefits, career growth. Apply for 11 open positions including sales, security, cashier roles.",
    robots: "index, follow",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Naivas Careers",
    description: "Privacy Policy for Naivas Careers.",
    robots: "index, follow",
  },
  "/terms-of-service": {
    title: "Terms of Service | Naivas Careers",
    description: "Terms of Service for Naivas Careers.",
    robots: "index, follow",
  },
  "/refund-policy": {
    title: "Refund Policy | Naivas Careers",
    description: "Refund Policy for Naivas Careers.",
    robots: "index, follow",
  },
  "/contact-us": {
    title: "Contact Us | Naivas Careers",
    description: "Contact Naivas Careers support and recruitment team.",
    robots: "index, follow",
  },
};

const ensureMeta = (selector: string, create: () => HTMLElement) => {
  const head = document.head;
  const existing = head.querySelector(selector);
  if (existing) return existing as HTMLElement;
  const el = create();
  head.appendChild(el);
  return el;
};

const setMetaName = (name: string, content: string) => {
  const el = ensureMeta(`meta[name=\"${CSS.escape(name)}\"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("name", name);
    return m;
  }) as HTMLMetaElement;
  el.setAttribute("content", content);
};

const setMetaProperty = (property: string, content: string) => {
  const el = ensureMeta(`meta[property=\"${CSS.escape(property)}\"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute("property", property);
    return m;
  }) as HTMLMetaElement;
  el.setAttribute("content", content);
};

const setCanonical = (href: string) => {
  const el = ensureMeta('link[rel="canonical"]', () => {
    const l = document.createElement("link");
    l.setAttribute("rel", "canonical");
    return l;
  }) as HTMLLinkElement;
  el.setAttribute("href", href);
};

export const RouteMeta = () => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname || "/";
    const meta = ROUTE_META[pathname] || {
      title: "404 - Page Not Found | Naivas Careers",
      description: "Page not found.",
      robots: "noindex, nofollow",
    };

    const canonical = pathname === "/" ? `${BASE_URL}/` : `${BASE_URL}${pathname}`;

    document.title = meta.title;

    setMetaName("description", meta.description);
    setMetaName("robots", meta.robots || "index, follow");
    setCanonical(canonical);

    setMetaProperty("og:title", meta.title);
    setMetaProperty("og:description", meta.description);
    setMetaProperty("og:type", "website");
    setMetaProperty("og:url", canonical);

    setMetaName("twitter:title", meta.title);
    setMetaName("twitter:description", meta.description);
  }, [location.pathname]);

  return null;
};
