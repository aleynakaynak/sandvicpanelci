'use client';

import React, { useState } from 'react';
import { MenuItem } from '@/lib/types';
import { Plus, Trash, Edit, Check, X, ChevronRight, ChevronDown } from 'lucide-react';
import { saveMenuAction } from '@/app/actions';

interface MenuEditorProps {
    initialMenu: MenuItem[];
}

export default function MenuEditor({ initialMenu }: MenuEditorProps) {
    // If no menu data exists yet, provide a default structure
    const [menu, setMenu] = useState<MenuItem[]>(initialMenu.length > 0 ? initialMenu : [
        { id: '1', title: 'ÇATI KAPLAMA MALZEMELERİ', link: '/cati-kaplama', children: [] },
        { id: '2', title: 'DUVAR VE CEPHE KAPLAMA', link: '/duvar-cephe', children: [] },
        { id: '3', title: 'ISI YALITIMI', link: '/isi-yalitim', children: [] },
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<{ title: string, link: string }>({ title: '', link: '' });

    const handleAdd = (parentId: string | null) => {
        const newItem: MenuItem = {
            id: Date.now().toString(),
            title: 'Yeni Menü',
            link: '#',
            children: []
        };

        if (parentId === null) {
            setMenu([...menu, newItem]);
        } else {
            const addRecursive = (items: MenuItem[]): MenuItem[] => {
                return items.map(item => {
                    if (item.id === parentId) {
                        return { ...item, children: [...(item.children || []), newItem] };
                    }
                    if (item.children) {
                        return { ...item, children: addRecursive(item.children) };
                    }
                    return item;
                });
            };
            setMenu(addRecursive(menu));
        }
    };

    const handleDelete = (id: string) => {
        const deleteRecursive = (items: MenuItem[]): MenuItem[] => {
            return items.filter(item => item.id !== id).map(item => ({
                ...item,
                children: item.children ? deleteRecursive(item.children) : []
            }));
        };
        setMenu(deleteRecursive(menu));
    };

    const startEdit = (item: MenuItem) => {
        setEditingId(item.id);
        setEditForm({ title: item.title, link: item.link });
    };

    const saveEdit = (id: string) => {
        const updateRecursive = (items: MenuItem[]): MenuItem[] => {
            return items.map(item => {
                if (item.id === id) {
                    return { ...item, title: editForm.title, link: editForm.link };
                }
                if (item.children) {
                    return { ...item, children: updateRecursive(item.children) };
                }
                return item;
            });
        };
        setMenu(updateRecursive(menu));
        setEditingId(null);
    };

    const handleSaveToServer = async () => {
        // Need a hidden input or just define an action that takes JSON directly?
        // Let's create a specialized action for this.
        // For now, we can use a hidden form submit hack or fetch.
        // Ideally, actions should be called directly in Client Components in Next 14, but passing complex objects is tricky if not FormData.

        // We will stringify the JSON into a hidden input and submit a form programmatically.
        const json = JSON.stringify(menu);
        const formData = new FormData();
        formData.append('menuJson', json);
        await saveMenuAction(formData);
        alert('Menü başarıyla kaydedildi!');
    };

    const renderItem = (item: MenuItem, depth: number = 0) => {
        const isEditing = editingId === item.id;

        return (
            <div key={item.id} style={{ marginLeft: depth * 20 + 'px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', backgroundColor: '#f9f9f9', border: '1px solid #ddd', borderRadius: '4px' }}>

                    {/* Expand/Collapse (if has children) */}
                    {item.children && item.children.length > 0 ? (
                        <ChevronDown size={16} color="#666" />
                    ) : (
                        <div style={{ width: 16 }}></div>
                    )}

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                        {isEditing ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                    style={{ padding: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                                <input
                                    value={editForm.link}
                                    onChange={e => setEditForm({ ...editForm, link: e.target.value })}
                                    placeholder="/link"
                                    style={{ padding: '5px', border: '1px solid #ddd', borderRadius: '4px', width: '100px' }}
                                />
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontWeight: '600', color: '#333' }}>{item.title}</span>
                                <span style={{ fontSize: '11px', color: '#888' }}>{item.link}</span>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {isEditing ? (
                            <>
                                <button onClick={() => saveEdit(item.id)} style={{ color: 'green', cursor: 'pointer', border: 'none', background: 'none' }}><Check size={18} /></button>
                                <button onClick={() => setEditingId(null)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}><X size={18} /></button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => startEdit(item)} style={{ color: '#3b82f6', cursor: 'pointer', border: 'none', background: 'none' }}><Edit size={16} /></button>
                                {depth < 2 && ( // Limit depth to 2 levels (Main > Sub > SubChild)
                                    <button onClick={() => handleAdd(item.id)} style={{ color: '#10b981', cursor: 'pointer', border: 'none', background: 'none' }} title="Alt Menü Ekle"><Plus size={16} /></button>
                                )}
                                <button onClick={() => handleDelete(item.id)} style={{ color: '#ef4444', cursor: 'pointer', border: 'none', background: 'none' }}><Trash size={16} /></button>
                            </>
                        )}
                    </div>
                </div>

                {/* Recursion for Children */}
                {item.children && item.children.length > 0 && (
                    <div style={{ borderLeft: '1px dashed #ccc', paddingLeft: '5px' }}>
                        {item.children.map(child => renderItem(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => handleAdd(null)}
                    style={{ backgroundColor: '#fff', border: '1px dashed #999', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                    <Plus size={16} /> Ana Menü Ekle
                </button>

                <button
                    onClick={handleSaveToServer}
                    style={{ backgroundColor: '#fdd835', border: 'none', padding: '10px 30px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    KAYDET
                </button>
            </div>

            <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {menu.map(item => renderItem(item))}
            </div>
        </div>
    );
}
