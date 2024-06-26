import {createBrowserClient} from '@supabase/ssr'
import {Database} from '@/types/supabase'

export function createClient() { 
  return createBrowserClient<Database>(
    "https://zgjgxiwgvjqaplsjwubx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpnamd4aXdndmpxYXBsc2p3dWJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1MjIwODcsImV4cCI6MjAxNjA5ODA4N30.o76NQebipIu4YP6NaCunPtxxmFKZHCF4rP4R_F8AF74",
  {
    db: {
      schema: "public",
    },
    auth: {
      persistSession: true,
    },
  }
  )
}
