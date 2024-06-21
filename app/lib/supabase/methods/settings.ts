import { createClientServerSide } from "@/app/lib/supabase/server";

const getSettings = async () => {
  const supabase = createClientServerSide();
  const {data, error} = await supabase.from('settings').select('*')
  if (error) {
    throw error
  }
  return data
}