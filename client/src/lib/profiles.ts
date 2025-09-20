import { supabase } from '@/lib/supabase'
import { Profile, UpdateProfile } from '@shared/schema'

export const profilesService = {
  // Get all profiles
  async getProfiles(): Promise<Profile[]> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch profiles: ${error.message}`)
    }

    return data || []
  },

  // Get a single profile by user ID
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Profile not found
      }
      throw new Error(`Failed to fetch profile: ${error.message}`)
    }

    return data
  },

  // Update profile (only own profile)
  async updateProfile(userId: string, profileData: UpdateProfile): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }

    return data
  },

  // Upload avatar to Supabase Storage
  async uploadAvatar(userId: string, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}.${fileExt}`
    const filePath = `avatars/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      throw new Error(`Failed to upload avatar: ${uploadError.message}`)
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return data.publicUrl
  },

  // Subscribe to real-time profile changes
  subscribeToProfiles(callback: (payload: any) => void) {
    const channel = supabase
      .channel('profiles-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        callback
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }
}