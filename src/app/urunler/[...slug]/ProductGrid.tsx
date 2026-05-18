import Link from 'next/link';
import { Package2, Tag, ChevronRight } from 'lucide-react';
import type { ProductCard, ActiveFilters } from '@/lib/types/product.types';

interface Props {
  products: ProductCard[];
  slugChain: string[];
  totalCount: number;
  activeFilters: ActiveFilters;
}

export default function ProductGrid({ products, slugChain, totalCount, activeFilters }: Props) {
  const hasFilters = Object.values(activeFilters).flat().length > 0;

  return (
    <div>
      {/* Sonuç başlığı */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <p style={{ fontSize: 13, color: '#666', fontWeight: 500, margin: 0 }}>
          {hasFilters
            ? <><strong style={{ color: '#111' }}>{totalCount}</strong> filtreli sonuç</>
            : <><strong style={{ color: '#111' }}>{totalCount}</strong> ürün listeleniyor</>}
        </p>
        <span style={{ fontSize: 12, color: '#aaa' }}>Sıralama: Önerilen</span>
      </div>

      {/* Boş durum */}
      {products.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '60px 20px',
          background: '#fff', borderRadius: 10, border: '1px solid #eee',
        }}>
          <Package2 size={40} color="#ccc" />
          <p style={{ marginTop: 16, fontSize: 15, color: '#888', fontWeight: 600 }}>
            Bu filtreyle eşleşen ürün bulunamadı.
          </p>
          <p style={{ fontSize: 13, color: '#bbb', marginTop: 8 }}>
            Filtreleri temizleyerek tüm ürünleri görüntüleyebilirsiniz.
          </p>
        </div>
      )}

      {/* Ürün kartları */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 18,
      }}
        className="prod-grid"
      >
        {products.map((product) => {
          const href = `/urunler/${slugChain.join('/')}/${product.slug}`;
          const attrPills = Object.entries(product.attributes).slice(0, 3);

          return (
            <Link
              key={product.id}
              href={href}
              style={{ textDecoration: 'none' }}
              className="prod-card"
            >
              <article style={{
                background: '#fff',
                border: '1px solid #eee',
                borderRadius: 10,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color 0.18s, box-shadow 0.18s, transform 0.18s',
              }}>
                {/* Görsel */}
                <div style={{
                  height: 180,
                  background: '#f5f5f5',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Package2 size={48} color="#ddd" />
                    </div>
                  )}
                </div>

                {/* İçerik */}
                <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <h3 style={{
                    margin: 0, fontSize: 14, fontWeight: 800,
                    color: '#111', lineHeight: 1.35,
                  }}>
                    {product.name}
                  </h3>

                  {product.short_desc && (
                    <p style={{
                      margin: 0, fontSize: 12, color: '#777',
                      lineHeight: 1.5, flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical' as const,
                      overflow: 'hidden',
                    }}>
                      {product.short_desc}
                    </p>
                  )}

                  {/* Attribute pill'leri */}
                  {attrPills.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {attrPills.map(([k, v]) => (
                        <span key={k} style={{
                          display: 'inline-flex', alignItems: 'center', gap: 3,
                          background: '#f5f5f5', border: '1px solid #eee',
                          borderRadius: 4, padding: '2px 8px',
                          fontSize: 10, fontWeight: 700, color: '#555',
                        }}>
                          {v}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Alt: Fiyat + CTA */}
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginTop: 'auto', paddingTop: 10,
                    borderTop: '1px solid #f5f5f5',
                  }}>
                    {product.base_price ? (
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                        <Tag size={11} color="#d32f2f" />
                        <span style={{ fontSize: 15, fontWeight: 900, color: '#d32f2f' }}>
                          {product.base_price.toLocaleString('tr-TR')} ₺
                        </span>
                        <span style={{ fontSize: 10, color: '#aaa' }}>/ {product.price_unit}</span>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: '#aaa', fontWeight: 600 }}>Fiyat için teklif alın</span>
                    )}

                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 3,
                      fontSize: 11, fontWeight: 800, color: '#d32f2f',
                    }}>
                      İncele <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <style>{`
        .prod-card article:hover {
          border-color: #d32f2f !important;
          box-shadow: 0 8px 28px rgba(211,47,47,0.12) !important;
          transform: translateY(-3px) !important;
        }
        @media (max-width: 900px) {
          .prod-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 500px) {
          .prod-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
