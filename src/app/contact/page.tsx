import React from 'react';
import * as store from '@/lib/store';
import ContactClient from './ContactClient';

export default async function ContactPage() {
    const settings = await store.getSettings();

    const phone1 = settings.contactPhone1 || '+90 531 930 85 00';
    const whatsapp = settings.whatsapp1 || '+90 531 930 85 00';
    const email = settings.contactEmail || 'info@sandvicpanelyapi.com.tr';
    const address1 = settings.address1 || 'Merkez: Hadımköy | Depo: Çorlu';
    const mapSrc = settings.mapEmbedUrl || "https://maps.google.com/maps?q=Had%C4%B1mk%C3%B6y&t=&z=13&ie=UTF8&iwloc=&output=embed";

    return (
        <ContactClient
            phone1={phone1}
            whatsapp={whatsapp}
            email={email}
            address1={address1}
            mapSrc={mapSrc}
        />
    );
}
