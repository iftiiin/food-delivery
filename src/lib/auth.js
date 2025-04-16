import supabase from "./supabase"
export async function singUp(email, password, username=""){
    let {data, error}  = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if (error) {
      console.error("Signup error:", error.message);
      return error;
    }
    
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
    // create customer

    const {data: customerData, error: customerError} = await supabase
    .from("customers")
    .insert(
      {
        user_id:data.user.id,
        name: displayName,
        email: data.user.email,
       
      }
    )
    .select()
    .single()

    if(customerError){
      console.error("customer creation error", customerError)
    }else {
        console.log("customer created successfully", customerData)
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


export async function getUserProfile(userId) {
    const { data : sessionData } = await supabase.auth.getSession()

    const { data , error } = await supabase.from('users')
        .select("*")
        .eq("id", userId)
        .single()

        if(error && error.code === "PGRST116"){
            console.log('No profile found, attempting to create one for user:', userId)

          const { data : userData } = await supabase.auth.getUser();

          const email = userData?.user.email;

          const defaultUsername = email ? email.split("@")[0] : `user_${Date.now()}`;

          // create profile 

          const { data: newProfile, error : profileError } = await supabase
      
          .from('users')
          .insert({
              id: userId,
              username: defaultUsername,
              avatar_url: null
          })
          .select()
          .single()

          if(profileError){
              console.error("profile creation error:", profileError)
              throw profileError
          }else{
              console.log("Profile created successfully", newProfile)
          }

          return newProfile
        }

        const { data: customer, error: customerError } = await supabase
          .from("customers")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (customerError && customerError.code !== "PGRST116") {
          console.error("Error fetching customer:", customerError);
          throw customerError;
        }

        
        // general error 
        if(error){
            console.error('Error fetching profile:', error)
            throw error
        }

        console.log("exiting profile", data)

        return {
          profile,
          customer: customer || null
        };
  }

//   Login or Logout state
export  function onAuthChange  (callback)  {
  const {data} = supabase.auth.onAuthStateChange((event,session) =>{

    callback(session?.user || null, event);
  }
 )
  return () => data.subscription.unsubscribe();
}

export const signOut = async () =>{
  await supabase.auth.signOut();
  
}