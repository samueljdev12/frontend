import { supabase } from './supabase'
import { Agenda } from '@/types/agenda'

export interface AgendaRecord {
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

export class AgendaService {
  // Create a new agenda
  static async createAgenda(data: {
    meeting_title: string
    opening: string
    topics: Array<{ name: string; duration: string }>
    wrap_up: string
    user_id?: string
    is_public?: boolean
    meeting_date?: string
    meeting_duration?: number
    tags?: string[]
    notes?: string
  }): Promise<AgendaRecord> {
    const { data: agenda, error } = await supabase
      .from('agendas')
      .insert([{
        meeting_title: data.meeting_title,
        opening: data.opening,
        topics: data.topics,
        wrap_up: data.wrap_up,
        user_id: data.user_id || null,
        is_public: data.is_public ?? true,
        meeting_date: data.meeting_date || null,
        meeting_duration: data.meeting_duration || null,
        tags: data.tags || null,
        notes: data.notes || null
      }])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create agenda: ${error.message}`)
    }

    return agenda
  }

  // Get agenda by ID
  static async getAgendaById(id: string): Promise<AgendaRecord | null> {
    const { data: agenda, error } = await supabase
      .from('agendas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      throw new Error(`Failed to get agenda: ${error.message}`)
    }

    return agenda
  }

  // Get agenda by share token
  static async getAgendaByShareToken(shareToken: string): Promise<AgendaRecord | null> {
    const { data: agenda, error } = await supabase
      .from('agendas')
      .select('*')
      .eq('share_token', shareToken)
      .eq('is_public', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      throw new Error(`Failed to get agenda: ${error.message}`)
    }

    // Increment view count
    await this.incrementViewCount(agenda.id)

    return agenda
  }

  // Update agenda
  static async updateAgenda(id: string, updates: Partial<AgendaRecord>): Promise<AgendaRecord> {
    const { data: agenda, error } = await supabase
      .from('agendas')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update agenda: ${error.message}`)
    }

    return agenda
  }

  // Delete agenda
  static async deleteAgenda(id: string): Promise<void> {
    const { error } = await supabase
      .from('agendas')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(`Failed to delete agenda: ${error.message}`)
    }
  }

  // Increment view count (simplified for now)
  static async incrementViewCount(_id: string): Promise<void> {
    // For now, we'll skip view count increment to avoid complexity
    // This can be implemented later with a proper RPC function in Supabase
    console.log('View count increment skipped for now')
  }

  // Get user's agendas
  static async getUserAgendas(userId: string): Promise<AgendaRecord[]> {
    const { data: agendas, error } = await supabase
      .from('agendas')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to get user agendas: ${error.message}`)
    }

    return agendas || []
  }

  // Convert AgendaRecord to Agenda type
  static toAgenda(record: AgendaRecord): Agenda {
    return {
      opening: record.opening,
      topics: record.topics,
      wrapUp: record.wrap_up
    }
  }
}
