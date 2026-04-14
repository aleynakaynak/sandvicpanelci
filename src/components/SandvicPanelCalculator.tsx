'use client';

import React, { useState } from 'react';

export default function SandvicPanelCalculator() {
    // Sandviç Panel State
    const [panelArea, setPanelArea] = useState<string>('');
    const [panelScrews, setPanelScrews] = useState<string>('0');
    const [panelWeight, setPanelWeight] = useState<string>('0');

    // Onduline State
    const [onduArea, setOnduArea] = useState<string>('');
    const [onduPlates, setOnduPlates] = useState<string>('0');
    const [onduScrews, setOnduScrews] = useState<string>('0');

    // Logic for Sandviç Panel
    const handlePanelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setPanelArea(val);
        const area = parseFloat(val);
        if (!isNaN(area) && area > 0) {
            // Approx rules: 3 screws per m2. Weight: ~10 kg/m2 minimum depending on thickness.
            setPanelScrews(Math.ceil(area * 3).toString());
            setPanelWeight((area * 10).toFixed(0));
        } else {
            setPanelScrews('0');
            setPanelWeight('0');
        }
    };

    // Logic for Onduline
    const handleOnduChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setOnduArea(val);
        const area = parseFloat(val);
        if (!isNaN(area) && area > 0) {
            // Typical onduline plate is ~1.55m2 effective coverage.
            const plates = Math.ceil(area / 1.55);
            setOnduPlates(plates.toString());
            // About 20 nails per plate
            setOnduScrews((plates * 20).toString());
        } else {
            setOnduPlates('0');
            setOnduScrews('0');
        }
    };

    return (
        <div style={{ width: '100%', fontFamily: 'inherit', color: '#333' }}>
            
            {/* Sandviç Panel Section */}
            <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#333' }}>
                    Sandviç Panel Maliyet Hesaplama Tablosu
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                            Toplam Alan m2 :
                        </label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={panelArea}
                            onChange={handlePanelChange}
                            placeholder="0"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                            Gerekli Vida ve Semer
                        </label>
                        <input 
                            type="text" 
                            value={panelScrews + ' adet'}
                            readOnly
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#777', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#555', textTransform: 'uppercase' }}>
                            Toplam Ağırlık :
                        </label>
                        <input 
                            type="text" 
                            value={panelWeight + ' kg'}
                            readOnly
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#777', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Onduline Section */}
            <div style={{ marginBottom: '50px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#333' }}>
                    Onduline Levha Maliyet Hesaplama Tablosu
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '500px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                            Toplam Alan m2 :
                        </label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={onduArea}
                            onChange={handleOnduChange}
                            placeholder="0"
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                            Gereken Onduline Levha
                        </label>
                        <input 
                            type="text" 
                            value={onduPlates + ' adet'}
                            readOnly
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#777', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px', fontSize: '14px', color: '#555' }}>
                            Gereken Vida
                        </label>
                        <input 
                            type="text" 
                            value={onduScrews + ' adet'}
                            readOnly
                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f9f9f9', color: '#777', outline: 'none', fontSize: '16px' }}
                        />
                    </div>
                </div>
            </div>
            
            {/* Products Preview matching screenshot layout */}
            <div>
                <h2 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '20px', color: '#333' }}>
                    Sandviç Panel Ürünleri
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {/* Simulated Products for screenshot matching */}
                    <div style={{ flex: '1', minWidth: '200px', border: '1px solid #eee', padding: '10px' }}>
                        <div style={{ width: '100%', height: '150px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Görsel</div>
                        <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}>Çatı Paneli</h3>
                    </div>
                    <div style={{ flex: '1', minWidth: '200px', border: '1px solid #eee', padding: '10px' }}>
                         <div style={{ width: '100%', height: '150px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Görsel</div>
                         <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '10px' }}>Cephe Paneli</h3>
                    </div>
                </div>
            </div>

        </div>
    );
}
