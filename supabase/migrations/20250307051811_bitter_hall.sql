/*
  # Trade Management Schema Update

  1. New Tables
    - `bet_data`: Raw trade action data
      - `id` (uuid, primary key)
      - `user_id` (uuid)
      - `strategy_id` (uuid)
      - `bet_id` (uuid)
      - `date` (date)
      - `market` (text)
      - `sector` (text)
      - `symbol` (text)
      - `expiration` (date)
      - `position` (text)
      - `side` (text)
      - `quantity` (numeric)
      - `price` (numeric)
      - `fee` (numeric)
      - `entry` (numeric)
      - `exit` (numeric)
      - Timestamps

    - `bet_data_metrics`: Aggregated trade metrics
      - `id` (uuid, primary key)
      - `strategy_id` (uuid)
      - `bet_id` (uuid)
      - `date` (date)
      - `symbol` (text)
      - `status` (text)
      - `position` (text)
      - `qty` (numeric)
      - `entry` (numeric)
      - `exit` (numeric)
      - `qty_rem` (numeric)
      - `hold` (interval)
      - `return` (numeric)
      - `return_percent` (numeric)
      - `entry_tot` (numeric)
      - `exit_tot` (numeric)
      - Timestamps

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create bet_data table
CREATE TABLE IF NOT EXISTS public.bet_data (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    strategy_id uuid REFERENCES public.strategy_profile(id),
    bet_id uuid NOT NULL,
    date date DEFAULT CURRENT_DATE,
    market text,
    sector text,
    symbol text NOT NULL,
    expiration date,
    position text,
    side text,
    quantity numeric,
    price numeric,
    fee numeric,
    entry numeric,
    exit numeric,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Create bet_data_metrics table
CREATE TABLE IF NOT EXISTS public.bet_data_metrics (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    strategy_id uuid REFERENCES public.strategy_profile(id),
    bet_id uuid NOT NULL,
    date date DEFAULT CURRENT_DATE,
    symbol text NOT NULL,
    status text,
    position text,
    qty numeric,
    entry numeric,
    exit numeric,
    qty_rem numeric,
    hold interval,
    return numeric,
    return_percent NUMERIC(9,4),
    entry_tot numeric,
    exit_tot numeric,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.bet_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bet_data_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for bet_data
CREATE POLICY "Users can read own bet_data"
    ON public.bet_data
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bet_data"
    ON public.bet_data
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bet_data"
    ON public.bet_data
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own bet_data"
    ON public.bet_data
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create policies for bet_data_metrics
CREATE POLICY "Users can read own bet_data_metrics"
    ON public.bet_data_metrics
    FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.bet_data
        WHERE bet_data.bet_id = bet_data_metrics.bet_id
        AND bet_data.user_id = auth.uid()
    ));

-- Create function to update metrics
CREATE OR REPLACE FUNCTION update_bet_metrics()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate aggregated metrics
    WITH metrics AS (
        SELECT
            strategy_id,
            bet_id,
            MIN(date) as date,
            symbol,
            SUM(CASE WHEN side = 'BUY' THEN quantity ELSE -quantity END) as net_quantity,
            SUM(CASE WHEN side = 'BUY' THEN quantity * price ELSE 0 END) / 
                NULLIF(SUM(CASE WHEN side = 'BUY' THEN quantity ELSE 0 END), 0) as avg_entry,
            SUM(CASE WHEN side = 'SELL' THEN quantity * price ELSE 0 END) / 
                NULLIF(SUM(CASE WHEN side = 'SELL' THEN quantity ELSE 0 END), 0) as avg_exit,
            SUM(CASE WHEN side = 'BUY' THEN quantity * price ELSE 0 END) as total_entry,
            SUM(CASE WHEN side = 'SELL' THEN quantity * price ELSE 0 END) as total_exit,
            MAX(date) - MIN(date) as hold_time
        FROM public.bet_data
        WHERE bet_id = NEW.bet_id
        GROUP BY strategy_id, bet_id, symbol
    )
    INSERT INTO public.bet_data_metrics (
        strategy_id,
        bet_id,
        date,
        symbol,
        status,
        position,
        qty,
        entry,
        exit,
        qty_rem,
        hold,
        return,
        return_percent,
        entry_tot,
        exit_tot
    )
    SELECT
        strategy_id,
        bet_id,
        date,
        symbol,
        CASE 
            WHEN net_quantity = 0 AND total_exit > total_entry THEN 'WIN'
            WHEN net_quantity = 0 AND total_exit < total_entry THEN 'LOSS'
            ELSE 'OPEN'
        END as status,
        CASE 
            WHEN net_quantity > 0 THEN 'LONG'
            WHEN net_quantity < 0 THEN 'SHORT'
            ELSE 'CLOSED'
        END as position,
        ABS(net_quantity) as qty,
        avg_entry,
        avg_exit,
        net_quantity as qty_rem,
        hold_time,
        total_exit - total_entry as return,
        CASE 
            WHEN total_entry = 0 THEN 0
            ELSE ((total_exit - total_entry) / total_entry * 100)
        END as return_percent,
        total_entry,
        total_exit
    FROM metrics
    ON CONFLICT (bet_id) DO UPDATE SET
        status = EXCLUDED.status,
        position = EXCLUDED.position,
        qty = EXCLUDED.qty,
        entry = EXCLUDED.entry,
        exit = EXCLUDED.exit,
        qty_rem = EXCLUDED.qty_rem,
        hold = EXCLUDED.hold,
        return = EXCLUDED.return,
        return_percent = EXCLUDED.return_percent,
        entry_tot = EXCLUDED.entry_tot,
        exit_tot = EXCLUDED.exit_tot,
        updated_at = CURRENT_TIMESTAMP;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update metrics
CREATE TRIGGER update_bet_metrics_on_insert
    AFTER INSERT ON public.bet_data
    FOR EACH ROW
    EXECUTE FUNCTION update_bet_metrics();

CREATE TRIGGER update_bet_metrics_on_update
    AFTER UPDATE ON public.bet_data
    FOR EACH ROW
    EXECUTE FUNCTION update_bet_metrics();