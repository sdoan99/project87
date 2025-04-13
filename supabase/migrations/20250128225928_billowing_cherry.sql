/*
  # Create bet staging trade table

  1. New Tables
    - `bet_staging_tradetable`
      - `id` (uuid, primary key)
      - `date` (date)
      - `symbol` (text)
      - `status` (text)
      - `side` (text)
      - `qty` (numeric)
      - `entry` (numeric)
      - `exit` (numeric)
      - `entry_total` (numeric)
      - `exit_total` (numeric)
      - `position` (numeric)
      - `hold` (text)
      - `return` (numeric)
      - `return_percentage` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `bet_staging_tradetable` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS public.bet_staging_tradetable (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  symbol text NOT NULL,
  status text NOT NULL,
  side text NOT NULL,
  qty numeric NOT NULL,
  entry numeric NOT NULL,
  exit numeric,
  entry_total numeric NOT NULL,
  exit_total numeric,
  position numeric,
  hold text,
  return numeric,
  return_percentage numeric,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.bet_staging_tradetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all trades"
  ON public.bet_staging_tradetable
  FOR SELECT
  TO authenticated
  USING (true);