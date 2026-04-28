"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import { FaGripVertical, FaTrash, FaPlus, FaCopy } from "react-icons/fa";
import type { Block, BlockType } from "@/types/blog";

interface BlockEditorProps {
  initialBlocks?: Block[];
  onChange: (blocks: Block[]) => void;
}

const DEFAULT_BLOCK: Partial<Block> = {
  block_type: "paragraph",
  block_content: { text: "" }
};

export default function BlockEditor({ initialBlocks = [], onChange }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);

  const updateBlocks = (newBlocks: Block[]) => {
    // Update positions
    const orderedBlocks = newBlocks.map((b, index) => ({ ...b, position: index }));
    setBlocks(orderedBlocks);
    onChange(orderedBlocks);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(blocks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    updateBlocks(items);
  };

  const addBlock = (type: BlockType, index: number) => {
    const newBlock: Block = {
      id: uuidv4(),
      block_type: type,
      block_content: type === "code" ? { code: "", language: "typescript" } : { text: "" },
      position: index
    };
    
    const items = Array.from(blocks);
    items.splice(index, 0, newBlock);
    updateBlocks(items);
  };

  const removeBlock = (index: number) => {
    const items = Array.from(blocks);
    items.splice(index, 1);
    updateBlocks(items);
  };

  const duplicateBlock = (index: number) => {
    const items = Array.from(blocks);
    const blockToCopy = items[index];
    const newBlock: Block = {
      ...blockToCopy,
      id: uuidv4(),
    };
    items.splice(index + 1, 0, newBlock);
    updateBlocks(items);
  };

  const updateBlockContent = (index: number, content: any) => {
    const items = Array.from(blocks);
    items[index].block_content = content;
    updateBlocks(items);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="group flex gap-2 border border-base-300 bg-base-100 rounded-lg p-3 hover:border-primary/50 transition-colors"
                    >
                      {/* Drag Handle */}
                      <div
                        {...provided.dragHandleProps}
                        className="flex items-center text-base-content/30 hover:text-base-content cursor-grab"
                      >
                        <FaGripVertical />
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 space-y-2">
                        {/* Type Selector Header */}
                        <div className="flex justify-between items-center mb-2">
                          <select 
                            className="select select-bordered select-xs w-32"
                            value={block.block_type}
                            onChange={(e) => {
                              const items = Array.from(blocks);
                              items[index].block_type = e.target.value as BlockType;
                              // Reset content schema if needed
                              if (e.target.value === "code") items[index].block_content = { code: "", language: "typescript" };
                              else items[index].block_content = { text: "" };
                              updateBlocks(items);
                            }}
                          >
                            <option value="paragraph">Paragraph</option>
                            <option value="heading">Heading</option>
                            <option value="code">Code Block</option>
                            <option value="quote">Quote</option>
                            <option value="callout">Callout</option>
                            <option value="image">Image</option>
                            <option value="markdown">Markdown</option>
                          </select>

                          {/* Block Actions */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button type="button" onClick={() => duplicateBlock(index)} className="btn btn-xs btn-ghost text-base-content/70">
                              <FaCopy />
                            </button>
                            <button type="button" onClick={() => removeBlock(index)} className="btn btn-xs btn-ghost text-error">
                              <FaTrash />
                            </button>
                          </div>
                        </div>

                        {/* Dynamic Editor based on Block Type */}
                        {block.block_type === "heading" && (
                          <input
                            type="text"
                            placeholder="Heading text..."
                            className="input input-bordered w-full text-xl font-bold"
                            value={block.block_content.text || ""}
                            onChange={(e) => updateBlockContent(index, { ...block.block_content, text: e.target.value })}
                          />
                        )}
                        
                        {(block.block_type === "paragraph" || block.block_type === "quote") && (
                          <textarea
                            placeholder="Type something..."
                            className="textarea textarea-bordered w-full min-h-[100px]"
                            value={block.block_content.text || ""}
                            onChange={(e) => updateBlockContent(index, { ...block.block_content, text: e.target.value })}
                          />
                        )}

                        {block.block_type === "code" && (
                          <div className="space-y-2">
                            <input 
                              type="text" 
                              placeholder="Language (e.g. typescript, python, bash)" 
                              className="input input-bordered input-sm w-full font-mono text-xs"
                              value={block.block_content.language || ""}
                              onChange={(e) => updateBlockContent(index, { ...block.block_content, language: e.target.value })}
                            />
                            <textarea
                              placeholder="Code snippet..."
                              className="textarea textarea-bordered w-full font-mono min-h-[150px] bg-base-200"
                              value={block.block_content.code || ""}
                              onChange={(e) => updateBlockContent(index, { ...block.block_content, code: e.target.value })}
                            />
                          </div>
                        )}

                        {block.block_type === "callout" && (
                          <div className="flex gap-2">
                            <select 
                              className="select select-bordered"
                              value={block.block_content.type || "info"}
                              onChange={(e) => updateBlockContent(index, { ...block.block_content, type: e.target.value })}
                            >
                              <option value="info">Info</option>
                              <option value="warning">Warning</option>
                              <option value="success">Success</option>
                              <option value="error">Error</option>
                            </select>
                            <textarea
                              placeholder="Callout content..."
                              className="textarea textarea-bordered w-full"
                              value={block.block_content.text || ""}
                              onChange={(e) => updateBlockContent(index, { ...block.block_content, text: e.target.value })}
                            />
                          </div>
                        )}

                        {block.block_type === "image" && (
                          <div className="space-y-2">
                            <input 
                              type="url" 
                              placeholder="Image URL..." 
                              className="input input-bordered w-full"
                              value={block.block_content.url || ""}
                              onChange={(e) => updateBlockContent(index, { ...block.block_content, url: e.target.value })}
                            />
                            <input 
                              type="text" 
                              placeholder="Alt text or Caption..." 
                              className="input input-bordered input-sm w-full"
                              value={block.block_content.alt || ""}
                              onChange={(e) => updateBlockContent(index, { ...block.block_content, alt: e.target.value })}
                            />
                          </div>
                        )}

                        {block.block_type === "markdown" && (
                          <textarea
                            placeholder="Raw markdown content..."
                            className="textarea textarea-bordered w-full font-mono min-h-[150px]"
                            value={block.block_content.text || ""}
                            onChange={(e) => updateBlockContent(index, { ...block.block_content, text: e.target.value })}
                          />
                        )}
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

      <div className="flex justify-center border-2 border-dashed border-base-300 rounded-lg p-4 mt-4">
        <button 
          type="button" 
          onClick={() => addBlock("paragraph", blocks.length)}
          className="btn btn-outline btn-sm gap-2"
        >
          <FaPlus /> Add Block
        </button>
      </div>
    </div>
  );
}
