'use client';

import { useState } from 'react';
import { Thermometer, Flame, ChevronDown } from 'lucide-react';
import type { ProductTechnicalSpec } from '@/lib/types/product.types';

interface Props {
  specs: ProductTechnicalSpec[];
  productName: string;
}

// Yangın sınıfı açıklama haritası
const FIRE_CLASS_INFO: Record<string, { label: string; color: string; desc: string }> = {
  'A1':          { label: 'A1 — Yanmaz', color: '#15803d', desc: 'Yangına hiç katkıda bulunmaz. En yüksek sınıf. (Taşyünü, Mineral Yün)' },
  'A2-s1,d0':    { label: 'A2-s1,d0 — Yanmaz', color: '#16a34a', desc: 'Yangına ihmal edilebilir katkı, duman üretimi çok az, damlama yok.' },
  'B-s1,d0':     { label: 'B-s1,d0 — Zor Yanar', color: '#d97706', desc: 'Çok sınırlı katkı, az duman üretimi. (PIR Köpük)' },
  'C-s2,d0':     { label: 'C-s2,d0 — Sınırlı Yanıcı', color: '#f59e0b', desc: 'Sınırlı katkı, orta duman. (EPS, PUR)' },
  'E':           { label: 'E — Normal Yanıcı', color: '#ef4444', desc: 'Ateşe kısa süre dayanır. (Standart EPS)' },
};

// U-değeri etiketleme
function uValueLabel(u: number): { text: string; color: string } {
  if (u <= 0.15) return { text: 'Çok İyi (Pasif)', color: '#15803d' };
  if (u <= 0.25) return { text: 'İyi', color: '#16a34a' };
  if (u <= 0.40) return { text: 'Orta', color: '#d97706' };
  return { text: 'Standart', color: '#f59e0b' };
}

// U-değeri renk çubuğu dolum oranı (0.8 W/m²K maksimum)
function uBarFill(u: number): number {
  return Math.max(0, Math.min(100, (1 - u / 0.8) * 100));
}

export default function UValueCalculator({ specs, productName }: Props) {
  // Boş, null, undefined veya 0 gelen kalınlık değerleri seçenek olarak gösterilmez
  const validSpecs = (specs ?? []).filter(s => !!s.thickness_mm);
  const [selected, setSelected] = useState<ProductTechnicalSpec | undefined>(validSpecs[0]);

  if (validSpecs.length === 0) return null;

  const current = selected && validSpecs.some(s => s.id === selected.id) ? selected : validSpecs[0];
  const uInfo = current.u_value ? uValueLabel(current.u_value) : null;
  const fireInfo = current.fire_class ? FIRE_CLASS_INFO[current.fire_class] : null;

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #eee',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Başlık */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '16px 24px', background: '#1c1c1c', color: '#fff',
      }}>
        <Thermometer size={16} color="#d32f2f" />
        <span style={{ fontWeight: 800, fontSize: 14 }}>Teknik Hesaplayıcı</span>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Kalınlık seçici */}
        <div>
          <label style={{
            display: 'block', fontSize: 11, fontWeight: 700,
            color: '#555', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8,
          }}>
            Panel Kalınlığı Seçin
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {validSpecs.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelected(spec)}
                style={{
                  padding: '7px 16px',
                  border: `2px solid ${current.id === spec.id ? '#d32f2f' : '#e0e0e0'}`,
                  borderRadius: 6,
                  background: current.id === spec.id ? '#fff3f3' : '#fff',
                  color: current.id === spec.id ? '#d32f2f' : '#444',
                  fontSize: 13, fontWeight: 800, cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {spec.thickness_mm} mm
              </button>
            ))}
          </div>
        </div>

        {/* U-Değeri */}
        {current.u_value && (
          <div style={{
            background: '#f9f9f9', borderRadius: 10,
            padding: '16px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Isı İletim Katsayısı (U-Değeri)
              </span>
              {uInfo && (
                <span style={{
                  fontSize: 11, fontWeight: 800,
                  color: uInfo.color, background: uInfo.color + '18',
                  padding: '2px 10px', borderRadius: 99,
                }}>
                  {uInfo.text}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 14 }}>
              <span style={{ fontSize: 36, fontWeight: 900, color: '#111', lineHeight: 1 }}>
                {current.u_value.toFixed(3)}
              </span>
              <span style={{ fontSize: 14, color: '#888', fontWeight: 600 }}>W/m²K</span>
            </div>

            {/* U-değeri çubuğu */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: '#aaa' }}>Daha iyi yalıtım →</span>
                <span style={{ fontSize: 10, color: '#aaa' }}>Daha zayıf →</span>
              </div>
              <div style={{
                height: 8, background: '#e5e7eb', borderRadius: 99, overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 99,
                  width: `${uBarFill(current.u_value)}%`,
                  background: `linear-gradient(to right, #15803d, #d97706)`,
                  transition: 'width 0.4s ease',
                }} />
              </div>
            </div>

            {/* Lambda */}
            {current.lambda_value && (
              <p style={{ fontSize: 12, color: '#888', margin: '10px 0 0', fontWeight: 500 }}>
                λ (Lambda) = <strong style={{ color: '#444' }}>{current.lambda_value} W/(m·K)</strong>
                &nbsp;·&nbsp; Kalınlık = <strong style={{ color: '#444' }}>{current.thickness_mm} mm</strong>
              </p>
            )}
          </div>
        )}

        {/* Yangın Sınıfı */}
        {current.fire_class && (
          <div style={{
            border: `2px solid ${fireInfo?.color ?? '#e0e0e0'}`,
            borderRadius: 10, padding: '14px 18px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Flame size={16} color={fireInfo?.color ?? '#888'} />
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, color: '#444' }}>
                Yangın Dayanımı Sınıfı
              </span>
            </div>
            <p style={{
              margin: 0, fontSize: 18, fontWeight: 900,
              color: fireInfo?.color ?? '#333',
            }}>
              {fireInfo?.label ?? current.fire_class}
            </p>
            {fireInfo?.desc && (
              <p style={{ margin: '8px 0 0', fontSize: 12, color: '#777', lineHeight: 1.5 }}>
                {fireInfo.desc}
              </p>
            )}
          </div>
        )}

        {/* Ek teknik bilgiler */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {current.density_kg_m3 && (
            <SpecCard label="Yoğunluk" value={`${current.density_kg_m3} kg/m³`} />
          )}
          {current.compressive_kpa && (
            <SpecCard label="Basma Mukavemeti" value={`${current.compressive_kpa} kPa`} />
          )}
          {current.sound_reduction_db && (
            <SpecCard label="Ses Azaltma (Rw)" value={`${current.sound_reduction_db} dB`} />
          )}
        </div>

        <p style={{ fontSize: 11, color: '#bbb', margin: 0, lineHeight: 1.5 }}>
          * Değerler teorik hesaplama ve imalatçı beyanlarına dayanmaktadır. 
          Proje hesapları için yetkili bir inşaat mühendisine danışınız.
        </p>
      </div>
    </div>
  );
}

function SpecCard({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: '#f9f9f9', border: '1px solid #f0f0f0',
      borderRadius: 8, padding: '10px 14px',
    }}>
      <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </p>
      <p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 900, color: '#222' }}>
        {value}
      </p>
    </div>
  );
}
