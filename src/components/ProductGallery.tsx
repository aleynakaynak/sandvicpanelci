'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Package2, ZoomIn } from 'lucide-react';

export default function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const all = images.length > 0 ? images : [];
  const current = all[activeIdx];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      {/* Ana görsel */}
      <div className="gallery-main-img" style={{
        position: 'relative', width: '100%', flex: 1,
        background: '#f5f5f5', borderRadius: 12,
        border: '1px solid #eee', overflow: 'hidden',
      }}>
        {current ? (
          <Image src={current} alt={alt} fill style={{ objectFit: 'contain' }} sizes="(max-width:768px)100vw,50vw" />
        ) : (
          <div style={{ width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center' }}>
            <Package2 size={64} color="#ddd" />
          </div>
        )}

        {/* Galeri okları */}
        {all.length > 1 && (
          <>
            <button
              onClick={() => setActiveIdx(i => (i - 1 + all.length) % all.length)}
              style={{
                position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              aria-label="Önceki görsel"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setActiveIdx(i => (i + 1) % all.length)}
              style={{
                position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)',
                background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff',
                width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              aria-label="Sonraki görsel"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Zoom icon */}
        <div style={{
          position:'absolute',top:10,right:10,
          background:'rgba(0,0,0,0.4)',borderRadius:6,
          padding:'4px 6px',display:'flex',
        }}>
          <ZoomIn size={14} color="#fff" />
        </div>

        {/* Sayaç */}
        {all.length > 1 && (
          <div style={{
            position:'absolute',bottom:10,right:10,
            background:'rgba(0,0,0,0.5)',color:'#fff',
            fontSize:11,fontWeight:700,borderRadius:99,
            padding:'2px 10px',
          }}>
            {activeIdx+1} / {all.length}
          </div>
        )}
      </div>

      {/* Küçük resimler */}
      {all.length > 1 && (
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {all.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                width:64, height:64, borderRadius:8, overflow:'hidden',
                border: `2px solid ${i===activeIdx?'#d32f2f':'#eee'}`,
                background:'#f5f5f5', padding:0, cursor:'pointer',
                flexShrink:0, transition:'border-color 0.15s',
                position: 'relative'
              }}
            >
              <Image src={img} alt={`${alt} ${i+1}`} fill style={{ objectFit:'cover', display:'block' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
