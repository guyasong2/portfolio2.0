import type { Block } from "@/types/blog";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// Add some common languages
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

type BlockRendererProps = {
  blocks: Block[];
};

export default function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <div key={block.id} className="block-wrapper">
          {renderBlock(block)}
        </div>
      ))}
    </div>
  );
}

function renderBlock(block: Block) {
  const { block_type, block_content } = block;

  switch (block_type) {
    case "paragraph":
      return <p className="text-base leading-relaxed text-base-content/90 whitespace-pre-wrap">{block_content.text}</p>;

    case "heading":
      const id = block_content.text.toLowerCase().replace(/[^\w]+/g, '-');
      return <h2 id={id} className="text-2xl md:text-3xl font-bold mt-12 mb-4 scroll-mt-24">{block_content.text}</h2>;

    case "code":
      const lang = block_content.language || "typescript";
      let highlighted = block_content.code;
      try {
        if (Prism.languages[lang]) {
          highlighted = Prism.highlight(block_content.code, Prism.languages[lang], lang);
        }
      } catch (e) {
        // Fallback
      }
      return (
        <div className="mockup-code bg-neutral text-neutral-content my-6">
          <pre data-prefix=">">
            <code 
              className={`language-${lang}`} 
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      );

    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-lg text-base-content/80 my-8 py-2 bg-base-200/50 rounded-r-lg">
          {block_content.text}
        </blockquote>
      );

    case "callout":
      const type = block_content.type || "info";
      const alertClass = {
        info: "alert-info",
        warning: "alert-warning",
        success: "alert-success",
        error: "alert-error",
      }[type as string] || "alert-info";
      
      return (
        <div className={`alert ${alertClass} my-6 shadow-sm`}>
          <span>{block_content.text}</span>
        </div>
      );

    case "image":
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={block_content.url} 
            alt={block_content.alt || "Blog image"} 
            className="rounded-lg shadow-lg w-full object-cover max-h-[600px] bg-base-300"
          />
          {block_content.alt && (
            <figcaption className="text-center text-sm text-base-content/60 mt-2">
              {block_content.alt}
            </figcaption>
          )}
        </figure>
      );

    case "markdown":
      return (
        <div 
          className="prose prose-base max-w-none text-base-content/90"
          dangerouslySetInnerHTML={{ __html: block_content.text }} // Simplified. In production, use a markdown parser like marked.
        />
      );

    default:
      return <div className="text-error">Unsupported block type: {block_type}</div>;
  }
}
