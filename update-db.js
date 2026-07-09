require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function main() {
  console.log('Fetching products to update...');
  
  // 1. PUR/PIR Yalıtımlı Çatı Paneli
  const { data: purpir, error: err1 } = await supabase
    .from('products')
    .update({ 
      name: 'PUR/PIR Yalıtımlı 3 Hadveli Çatı Paneli',
      short_desc: 'Maksimum ısı yalıtımı sağlayan poliüretan / PIR dolgulu 3 hadveli çatı paneli.'
    })
    .eq('slug', 'pur-pir-yalitimli-cati-panelleri')
    .select();
    
  if (err1) {
    console.error('Error updating pur/pir:', err1);
  } else {
    console.log('Updated pur/pir:', purpir?.[0]?.name);
  }

  // 2. Ekonomik Çatı Paneli
  const { data: eko, error: err2 } = await supabase
    .from('products')
    .update({ 
      name: 'Ekonomik Çatı Paneli',
      short_desc: 'Bütçe dostu, standart izolasyonlu hafif çatı kaplama çözümü.'
    })
    .eq('slug', 'ekonomik-cati-panel')
    .select();
    
  if (err2) {
    console.error('Error updating ekonomik:', err2);
  } else {
    console.log('Updated ekonomik:', eko?.[0]?.name);
  }

  // 3. Trapez Sac "0 mm" hatasını düzelt
  const { data: variants, error: err3 } = await supabase
    .from('product_variants')
    .select('*')
    .eq('thickness_mm', 0);
    
  if (err3) {
    console.error('Error fetching variants:', err3);
  } else if (variants && variants.length > 0) {
    console.log('Found 0 mm variants:', variants.map(v => v.variant_label));
    for (const v of variants) {
      let newThick = 0.5;
      const match = v.variant_label?.match(/([0-9.]+)\s*mm/);
      if (match) {
        newThick = parseFloat(match[1]);
      }
      const { error: upErr } = await supabase
        .from('product_variants')
        .update({ thickness_mm: newThick })
        .eq('id', v.id);
      if (upErr) console.error('Failed to update variant', v.id, upErr);
      else console.log(`Updated variant ${v.id} thickness to ${newThick}`);
    }
  } else {
    console.log('No 0 mm variants found.');
  }

  // Also clean out dummy long_desc content
  const { data: allProds, error: err4 } = await supabase
    .from('products')
    .select('id, slug, long_desc');
    
  if (!err4 && allProds) {
    for (const p of allProds) {
      if (p.long_desc) {
        let updated = false;
        let newDesc = p.long_desc;
        if (p.slug === 'ekonomik-cephe-panel') {
          newDesc = newDesc.replace(/Mahyalar ve Biten Elemanları/gi, 'Ekonomik Cephe Paneli Özellikleri');
          updated = true;
        } else if (p.slug === 'plywood') {
          newDesc = newDesc.replace(/Trapez Sac Yüzey ve Renk Seçenekleri/gi, 'Film Kaplı Plywood Özellikleri');
          updated = true;
        } else if (p.slug === 'osb') {
          newDesc = newDesc.replace(/Döşeme ve Taşıyıcı Trapez Saclar/gi, 'OSB Teknik Özellikleri');
          updated = true;
        } else if (p.slug === 'rulo-bobin-sac') {
          newDesc = newDesc.replace(/Soğuk Oda ve Dondurucu Panelleri/gi, 'Rulo Bobin Sac Özellikleri');
          updated = true;
        } else if (p.slug === 'kenet-levhalar') {
          newDesc = newDesc.replace(/Akustik Paneller/gi, 'Kenet Sistem Detayları');
          updated = true;
        }
        
        if (updated) {
          await supabase.from('products').update({ long_desc: newDesc }).eq('id', p.id);
          console.log(`Updated long_desc for ${p.slug}`);
        }
      }
    }
  }

  console.log('Done.');
}

main().catch(console.error);
