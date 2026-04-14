export interface MenuItem {
    id: string;
    title: string;
    link: string;
    children?: MenuItem[];
    isOpen?: boolean; // UI state for admin
}

export interface Reference {
    id: string;
    title: string;
    imageUrl: string;
}

export interface Product {
    id: string;
    title: string;
    price: string;
    categorySlug: string;
    description?: string;
    imageUrl?: string;
    active: boolean;
}

export interface Category {
    id: string;
    slug: string;
    title: string;
    parentId?: string;
    imageUrl?: string;
    order: number;
}

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    imageUrl?: string;
    author?: string;
}

export interface SiteSettings {
    contactEmail: string;
    contactPhone1: string;
    contactPhone2: string;
    whatsapp1: string;
    whatsapp2: string;
    address1: string;
    address2: string;
    mapEmbedUrl: string;
    headerMenu: MenuItem[];
    footerLinks: any[];
}
