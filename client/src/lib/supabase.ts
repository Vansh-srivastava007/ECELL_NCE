import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// Database types for Supabase
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          email: string
          department: string
          year: string
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          email: string
          department: string
          year: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          email?: string
          department?: string
          year?: string
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: number
          title: string
          description: string | null
          event_date: string
          event_time: string
          location: string
          image_url: string | null
          max_participants: number | null
          created_by: string
          created_at: string
          updated_at: string
          is_active: boolean | null
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          event_date: string
          event_time: string
          location: string
          image_url?: string | null
          max_participants?: number | null
          created_by: string
          created_at?: string
          updated_at?: string
          is_active?: boolean | null
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          event_date?: string
          event_time?: string
          location?: string
          image_url?: string | null
          max_participants?: number | null
          created_by?: string
          created_at?: string
          updated_at?: string
          is_active?: boolean | null
        }
      }
    }
  }
}