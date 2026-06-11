# 🎬 STREAMFLIX - Full-Stack Video Streaming Application

A premium, scale-optimized video streaming architecture built to replicate Netflix's core experiences. This project focuses heavily on video delivery optimization, lazy loading large assets, fluid micro-interactions, and tracking user watching progress in real time.

## ✨ Key Features
* **🍿 Adaptive Video Streaming:** Seamless video delivery using optimized media content nodes with custom controls.
* **⏳ Resume Watching:** Backend architecture that saves user movie progress to the exact second, allowing users to pick up where they left off.
* **🔍 Instant Search & Recommendation:** Fuzzy search implementation over genres, titles, and cast members with optimized querying.
* **✨ Cinematic UI/UX:** Built with complex fluid animations via Framer Motion, skeleton loading screens, and responsive adaptive grids.
* **📋 My List & Favorites:** Dynamic list management leveraging high-performance relational database structures.

## 🛠️ Technical Stack
* **Frontend:** `Next.js 14/15` • `Framer Motion` • `TailwindCSS` • `Context API`
* **Backend:** `NestJS` • `TypeScript` • `Stream Pipes`
* **Database & Storage:** `PostgreSQL` • `Prisma ORM` • `AWS S3 / Cloudinary` (For secure video & asset asset storage)
* **Deployment:** `Railway` • `Vercel`

## 📐 Architecture & Media Optimization
* Engineered custom NestJS stream controllers to pipe video data chunk-by-chunk, minimizing memory overhead and saving server bandwidth.
* Accelerated layout paint times by applying strict Next.js Image optimization and asset lazy-loading, hitting a **95+ Lighthouse Performance Score**.

---

## 💻 Getting Started

1. **Clone the repo:** `git clone https://github.com/YOUR_USERNAME/streamflix-video-streaming.git`
2. **Install deps:** `npm install`
3. **Setup environment:** Create a `.env` file with `DATABASE_URL`, `CLOUDINARY_URL`, and `JWT_SECRET`.
4. **Run migrations:** `npx prisma migrate dev`
5. **Start dev server:** `npm run dev`
