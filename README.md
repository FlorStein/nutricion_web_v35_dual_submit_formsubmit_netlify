# Landing — Lic. Agostina R. Gañaraz

## Publicar en Netlify
1. Crea una cuenta en Netlify y clic en **Add new site > Deploy manually**.
2. Arrastrá esta carpeta comprimida (o conectá el repo). Netlify detecta estático y publica.
3. En **Site settings > Domain management** asigná un subdominio o tu dominio propio.
4. Para formularios: en el HTML ya está `data-netlify="true"`. Verás envíos en **Forms**.

## Publicar en GitHub Pages
1. Creá un repo nuevo y subí todo el contenido.
2. En **Settings > Pages**, elegí **Deploy from branch**, branch `main`, carpeta `/ (root)`.
3. Guardá; GitHub te dará una URL. El archivo `.nojekyll` evita procesado de Jekyll.

## Usar dominio propio
- **Netlify**: apuntá un CNAME `www` a `your-site.netlify.app`. (Opcional A/AAAA para apex).
- **GitHub Pages**: en **Settings > Pages > Custom domain**, agregá tu dominio. Creá un `CNAME` a `username.github.io`.

## Analytics y campañas
- Reemplazá `G-XXXXXXXXXX` por tu **Google Analytics 4 Measurement ID**.
- Reemplazá `YOUR_PIXEL_ID` por tu **Meta Pixel ID**.
- Los campos UTM y clics se registran automáticamente (ver `script.js`).

## SEO
- Ajustá `<link rel="canonical">` y las etiquetas OpenGraph en `index.html`.
- Actualizá `sitemap.xml` con tu dominio.

