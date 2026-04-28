const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function main() {
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: 'reconraven@admin.com',
    password: 'Panchakoboy11@',
  });
  if (loginError) {
    console.error("Login failed:", loginError.message);
    return;
  }
  const { data: profile, error: profileError } = await supabase.from('profiles').upsert({
    id: loginData.user.id,
    name: 'reconraven',
    role: 'admin'
  }).select();
  if (profileError) {
    console.error("Profile Error:", profileError.message);
  } else {
    console.log("Profile updated:", profile);
  }
}
main();
