'use server';

import { supabase } from '@/lib/supabase';
import type { QuoteFormState } from '@/lib/types/product.types';

export async function submitQuoteRequest(
  prevState: QuoteFormState,
  formData: FormData
): Promise<QuoteFormState> {
  try {
    // 1. Form verilerini al
    const product_id = formData.get('product_id');
    const product_name = formData.get('product_name') as string;
    const variant_label = formData.get('variant_label') as string;
    const quantity_m2 = formData.get('quantity_m2');
    const thickness_mm = formData.get('thickness_mm');
    const ral_color = formData.get('ral_color') as string;
    const length_m = formData.get('length_m');
    
    const customer_name = formData.get('customer_name') as string;
    const customer_phone = formData.get('customer_phone') as string;
    const customer_email = formData.get('customer_email') as string;
    const city = formData.get('city') as string;
    const company_name = formData.get('company_name') as string;
    const notes = formData.get('notes') as string;

    // 2. Basit validasyon
    if (!customer_name || !customer_phone) {
      return { 
        status: 'error', 
        message: 'Lütfen zorunlu alanları (Ad Soyad, Telefon) eksiksiz doldurun.' 
      };
    }

    // 3. Supabase'e ekle
    const { error } = await supabase.from('quote_requests').insert({
      product_id: product_id ? Number(product_id) : null,
      product_name,
      variant_label,
      quantity_m2: quantity_m2 ? Number(quantity_m2) : null,
      thickness_mm: thickness_mm ? Number(thickness_mm) : null,
      ral_color,
      length_m: length_m ? Number(length_m) : null,
      width_m: 1, // Standart varsayım
      customer_name,
      customer_phone,
      customer_email,
      city,
      company_name,
      notes,
      status: 'new'
    });

    if (error) {
      console.error('Quote Request Error:', error);
      return { 
        status: 'error', 
        message: 'Talebiniz alınırken sistemsel bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.' 
      };
    }

    // 4. Başarılı dönüş
    return { 
      status: 'success', 
      message: 'Metraj ve teklif talebiniz başarıyla alındı! Satış ekibimiz sizinle en kısa sürede iletişime geçecektir.' 
    };

  } catch (err) {
    console.error('Action Exception:', err);
    return { 
      status: 'error', 
      message: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.' 
    };
  }
}
