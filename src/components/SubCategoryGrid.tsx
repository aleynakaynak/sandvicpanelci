'use client';

import React from 'react';
import Link from 'next/link';
import { Package } from 'lucide-react';
import styles from './SubCategoryGrid.module.css';

interface SubCategoryGridProps {
    items: Array<{ title: string, count: number, img?: string, link?: string }>;
}

const SubCategoryGrid: React.FC<SubCategoryGridProps> = ({ items }) => {
    return (
        <div className={styles.grid}>
            {items.map((item, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                    {/* Link handling */}
                    <Link href={item.link || '#'} style={{ textDecoration: 'none' }}>
                        {/* Image Box */}
                        <div style={{
                            height: '140px',
                            backgroundColor: '#fff',
                            border: '1px solid #eee',
                            marginBottom: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative' // For hover visuals
                        }}>
                            {item.img ? (
                                <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            ) : (
                                <Package size={40} color="#ccc" />
                            )}
                        </div>
                        {/* Title */}
                        <div style={{ fontSize: '13px', fontWeight: '700', color: '#333' }}>
                            {item.title}
                            {item.count !== undefined && (
                                <span style={{ color: '#999', marginLeft: '5px' }}>({item.count})</span>
                            )}
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default SubCategoryGrid;
