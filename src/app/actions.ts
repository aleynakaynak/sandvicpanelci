'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import * as store from '@/lib/store';
import { Product, SiteSettings, MenuItem } from '@/lib/types';

// --- PRODUCT ACTIONS ---

export async function createProduct(formData: FormData) {
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const categorySlug = formData.get('categorySlug') as string;
    const description = formData.get('description') as string;

    if (!title || !price) {
        throw new Error('Title and Price are required');
    }

    const newProduct: Product = {
        id: Date.now().toString(), // Simple ID generation
        title,
        price,
        categorySlug,
        description,
        active: true
    };

    await store.saveProduct(newProduct);
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
    // In a real app, fetch existing to merge, but here we just overwrite for simplicity or assume all fields present
    const title = formData.get('title') as string;
    const price = formData.get('price') as string;
    const categorySlug = formData.get('categorySlug') as string;
    const description = formData.get('description') as string;

    const product: Product = {
        id,
        title,
        price,
        categorySlug,
        description,
        active: true
    };

    await store.saveProduct(product); // store.saveProduct handles update if ID exists
    revalidatePath('/admin/products');
    redirect('/admin/products');
}

export async function deleteProductAction(id: string) {
    await store.deleteProduct(id);
    revalidatePath('/admin/products');
}

// --- SETTINGS ACTIONS ---

export async function updateSettingsAction(formData: FormData) {
    const settings: SiteSettings = {
        contactPhone1: formData.get('contactPhone1') as string,
        contactPhone2: formData.get('contactPhone2') as string,
        whatsapp1: formData.get('whatsapp1') as string,
        whatsapp2: formData.get('whatsapp2') as string,
        contactEmail: formData.get('contactEmail') as string,
        address1: formData.get('address1') as string,
        address2: formData.get('address2') as string,
        mapEmbedUrl: formData.get('mapEmbedUrl') as string,
        headerMenu: [], // We need to preserve existing menu if not passed here!
        footerLinks: []
    };

    // Fetch existing settings to merge menu, OR update saveSettings in store to merge.
    // Store implementation: db.settings = { ...db.settings, ...settings }; -> This merges TOP LEVEL keys.
    // But here we are passing headerMenu: [], effectively overwriting it with empty.

    // Better: Fetch existing first.
    const current = await store.getSettings();
    settings.headerMenu = current.headerMenu || []; // Preserve menu

    await store.saveSettings(settings);
    revalidatePath('/admin/settings');
    revalidatePath('/');
    redirect('/admin/settings');
}

export async function saveMenuAction(formData: FormData) {
    const json = formData.get('menuJson') as string;
    if (!json) return;

    const menuItems = JSON.parse(json) as MenuItem[];

    const current = await store.getSettings();
    const newSettings = { ...current, headerMenu: menuItems };

    await store.saveSettings(newSettings);
    revalidatePath('/'); // Revalidate home immediately
    revalidatePath('/admin/settings/menu');
}

// --- BLOG ACTIONS ---
export async function createBlogPost(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const newPost = {
        id: Date.now().toString(),
        title,
        slug,
        excerpt,
        content,
        imageUrl,
        date: new Date().toISOString().split('T')[0],
        author: 'Admin'
    };

    await store.saveBlogPost(newPost);
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function updateBlogPost(id: string, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const post = await store.getBlogPost(id);
    if (!post) throw new Error('Post not found');

    const updatedPost = {
        ...post,
        title,
        slug,
        excerpt,
        content,
        imageUrl,
    };

    await store.saveBlogPost(updatedPost);
    revalidatePath('/admin/blog');
    redirect('/admin/blog');
}

export async function deleteBlogPostAction(id: string) {
    await store.deleteBlogPost(id);
    revalidatePath('/admin/blog');
}

// --- REFERENCE ACTIONS ---
export async function createReference(formData: FormData) {
    const title = formData.get('title') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const newRef = {
        id: Date.now().toString(),
        title,
        imageUrl
    };

    await store.saveReference(newRef);
    revalidatePath('/admin/reference');
    revalidatePath('/'); // Home
    redirect('/admin/reference');
}

export async function deleteReferenceAction(id: string) {
    await store.deleteReference(id);
    revalidatePath('/admin/reference');
    revalidatePath('/');
}
