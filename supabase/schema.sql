-- EngiHub production content foundation
-- Run this in Supabase SQL Editor before uploading real course notes.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  institution text,
  department text,
  level text,
  semester text,
  role text not null default 'student' check (role in ('student','lecturer','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  name text not null,
  description text,
  institution text not null,
  department text not null,
  level text not null,
  semester text not null,
  image_url text,
  created_at timestamptz not null default now(),
  unique(code, institution, department, level, semester)
);

create table if not exists public.topics (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  slug text not null,
  summary text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique(course_id, slug)
);

create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete set null,
  topic_id uuid references public.topics(id) on delete set null,
  title text not null,
  description text,
  file_path text,
  file_url text,
  file_type text,
  uploaded_by uuid not null references auth.users(id) on delete cascade,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references public.courses(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  difficulty text check (difficulty in ('Easy','Medium','Hard','Challenge')),
  question text not null,
  options jsonb,
  answer text,
  explanation text,
  source text,
  source_year integer,
  created_at timestamptz not null default now()
);

create table if not exists public.course_enrollments (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  progress integer not null default 0 check (progress between 0 and 100),
  updated_at timestamptz not null default now(),
  unique(user_id, topic_id)
);

alter table public.profiles enable row level security;
alter table public.courses enable row level security;
alter table public.topics enable row level security;
alter table public.notes enable row level security;
alter table public.questions enable row level security;
alter table public.student_progress enable row level security;
alter table public.course_enrollments enable row level security;

drop policy if exists "users read own enrollments" on public.course_enrollments;
create policy "users read own enrollments" on public.course_enrollments for select to authenticated using (user_id = auth.uid());
drop policy if exists "users insert own enrollments" on public.course_enrollments;
create policy "users insert own enrollments" on public.course_enrollments for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "users delete own enrollments" on public.course_enrollments;
create policy "users delete own enrollments" on public.course_enrollments for delete to authenticated using (user_id = auth.uid());

-- Readable academic content for signed-in users.
drop policy if exists "authenticated read courses" on public.courses;
create policy "authenticated read courses" on public.courses for select to authenticated using (true);
drop policy if exists "authenticated read topics" on public.topics;
create policy "authenticated read topics" on public.topics for select to authenticated using (true);
drop policy if exists "authenticated read published notes" on public.notes;
create policy "authenticated read published notes" on public.notes for select to authenticated using (is_published = true or uploaded_by = auth.uid());
drop policy if exists "authenticated read questions" on public.questions;
create policy "authenticated read questions" on public.questions for select to authenticated using (true);

drop policy if exists "users read own profile" on public.profiles;
create policy "users read own profile" on public.profiles for select to authenticated using (id = auth.uid());
drop policy if exists "users insert own profile" on public.profiles;
create policy "users insert own profile" on public.profiles for insert to authenticated with check (id = auth.uid());
drop policy if exists "users update own profile" on public.profiles;
create policy "users update own profile" on public.profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists "users read own progress" on public.student_progress;
create policy "users read own progress" on public.student_progress for select to authenticated using (user_id = auth.uid());
drop policy if exists "users write own progress" on public.student_progress;
create policy "users write own progress" on public.student_progress for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "users update own progress" on public.student_progress;
create policy "users update own progress" on public.student_progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "users upload notes" on public.notes;
create policy "users upload notes" on public.notes for insert to authenticated with check (uploaded_by = auth.uid());

-- Storage bucket for lecture notes. Keep files private; generate signed URLs in the app when needed.
insert into storage.buckets (id, name, public) values ('engihub-notes', 'engihub-notes', false) on conflict (id) do nothing;

drop policy if exists "authenticated note upload" on storage.objects;
create policy "authenticated note upload" on storage.objects for insert to authenticated with check (bucket_id = 'engihub-notes' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "authenticated note read" on storage.objects;
create policy "authenticated note read" on storage.objects for select to authenticated using (bucket_id = 'engihub-notes');

-- Real starter curriculum: PTI -> Mechanical Engineering -> ND1 -> Second Semester.
-- These are the 10 courses supplied for the current semester.
insert into public.courses (code,name,description,institution,department,level,semester,image_url) values
('MEC 121','Engineering Graphics','Engineering graphics and technical drawing for mechanical engineering.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85'),
('MEC 122','Thermodynamics I','Fundamentals of thermodynamics and engineering energy systems.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85'),
('MEC 123','Machine Tools Technology and Practice','Machine tools, workshop processes and practical operations.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85'),
('MEC 124','Engineering Mechanics II (Dynamics)','Dynamics, motion, force systems and engineering applications.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85'),
('MEC 125','Automotive Technology and Practice I','Automotive systems, maintenance principles and practical practice.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85'),
('MEC 126','Welding Technology and Practice','Welding processes, equipment, safety and practical applications.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85'),
('PGT 126','Basic Petroleum Processing Technology','Introduction to petroleum processing operations and fundamentals.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85'),
('WEC 125','Basic Offshore Safety','Fundamentals of offshore safety, hazards and safe working practice.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85'),
('GNS 201','Use of English II (Essay and Comprehension)','Essay writing, comprehension and effective communication.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85'),
('MTH 122','Trigonometric and Analytical Geometry','Trigonometry and analytical geometry for engineering applications.','Petroleum Training Institute (PTI)','Mechanical Engineering','ND1','Second Semester','https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=85')
on conflict (code,institution,department,level,semester) do update set name=excluded.name, description=excluded.description, image_url=excluded.image_url;
