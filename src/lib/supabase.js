import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Memory Vault] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum diisi. ' +
    'Cek file .env (lihat .env.example).'
  )
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

export async function ensureAnonymousSession() {
  const { data } = await supabase.auth.getSession()
  if (data?.session) return data.session
  
  const { data: signInData, error } = await supabase.auth.signInAnonymously()
  if (error) {
    console.error('[Memory Vault] Gagal membuat sesi anonim:', error.message)
    return null
  }
  return signInData.session
}