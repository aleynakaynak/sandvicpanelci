'use client';

import React, { useState, FormEvent } from 'react';
import { trackQuoteRequest } from '@/lib/gtag';

const HeroQuoteForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        const data = {
            ad:      (form.elements.namedItem('ad') as HTMLInputElement)?.value,
            telefon: (form.elements.namedItem('telefon') as HTMLInputElement)?.value,
            metraj:  (form.elements.namedItem('metraj') as HTMLInputElement)?.value,
            urun:    (form.elements.namedItem('urun') as HTMLSelectElement)?.value,
        };

        // Google Ads conversion event
        trackQuoteRequest();

        // WhatsApp'a yönlendir (opsiyonel: backend entegrasyonu yapılabilir)
        const msg = `Yeni Metraj Teklif Talebi!%0AAd: ${data.ad}%0ATelefon: ${data.telefon}%0AÜrün: ${data.urun}%0AMetraj: ${data.metraj} m²`;
        window.open(`https://wa.me/905319308500?text=${msg}`, '_blank');

        setLoading(false);
        setSubmitted(true);
    };

    return (
        <>
            <style>{`
                .hqf-section {
                    background: linear-gradient(135deg, #1a2a3a 0%, #0d1b2a 100%);
                    padding: 0;
                    position: relative;
                    overflow: hidden;
                }
                .hqf-section::before {
                    content: '';
                    position: absolute;
                    top: -60px; left: -60px;
                    width: 300px; height: 300px;
                    background: rgba(253,216,53,0.07);
                    border-radius: 50%;
                    pointer-events: none;
                }
                .hqf-section::after {
                    content: '';
                    position: absolute;
                    bottom: -80px; right: -40px;
                    width: 360px; height: 360px;
                    background: rgba(253,216,53,0.05);
                    border-radius: 50%;
                    pointer-events: none;
                }
                .hqf-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 40px 20px 44px;
                    display: flex;
                    align-items: center;
                    gap: 40px;
                    position: relative;
                    z-index: 1;
                }
                .hqf-left {
                    flex: 0 0 auto;
                    max-width: 360px;
                }
                .hqf-badge {
                    display: inline-block;
                    background: #fdd835;
                    color: #000;
                    font-size: 11px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    padding: 4px 14px;
                    border-radius: 2px;
                    text-transform: uppercase;
                    margin-bottom: 14px;
                }
                .hqf-title {
                    font-size: clamp(20px, 2.5vw, 28px);
                    font-weight: 800;
                    color: #fff;
                    line-height: 1.25;
                    margin-bottom: 10px;
                }
                .hqf-title span { color: #fdd835; }
                .hqf-sub {
                    font-size: 13px;
                    color: rgba(255,255,255,0.65);
                    line-height: 1.6;
                }
                .hqf-divider {
                    width: 1px;
                    height: 120px;
                    background: rgba(255,255,255,0.12);
                    flex-shrink: 0;
                }
                .hqf-form {
                    flex: 1;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr 1fr auto;
                    gap: 10px;
                    align-items: end;
                }
                .hqf-field {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                .hqf-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: rgba(255,255,255,0.55);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .hqf-input, .hqf-select {
                    width: 100%;
                    padding: 12px 14px;
                    background: rgba(255,255,255,0.08);
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 6px;
                    color: #fff;
                    font-size: 14px;
                    font-family: inherit;
                    outline: none;
                    transition: border-color 0.2s, background 0.2s;
                }
                .hqf-input::placeholder { color: rgba(255,255,255,0.35); }
                .hqf-input:focus, .hqf-select:focus {
                    border-color: #fdd835;
                    background: rgba(255,255,255,0.12);
                }
                .hqf-select option { background: #1a2a3a; color: #fff; }
                .hqf-btn {
                    padding: 13px 24px;
                    background: #fdd835;
                    color: #111;
                    border: none;
                    border-radius: 6px;
                    font-weight: 800;
                    font-size: 13px;
                    font-family: inherit;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    cursor: pointer;
                    white-space: nowrap;
                    transition: background 0.2s, transform 0.15s;
                    display: flex;
                    align-items: center;
                    gap: 7px;
                }
                .hqf-btn:hover { background: #f9cc00; transform: translateY(-1px); }
                .hqf-btn:active { transform: translateY(0); }
                .hqf-btn svg { flex-shrink: 0; }
                .hqf-success {
                    flex: 1;
                    background: rgba(37,211,102,0.12);
                    border: 1px solid rgba(37,211,102,0.35);
                    border-radius: 8px;
                    padding: 22px 28px;
                    color: #4cdd8a;
                    font-size: 15px;
                    font-weight: 600;
                    text-align: center;
                }
                @media (max-width: 900px) {
                    .hqf-inner { flex-direction: column; align-items: stretch; gap: 24px; padding: 32px 16px; }
                    .hqf-divider { display: none; }
                    .hqf-left { max-width: 100%; }
                    .hqf-form { grid-template-columns: 1fr 1fr; }
                }
                @media (max-width: 540px) {
                    .hqf-form { grid-template-columns: 1fr; }
                }
            `}</style>

            <section className="hqf-section" id="teklif-al" aria-label="Sandviç Panel Fiyat Teklifi">
                <div className="hqf-inner">
                    {/* Sol: başlık */}
                    <div className="hqf-left">
                        <div className="hqf-badge">🎯 Ücretsiz Fiyat Teklifi</div>
                        <h2 className="hqf-title">
                            Hemen Metrajınızı Gönderin,<br />
                            <span>Fiyat Verelim!</span>
                        </h2>
                        <p className="hqf-sub">
                            Sandviç panel satışı ve montajı için<br />
                            hızlı fiyat teklifi alın. Uzman ekibimiz<br />
                            sizi arasın!
                        </p>
                    </div>

                    <div className="hqf-divider" />

                    {/* Sağ: form */}
                    {submitted ? (
                        <div className="hqf-success">
                            ✓ Talebiniz alındı! Uzmanlarımız en kısa sürede sizi arayacak.
                        </div>
                    ) : (
                        <form className="hqf-form" onSubmit={handleSubmit} noValidate>
                            <div className="hqf-field">
                                <label className="hqf-label" htmlFor="hqf-ad">Ad Soyad</label>
                                <input
                                    id="hqf-ad"
                                    name="ad"
                                    type="text"
                                    className="hqf-input"
                                    placeholder="Adınız..."
                                    required
                                />
                            </div>
                            <div className="hqf-field">
                                <label className="hqf-label" htmlFor="hqf-telefon">Telefon</label>
                                <input
                                    id="hqf-telefon"
                                    name="telefon"
                                    type="tel"
                                    className="hqf-input"
                                    placeholder="05XX XXX XX XX"
                                    required
                                />
                            </div>
                            <div className="hqf-field">
                                <label className="hqf-label" htmlFor="hqf-urun">Ürün</label>
                                <select id="hqf-urun" name="urun" className="hqf-select" required>
                                    <option value="">Seçiniz...</option>
                                    <option value="Sandviç Panel (Çatı)">Sandviç Panel – Çatı</option>
                                    <option value="Sandviç Panel (Cephe)">Sandviç Panel – Cephe</option>
                                    <option value="OSB Levha">OSB Levha</option>
                                    <option value="Betopan">Betopan</option>
                                    <option value="Membran">Membran</option>
                                    <option value="Diğer">Diğer</option>
                                </select>
                            </div>
                            <div className="hqf-field">
                                <label className="hqf-label" htmlFor="hqf-metraj">Metraj (m²)</label>
                                <input
                                    id="hqf-metraj"
                                    name="metraj"
                                    type="number"
                                    min="1"
                                    className="hqf-input"
                                    placeholder="Örn: 250"
                                    required
                                />
                            </div>
                            <div className="hqf-field">
                                <button
                                    id="hqf-submit-btn"
                                    type="submit"
                                    className="hqf-btn"
                                    disabled={loading}
                                    aria-label="Fiyat teklifi gönder"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="22" y1="2" x2="11" y2="13"/>
                                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                    </svg>
                                    {loading ? 'Gönderiliyor...' : 'Fiyat Al'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
};

export default HeroQuoteForm;
