interface PriceInput {
  slug: string;
  base_price?: number | null;
  price_unit?: string | null;
}

// DB'deki birim metnini standart gösterime çevirir (örn. "m2" -> "m²")
function normalizeUnit(unit: string): string {
  return unit.trim().replace(/\bm2\b/gi, 'm²');
}

export function formatProductPrice(product: PriceInput, overridePrice?: number | null) {
  const isEconomic = product.slug.includes('ekonomik');

  if (isEconomic) {
    return {
      priceText: '400 TL + KDV',
      unitText: '/ m²',
      hasPrice: true,
      fullFormatted: '400 TL + KDV / m²',
    };
  }

  const priceToFormat = overridePrice !== undefined && overridePrice !== null ? overridePrice : product.base_price;

  if (priceToFormat !== null && priceToFormat !== undefined) {
    const formattedPrice = priceToFormat.toLocaleString('tr-TR');
    const unit = normalizeUnit(product.price_unit || 'm²');
    return {
      priceText: `${formattedPrice} TL`,
      unitText: `/ ${unit}`,
      hasPrice: true,
      fullFormatted: `${formattedPrice} TL / ${unit}`,
    };
  }

  return {
    priceText: 'Fiyat için teklif alın',
    unitText: '',
    hasPrice: false,
    fullFormatted: 'Fiyat için teklif alın',
  };
}
