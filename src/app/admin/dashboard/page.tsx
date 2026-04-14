import React from 'react';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
    return (
        <div>
            <div className={styles.card_grid}>
                <div className={styles.stat_card}>
                    <span className={styles.stat_label}>Toplam Ürün</span>
                    <span className={styles.stat_value}>124</span>
                </div>
                <div className={styles.stat_card}>
                    <span className={styles.stat_label}>Kategoriler</span>
                    <span className={styles.stat_value}>12</span>
                </div>
                <div className={styles.stat_card}>
                    <span className={styles.stat_label}>Okunmamış Mesajlar</span>
                    <span className={styles.stat_value} style={{ color: '#d32f2f' }}>5</span>
                </div>
                <div className={styles.stat_card}>
                    <span className={styles.stat_label}>Blog Yazıları</span>
                    <span className={styles.stat_value}>8</span>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className={styles.stat_card}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Son Eklenen Ürünler</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '0.5rem' }}>Ürün Adı</th>
                                <th style={{ padding: '0.5rem' }}>Kategori</th>
                                <th style={{ padding: '0.5rem' }}>Fiyat</th>
                                <th style={{ padding: '0.5rem' }}>Durum</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ padding: '0.75rem 0.5rem' }}>Sandviç Panel 40mm</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>Çatı Kaplama</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>450 ₺</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ color: 'green', fontSize: '0.8rem', fontWeight: 'bold' }}>Aktif</span></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #f9f9f9' }}>
                                <td style={{ padding: '0.75rem 0.5rem' }}>Osb Levha 11mm</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>Ahşap</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>-</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ color: 'green', fontSize: '0.8rem', fontWeight: 'bold' }}>Aktif</span></td>
                            </tr>
                            <tr>
                                <td style={{ padding: '0.75rem 0.5rem' }}>Taşyünü 5cm</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>Yalıtım</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}>120 ₺</td>
                                <td style={{ padding: '0.75rem 0.5rem' }}><span style={{ color: 'orange', fontSize: '0.8rem', fontWeight: 'bold' }}>Pasif</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={styles.stat_card}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>Hızlı İşlemler</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <button className="btn btn-primary" style={{ width: '100%' }}>+ Yeni Ürün Ekle</button>
                        <button className="btn" style={{ width: '100%', border: '1px solid #ddd' }}>+ Kategori Ekle</button>
                        <button className="btn" style={{ width: '100%', border: '1px solid #ddd' }}>Blog Yazısı Ekle</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
