import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const supabase = await createClient();
  
  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, excerpt, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(20);

  const siteUrl = "https://guyasong.me"; // Replace with your actual domain

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Guy Asong | Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Thoughts, tutorials, and insights on web development and cybersecurity.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts?.map((post: any) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid>${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ""}]]></description>
    </item>
    `).join("")}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
