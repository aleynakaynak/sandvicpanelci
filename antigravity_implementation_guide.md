# KÜÇÜKDEVECI.COM.TR - ANTIGRAVITY IMPLEMENTATION GUIDE
**Project Type:** Catalog Showroom Website (No E-commerce)  
**Target Platform:** Antigravity Framework  
**Build Mode:** Birebir Klon (1:1 Clone)

---

## 🎯 PROJECT OVERVIEW

### Mission Statement
Küçükdeveci.com.tr'nin görsel ve yapısal klonunu oluştur. Ürün kataloğu odaklı, e-ticaret olmayan bir showroom web sitesi. Admin paneli ile ürün yönetimi sağla.

### Critical Requirements
✅ NO Cart / NO Checkout / NO Payment  
✅ Admin Panel for Product Management  
✅ NO Public User Login (Only Admin Login)  
✅ Catalog Display Only  
✅ Birebir tasarım kopyalama

---

## 📋 COMPLETE SITE MAP

```
Root (/)
├── Home Page
│   ├── Hero Slider (4 slides)
│   ├── Category Grid (3x4 layout)
│   ├── Product Showcase
│   ├── Blog Preview (10 latest)
│   └── Brand Logos Carousel
│
├── Categories
│   ├── ÇATI KAPLAMA MALZEMELERİ
│   │   ├── Sandviç Panel
│   │   ├── Osb Levha
│   │   ├── Eternit Fiyatları
│   │   ├── Onduline Fiyatları
│   │   ├── Polyester Şeffaflar
│   │   └── Shingle (Şıngıl) Fiyatları
│   │
│   ├── DUVAR VE CEPHE KAPLAMA
│   │   ├── Cephe Panel
│   │   ├── Betopan Fiyatları
│   │   └── Alçıpan Levha Fiyatları
│   │
│   ├── ISI YALITIMI
│   │   ├── Taşyünü Fiyatları
│   │   ├── İzocam Camyünü Fiyatları
│   │   ├── Strafor Köpük Fiyatları
│   │   └── Xps Köpük Fiyatları
│   │
│   ├── SU YALITIMI
│   │   ├── Desenli Membran
│   │   └── Membran Fiyatları
│   │       ├── Arduazlı – Kumlu
│   │       ├── Cam Tülü Taşıyıcılı
│   │       ├── Folyolu
│   │       ├── Kendenden Yapışkanlı
│   │       ├── Likit Membran
│   │       └── Polyester Keçeli Membran
│   │
│   ├── PROFİL VE GALVANİZ SAC
│   │   ├── Köşebent Demir
│   │   ├── Demir Kutu Profil Fiyatları
│   │   ├── NPI Profil Fiyatları
│   │   ├── Galvaniz Sac Fiyatları
│   │   ├── Trapez Sac Fiyatları
│   │   ├── NPU Profil Fiyatları
│   │   └── Lama Demir Fiyatları
│   │
│   ├── MALİYET HESAPLAMA
│   │   └── Sandviç Panel Maliyet Hesaplama
│   │
│   └── AKSESUARLAR – EK ÜRÜNLER
│       ├── AHŞAP ÜRÜNLER
│       │   ├── Plywood Fiyatları
│       │   └── Kereste
│       ├── Çatı Çıkış Kapağı
│       ├── Nem Bariyeri
│       ├── Semerler
│       ├── Silikon ve Mastikler
│       ├── Tepe Mahyalar
│       └── Vidalar
│
├── Category Page Template
│   └── Product Grid (display all products in category)
│
├── Product Detail Page
│   ├── Image Gallery
│   ├── Product Title
│   ├── Description
│   ├── Specifications
│   └── Related Products
│
├── Blog
│   └── Blog List Page
│       └── Blog Post Page
│
├── About (Hakkımızda)
│
├── Contact (İletişim)
│
└── Admin Panel (/admin)
    ├── Login Page
    ├── Dashboard
    ├── Product Management
    │   ├── Add Product
    │   ├── Edit Product
    │   ├── Delete Product
    │   └── Bulk Upload
    ├── Category Management
    │   ├── Add Category
    │   ├── Edit Category
    │   └── Delete Category
    ├── Blog Management
    │   ├── Add Post
    │   ├── Edit Post
    │   └── Delete Post
    └── Media Library
```

---

## 🎨 DESIGN SYSTEM ANALYSIS

### Color Palette (Extracted from Original Site)
```css
--primary-red: #d32f2f;
--dark-gray: #333333;
--medium-gray: #666666;
--light-gray: #f5f5f5;
--white: #ffffff;
--border-color: #dddddd;
--link-blue: #2196f3;
--success-green: #4caf50;
--hover-dark: #b71c1c;
```

### Typography System
```css
/* Primary Font */
--font-primary: 'Roboto', Arial, sans-serif;

/* Font Sizes */
--text-xs: 12px;
--text-sm: 14px;
--text-base: 16px;
--text-lg: 18px;
--text-xl: 20px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Font Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing System
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
```

---

## 🧩 COMPONENT BREAKDOWN

### 1. GLOBAL COMPONENTS

#### A. Header Component
```
Structure:
├── Top Bar
│   ├── Logo (left)
│   └── Contact Info Block (right)
│       ├── Phone: 0212 546 92 02
│       ├── Email: satis@kucukdeveci.com.tr
│       ├── Address: Zeytinburnu Demirciler Sitesi
│       └── Hours: Pzt-Cmtsi 8.00-18.00, Pazar KAPALI
│
└── Navigation Bar
    ├── Category Mega Menu (Dropdown)
    └── Pages Links (Blog, Hakkımızda, İletişim)

Props:
- sticky: boolean
- transparent: boolean
- megaMenuOpen: boolean

State:
- currentCategory: string | null
- mobileMenuOpen: boolean
```

#### B. Footer Component
```
Structure:
├── Column 1: Company Info
│   ├── Logo
│   └── Description Text
│
├── Column 2: Quick Links
│   └── Product Categories (8 links)
│
├── Column 3: Contact Info
│   ├── Satış Ofisi Address
│   ├── Depo Address
│   ├── Phone Numbers (2)
│   └── WhatsApp Numbers (2)
│
└── Bottom Bar
    └── Copyright Text

Style:
- Background: Dark Gray (#2a2a2a)
- Text Color: White
- Link Hover: Primary Red
```

#### C. Navigation Menu Component
```
Type: Multi-level Dropdown Menu

Structure:
- Level 1: Main Categories
- Level 2: Subcategories
- Level 3: Sub-subcategories (if exists)

Interaction:
- Hover to expand
- Click to navigate
- Mobile: Accordion style

Animation:
- Slide down effect
- 200ms transition
```

#### D. WhatsApp Floating Button
```
Position: Fixed bottom-right
Icon: WhatsApp logo
Link: https://wa.me/905313042492
Style: Circular button with shadow
Z-index: 999
Animation: Pulse effect on hover
```

---

### 2. HOME PAGE COMPONENTS

#### A. Hero Slider
```
Type: Image Carousel

Slides (4 total):
1. Sandviç Panel
   - Image: sandvic-panel-480x145.png
   - Category: ÇATI KAPLAMA
   - Title: Sandviç Panel
   - Subtitle: 450₺'den başlayan fiyatlar...
   - CTA: "HEMEN SATIN AL"

2. Onduline
   - Image: ondulin-480x145.png
   - Category: ÇATI KAPLAMA
   - Title: Onduline
   - Subtitle: HR kırmızı – yeşil oluklu...
   - CTA: "HEMEN SATIN AL"

3. Osb Levhalar
   - Image: obs-levhalar-480x145.png
   - Category: ÇATI KAPLAMA
   - Title: Osb Levhalar
   - Subtitle: 11 – 15 – 18 mm...
   - CTA: "HEMEN SATIN AL"

4. Hadımköy Depo
   - Image: KD-DEPO-ON-min-480x145.jpg
   - Title: HADIMKÖY AÇIK DEPOMUZ

Features:
- Auto-play: 5 seconds
- Navigation: Dots + Arrows
- Transition: Fade
- Responsive: Full width on mobile
```

#### B. Category Grid
```
Layout: 3 columns x 4 rows (desktop)
Layout: 1 column (mobile)

Card Design:
├── Image (300x225px)
├── Overlay on Hover
└── Category Name

Cards (12 total):
1. Osb Levha
2. Çatı Malzemesi
3. Taşyünü
4. Sandviç Panel
5. Camyünü
6. Xps Foamboard
7. Shingle
8. Boyalı Profil
9. Membran
10. Plywood
11. Betopan
12. Boardex

Hover Effect:
- Scale: 1.05
- Overlay: rgba(0,0,0,0.3)
- Cursor: pointer
```

#### C. Content Section
```
Title: "Küçükdeveci Online Satış"
Image: Company photo
Description: Brief company intro
Style: Centered layout with image
```

#### D. Blog Preview Section
```
Title: "Küçükdeveci Blog"
Layout: Vertical list of blog links

Blog Posts (10 shown):
1. Trapez Saç İzmir
2. Betopan Nedir Nerede Kullanılır
3. Havalandırma Bacası
4. Tayrot Mili
5. Cam Tuğla Fiyatları Koçtaş
6. BTM Membran Fiyatları
7. Dış Cephe Köpük Fiyatları
8. Osb Fiyatları Ankara
9. Alüminyum Sac Fiyatları
10. Çimento Fiyatları

Style:
- Links with arrow icon
- Hover: underline + color change
```

#### E. Brand Logos Carousel
```
Title: "Küçükdeveci Referanslar"

Logos (11 brands):
1. İzocam
2. Ekobord
3. Knauf
4. Dalsan Alçı
5. Tosçelik
6. Onduline
7. Teknopanel
8. Tekiz
9. Fixa
10. Sumaş
11. Kronospan

Features:
- Auto-scroll carousel
- Infinite loop
- 3-4 logos visible at once
- Smooth transition
```

---

### 3. CATEGORY PAGE COMPONENTS

#### Category Header
```
Elements:
├── Breadcrumb Navigation
├── Category Title
└── Category Description (optional)

Example:
Home > Çatı Kaplama > Sandviç Panel
```

#### Product Grid
```
Layout: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)

Product Card:
├── Image (square ratio)
├── Product Title
├── Short Description
└── "Detaylı Bilgi" Button

Hover Effect:
- Image zoom
- Shadow increase
- Button color change
```

#### Sidebar (Left)
```
Elements:
├── Category Tree Navigation
└── Filter Options (if needed)

Style:
- Sticky positioning
- Collapsible subcategories
- Active state highlight
```

---

### 4. PRODUCT DETAIL PAGE

#### Layout Structure
```
Desktop Layout:
├── Left Column (60%)
│   ├── Image Gallery
│   │   ├── Main Image (large)
│   │   └── Thumbnail Strip (bottom)
│   │
│   └── Product Description Tabs
│       ├── Açıklama (Description)
│       ├── Özellikler (Specifications)
│       └── Kullanım Alanları (Usage Areas)
│
└── Right Column (40%)
    ├── Product Title
    ├── Category Badge
    ├── Short Description
    ├── Contact Form / WhatsApp Button
    └── Related Products

Mobile Layout:
- Stack vertically
- Gallery at top
- Info below
```

#### Image Gallery Component
```
Features:
- Lightbox on click
- Zoom functionality
- Swipe gesture support
- Thumbnail navigation
- Full-screen mode

Images:
- Main display: 800x600px
- Thumbnails: 100x100px
- Max images per product: 10
```

#### Contact/Inquiry Section
```
Instead of "Add to Cart":

Option 1: Contact Form
├── Name
├── Phone
├── Email
└── Message (pre-filled with product name)

Option 2: Direct WhatsApp
- Button: "WhatsApp ile İletişime Geç"
- Link: Pre-filled message with product name
```

---

### 5. BLOG COMPONENTS

#### Blog List Page
```
Layout: 2 columns (desktop)

Blog Card:
├── Featured Image
├── Title
├── Excerpt (150 chars)
├── Date
└── "Devamını Oku" Link

Pagination: Bottom
Sidebar: Categories + Recent Posts
```

#### Blog Post Page
```
Layout:
├── Hero Image (full-width)
├── Title
├── Date + Author
├── Content (WYSIWYG)
├── Tags
└── Related Posts (3 cards at bottom)

Sidebar:
├── Search
├── Categories
└── Recent Posts (5 items)
```

---

### 6. STATIC PAGES

#### About Page (Hakkımızda)
```
Content:
├── Company History
│   "1960 yılında Hacı Lütfi Küçükdeveci tarafından kurulan..."
│
├── Timeline (optional)
├── Team Photos
├── Certificates/Awards
└── Values Section

Layout: Single column, image-text alternating
```

#### Contact Page (İletişim)
```
Layout: 2 columns

Left Column:
├── Contact Form
│   ├── Ad Soyad
│   ├── Email
│   ├── Telefon
│   ├── Konu
│   └── Mesaj

Right Column:
├── Company Info Box
│   ├── Zeytinburnu Office
│   │   ├── Address
│   │   ├── Phone: 0212 546 92 02
│   │   └── Map Embed
│   │
│   └── Hadımköy Branch
│       ├── Address
│       ├── Phone: 0212 542 90 30
│       └── Map Embed
│
└── Working Hours
    "Pzt-Cmtsi: 8.00-18.00"
    "Pazar: KAPALI"

Below: Google Maps (dual location markers)
```

---

## 🗄️ DATABASE SCHEMA

### Tables Structure

#### 1. categories
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  description TEXT,
  image_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

Indexes:
- slug (unique)
- parent_id
- display_order
```

#### 2. products
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  short_description TEXT,
  full_description TEXT,
  specifications JSONB,
  meta_title VARCHAR(200),
  meta_description VARCHAR(300),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

Indexes:
- slug (unique)
- category_id
- is_active
- created_at
```

#### 3. product_images
```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(200),
  display_order INTEGER DEFAULT 0,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

Indexes:
- product_id
- display_order
```

#### 4. blog_posts
```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  author_name VARCHAR(100),
  meta_title VARCHAR(200),
  meta_description VARCHAR(300),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

Indexes:
- slug (unique)
- is_published
- published_at
```

#### 5. blog_categories
```sql
CREATE TABLE blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 6. blog_post_categories (Junction Table)
```sql
CREATE TABLE blog_post_categories (
  blog_post_id INTEGER REFERENCES blog_posts(id) ON DELETE CASCADE,
  blog_category_id INTEGER REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, blog_category_id)
);
```

#### 7. admin_users
```sql
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

Indexes:
- username (unique)
- email (unique)
```

#### 8. contact_submissions
```sql
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(200),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

Indexes:
- is_read
- created_at
```

---

## 🔐 ADMIN PANEL SPECIFICATIONS

### Login System
```
Route: /admin/login

Form Fields:
- Username or Email
- Password
- "Beni Hatırla" checkbox

Features:
- JWT token authentication
- Session timeout: 24 hours
- Brute force protection (5 attempts)
- Password recovery email
```

### Dashboard
```
Route: /admin/dashboard

Widgets:
├── Statistics Cards
│   ├── Total Products
│   ├── Total Categories
│   ├── Blog Posts
│   └── Contact Messages (unread)
│
├── Recent Activity Feed
├── Quick Actions Menu
└── System Status

Quick Actions:
- Add New Product
- Add New Category
- Add Blog Post
- View Contact Messages
```

### Product Management
```
Route: /admin/products

List View:
├── Search bar
├── Filter by category
├── Status filter (active/inactive)
└── Data table
    ├── Thumbnail
    ├── Title
    ├── Category
    ├── Status
    └── Actions (Edit, Delete, Clone)

Add/Edit Product Form:
├── Basic Info Tab
│   ├── Product Title *
│   ├── Slug (auto-generated)
│   ├── Category (dropdown) *
│   ├── Short Description
│   └── Status (active/inactive)
│
├── Description Tab
│   └── Full Description (WYSIWYG editor)
│
├── Specifications Tab
│   └── Dynamic key-value pairs
│       Example:
│       - Kalınlık: 50mm
│       - Malzeme: Çelik
│       - Renk: Beyaz
│
├── Images Tab
│   ├── Upload multiple images
│   ├── Drag to reorder
│   ├── Set primary image
│   └── Add alt text
│
└── SEO Tab
    ├── Meta Title
    ├── Meta Description
    └── Schema Markup (auto)

Validation:
- Title: Required, max 300 chars
- Category: Required
- Images: Max 10 per product, 5MB each
- Slug: Auto-generate, unique
```

### Category Management
```
Route: /admin/categories

Features:
├── Tree view (drag-drop reorder)
├── Add subcategory
├── Edit category
│   ├── Name *
│   ├── Slug
│   ├── Parent Category
│   ├── Description
│   ├── Image
│   └── Display Order
└── Delete (with products reassignment)

Validation:
- Cannot delete if has products (show warning)
- Cannot delete if has subcategories
```

### Blog Management
```
Route: /admin/blog

List View:
├── Filter by status (published/draft)
├── Search
└── Table (Title, Author, Date, Status, Actions)

Add/Edit Post Form:
├── Title *
├── Slug (auto-generated)
├── Featured Image
├── Excerpt (150 chars recommended)
├── Content (WYSIWYG editor) *
├── Categories (multi-select)
├── Author Name
├── Publish Status
│   ├── Draft
│   ├── Scheduled
│   └── Published
├── Publish Date
└── SEO Fields
    ├── Meta Title
    └── Meta Description
```

### Media Library
```
Route: /admin/media

Features:
├── Upload multiple files
├── Grid view / List view
├── Search by filename
├── Filter by type (image, document, video)
├── Preview
├── Copy URL
├── Delete
└── Usage tracking (where is this file used?)

Upload Specs:
- Allowed types: jpg, png, gif, webp, pdf
- Max size: 5MB per file
- Auto-optimize images
- Generate thumbnails
```

### Settings
```
Route: /admin/settings

Sections:
├── General
│   ├── Site Title
│   ├── Site Description
│   ├── Contact Email
│   └── Phone Numbers
│
├── Contact Info
│   ├── Zeytinburnu Address
│   ├── Hadımköy Address
│   ├── Working Hours
│   └── Social Media Links
│
├── SEO
│   ├── Default Meta Title Pattern
│   ├── Default Meta Description
│   └── Google Analytics ID
│
└── Email Notifications
    ├── Admin Email
    ├── Contact Form Notifications
    └── Email Template
```

---

## 🎨 RESPONSIVE BREAKPOINTS

```css
/* Mobile First Approach */

/* Extra Small Devices (phones) */
@media (max-width: 575px) {
  /* Stack all columns */
  /* Hide sidebar */
  /* Mobile menu hamburger */
}

/* Small Devices (landscape phones, tablets) */
@media (min-width: 576px) and (max-width: 767px) {
  /* 2 column grid */
}

/* Medium Devices (tablets) */
@media (min-width: 768px) and (max-width: 991px) {
  /* 2-3 column grid */
  /* Sidebar visible */
}

/* Large Devices (desktops) */
@media (min-width: 992px) and (max-width: 1199px) {
  /* 3 column grid */
  /* Full sidebar */
}

/* Extra Large Devices (large desktops) */
@media (min-width: 1200px) {
  /* 4 column grid */
  /* Max container width: 1200px */
}
```

### Mobile Specific Components
```
Mobile Header:
├── Hamburger Menu (left)
├── Logo (center)
└── Phone Icon (right)

Mobile Navigation:
- Full-screen overlay
- Accordion categories
- Slide-in animation

Mobile Product Grid:
- 1 column on small screens
- 2 columns on landscape/tablets

Mobile Product Detail:
- Stack all elements
- Sticky CTA button at bottom
- Swipeable image gallery
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Image Optimization
```
Strategy:
1. Convert all images to WebP
2. Provide fallback (JPEG/PNG)
3. Generate multiple sizes:
   - Thumbnail: 150x150
   - Small: 300x300
   - Medium: 600x600
   - Large: 1200x1200
   - Original: Keep as backup

Implementation:
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Product" loading="lazy">
</picture>

Lazy Loading:
- Use native loading="lazy"
- IntersectionObserver for complex cases
```

### Code Splitting
```
Route-based splitting:
├── Homepage bundle
├── Category page bundle
├── Product page bundle
├── Admin bundle (separate chunk)
└── Blog bundle

Component lazy loading:
- Image gallery
- Video players
- Heavy UI components
```

### Caching Strategy
```
Cache-Control Headers:
- Static assets (images, fonts): 1 year
- CSS/JS: 1 month (with hash in filename)
- HTML: No cache
- API responses: 5 minutes

Service Worker:
- Cache static assets
- Offline fallback page
- Cache API responses (stale-while-revalidate)
```

### CDN Configuration
```
Host on CDN:
- All images
- CSS/JS files
- Fonts
- Static assets

CDN Provider: Cloudflare / AWS CloudFront
- Auto-minify CSS/JS
- Brotli compression
- HTTP/2 push
```

---

## 🔒 SECURITY MEASURES

### Admin Panel Security
```
Authentication:
- JWT tokens (HttpOnly cookies)
- CSRF protection
- Session timeout (24 hours)
- Logout on password change

Authorization:
- Role-based access control
- Admin role required for all panel access
- Super Admin for settings/users

Rate Limiting:
- Login attempts: 5 per 15 minutes
- API calls: 100 per minute per IP
- File uploads: 10 per hour per user
```

### Input Validation
```
Frontend:
- Required field validation
- Format validation (email, phone)
- Max length checks
- File type/size validation

Backend:
- SQL injection prevention (parameterized queries)
- XSS protection (sanitize HTML)
- CSRF tokens
- Input whitelisting
```

### File Upload Security
```
Validation:
- Allowed extensions: jpg, jpeg, png, gif, webp, pdf
- Max file size: 5MB
- MIME type check
- Image dimension validation
- Virus scan (optional)

Storage:
- Store outside web root OR with deny execution
- Randomized filenames
- Separate user uploads directory
- CDN for serving (no direct access)
```

### SQL Injection Prevention
```
Use:
- Prepared statements (parameterized queries)
- ORM/Query builder
- Input sanitization
- Least privilege database user
```

### XSS Prevention
```
- Escape all user input in HTML
- Content Security Policy headers
- HttpOnly cookies
- Sanitize rich text editor content
- Use templating engines with auto-escaping
```

---

## 🔍 SEO IMPLEMENTATION

### URL Structure
```
Homepage:
https://domain.com/

Category:
https://domain.com/kategori/cati-kaplama-malzemeleri

Subcategory:
https://domain.com/kategori/cati-kaplama-malzemeleri/sandvic-panel

Product:
https://domain.com/urun/sandvic-panel-50mm-beyaz

Blog:
https://domain.com/blog/

Blog Post:
https://domain.com/blog/betopan-nedir-nerede-kullanilir

About:
https://domain.com/hakkimizda

Contact:
https://domain.com/iletisim
```

### Meta Tags Template
```html
<!-- Homepage -->
<title>Küçükdeveci Yapı Market | Çatı ve Cephe Kaplama Malzemeleri</title>
<meta name="description" content="1960'tan beri... Sandviç panel, OSB, membran ve tüm yapı malzemeleri en uygun fiyatlarla Küçükdeveci'de.">

<!-- Product Page -->
<title>[Product Name] | Küçükdeveci Yapı Market</title>
<meta name="description" content="[Product description - first 160 chars]">

<!-- Category Page -->
<title>[Category Name] Fiyatları | Küçükdeveci</title>
<meta name="description" content="[Category name] ürünleri ve fiyatları. Hemen inceleyin, online sipariş verin.">

<!-- Blog Post -->
<title>[Post Title] | Küçükdeveci Blog</title>
<meta name="description" content="[Excerpt - first 160 chars]">
```

### Schema Markup
```json
// Organization Schema (Global)
{
  "@context": "https://schema.org",
  "@type": "HardwareStore",
  "name": "Küçükdeveci Yapı Market",
  "url": "https://domain.com",
  "logo": "https://domain.com/logo.png",
  "description": "Çatı ve cephe kaplama malzemeleri",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Zeytinburnu Demirciler Sitesi 8. Yol No:78-80-82",
    "addressLocality": "Zeytinburnu",
    "addressRegion": "İstanbul",
    "addressCountry": "TR"
  },
  "telephone": "+90-212-546-92-02",
  "email": "satis@kucukdeveci.com.tr",
  "openingHours": "Mo-Sa 08:00-18:00"
}

// Product Schema
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "[Product Name]",
  "image": "[Product Image URL]",
  "description": "[Product Description]",
  "brand": {
    "@type": "Brand",
    "name": "[Brand Name]"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0",
    "priceCurrency": "TRY"
  }
}

// Blog Post Schema
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "[Post Title]",
  "image": "[Featured Image]",
  "author": {
    "@type": "Person",
    "name": "[Author Name]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Küçükdeveci",
    "logo": {
      "@type": "ImageObject",
      "url": "[Logo URL]"
    }
  },
  "datePublished": "[ISO Date]",
  "dateModified": "[ISO Date]"
}

// Breadcrumb Schema
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Ana Sayfa",
      "item": "https://domain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Çatı Kaplama",
      "item": "https://domain.com/kategori/cati-kaplama"
    }
  ]
}
```

### Sitemap.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://domain.com/</loc>
    <lastmod>2025-02-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Categories -->
  <url>
    <loc>https://domain.com/kategori/[slug]</loc>
    <lastmod>[last_update_date]</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Products -->
  <url>
    <loc>https://domain.com/urun/[slug]</loc>
    <lastmod>[last_update_date]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Blog Posts -->
  <url>
    <loc>https://domain.com/blog/[slug]</loc>
    <lastmod>[last_update_date]</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

### Robots.txt
```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://domain.com/sitemap.xml
```

---

## 📱 MOBILE OPTIMIZATION

### Mobile Menu
```
Hamburger Icon (☰):
- Position: Top left
- Opens: Full-screen overlay

Menu Structure:
├── Search bar
├── Categories (accordion)
├── Static pages
└── Close button (X)

Animation:
- Slide from left
- Backdrop overlay
- Smooth transition
```

### Touch Interactions
```
Tap Targets:
- Minimum size: 44x44px
- Spacing: 8px minimum

Swipe Gestures:
- Image gallery: swipe left/right
- Menu: swipe right to open
- Product cards: swipe to reveal actions

Scroll Behavior:
- Smooth scrolling
- Snap points for galleries
- Infinite scroll for product lists
```

### Mobile Performance
```
Optimizations:
- Reduce image sizes (50% of desktop)
- Defer non-critical JavaScript
- Use system fonts on mobile
- Minimize animations
- Progressive image loading

Above-the-fold:
- Inline critical CSS
- Preload hero image
- Defer below-fold content
```

---

## 🌐 INTERNATIONALIZATION (Optional Future Feature)

```
Language Support:
- Turkish (default)
- English (optional)

Implementation:
- i18n library
- Language switcher in header
- Localized URLs (/en/category/...)
- Translated admin panel
- Separate content tables per language
```

---

## 🧪 TESTING CHECKLIST

### Functional Testing
```
☐ All links work
☐ Forms submit correctly
☐ Image upload functions
☐ Search works
☐ Filters work
☐ Pagination works
☐ Admin login/logout
☐ CRUD operations in admin
☐ Email notifications sent
☐ 404 page displays
```

### Cross-browser Testing
```
Desktop:
☐ Chrome (latest)
☐ Firefox (latest)
☐ Safari (latest)
☐ Edge (latest)

Mobile:
☐ Chrome Android
☐ Safari iOS
☐ Samsung Internet
```

### Responsive Testing
```
☐ 320px (iPhone SE)
☐ 375px (iPhone 12)
☐ 768px (iPad)
☐ 1024px (iPad Pro)
☐ 1920px (Desktop)
☐ 2560px (Large Desktop)
```

### Performance Testing
```
Metrics to achieve:
☐ Lighthouse Performance > 90
☐ First Contentful Paint < 1.8s
☐ Time to Interactive < 3.8s
☐ Total Blocking Time < 300ms
☐ Cumulative Layout Shift < 0.1
☐ Largest Contentful Paint < 2.5s
```

### Security Testing
```
☐ SQL injection attempts blocked
☐ XSS attempts sanitized
☐ CSRF tokens working
☐ File upload restrictions enforced
☐ Brute force protection active
☐ SSL/HTTPS enforced
☐ Security headers present
```

### Accessibility Testing
```
☐ ARIA labels present
☐ Keyboard navigation works
☐ Screen reader compatible
☐ Color contrast ratios met
☐ Focus indicators visible
☐ Alt text on all images
```

---

## 📦 DEPLOYMENT CHECKLIST

### Pre-deployment
```
☐ Environment variables set
☐ Database migrations run
☐ Admin user created
☐ Test data removed
☐ Error pages configured
☐ Favicon added
☐ SSL certificate installed
☐ Domain pointed correctly
☐ Email configured
☐ Backup system active
```

### Post-deployment
```
☐ Sitemap submitted to Google
☐ Google Analytics tracking
☐ Google Search Console setup
☐ Robots.txt verified
☐ 301 redirects (if migration)
☐ CDN configured
☐ Monitoring tools setup
☐ Performance baseline recorded
```

---

## 🛠️ RECOMMENDED TECH STACK

### Frontend Framework
```
Option 1: Next.js 14+ (Recommended)
- App Router
- Server Components
- Image Optimization
- Built-in SEO

Option 2: Astro
- Static Site Generation
- Component Islands
- Excellent Performance

Option 3: Nuxt.js
- If Vue.js preferred
```

### Backend / Database
```
Option 1: Supabase (Recommended)
- PostgreSQL database
- Built-in auth
- Storage
- Real-time (optional)
- Edge functions

Option 2: Firebase
- Firestore
- Auth
- Storage
- Hosting

Option 3: Custom (Node.js + PostgreSQL)
- Express.js
- Prisma ORM
- Custom auth
```

### Image Storage
```
Option 1: Cloudinary (Recommended)
- Auto-optimization
- Transformations on-the-fly
- CDN included

Option 2: AWS S3 + CloudFront
- Scalable
- Pay-as-you-go

Option 3: Supabase Storage
- Integrated with database
- Good for small-medium projects
```

### Admin Panel Framework
```
Option 1: Custom Built (Recommended)
- Full control
- Tailored to needs
- React Admin components

Option 2: Refine.dev
- Pre-built components
- Rapid development

Option 3: Strapi
- Headless CMS
- Quick setup
- Less customization
```

### CSS Framework
```
Option 1: Tailwind CSS (Recommended)
- Utility-first
- Highly customizable
- Small bundle size

Option 2: Custom CSS
- Complete control
- Learning curve
```

### Form Handling
```
- React Hook Form
- Zod (validation)
- Yup (alternative)
```

### Rich Text Editor
```
Option 1: TipTap (Recommended)
- Modern
- Extensible
- Vue/React

Option 2: Quill
- Stable
- Feature-rich

Option 3: Draft.js
- React-specific
```

---

## 📝 CONTENT MIGRATION STRATEGY

### Phase 1: Structure Setup
```
1. Create all main categories
2. Create all subcategories
3. Set up hierarchy
4. Upload category images
```

### Phase 2: Product Data
```
Method A: Manual Entry
- Use admin panel
- Enter products one by one
- Good for <50 products

Method B: Bulk Import
- Prepare CSV/Excel template
- Fill with product data
- Use import script
- Validate and review

Template columns:
- Title
- Category (slug)
- Short Description
- Full Description
- Specifications (JSON)
- Image URLs (comma-separated)
- SEO Title
- SEO Description
```

### Phase 3: Images
```
1. Download all images from old site
2. Organize by category
3. Rename systematically
4. Upload to CDN/Storage
5. Link in database
```

### Phase 4: Blog Migration
```
1. Export blog posts (if WordPress)
2. Clean up content
3. Convert to new format
4. Re-upload images
5. Update internal links
```

---

## 🚀 GO-LIVE PLAN

### Week 1: Setup
- Install framework
- Database setup
- Admin panel foundation

### Week 2-3: Frontend Development
- Homepage
- Category pages
- Product pages
- Static pages

### Week 4: Admin Panel
- Product management
- Category management
- Media library

### Week 5: Content Migration
- Categories
- Products
- Blog posts
- Images

### Week 6: Testing & Optimization
- Functional testing
- Performance optimization
- SEO setup
- Security audit

### Week 7: Deployment
- Staging deployment
- Final testing
- Production deployment
- Post-launch monitoring

---

## 🎯 SUCCESS METRICS

### Performance Targets
```
☐ Page load time < 2 seconds
☐ Lighthouse score > 90
☐ Mobile usability score: 100%
☐ Zero critical security issues
```

### Business Metrics
```
☐ Product catalog fully migrated
☐ Contact form submissions working
☐ Admin can manage products easily
☐ Mobile traffic supported
```

### SEO Metrics (3 months post-launch)
```
☐ Google indexing all pages
☐ Organic traffic baseline established
☐ Local search visibility
☐ Core Web Vitals passed
```

---

## 📞 FINAL NOTES FOR ANTIGRAVITY

### Critical Implementation Points
```
1. NO E-COMMERCE FEATURES
   - Remove all pricing display
   - Remove cart functionality
   - Remove checkout process
   - Replace with "İletişim" or WhatsApp CTA

2. ADMIN-ONLY ACCESS
   - No user registration
   - No user login
   - Only admin panel login
   - Products managed by admin only

3. VISUAL CLONE ACCURACY
   - Match exact colors
   - Use same layout structure
   - Keep same typography scale
   - Replicate animations/transitions

4. MOBILE-FIRST APPROACH
   - Design for mobile first
   - Progressive enhancement
   - Touch-friendly interactions

5. PERFORMANCE IS CRITICAL
   - Optimize all images
   - Lazy load components
   - Minimize bundle size
   - Use CDN for assets
```

### Development Priority Order
```
1. Database schema
2. Admin authentication
3. Product CRUD operations
4. Frontend homepage
5. Category pages
6. Product detail pages
7. Static pages (About, Contact)
8. Blog functionality
9. Admin panel UI polish
10. SEO optimization
11. Performance tuning
12. Final testing
```

### Anti-Patterns to Avoid
```
❌ Don't add unnecessary features
❌ Don't over-engineer the architecture
❌ Don't ignore mobile optimization
❌ Don't skip image optimization
❌ Don't use heavy frameworks for simple tasks
❌ Don't expose admin routes publicly
❌ Don't forget backup system
```

---

## 🎉 PROJECT READY FOR ANTIGRAVITY

This document provides complete specifications for cloning kucukdeveci.com.tr as a catalog-only website. All components, database schemas, UI patterns, and implementation details are documented for Antigravity to execute the build.

**Total Pages to Build:** 
- 1 Homepage
- 1 Category List Page
- ~40 Individual Category Pages
- 1 Product Detail Template
- 1 Blog List Page
- 1 Blog Post Template
- 1 About Page
- 1 Contact Page
- 6+ Admin Panel Pages

**Estimated Build Time:** 6-8 weeks  
**Complexity Level:** Medium-High  
**Tech Stack:** Next.js + Supabase + Tailwind CSS (recommended)

---

**Document Version:** 1.0  
**Last Updated:** February 15, 2025  
**Prepared For:** Antigravity Framework Implementation  
**Author:** Claude (Anthropic)

---

END OF IMPLEMENTATION GUIDE
