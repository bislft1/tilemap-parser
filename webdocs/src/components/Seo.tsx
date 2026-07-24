interface SeoProps {
  title: string
  description: string
  path: string
}

export default function Seo({ title, description, path }: SeoProps) {
  const fullTitle = `${title} | tilemap-parser Docs`
  const hashPath = path === '/' ? '' : path
  const url = `https://tilemap-parser.pyrobros.com#${hashPath}`
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": title,
    "description": description,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": "PyroBros"
    },
    "articleSection": "Documentation",
    "codeRepository": "https://github.com/pyrobros/tilemap-parser",
    "programmingLanguage": "Python"
  }

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </>
  )
}
