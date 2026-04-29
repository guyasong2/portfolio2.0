import Head from "next/head";
import type { Post } from "@/types/blog";

type SEOProps = {
  post: Post & { profiles?: { name: string; avatar?: string }; categories?: { name: string } };
  siteUrl: string;
};

export default function SEO({ post, siteUrl }: SEOProps) {
  const fullUrl = `${siteUrl}/blog/${post.slug}`;
  const publishDate = new Date(post.created_at).toISOString();
  const updateDate = new Date(post.updated_at || post.created_at).toISOString();
  const authorName = (post.profiles as any)?.name || "Guy Asong";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.cover_image ? [post.cover_image] : [],
    "datePublished": publishDate,
    "dateModified": updateDate,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Guy Asong",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png` // Fallback logo
      }
    },
    "description": post.excerpt || `Read ${post.title} by ${authorName}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
