'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
    {
        tag: 'ÇATI KAPLAMA',
        title: 'Sandviç Panel Çözümleri',
        desc: "Isı ve su yalıtımında üstün performans. Sandviç Paneller hızlı sevkiyat seçenekleri ile!",
        img: '/images/sandvic-panel-hero.png',
        link: '/sandvic-panel'
    },
    {
        tag: 'YAPI MARKET',
        title: 'Kaliteli İnşaat Malzemeleri',
        desc: 'OSB, Plywood, Betopan ve daha fazlası. Projeleriniz için en sağlam temel ve kaplama çözümleri burada.',
        img: '/images/hero-2.png',
        link: '/cati-kaplama'
    },
    {
        tag: 'İZOLASYON',
        title: 'Su ve Isı Yalıtım Sistemleri',
        desc: 'Membran, Taşyünü ve Camyünü ürünlerimizde kalite ve uygun fiyat avantajlarını kaçırmayın.',
        img: '/images/hero-3.png',
        link: '/isi-yalitim'
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <>
            <style>{`
                .hero-slider { position: relative; width: 100%; height: 500px; background-color: #1a2a3a; overflow: hidden; }
                @media (max-width: 768px) { .hero-slider { height: 320px; } }
                @media (max-width: 480px) { .hero-slider { height: 260px; } }
                .hero-slide { position: absolute; top: 0; left: 0; width: 100%; height: 100%; transition: opacity 0.8s ease-in-out; display: flex; align-items: center; justify-content: center; }
                .hero-nav-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.45); color: white; border: none; padding: 12px; cursor: pointer; z-index: 20; border-radius: 4px; transition: background 0.3s; }
                .hero-nav-arrow:hover { background: rgba(0,0,0,0.75); }
                .hero-left { left: 20px; }
                .hero-right { right: 20px; }
                @media (max-width: 768px) { .hero-nav-arrow { display: none; } }
                @keyframes heroFadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .hero-text-active { animation: heroFadeInUp 0.8s ease-out; }
                .hero-dots { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; z-index: 20; }
                .hero-dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.4); border: none; cursor: pointer; transition: background 0.3s; padding: 0; }
                .hero-dot-active { background: #fdd835; }
            `}</style>

            <section className="hero-slider">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="hero-slide"
                        style={{
                            opacity: index === current ? 1 : 0,
                            zIndex: index === current ? 1 : 0,
                            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.10) 100%), url(${slide.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center' }}>
                            <div style={{ maxWidth: '560px' }} className={index === current ? 'hero-text-active' : ''}>
                                <span style={{
                                    display: 'inline-block',
                                    backgroundColor: '#fdd835',
                                    color: '#000',
                                    padding: '4px 12px',
                                    fontWeight: '700',
                                    fontSize: '11px',
                                    marginBottom: '16px',
                                    letterSpacing: '1px',
                                    borderRadius: '2px',
                                }}>
                                    {slide.tag}
                                </span>

                                <h2 style={{
                                    fontSize: 'clamp(24px, 4vw, 48px)',
                                    fontWeight: '800',
                                    color: '#fff',
                                    marginBottom: '16px',
                                    lineHeight: '1.15',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.4)',
                                }}>
                                    {slide.title}
                                </h2>

                                <p style={{
                                    color: '#eee',
                                    fontSize: 'clamp(13px, 1.5vw, 16px)',
                                    maxWidth: '420px',
                                    marginBottom: '28px',
                                    lineHeight: '1.6',
                                }}>
                                    {slide.desc}
                                </p>

                                <Link href={slide.link} style={{
                                    display: 'inline-block',
                                    backgroundColor: '#fdd835',
                                    color: '#000',
                                    padding: '13px 32px',
                                    fontWeight: '700',
                                    fontSize: '13px',
                                    textDecoration: 'none',
                                    textTransform: 'uppercase',
                                    borderRadius: '4px',
                                    letterSpacing: '0.5px',
                                }}>
                                    ÜRÜNLERİ İNCELE
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}

                <button onClick={prevSlide} className="hero-nav-arrow hero-left">
                    <ArrowLeft size={18} />
                </button>
                <button onClick={nextSlide} className="hero-nav-arrow hero-right">
                    <ArrowRight size={18} />
                </button>

                <div className="hero-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`hero-dot${i === current ? ' hero-dot-active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Slayt ${i + 1}`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default HeroSlider;
