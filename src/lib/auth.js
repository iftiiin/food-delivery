import supabase from "./supabase"
export async function singUp(email, password, username=""){
    let {data, error}  = await supabase.auth.signUp({
        email: email,
        password: password
    })
}