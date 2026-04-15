'use client';

import React, { FormEvent, useState } from 'react';
import { trackWhatsAppClick, trackFormSubmit } from '@/lib/gtag';

interface ContactFormProps {
    phone1: string;
    whatsapp: string;
    email: string;
    address1: string;
    mapSrc: string;
}

export default function ContactClient({ phone1, whatsapp, email, address1, mapSrc }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        trackFormSubmit();
        // Form submission logic (e.g. email service) can be wired here
        setSubmitted(true);
    };

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '50px' }}>
            {/* Header Strip */}
            <div className="page_title_section" style={{
                backgroundColor: '#f9f9f9', padding: '30px 0', textAlign: 'center', borderBottom: '1px solid #eee'
            }}>
                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#333', margin: 0 }}>İletişim</h1>
            </div>

            <div className="container" style={{ marginTop: '50px' }}>

                {/* Map */}
                <div style={{ width: '100%', height: '400px', backgroundColor: '#eee', marginBottom: '50px', position: 'relative' }}>
                    <iframe
                        src={mapSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>

                <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>

                    {/* Left: Info */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginBottom: '30px', borderBottom: '2px solid #fdd835', display: 'inline-block', paddingBottom: '10px' }}>
                            Sandviç Panelci
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '14px', color: '#555' }}>
                            <div>
                                <strong>Adres:</strong><br />
                                {address1}
                            </div>
                            <div>
                                <strong style={{ color: '#3b9eff' }}>Telefon:</strong>{' '}
                                <a href={`tel:${phone1.replace(/\s/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone1}</a><br />
                                <strong style={{ color: '#3b9eff' }}>Whatsapp:</strong>{' '}
                                <a
                                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={trackWhatsAppClick}
                                >
                                    {whatsapp}
                                </a>
                            </div>
                            <div>
                                <strong style={{ color: '#3b9eff' }}>E-Mail:</strong>{' '}
                                <a href={`mailto:${email}`} style={{ textDecoration: 'none', color: 'inherit' }}>{email}</a>
                            </div>
                            <div>
                                <strong>Çalışma Saatleri:</strong><br />
                                Pzt - Cmt: 08:30 - 18:00
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        {submitted ? (
                            <div style={{
                                padding: '30px',
                                backgroundColor: '#f0fff4',
                                border: '1px solid #25d366',
                                borderRadius: '8px',
                                color: '#1a7a3c',
                                fontWeight: '600',
                                fontSize: '16px',
                                textAlign: 'center',
                            }}>
                                ✓ Mesajınız iletildi! En kısa sürede dönüş yapacağız.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <input type="text" placeholder="Adınız" required style={{ flex: 1, padding: '12px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', borderRadius: '4px' }} />
                                    <input type="email" placeholder="E-Posta" required style={{ flex: 1, padding: '12px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', borderRadius: '4px' }} />
                                </div>
                                <input type="text" placeholder="Konu" style={{ width: '100%', padding: '12px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', borderRadius: '4px' }} />
                                <textarea rows={5} placeholder="Mesajınız..." required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', backgroundColor: '#f9f9f9', borderRadius: '4px' }}></textarea>

                                <button type="submit" style={{
                                    backgroundColor: '#fdd835',
                                    color: '#333',
                                    border: 'none',
                                    padding: '12px 30px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    alignSelf: 'flex-start',
                                    textTransform: 'uppercase',
                                    borderRadius: '4px'
                                }}>
                                    GÖNDER
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
