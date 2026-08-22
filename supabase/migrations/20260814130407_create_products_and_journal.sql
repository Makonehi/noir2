/*
# Create products and journal_articles tables (single-tenant, no auth)

1. New Tables

## products
- `id` (uuid, primary key)
- `name` (text, product name)
- `slug` (text, unique URL-friendly identifier)
- `category` (text, category: massage, ceramics, oils, accessories)
- `price` (integer, price in rubles)
- `short_description` (text, brief description for cards)
- `description` (text, full description)
- `materials` (text, materials info)
- `features` (jsonb, array of feature strings)
- `image_url` (text, main product image)
- `gallery` (jsonb, array of additional image URLs)
- `colors` (jsonb, array of available color options with name and hex)
- `is_featured` (boolean, whether shown on home page)
- `is_new` (boolean, whether marked as new arrival)
- `rating` (numeric, average rating 0-5)
- `in_stock` (boolean, availability)
- `created_at` (timestamptz)

## journal_articles
- `id` (uuid, primary key)
- `title` (text, article title)
- `slug` (text, unique URL-friendly identifier)
- `excerpt` (text, short summary for cards)
- `content` (jsonb, structured content blocks: paragraphs, headings, quotes)
- `category` (text, category: health, intimacy, self-care, wellness)
- `cover_image` (text, cover image URL)
- `author` (text, author name)
- `read_time` (integer, estimated read time in minutes)
- `published_at` (timestamptz)
- `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- Both tables are intentionally public (catalog + blog visible without sign-in).
- Allow anon + authenticated full CRUD for both tables.

3. Important Notes
- This is a single-tenant storefront with no authentication.
- Products and articles are shared/public content.
- All policies use `TO anon, authenticated` so the anon-key frontend can read data.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text NOT NULL DEFAULT 'accessories',
  price integer NOT NULL DEFAULT 0,
  short_description text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  materials text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  image_url text NOT NULL DEFAULT '',
  gallery jsonb NOT NULL DEFAULT '[]'::jsonb,
  colors jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_featured boolean NOT NULL DEFAULT false,
  is_new boolean NOT NULL DEFAULT false,
  rating numeric NOT NULL DEFAULT 5.0,
  in_stock boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  content jsonb NOT NULL DEFAULT '[]'::jsonb,
  category text NOT NULL DEFAULT 'wellness',
  cover_image text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  read_time integer NOT NULL DEFAULT 5,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_products" ON products;
CREATE POLICY "anon_select_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_products" ON products;
CREATE POLICY "anon_insert_products" ON products FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_products" ON products;
CREATE POLICY "anon_update_products" ON products FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_products" ON products;
CREATE POLICY "anon_delete_products" ON products FOR DELETE
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_select_journal" ON journal_articles;
CREATE POLICY "anon_select_journal" ON journal_articles FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_journal" ON journal_articles;
CREATE POLICY "anon_insert_journal" ON journal_articles FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_journal" ON journal_articles;
CREATE POLICY "anon_update_journal" ON journal_articles FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_journal" ON journal_articles;
CREATE POLICY "anon_delete_journal" ON journal_articles FOR DELETE
  TO anon, authenticated USING (true);
