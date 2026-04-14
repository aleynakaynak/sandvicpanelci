import React from 'react';
import * as store from '@/lib/store';
import { updateSettingsAction } from '@/app/actions';

export default async function SettingsPage() {
    const settings = await store.getSettings();

    return (
        <div style={{ maxWidth: '800px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                Site Genel Ayarları
            </h1>

            <form action={updateSettingsAction} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                {/* Contact Section */}
                <div style={{ gridColumn: 'span 2' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>İletişim Bilgileri</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>Telefon Numarası</label>
                            <input name="contactPhone1" defaultValue={settings.contactPhone1} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>Alternatif Telefon</label>
                            <input name="contactPhone2" defaultValue={settings.contactPhone2} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>WhatsApp 1</label>
                            <input name="whatsapp1" defaultValue={settings.whatsapp1} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>WhatsApp 2</label>
                            <input name="whatsapp2" defaultValue={settings.whatsapp2} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>Email</label>
                            <input name="contactEmail" defaultValue={settings.contactEmail} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                    </div>
                </div>

                {/* Addresses */}
                <div style={{ gridColumn: 'span 2' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>Adresler</h2>
                    <div style={{ display: 'grid', gap: '15px' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>Adres 1 (Merkez)</label>
                            <input name="address1" defaultValue={settings.address1} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>Adres 2 (Depo/Şube)</label>
                            <input name="address2" defaultValue={settings.address2} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div style={{ gridColumn: 'span 2' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#1f2937' }}>Harita & Embed</h2>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '500', marginBottom: '6px', color: '#6b7280' }}>Google Maps Embed URL</label>
                        <textarea name="mapEmbedUrl" defaultValue={settings.mapEmbedUrl} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', fontFamily: 'monospace', fontSize: '12px' }} />
                        <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>"src" özniteliği içindeki URL'i yapıştırın.</p>
                    </div>
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                    <button type="submit" style={{ backgroundColor: '#10b981', color: '#fff', padding: '15px 30px', borderRadius: '6px', border: 'none', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        AYARLARI KAYDET
                    </button>
                </div>

            </form>
        </div>
    );
}
