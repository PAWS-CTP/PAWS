import { createClient } from '@supabase/supabase-js'

// Use public env vars for client-side Supabase access. Do NOT put service_role keys here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Set these env vars before starting the app.')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { supabase }
export default supabase
