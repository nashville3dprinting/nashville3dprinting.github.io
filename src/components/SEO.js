// components/SEO.js
import { Helmet } from "react-helmet-async";
import seoConfig from "../config/Seo";

export default function SEO({
  title,
  description,
  keywords,
  image,
  author,
}) {
  const t = title || seoConfig.title;
  const d = description || seoConfig.description;
  const k = keywords || seoConfig.keywords;
  const i = image || seoConfig.ogImage;
  const a = author || seoConfig.author;
  const tw = seoConfig.twitterHandle;

  return (
    <Helmet prioritizeSeoTags>
      <title>{t}</title>

      {d && <meta key="desc" name="description" content={d} />}
      {k && <meta key="keywords" name="keywords" content={k} />}
      {a && <meta key="author" name="author" content={a} />}

      <meta key="og:title" property="og:title" content={t} />
      {d && <meta key="og:description" property="og:description" content={d} />}
      {i && <meta key="og:image" property="og:image" content={i} />}
      <meta key="og:type" property="og:type" content="website" />

      <meta key="tw:card" name="twitter:card" content="summary_large_image" />
      <meta key="tw:title" name="twitter:title" content={t} />
      {d && <meta key="tw:description" name="twitter:description" content={d} />}
      {i && <meta key="tw:image" name="twitter:image" content={i} />}
      {tw && <meta key="tw:site" name="twitter:site" content={tw} />}
    </Helmet>
  );
}
