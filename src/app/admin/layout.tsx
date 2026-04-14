import React from 'react';
import AdminSidebar from './components/AdminSidebar';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Render without sidebar for login page
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
            <AdminSidebar />
            <div style={{ marginLeft: '260px', flex: 1, padding: '30px' }}>
                {children}
            </div>
        </div>
    );
}
