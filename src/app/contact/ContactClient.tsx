'use client';

import React, { FormEvent, useState } from 'react';
import { trackWhatsAppClick, trackPhoneClick, trackFormSubmit } from '@/lib/gtag';

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
        trackFormSubmit({ form_type: 'contact_page_form' });
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
                                    onClick={() => trackWhatsAppClick({ source: 'contact_page_info' })}
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

                    {/* Right: Direct Call & WhatsApp Buttons */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{
                            background: '#fafafa',
                            border: '1px solid #eee',
                            borderRadius: '12px',
                            padding: '30px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#111', margin: '0 0 8px' }}>
                                    Hızlı Teklif & İletişim Hattı
                                </h3>
                                <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: 1.5 }}>
                                    Fiyat teklifi almak, metraj bilgisi paylaşmak veya sipariş vermek için hemen bizimle iletişime geçin. Müşteri temsilcilerimiz en kısa sürede size yardımcı olacaktır.
                                </p>
                            </div>

                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: 0 }} />

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {/* WhatsApp Button */}
                                <a
                                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Merhaba, web sitenizden ulaşıyorum. Ürünler hakkında bilgi ve fiyat teklifi almak istiyorum.')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-action-btn whatsapp-action"
                                    onClick={() => trackWhatsAppClick({ source: 'contact_page_button' })}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '14px',
                                        background: '#25d366',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 12px rgba(37,211,102,0.15)',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.01-5.078-2.854-6.924C16.379 2.04 13.924 1.026 11.31 1.025 5.905 1.025 1.504 5.421 1.501 10.826c-.001 1.53.414 3.01 1.202 4.317l-.988 3.598 3.693-.968z" />
                                    </svg>
                                    WhatsApp ile Mesaj Gönder
                                </a>

                                {/* Phone Button */}
                                <a
                                    href={`tel:${phone1.replace(/\s/g, '')}`}
                                    className="contact-action-btn phone-action"
                                    onClick={() => trackPhoneClick({ source: 'contact_page_button' })}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px',
                                        padding: '14px',
                                        background: '#d32f2f',
                                        color: '#fff',
                                        borderRadius: '8px',
                                        fontSize: '16px',
                                        fontWeight: '800',
                                        textDecoration: 'none',
                                        boxShadow: '0 4px 12px rgba(211,47,47,0.15)',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                    </svg>
                                    Müşteri Temsilcisini Ara
                                </a>
                            </div>

                            <div style={{ textAlign: 'center', fontSize: '13px', color: '#555', fontWeight: '700' }}>
                                Arama ve WhatsApp Destek Hattı: {phone1}
                            </div>
                        </div>

                        <style>{`
                            .contact-action-btn {
                                transition: transform 0.2s, filter 0.2s;
                            }
                            .contact-action-btn:hover {
                                transform: translateY(-2px);
                                filter: brightness(1.05);
                            }
                            .contact-action-btn:active {
                                transform: translateY(0);
                            }
                        `}</style>
                    </div>

                </div>
            </div>
        </div>
    );
}
