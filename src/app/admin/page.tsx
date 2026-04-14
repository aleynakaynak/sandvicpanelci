import React from 'react';
import { Package, Users, DollarSign, Activity } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                {/* Stat Card 1 */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#e0f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00bcd4' }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#888' }}>Toplam Ürün</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>142</div>
                    </div>
                </div>

                {/* Stat Card 2 */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff9800' }}>
                        <Activity size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#888' }}>Site Ziyareti</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>12.4k</div>
                    </div>
                </div>

                {/* Stat Card 3 */}
                <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '10px', backgroundColor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4caf50' }}>
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', color: '#888' }}>Teklif İsteği</div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>38</div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>Son Eklenen Ürünler</h2>
                <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', color: '#888' }}>
                                <th style={{ padding: '15px' }}>Ürün Adı</th>
                                <th style={{ padding: '15px' }}>Kategori</th>
                                <th style={{ padding: '15px' }}>Fiyat</th>
                                <th style={{ padding: '15px' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Sandviç Panel 40mm', cat: 'Çatı Kaplama', price: '450 ₺', status: 'Aktif' },
                                { name: 'Osb Levha 11mm', cat: 'Ahşap Ürünler', price: '220 ₺', status: 'Aktif' },
                                { name: 'Shingle Kırmızı', cat: 'Çatı Kaplama', price: '180 ₺', status: 'Pasif' },
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: i === 2 ? 'none' : '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '15px', fontWeight: '500' }}>{row.name}</td>
                                    <td style={{ padding: '15px', color: '#666' }}>{row.cat}</td>
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{row.price}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            backgroundColor: row.status === 'Aktif' ? '#e8f5e9' : '#ffebee',
                                            color: row.status === 'Aktif' ? '#2e7d32' : '#c62828'
                                        }}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
