import { createClient } from '@supabase/supabase-js'

// Use public env vars for client-side Supabase access. Do NOT put service_role keys here.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: any

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
} else {
  // Don't throw during module import — warn and provide a safe stub so client bundles don't crash.
  // Runtime calls will receive a clear error which the UI can handle.
  // This is useful in environments (like preview/workspaces) where env vars may not be set.
  // eslint-disable-next-line no-console
  console.warn('Supabase not configured: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing')

  supabase = {
    auth: {
      signInWithOAuth: async () => {
        throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
      },
      // minimal stub for other auth methods if needed
      signOut: async () => {
        throw new Error('Supabase is not configured')
      },
      getUser: async () => ({ data: null, error: new Error('Supabase is not configured') }),
    },
  }
}

export { supabase }
export default supabase
