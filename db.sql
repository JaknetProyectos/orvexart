create table if not exists products_datnex (
  id text primary key,

  -- flags
  is_new boolean default false,
  is_featured boolean default false,

  -- product info
  slug text unique not null,
  price numeric(12,2) not null,
  image text not null,
  category text not null,

  -- translations
  name text not null,
  name_english text not null,

  description text,
  description_english text,

  specs text[],
  specs_english text[],

  created_at timestamp with time zone default now()
);

-- indexes
create index if not exists idx_products_datnex_category
on products_datnex(category);

create index if not exists idx_products_datnex_slug
on products_datnex(slug);

create index if not exists idx_products_datnex_is_new
on products_datnex(is_new);

create index if not exists idx_products_datnex_is_featured
on products_datnex(is_featured);