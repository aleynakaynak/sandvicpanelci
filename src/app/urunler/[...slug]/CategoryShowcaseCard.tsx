import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Props {
  name: string;
  description: string;
  image: string;
  href: string;
}

export default function CategoryShowcaseCard({ name, description, image, href }: Props) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
      className="cat-card-wrap"
    >
      <article style={{
        background: '#fff',
        borderRadius: 12,
        border: '1.5px solid #eee',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.22s ease',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      }}>
        {/* Görsel */}
        <div style={{ height: 190, overflow: 'hidden', background: '#f5f5f5', position: 'relative' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={name}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            className="cat-card-img"
          />
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)',
          }} />
        </div>

        {/* İçerik */}
        <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h3 style={{
            margin: 0, fontSize: 15, fontWeight: 900, color: '#111', lineHeight: 1.3,
          }}>
            {name}
          </h3>
          <p style={{
            margin: 0, fontSize: 12.5, color: '#777', lineHeight: 1.6, flex: 1,
          }}>
            {description}
          </p>

          {/* Buton */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            marginTop: 4, padding: '9px 0',
            fontSize: 12, fontWeight: 800, color: '#d32f2f',
            borderTop: '1px solid #f5f5f5',
          }}>
            Ürünü İncele <ArrowRight size={13} />
          </div>
        </div>
      </article>
    </Link>
  );
}
