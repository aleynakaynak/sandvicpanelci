'use client';

import { useRouter } from 'next/navigation';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { useState } from 'react';
import type { FilterGroup, ActiveFilters } from '@/lib/types/product.types';

interface Props {
  filterGroups: FilterGroup[];
  activeFilters: ActiveFilters;
  slugChain: string[];
}

export default function ProductFilterSidebar({ filterGroups, activeFilters, slugChain }: Props) {
  const router = useRouter();
  const basePath = `/urunler/${slugChain.join('/')}`;

  // Kaç filtre seçili
  const totalActive = Object.values(activeFilters).flat().length;

  // Grup açma/kapama
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  function toggleFilter(key: string, value: string) {
    const current = activeFilters[key] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const params = new URLSearchParams();
    // Mevcut filtreleri kopyala
    for (const [k, vals] of Object.entries(activeFilters)) {
      if (k === key) continue;
      for (const v of vals) params.append(`f_${k}`, v);
    }
    // Yeni değerleri ekle
    for (const v of next) params.append(`f_${key}`, v);

    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  }

  function clearAll() {
    router.push(basePath);
  }

  if (filterGroups.length === 0) return null;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 10,
      border: '1px solid #eee',
      overflow: 'hidden',
      position: 'sticky',
      top: 80,
    }}>
      {/* Başlık */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 18px',
        borderBottom: '1px solid #f0f0f0',
        background: '#fafafa',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Filter size={15} color="#d32f2f" />
          <span style={{ fontWeight: 800, fontSize: 13, color: '#111' }}>Filtrele</span>
          {totalActive > 0 && (
            <span style={{
              background: '#d32f2f', color: '#fff',
              fontSize: 10, fontWeight: 800,
              borderRadius: 99, padding: '1px 7px',
            }}>
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            onClick={clearAll}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 11, color: '#d32f2f', fontWeight: 700,
            }}
          >
            <X size={12} /> Temizle
          </button>
        )}
      </div>

      {/* Filtre Grupları */}
      {filterGroups.map((group) => {
        const isCollapsed = collapsed[group.key] ?? false;
        const activeVals = activeFilters[group.key] ?? [];

        return (
          <div key={group.key} style={{ borderBottom: '1px solid #f0f0f0' }}>
            {/* Grup başlığı */}
            <button
              onClick={() => setCollapsed((c) => ({ ...c, [group.key]: !isCollapsed }))}
              style={{
                width: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 18px', background: 'none', border: 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 12, color: '#222', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {group.label}
                {group.unit && <span style={{ fontWeight: 400, color: '#999', marginLeft: 4 }}>({group.unit})</span>}
                {activeVals.length > 0 && (
                  <span style={{ color: '#d32f2f', marginLeft: 6 }}>· {activeVals.length}</span>
                )}
              </span>
              {isCollapsed ? <ChevronDown size={14} color="#999" /> : <ChevronUp size={14} color="#999" />}
            </button>

            {/* Seçenekler */}
            {!isCollapsed && (
              <div style={{ padding: '2px 18px 14px' }}>
                {group.options.map((opt) => {
                  const checked = activeVals.includes(opt.value);
                  return (
                    <label
                      key={opt.value}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 9,
                        padding: '5px 0', cursor: 'pointer',
                        fontSize: 13, color: checked ? '#d32f2f' : '#444',
                        fontWeight: checked ? 700 : 500,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleFilter(group.key, opt.value)}
                        style={{ accentColor: '#d32f2f', width: 14, height: 14, cursor: 'pointer' }}
                      />
                      <span style={{ flex: 1 }}>{opt.label}</span>
                      {opt.count !== undefined && (
                        <span style={{ fontSize: 11, color: '#aaa', fontWeight: 500 }}>({opt.count})</span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
