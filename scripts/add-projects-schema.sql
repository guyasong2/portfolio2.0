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
