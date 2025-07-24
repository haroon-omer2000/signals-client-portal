import { supabase } from './supabase'

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('count', { count: 'exact', head: true })
    
    if (error) {
      console.error('Supabase connection error:', error)
      return false
    }
    
    console.log('✅ Supabase connection successful!')
    console.log('Current client count:', data?.length || 0)
    return true
  } catch (error) {
    console.error('Connection test failed:', error)
    return false
  }
} 