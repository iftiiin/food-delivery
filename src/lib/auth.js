import supabase from "./supabase"
export async function singUp(email, password, username=""){
    let {data, error}  = await supabase.auth.signUp({
        email: email,
        password: password
    })
}

export async function signIn (email,password) {

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if(error) throw error;
  
    
  
    return data;
  }