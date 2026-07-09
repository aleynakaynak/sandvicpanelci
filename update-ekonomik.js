const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function main() {
  const { data, error } = await supabase.from('products').update({ name: 'Ekonomik Çatý Paneli (3 Hadveli)', image_url: '/images/products/3hadve.png' }).eq('slug', 'ekonomik-cati-panel').select();
  console.log(error || data);
}
main();
