'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
    {
        tag: 'ÇATI KAPLAMA',
        title: 'Sandviç Panel Çözümleri',
        desc: "Isı ve su yalıtımında üstün performans. Sandviç Paneller 40mm'den başlayan fiyatlar ve hızlı sevkiyat seçenekleri ile!",
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
        <section style={{ position: 'relative', width: '100%', height: '500px', backgroundColor: '#333', overflow: 'hidden' }}>
            
            {slides.map((slide, index) => (
                <div 
                    key={index} 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        opacity: index === current ? 1 : 0,
                        transition: 'opacity 0.8s ease-in-out',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: index === current ? 1 : 0
                    }}
                >
                    {/* Content Container */}
                    <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center' }}>

                        {/* Text Box */}
                        <div style={{ maxWidth: '600px', animation: index === current ? 'fadeInUp 0.8s ease-out' : 'none' }}>
                            <span style={{
                                display: 'inline-block',
                                backgroundColor: '#fdd835',
                                color: '#000',
                                padding: '5px 10px',
                                fontWeight: '700',
                                fontSize: '12px',
                                marginBottom: '20px'
                            }}>
                                {slide.tag}
                            </span>

                            <h2 style={{
                                fontSize: '48px',
                                fontWeight: '800',
                                color: '#fff',
                                marginBottom: '20px',
                                lineHeight: '1.1'
                            }}>
                                {slide.title}
                            </h2>

                            <p style={{ color: '#fff', fontSize: '16px', maxWidth: '400px', marginBottom: '30px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                {slide.desc}
                            </p>

                            <Link href={slide.link} style={{
                                display: 'inline-block',
                                backgroundColor: '#fdd835',
                                color: '#000',
                                padding: '15px 35px',
                                fontWeight: '700',
                                fontSize: '14px',
                                textDecoration: 'none',
                                textTransform: 'uppercase',
                                borderRadius: '4px'
                            }}>
                                ÜRÜNLERİ İNCELE
                            </Link>
                        </div>

                        {/* Image */}
                        <div style={{ flex: 1, padding: '40px', position: 'relative', display: 'flex', justifyContent: 'center', animation: index === current ? 'fadeInRight 0.8s ease-out' : 'none' }}>
                             <img src={slide.img} style={{ width: '100%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', border: '4px solid #fff' }} />
                        </div>
                    </div>
                </div>
            ))}

            {/* Nav Arrows */}
            <button 
                onClick={prevSlide}
                className="nav-arrow left-arrow"
            >
                <ArrowLeft size={18} />
            </button>
            <button 
                onClick={nextSlide}
                className="nav-arrow right-arrow"
            >
                <ArrowRight size={18} />
            </button>

            <style jsx>{`
                .nav-arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background: rgba(0,0,0,0.5);
                    color: white;
                    border: none;
                    padding: 12px;
                    cursor: pointer;
                    z-index: 20;
                    border-radius: 4px;
                    transition: background 0.3s;
                }
                .nav-arrow:hover {
                    background: rgba(0,0,0,0.8);
                }
                .left-arrow { left: 20px; }
                .right-arrow { right: 20px; }

                @media (max-width: 768px) {
                    .nav-arrow {
                        display: none; /* Hide prominent side arrows on mobile entirely to avoid text overlap */
                    }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes fadeInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </section>
    );
};

export default HeroSlider;
