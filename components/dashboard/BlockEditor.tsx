"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { FaTrash, FaGripVertical, FaCode, FaHeading, FaParagraph, FaQuoteLeft, FaImage, FaExclamationCircle, FaCopy } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import type { Block, BlockType } from "@/types/blog";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type BlockEditorProps = {
  initialBlocks?: Block[];
  onChange: (blocks: Block[]) => void;
};

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "clean"],
  ],
};

export default function BlockEditor({ initialBlocks = [], onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  const updateBlocks = (newBlocks: Block[]) => {
    const orderedBlocks = newBlocks.map((b, index) => ({ ...b, position: index }));
    setBlocks(orderedBlocks);
    onChange(orderedBlocks);
  };

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: uuidv4(),
      block_type: type,
      block_content: type === "code" ? { code: "", language: "typescript" } : { text: "" },
      position: blocks.length,
    };
    updateBlocks([...blocks, newBlock]);
  };

  const removeBlock = (index: number) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    updateBlocks(newBlocks);
  };

  const duplicateBlock = (index: number) => {
    const blockToCopy = blocks[index];
    const newBlock: Block = {
      ...blockToCopy,
      id: uuidv4(),
      position: index + 1
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    updateBlocks(newBlocks);
  };

  const updateBlockContent = (index: number, content: any) => {
    const newBlocks = [...blocks];
    newBlocks[index].block_content = content;
    updateBlocks(newBlocks);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateBlocks(items);
  };

  return (
    <div className="space-y-16">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-8">
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group relative bg-white border-2 border-black transition-all overflow-hidden"
                    >
                      <div className="flex">
                        {/* Drag Handle */}
                        <div
                          {...provided.dragHandleProps}
                          className="w-12 bg-black text-white flex items-center justify-center cursor-grab active:cursor-grabbing"
                        >
                          <FaGripVertical className="text-xs" />
                        </div>

                        {/* Block Content */}
                        <div className="flex-1 p-4 md:p-8">
                          <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                              <span className="bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1 flex items-center gap-3">
                                {block.block_type === "heading" && <FaHeading />}
                                {block.block_type === "paragraph" && <FaParagraph />}
                                {block.block_type === "code" && <FaCode />}
                                {block.block_type === "quote" && <FaQuoteLeft />}
                                {block.block_type === "image" && <FaImage />}
                                {block.block_type === "callout" && <FaExclamationCircle />}
                                {block.block_type}
                              </span>
                            </div>
                            <div className="flex gap-4 md:gap-6 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => duplicateBlock(index)}
                                className="hover:opacity-50 transition-opacity"
                              >
                                <FaCopy className="text-xs" />
                              </button>
                              <button
                                onClick={() => removeBlock(index)}
                                className="hover:opacity-50 transition-opacity"
                              >
                                <FaTrash className="text-xs" />
                              </button>
                            </div>
                          </div>

                          {/* Editors */}
                          {block.block_type === "heading" && (
                            <input
                              type="text"
                              className="w-full bg-white border-2 border-black text-black font-black uppercase text-lg md:text-2xl h-12 md:h-16 px-4 md:px-6 focus:outline-none"
                              placeholder="SECTION HEADER..."
                              value={block.block_content.text || ""}
                              onChange={(e) => updateBlockContent(index, { text: e.target.value })}
                            />
                          )}

                          {(block.block_type === "paragraph" || block.block_type === "quote") && (
                            <div className="bg-white text-black border-2 border-black overflow-hidden">
                              <ReactQuill
                                theme="snow"
                                modules={quillModules}
                                value={block.block_content.text || ""}
                                onChange={(content) => updateBlockContent(index, { ...block.block_content, text: content })}
                                className="[&_.ql-editor]:min-h-[200px] md:[&_.ql-editor]:min-h-[300px] [&_.ql-editor]:text-sm md:[&_.ql-editor]:text-base [&_.ql-toolbar]:border-b-2 [&_.ql-toolbar]:border-black [&_.ql-container]:border-none"
                              />
                            </div>
                          )}

                          {block.block_type === "code" && (
                            <div className="space-y-0">
                              <input
                                type="text"
                                placeholder="LANGUAGE"
                                className="w-full bg-white border-2 border-black px-4 py-2 font-black text-[10px] uppercase tracking-[0.2em] focus:outline-none"
                                value={block.block_content.language || ""}
                                onChange={(e) => updateBlockContent(index, { ...block.block_content, language: e.target.value })}
                              />
                              <textarea
                                className="w-full h-48 md:h-80 font-mono text-xs md:text-sm leading-relaxed bg-black text-white border-2 border-black border-t-0 p-4 md:p-8 focus:outline-none"
                                placeholder="// CODE HERE..."
                                value={block.block_content.code || ""}
                                onChange={(e) => updateBlockContent(index, { ...block.block_content, code: e.target.value })}
                              />
                            </div>
                          )}

                          {block.block_type === "image" && (
                            <div className="space-y-0">
                              <input
                                type="text"
                                className="w-full bg-white border-2 border-black px-6 py-4 font-bold text-sm focus:outline-none"
                                placeholder="IMAGE URL..."
                                value={block.block_content.url || ""}
                                onChange={(e) => updateBlockContent(index, { ...block.block_content, url: e.target.value })}
                              />
                              <input
                                type="text"
                                className="w-full bg-white border-2 border-black border-t-0 px-6 py-3 text-[11px] font-black uppercase tracking-[0.2em] focus:outline-none"
                                placeholder="ALT TEXT / CAPTION..."
                                value={block.block_content.alt || ""}
                                onChange={(e) => updateBlockContent(index, { ...block.block_content, alt: e.target.value })}
                              />
                            </div>
                          )}

                          {block.block_type === "callout" && (
                            <div className="space-y-0">
                              <select 
                                className="w-full bg-white border-2 border-black px-4 py-2 font-black uppercase text-[10px] tracking-[0.2em] focus:outline-none appearance-none"
                                value={block.block_content.type || "info"}
                                onChange={(e) => updateBlockContent(index, { ...block.block_content, type: e.target.value })}
                              >
                                <option value="info">INFORMATION</option>
                                <option value="warning">WARNING</option>
                                <option value="security">SECURITY</option>
                                <option value="success">SUCCESS</option>
                              </select>
                              <textarea
                                className="w-full h-32 bg-white border-2 border-black border-t-0 px-6 py-4 font-bold leading-relaxed focus:outline-none resize-none"
                                placeholder="CALLOUT MESSAGE..."
                                value={block.block_content.text || ""}
                                onChange={(e) => updateBlockContent(index, { ...block.block_content, text: e.target.value })}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Block Toolbar */}
      <div className="py-8 md:py-16 border-2 border-dashed border-black flex flex-col items-center gap-6 md:gap-10">
        <p className="font-black uppercase tracking-[0.5em] text-[10px]">Add Block</p>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-4">
          {[
            { type: "paragraph", icon: <FaParagraph />, label: "Text" },
            { type: "heading", icon: <FaHeading />, label: "Header" },
            { type: "code", icon: <FaCode />, label: "Code" },
            { type: "quote", icon: <FaQuoteLeft />, label: "Quote" },
            { type: "image", icon: <FaImage />, label: "Media" },
            { type: "callout", icon: <FaExclamationCircle />, label: "Alert" },
          ].map((btn) => (
            <button
              key={btn.type}
              onClick={() => addBlock(btn.type as any)}
              className="flex items-center gap-2 md:gap-3 bg-white text-black border-2 border-black px-3 md:px-6 py-2 md:py-3 font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all"
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
