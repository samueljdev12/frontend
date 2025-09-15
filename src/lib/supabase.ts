import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      agendas: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string | null
          meeting_title: string
          opening: string
          topics: Array<{ name: string; duration: string }>
          wrap_up: string
          is_public: boolean
          share_token: string
          view_count: number
          meeting_date: string | null
          meeting_duration: number | null
          tags: string[] | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          meeting_title: string
          opening: string
          topics: Array<{ name: string; duration: string }>
          wrap_up: string
          is_public?: boolean
          share_token?: string
          view_count?: number
          meeting_date?: string | null
          meeting_duration?: number | null
          tags?: string[] | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string | null
          meeting_title?: string
          opening?: string
          topics?: Array<{ name: string; duration: string }>
          wrap_up?: string
          is_public?: boolean
          share_token?: string
          view_count?: number
          meeting_date?: string | null
          meeting_duration?: number | null
          tags?: string[] | null
          notes?: string | null
        }
      }
    }
  }
}
