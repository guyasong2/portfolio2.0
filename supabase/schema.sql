-- supabase/schema.sql

-- Enable the "uuid-ossp" extension for UUID generation
create extension if not exists "uuid-ossp";

-- Table: profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  name text not null,
  avatar text,
  role text default 'user'::text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for profiles
alter table public.profiles enable row level security;

-- Table: categories
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for categories
alter table public.categories enable row level security;

-- Table: tags
create table public.tags (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for tags
alter table public.tags enable row level security;

-- Table: posts
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  cover_image text,
  featured boolean default false,
  published boolean default false,
  author_id uuid references public.profiles(id) on delete set null,
  category_id uuid references public.categories(id) on delete set null,
  read_time integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for posts
alter table public.posts enable row level security;

-- Table: post_tags
create table public.post_tags (
  post_id uuid references public.posts(id) on delete cascade not null,
  tag_id uuid references public.tags(id) on delete cascade not null,
  primary key (post_id, tag_id)
);

-- Enable RLS for post_tags
alter table public.post_tags enable row level security;

-- Table: post_blocks
create table public.post_blocks (
  id uuid default uuid_generate_v4() primary key,
  post_id uuid references public.posts(id) on delete cascade not null,
  block_type text not null,
  block_content jsonb not null default '{}'::jsonb,
  position integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for post_blocks
alter table public.post_blocks enable row level security;

-- --------------------------------------------------------
-- Row Level Security (RLS) Policies
-- --------------------------------------------------------

-- Profiles: Anyone can read, only users can update their own
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Categories: Anyone can read, only admins can insert/update/delete (assuming role='admin')
create policy "Categories are viewable by everyone." on public.categories for select using (true);
create policy "Admins can insert categories." on public.categories for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update categories." on public.categories for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete categories." on public.categories for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Tags: Same as categories
create policy "Tags are viewable by everyone." on public.tags for select using (true);
create policy "Admins can insert tags." on public.tags for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update tags." on public.tags for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete tags." on public.tags for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Posts: Anyone can read published posts. Admins can read all. Admins can insert/update/delete.
create policy "Published posts viewable by everyone." on public.posts for select using (
  published = true or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can insert posts." on public.posts for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update posts." on public.posts for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete posts." on public.posts for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Post_Tags: Same as posts
create policy "Post tags viewable by everyone." on public.post_tags for select using (true);
create policy "Admins can insert post_tags." on public.post_tags for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete post_tags." on public.post_tags for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Post_Blocks: Anyone can read blocks for published posts. Admins can read all.
create policy "Blocks for published posts viewable by everyone." on public.post_blocks for select using (
  exists (select 1 from public.posts where id = post_blocks.post_id and (published = true or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')))
);
create policy "Admins can insert post_blocks." on public.post_blocks for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update post_blocks." on public.post_blocks for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete post_blocks." on public.post_blocks for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Storage bucket for blog media
insert into storage.buckets (id, name, public) values ('blog-media', 'blog-media', true);
create policy "Blog media viewable by everyone." on storage.objects for select using (bucket_id = 'blog-media');
create policy "Admins can upload media." on storage.objects for insert with check (
  bucket_id = 'blog-media' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update media." on storage.objects for update using (
  bucket_id = 'blog-media' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete media." on storage.objects for delete using (
  bucket_id = 'blog-media' and exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Table: tech_categories
create table public.tech_categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null unique,
  slug text not null unique,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for tech_categories
alter table public.tech_categories enable row level security;

-- Table: projects
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  demo_url text,
  code_url text,
  cover_image text,
  featured boolean default false,
  published boolean default false,
  position integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for projects
alter table public.projects enable row level security;

-- Table: project_tech
create table public.project_tech (
  project_id uuid references public.projects(id) on delete cascade not null,
  tech_id uuid references public.tech_categories(id) on delete cascade not null,
  primary key (project_id, tech_id)
);

-- Enable RLS for project_tech
alter table public.project_tech enable row level security;

-- Tech Categories RLS
create policy "Tech categories viewable by everyone." on public.tech_categories for select using (true);
create policy "Admins can insert tech categories." on public.tech_categories for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update tech categories." on public.tech_categories for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete tech categories." on public.tech_categories for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Projects RLS
create policy "Published projects viewable by everyone." on public.projects for select using (
  published = true or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can insert projects." on public.projects for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update projects." on public.projects for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete projects." on public.projects for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Project_Tech RLS
create policy "Project tech viewable by everyone." on public.project_tech for select using (true);
create policy "Admins can insert project_tech." on public.project_tech for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can delete project_tech." on public.project_tech for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
