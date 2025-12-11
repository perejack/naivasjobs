-- Simplified User Tills Table
-- Users only add their Till number, all API credentials are SwiftPay's
-- Run this in Supabase SQL Editor

-- Drop existing tills table if exists (careful in production!)
DROP TABLE IF EXISTS public.tills;

-- Simplified tills table - only name and till_number
CREATE TABLE public.tills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    till_number TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.tills ENABLE ROW LEVEL SECURITY;

-- Users can manage their own tills
CREATE POLICY "Users can manage own tills" ON public.tills
    FOR ALL USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX idx_tills_user_id ON public.tills(user_id);
