'use client';

import React from 'react';
import { Phone } from 'lucide-react';
import { trackWhatsAppClick } from '@/lib/gtag';
import styles from './FloatingWhatsapp.module.css';

const FloatingWhatsapp = () => {
    return (
        <a
            href="https://wa.me/905319308500"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ source: 'floating_button' })}
            className={styles.float_btn}
        >
            <Phone size={30} fill="white" />
        </a>
    );
};

export default FloatingWhatsapp;

