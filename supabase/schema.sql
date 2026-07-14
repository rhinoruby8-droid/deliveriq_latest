create table if not exists pages (
  id text primary key,
  html text,
  content jsonb,
  visual_mode boolean default false,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists speakers (
  id text primary key,
  name text not null,
  role text,
  organisation text,
  bio text,
  avatar_url text,
  email text,
  social_url text
);

create table if not exists sponsors (
  id text primary key,
  name text not null,
  logo_url text,
  website_url text,
  tier text
);

create table if not exists sessions (
  id text primary key,
  title text not null,
  description text,
  tag text,
  date text,
  time text,
  duration text,
  status text,
  speaker_ids text[],
  sponsor_ids text[],
  registration_url text,
  video_url text
);

-- Note: Access is managed via the secure backend API using the Service Role Key.

create table if not exists settings (
  id text primary key,
  value jsonb
);

create table if not exists forms (
  id text primary key,
  name text not null,
  fields jsonb not null, -- Array of FormField definitions
  submit_button_text text,
  success_message text
);

create table if not exists form_submissions (
  id uuid primary key default gen_random_uuid(),
  form_id text references forms(id),
  data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  name text not null,
  role text default 'delegate',
  registered_session_ids text[] default '{}',
  minutes_attended integer default 0,
  hours_watched numeric default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
