# Küçükdeveci İnşaat Web Sitesi

Bu proje Next.js ile geliştirilmiş kurumsal web sitesi ve yönetim panelidir.

## Projeyi Çalıştırma (Antigravity veya Terminal ile)

Eğer bu projeyi bir AI asistanına (Antigravity gibi) veriyorsanız, sadece şu komutu söylemeniz yeterlidir:
**"Bu projeyi çalıştır."**

Manuel olarak çalıştırmak isterseniz:

1.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

2.  Geliştirme sunucusunu başlatın:
    ```bash
    npm run dev
    ```

3.  Tarayıcınızda açın:
    -   **Web Sitesi:** [http://localhost:3000](http://localhost:3000)
    -   **Yönetim Paneli:** [http://localhost:3000/admin](http://localhost:3000/admin)

## Özellikler

*   **Dinamik Menü Yönetimi:** `/admin/settings/menu` üzerinden header menüleri düzenlenebilir.
*   **Ürün Yönetimi:** `/admin/products` üzerinden ürün eklenebilir/düzenlenebilir.
*   **Blog Sistemi:** `/admin/blog` üzerinden blog yazıları yönetilebilir.
*   **Referanslar:** `/admin/reference` üzerinden referans logoları eklenebilir.
*   **Veri Kaynağı:** Tüm veriler `src/data/db.json` dosyasında tutulur. Veritabanı kurulumu gerektirmez.

## Notlar

*   Zip dosyasını açtıktan sonra `npm install` yapılması gerekmektedir (node_modules klasörü zip içinde yoksa).
*   Yönetim paneli için şifre koruması şu anlık yoktur (yerel çalışma için).
