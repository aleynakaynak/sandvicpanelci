import React from 'react';
import * as store from '@/lib/store';
import { updateProduct } from '@/app/actions';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const products = await store.getProducts();
    const categories = await store.getCategories();
    const product = products.find(p => p.id === id);

    if (!product) {
        return <div>Ürün bulunamadı</div>;
    }

    const updateProductWithId = updateProduct.bind(null, id);

    return (
        <div style={{ maxWidth: '600px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Ürünü Düzenle</h1>

            <form action={updateProductWithId} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Ürün Adı</label>
                    <input name="title" defaultValue={product.title} type="text" required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Fiyat</label>
                    <input name="price" defaultValue={product.price} type="text" required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Kategori</label>
                    <select name="categorySlug" defaultValue={product.categorySlug} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.slug}>{cat.title}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>Açıklama</label>
                    <textarea name="description" defaultValue={product.description} rows={4}
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <button type="submit" style={{ flex: 1, backgroundColor: '#3b82f6', color: '#fff', padding: '12px', borderRadius: '6px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                        Güncelle
                    </button>
                    <a href="/admin/products" style={{ textAlign: 'center', textDecoration: 'none', flex: 1, backgroundColor: '#fff', color: '#374151', padding: '12px', borderRadius: '6px', border: '1px solid #d1d5db', fontWeight: '600' }}>
                        İptal
                    </a>
                </div>

            </form>
        </div>
    );
}
