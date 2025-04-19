import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabseAnnonKey = import.meta.env.VITE_SUPABASE_ANON
const supabase =  createClient(supabaseUrl,supabseAnnonKey, 
{
    auth:{
        persistSession: true,
        autoRefreshToken: true
    },
    
}
)
export default supabase