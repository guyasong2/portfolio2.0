import { NextResponse } from "next/server";

export function GET() {
  const body = `
User-agent: *
Allow: /

Sitemap: https://guyasong.vercel.app/sitemap.xml
  `.trim();

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}