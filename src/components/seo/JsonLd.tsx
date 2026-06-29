import {
  getLocalBusinessSchema,
  getServiceSchema,
  getFAQSchema,
  getWebSiteSchema,
  getBreadcrumbSchema,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/data";

export default function JsonLd() {
  const schemas = [
    getLocalBusinessSchema(),
    getWebSiteSchema(),
    getFAQSchema(),
    ...getServiceSchema(),
    getBreadcrumbSchema([{ name: "Home", url: SITE_URL }]),
  ];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
