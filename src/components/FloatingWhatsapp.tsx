'use client';

import React from 'react';
import { Phone } from 'lucide-react';

const FloatingWhatsapp = () => {
    return (
        <a
            href="https://wa.me/905319308500"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: '#25d366',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                zIndex: 1000,
                cursor: 'pointer',
                transition: 'transform 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <Phone size={30} fill="white" />
        </a>
    );
};

export default FloatingWhatsapp;
