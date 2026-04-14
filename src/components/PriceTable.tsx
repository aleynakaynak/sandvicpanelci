'use client';
import React from 'react';

const PriceTable = () => {
    return (
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '15px' }}>Stoktaki Ürünler</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#fdd835', color: '#333' }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #eee' }}>ÜRÜN</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: '1px solid #eee' }}>MARKA</th>
                        <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #eee' }}>İÇERİK</th>
                        <th style={{ padding: '10px', textAlign: 'center', border: '1px solid #eee' }}>TİP</th>
                        <th style={{ padding: '10px', textAlign: 'right', border: '1px solid #eee' }}>FİYAT</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { name: 'Membran', mark: 'ONDULINE PP40 M', content: 'KUMLU', type: 'KIRMIZI', price: '900 TL' },
                        { name: '', mark: 'ONDULINE PP40 M', content: 'KUMLU', type: 'YEŞİL', price: '900 TL' },
                        { name: '', mark: 'ONDULINE PP300', content: 'DÜZ', type: 'SİYAH', price: '685 TL' },
                        { name: '', mark: 'İZOPAK PAR', content: 'KUMLU', type: 'KIRMIZI', price: '450 TL' },
                        { name: '', mark: 'İZOPAK PAR', content: 'KUMLU', type: 'YEŞİL', price: '450 TL' },
                    ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #eee', backgroundColor: i % 2 === 0 ? '#fff' : '#fcfcfc' }}>
                            <td style={{ padding: '10px', border: '1px solid #eee', color: '#999' }}>{row.name}</td>
                            <td style={{ padding: '10px', border: '1px solid #eee' }}>{row.mark}</td>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #eee', color: '#666' }}>{row.content}</td>
                            <td style={{ padding: '10px', textAlign: 'center', border: '1px solid #eee', color: '#666' }}>{row.type}</td>
                            <td style={{ padding: '10px', textAlign: 'right', border: '1px solid #eee', fontWeight: '700' }}>{row.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
