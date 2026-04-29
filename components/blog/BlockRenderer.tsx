import React from "react";
import type { Block } from "@/types/blog";

type BlockRendererProps = {
  blocks: Block[];
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="space-y-10">
      {blocks.map((block) => (
        <div key={block.id} id={block.block_type === "heading" ? block.block_content.text?.toLowerCase().replace(/[^\w]+/g, '-') : undefined}>
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: Block) {
  const { block_type, block_content } = block;

  switch (block_type) {
    case "heading":
      return <h2 className="text-3xl font-black tracking-tight uppercase mt-16 mb-6">{block_content.text}</h2>;

    case "paragraph":
      return (
        <div
          className="text-base leading-[1.8] max-w-2xl"
          dangerouslySetInnerHTML={{ __html: block_content.text || "" }}
        />
      );

    case "code":
      return (
        <div className="my-10">
          <div className="flex items-center justify-between px-6 py-3 bg-black text-white border-2 border-black">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              {block_content.language || "code"}
            </span>
          </div>
          <pre className="p-8 bg-black text-white overflow-x-auto text-sm leading-relaxed font-mono border-2 border-black border-t-0">
            <code>{block_content.code}</code>
          </pre>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-[6px] border-black pl-8 py-4 my-10">
          <div
            className="text-xl font-black tracking-tight italic"
            dangerouslySetInnerHTML={{ __html: block_content.text || "" }}
          />
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-12">
          <div className="border-2 border-black overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block_content.url}
              alt={block_content.alt || ""}
              className="w-full h-auto"
            />
          </div>
          {block_content.alt && (
            <figcaption className="text-[10px] font-bold uppercase tracking-[0.3em] mt-4">
              {block_content.alt}
            </figcaption>
          )}
        </figure>
      );

    case "callout":
      return (
        <div className="border-2 border-black p-8 my-10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3">
            {block_content.type === "warning" ? "⚠ Warning" :
             block_content.type === "security" ? "🛡 Security" :
             block_content.type === "success" ? "✓ Note" : "ℹ Info"}
          </p>
          <p className="text-sm leading-relaxed">{block_content.text}</p>
        </div>
      );

    default:
      return null;
  }
}
