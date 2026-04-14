'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumb.module.css';

// HIERARCHY MAPPING for flattened URLs
// Since the user is using /membran directly, we need to artificially tell Breadcrumb
// that 'membran' belongs to 'Su Yalıtım'.
const hierarchyMap: Record<string, any> = {
    'membran': { name: 'Su Yalıtım', href: '/su-yalitim' },
    // Add others if flattened
};

const Breadcrumb = ({ currentName }: { currentName?: string }) => {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const breadcrumbs = [
        { name: 'Sandviç Panelci Yapı Market', href: '/' }
    ];

    // Logic: 
    // If hierarchyMap[slug] exists, insert it as parent.
    // Then insert current page.

    const slug = pathname.split('/').pop() || '';
    const cleanSlug = slug.toLowerCase();

    // 1. Check artificial parent
    if (hierarchyMap[cleanSlug]) {
        breadcrumbs.push(hierarchyMap[cleanSlug]);
    } else {
        // Fallback: If path is deep /parent/child, parse it
        const segments = pathname.split('/').filter(p => p);
        if (segments.length > 1) {
            // Add segments before last
            for (let i = 0; i < segments.length - 1; i++) {
                const seg = segments[i];
                breadcrumbs.push({
                    name: seg.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                    href: `/${seg}`
                });
            }
        }
    }

    // 2. Current Page
    let finalName = currentName || cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    if (!currentName && cleanSlug === 'membran') finalName = 'Membran Fiyatları'; // Special case

    breadcrumbs.push({ name: finalName, href: '#' });

    return (
        <nav className={styles.breadcrumb_section}>
            <div className={styles.container}>
                <div className={styles.breadcrumb_list}>
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        if (isLast) {
                            return (
                                <div key={index} className={styles.breadcrumb_item}>
                                    <span className={styles.active_item}>
                                        {item.name}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className={styles.breadcrumb_item}>
                                <Link href={item.href} className={styles.breadcrumb_link}>
                                    {item.name}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};

export default Breadcrumb;
