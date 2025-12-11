-- User Tills Table - Add to existing schema
-- Run this in Supabase SQL Editor

-- Tills table for user M-Pesa credentials
CREATE TABLE public.tills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    shortcode TEXT NOT NULL,
    till_number TEXT NOT NULL,
    passkey TEXT NOT NULL,
    consumer_key TEXT NOT NULL,
    consumer_secret TEXT NOT NULL,
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

-- Update api_keys to optionally link to a specific till
ALTER TABLE public.api_keys ADD COLUMN till_id UUID REFERENCES public.tills(id);
