-- Supabase Database Setup for E-Cell NCE Website
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    department TEXT NOT NULL,
    batch TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME NOT NULL,
    location TEXT NOT NULL,
    image_url TEXT,
    max_participants INTEGER,
    created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    is_active BOOLEAN DEFAULT TRUE NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
-- Allow users to view all profiles
CREATE POLICY "Public profiles are viewable by everyone" 
    ON public.profiles FOR SELECT 
    USING (true);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile" 
    ON public.profiles FOR UPDATE 
    USING (auth.uid() = user_id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
    ON public.profiles FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Create policies for events table
-- Allow everyone to view active events
CREATE POLICY "Public events are viewable by everyone" 
    ON public.events FOR SELECT 
    USING (is_active = true);

-- Allow authenticated users to create events
CREATE POLICY "Authenticated users can create events" 
    ON public.events FOR INSERT 
    TO authenticated 
    WITH CHECK (auth.uid() = created_by);

-- Allow event creators to update their own events
CREATE POLICY "Users can update their own events" 
    ON public.events FOR UPDATE 
    USING (auth.uid() = created_by);

-- Allow event creators to delete their own events
CREATE POLICY "Users can delete their own events" 
    ON public.events FOR DELETE 
    USING (auth.uid() = created_by);

-- Create a function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email, department, year)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'department', 'Not specified'),
        COALESCE(NEW.raw_user_meta_data->>'batch', 'Not specified')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to call the function when a new user signs up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER events_updated_at
    BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Optional: Create some sample events (you can remove this if you prefer to start fresh)
INSERT INTO public.events (
    title, 
    description, 
    event_date, 
    event_time, 
    location, 
    created_by, 
    is_active
) VALUES 
(
    'Startup Pitch Competition 2025',
    'Join us for an exciting startup pitch competition where entrepreneurs will present their innovative ideas to a panel of expert judges.',
    '2025-01-15',
    '14:00:00',
    'Main Auditorium, NCE',
    auth.uid(), -- This will need to be replaced with actual admin user ID
    true
),
(
    'Entrepreneurship Workshop',
    'Learn the fundamentals of starting your own business in this comprehensive workshop covering business planning, funding, and marketing.',
    '2025-01-22',
    '10:00:00',
    'Conference Hall A, NCE',
    auth.uid(), -- This will need to be replaced with actual admin user ID
    true
);

-- Note: After running this script, replace auth.uid() in the sample events 
-- with an actual user ID from your profiles table