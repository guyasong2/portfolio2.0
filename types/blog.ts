export type BlockType = 
  | "paragraph" 
  | "heading" 
  | "code" 
  | "image" 
  | "checklist" 
  | "quote" 
  | "callout" 
  | "table" 
  | "video" 
  | "markdown";

export interface Block {
  id: string; // uuid
  post_id?: string;
  block_type: BlockType;
  block_content: any;
  position: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  featured: boolean;
  published: boolean;
  author_id: string | null;
  category_id: string | null;
  read_time: number;
  created_at: string;
  updated_at: string;
  blocks?: Block[];
}
