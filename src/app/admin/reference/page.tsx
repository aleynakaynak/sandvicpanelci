import React from 'react';
import { Plus, Trash } from 'lucide-react';
import * as store from '@/lib/store';
import { createReference, deleteReferenceAction } from '@/app/actions';

export default async function ReferenceAdminPage() {
    const references = await store.getReferences();

    return (
        <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Referans / Logo Yönetimi</h1>

            {/* Add New Form */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px' }}>Yeni Referans Ekle</h3>
                <form action={createReference} style={{ display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#666' }}>Firma Adı</label>
                        <input type="text" name="title" required placeholder="Firma Adı" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <div style={{ flex: 2 }}>
                        <label style={{ display: 'block', fontSize: '13px', marginBottom: '5px', color: '#666' }}>Logo URL</label>
                        <input type="text" name="imageUrl" required placeholder="https://..." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
                    </div>
                    <button type="submit" style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', height: '42px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Plus size={18} /> Ekle
                    </button>
                </form>
            </div>

            {/* List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                {references.length === 0 ? (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#666', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                        Henüz referans eklenmemiş.
                    </div>
                ) : (
                    references.map(ref => (
                        <div key={ref.id} style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', padding: '15px', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                                <img src={ref.imageUrl} alt={ref.title} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                            </div>
                            <span style={{ fontWeight: '500', fontSize: '14px', textAlign: 'center' }}>{ref.title}</span>

                            <form action={deleteReferenceAction.bind(null, ref.id)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <button type="submit" title="Sil" style={{ backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '4px', padding: '5px', cursor: 'pointer', display: 'flex' }}>
                                    <Trash size={14} />
                                </button>
                            </form>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
