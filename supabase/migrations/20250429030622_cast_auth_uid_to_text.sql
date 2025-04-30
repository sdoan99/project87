-- enable RLS
ALTER TABLE public.user_profiles
  ENABLE ROW LEVEL SECURITY;

-- drop old policies
DROP POLICY IF EXISTS "Allow insert own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow update own profile" ON public.user_profiles;

-- allow inserts only when auth.uid() matches clerk_id
CREATE POLICY "Allow insert own profile"
  ON public.user_profiles
  FOR INSERT
  WITH CHECK ( auth.uid()::text = clerk_id );

-- allow updates only when auth.uid() matches clerk_id
CREATE POLICY "Allow update own profile"
  ON public.user_profiles
  FOR UPDATE
  USING      ( auth.uid()::text = clerk_id )
  WITH CHECK ( auth.uid()::text = clerk_id );