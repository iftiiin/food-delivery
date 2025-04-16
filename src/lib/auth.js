import supabase from "./supabase"
export async function singUp(email, password, username=""){
    let {data, error}  = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if(data?.user){
      const {data: sessionData} = await supabase.auth.getSession();

      if(!sessionData.session){
        return data 
      }

      const displayName = username || email.split("@")[0]

      // create profile

      const {data: profileData, error: profileError} = await supabase
      .from("users")
      .insert(
        {
          id:data.user.id,
          username: displayName,
          avatar_url: null
        }
      )
      .select()
      .single()

      if(profileError){
        console.error("Profile creation error", profileError)
      }else {
          console.log("profile created successfully", profileData)
      }
    }
    
    return data
}

export async function signIn (email,password) {

    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    if(error) throw error;
  
    
  
    return data;
  }