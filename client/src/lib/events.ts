import { supabase } from '@/lib/supabase'
import { Event, InsertEvent, UpdateEvent } from '@shared/schema'

export const eventsService = {
  // Get all active events
  async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true })

    if (error) {
      throw new Error(`Failed to fetch events: ${error.message}`)
    }

    return data || []
  },

  // Get a single event by ID
  async getEvent(id: number): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Event not found
      }
      throw new Error(`Failed to fetch event: ${error.message}`)
    }

    return data
  },

  // Create a new event (requires authentication)
  async createEvent(eventData: InsertEvent): Promise<Event> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('You must be logged in to create events')
    }

    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...eventData,
        created_by: user.id
      }])
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create event: ${error.message}`)
    }

    return data
  },

  // Update an existing event (only by creator)
  async updateEvent(id: number, eventData: UpdateEvent): Promise<Event> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('You must be logged in to update events')
    }

    const { data, error } = await supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .eq('created_by', user.id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update event: ${error.message}`)
    }

    return data
  },

  // Delete an event (only by creator)
  async deleteEvent(id: number): Promise<void> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('You must be logged in to delete events')
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
      .eq('created_by', user.id)

    if (error) {
      throw new Error(`Failed to delete event: ${error.message}`)
    }
  },

  // Subscribe to real-time event changes
  subscribeToEvents(callback: (payload: any) => void) {
    const channel = supabase
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
          filter: 'is_active=eq.true'
        },
        callback
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }
}