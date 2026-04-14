import React from 'react';
import * as store from '@/lib/store';
import MenuEditor from './MenuEditor';

export default async function MenuSettingsPage() {
    const settings = await store.getSettings();
    const currentMenu = settings.headerMenu || [];

    return (
        <div style={{ maxWidth: '1000px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                Header Menü Yönetimi
            </h1>
            <p style={{ color: '#666', marginBottom: '30px', fontSize: '14px' }}>
                Sitenin üst kısmındaki turuncu menü alanını buradan düzenleyebilirsiniz. Alt menü eklemek için ana menü öğesinin yanındaki "+" butonuna tıklayın.
            </p>

            <MenuEditor initialMenu={currentMenu} />
        </div>
    );
}
