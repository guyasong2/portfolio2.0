const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
    email: 'reconraven@admin.com',
    password: 'Panchakoboy11@',
  });

  if (authError) {
    console.error("Auth error:", authError.message);
    return;
  }

  console.log("Logged in user:", user.id);
  
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    console.error("Profile error:", profileError.message);
    return;
  }

  console.log("Profile:", profile);
}

main();
