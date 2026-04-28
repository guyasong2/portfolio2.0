const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase URL or Key in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log("Attempting to log in as reconraven@admin.com...");
  let { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'reconraven@admin.com',
    password: 'Panchakoboy11@',
  });

  if (loginError) {
    if (loginError.message.includes('Email not confirmed')) {
      console.error("\n❌ ERROR: Email confirmation is required by your Supabase project.");
      console.log("Please go to your Supabase Dashboard -> Authentication -> Providers -> Email -> Turn OFF 'Confirm email', then delete the 'reconraven@admin.com' user and try running this script again.");
      return;
    } else if (loginError.message.includes('Invalid login credentials')) {
      console.log("User might not exist yet, attempting to sign up...");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: 'reconraven@admin.com',
        password: 'Panchakoboy11@',
      });
      if (signUpError) {
        console.error("Signup failed:", signUpError.message);
        return;
      }
      console.log("Signup successful!");
      if (signUpData.session) {
         loginData = signUpData;
      } else {
         console.error("\n❌ ERROR: Signup succeeded but no session was returned. This usually means 'Confirm email' is turned ON in your Supabase Dashboard.");
         console.log("Please turn it OFF in Authentication -> Providers -> Email, delete the user, and run this script again.");
         return;
      }
    } else {
      console.error("Login failed:", loginError.message);
      return;
    }
  }

  if (loginData?.user) {
    console.log("Successfully authenticated! User ID:", loginData.user.id);
    
    console.log("\nAttempting to set admin profile...");
    const { data: profile, error: profileError } = await supabase.from('profiles').upsert({
      id: loginData.user.id,
      name: 'reconraven',
      role: 'admin'
    }).select();

    if (profileError) {
      console.error("❌ Failed to set admin profile:", profileError.message);
      console.log("\nPlease go to your Supabase SQL Editor and run the following command:");
      console.log(`
        insert into public.profiles (id, name, role) 
        values ('${loginData.user.id}', 'reconraven', 'admin')
        on conflict (id) do update set role = 'admin';
      `);
    } else {
      console.log("✅ Admin profile successfully created/updated!");
      console.log("You can now log in at http://localhost:3000/login with:");
      console.log("Email: reconraven@admin.com");
      console.log("Password: Panchakoboy11@");
    }
  }
}

main();
