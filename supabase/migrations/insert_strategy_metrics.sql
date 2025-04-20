CREATE OR REPLACE FUNCTION FUNCTION_INSERT_STRATEGY_STATS_metrics()
RETURNS TRIGGER AS $$
BEGIN
    WITH metrics AS (
        SELECT 
            strategy_id,
            SUM(return) AS total_return,
            COUNT(*) FILTER (WHERE status = 'WIN') AS win_count,
            COUNT(*) FILTER (WHERE status = 'LOSS') AS loss_count,
            COUNT(*) FILTER (WHERE status IN ('WIN', 'LOSS', 'EVEN')) AS total_count,
            SUM(return) FILTER (WHERE status = 'WIN') AS total_win,
            SUM(return) FILTER (WHERE status = 'LOSS') AS total_loss
        FROM public.bet_data_metrics
        GROUP BY strategy_id
    )
    UPDATE public.strategy_metrics sm
    SET 
        total_pnl = m.total_return,
        win_rate = (m.win_count::float / NULLIF(m.total_count, 0)) * 100,
        avg_win = m.total_win / NULLIF(m.win_count, 0),
        avg_loss = m.total_loss / NULLIF(m.loss_count, 0),
        profit_factor = m.total_win::float / NULLIF(ABS(m.total_loss), 0)
    FROM metrics m
    WHERE sm.strategy_id = m.strategy_id;

    RETURN NULL; -- Triggers must return a value
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER TRIGGER_INSERT_STRATEGY_STATS_metrics
AFTER INSERT OR UPDATE OR DELETE ON public.bet_data_metrics
FOR EACH ROW
EXECUTE FUNCTION FUNCTION_INSERT_STRATEGY_STATS_metrics();