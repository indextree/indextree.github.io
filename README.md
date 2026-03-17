# Changmin's Blog

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🛠️ Tech Stack

- **Framework**: [Astro 5.17](https://astro.build/) - Static site generator
- **Adapter**: [Cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) - SSR adapter for dynamic routes (you can use any other adapter)
- **Components**: [Svelte 5](https://svelte.dev/) - Interactive components with runes
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **Content**: Astro Content Collections - Type-safe markdown content
- **Images**: Astro Assets - Optimized image processing

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/indextree/indextree.github.io
cd indextree.github.io

# Install dependencies
npm install
```

### 2. Development Server

```bash
# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your multilingual site!

---

## 📁 Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── assets/          # Assets
│   ├── components/      # Reusable components
│   ├── content/         # Content collections (blog, authors)
│   ├── data/            # Navigation and configuration
│   ├── i18n/            # Translation utilities and routes
│   ├── layouts/         # Page layouts
│   ├── locales/         # Translation files (en, sl)
│   ├── pages/           # File-based routing with [dynamic] params
│   ├── styles/          # Global styles
│   └── utils/           # Utility functions
```

---

## 📝 Adding New Pages

1. **Create page file**: `src/pages/[your-route]/[...index].astro`
2. **Add route translations**: Update `src/i18n/routes.ts`
3. **Add translations**: Create files in `src/locales/en/` and `src/locales/sl/`
4. **Update navigation**: Modify `src/data/navigationData.ts`

Detailed documentation with examples is available in the demo site.

---

## 🔧 Environment Variables

```bash
# .env
PRODUCTION_DOMAIN = "https://your-domain.com"  # Used to enable robots.txt
```

**Important:** Set your production domain for proper:

- Open Graph images in social media
- Canonical URLs for SEO
- Search engine indexing control

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

The site generates static files optimized for any hosting provider (Netlify, Vercel, Cloudflare Pages, etc.).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Astro-i18n-starter](https://github.com/Scorpio3310/astro-i18n-starter) - Theme of this blog
- [Astro](https://astro.build/) - Amazing static site generator
- [Svelte](https://svelte.dev/) - Excellent component framework
- [Tailwind CSS](https://tailwindcss.com/) - Great utility CSS framework
