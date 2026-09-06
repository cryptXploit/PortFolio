# 🛡️ Nexus - Advanced CyberSecurity & AI Portfolio

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E.svg)](https://supabase.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

> **A highly interactive, dynamic, and fully admin-controlled portfolio template built for Cyber Security Analysts, AI Developers, and Tech Professionals.**

Nexus is not just a static portfolio; it's a complete **Content Management System (CMS)** disguised as a cutting-edge cyberpunk/terminal interface. Control every text, animation, project, and testimonial directly from a secure hidden Admin Panel—no coding required after setup!

## ✨ Why This Template Goes Viral?
- **Zero-Code Updates:** Once deployed, you never have to touch the code to update your portfolio. Everything is managed via a sleek `SYS_ADMIN_CONSOLE`.
- **Extreme Aesthetics:** Terminal-style inputs, typewriter effects, glassmorphism, and cyberpunk neon glows perfect for the modern tech landscape.
- **Trust Metrics Built-in:** Client testimonials feature Upwork/Fiverr-style star ratings, "Verified Client" blue badges, and sys-admin resolution logs to build extreme trust with your clients.
- **Data Protection:** Built-in frontend security shields to prevent unauthorized drag/drop and right-clicking on your high-quality images.
- **100% Open Source:** Fork it, tweak it, and deploy it as your own!

---

## 🏗️ Architecture & Tech Stack

This project uses a modern headless architecture for ultimate performance and security:

- **Frontend:** React.js + Vite (Extremely fast HMR and optimized builds)
- **Styling:** Tailwind CSS (Fully supports Dynamic Dark/Light mode switching)
- **Animations:** Framer Motion (Complex physics-based animations, layout transitions)
- **Backend/Database:** Supabase (PostgreSQL, Row Level Security, Storage Buckets)
- **Icons:** Lucide React

### 🔄 Working Procedure
1. **Public View (`/`):** The app dynamically fetches your customized data via custom React Hooks (`useProfile`, `useProjects`, etc.) from Supabase and renders them using `framer-motion` for buttery smooth transitions.
2. **Secure Comm Channel:** The Contact section acts as a terminal interface, sending encrypted user messages directly to your Supabase `contacts` table.
3. **SYS_ADMIN_CONSOLE (`/admin`):** Secured by Supabase Auth. Allows the portfolio owner to execute CRUD operations on Projects, Skills, Testimonials, Media, and Bio dynamically. No more touching the IDE to add a new project!

---

## 🚀 Getting Started (How to use)

### 1. Clone the Repository
```bash
git clone https://github.com/cryptXploit/PortFolio.git
cd PortFolio
npm install
```

### 2. Supabase Setup
Create a new project on [Supabase](https://supabase.com/). You will need to create the following tables in your SQL Editor:

**1. General Tables & Storage**
Create a storage bucket named `project-media` and set it to **Public**.

**2. `contacts` Table**
```sql
CREATE TABLE IF NOT EXISTS public.contacts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all inserts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON public.contacts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete" ON public.contacts FOR DELETE TO authenticated USING (true);
```

**3. `testimonials` Table**
```sql
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text,
  content text NOT NULL,
  avatar_url text,
  resolution_text text,
  is_verified boolean DEFAULT false,
  project_reference text,
  impact_metrics text,
  timeline_date text,
  rating text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow authenticated full access" ON public.testimonials FOR ALL TO authenticated USING (true);
CREATE POLICY "Allow public read" ON public.testimonials FOR SELECT TO anon USING (true);
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Locally
```bash
npm run dev
```

---

## 🎯 How to Customize & Make it Yours

1. **Deploy your app** (Vercel is highly recommended).
2. **Go to `/admin`** on your deployed site.
3. **Login** using your Supabase Auth credentials (set up an admin user in Supabase Authentication).
4. **Modify Everything:** 
   - Change the "Role Texts" (it auto-generates the MacBook typewriter effect).
   - Upload new Projects (supports multiple images and YouTube video URLs!).
   - Add Testimonials and toggle the "Verified Badge" for instant trust.
   - Read and manage messages sent from your Contact form via the `INBOX_LOGS`.

---

## 📜 License & Attribution

This project is open-sourced under the **MIT License**.

You are 100% free to clone this repository, modify it, and use it as your own personal portfolio to land jobs or clients! 

**⚠️ Attribution Requirement:** 
As per the MIT License, you must include the original copyright notice in your clone. **Do not remove the original creator's credit.** If you build upon this to create your own template or modify it for personal use, you must credit **[MD OMAR SUNNY (cryptXploit)](https://github.com/cryptXploit)** as the original architect. Claiming the core structure of this CMS as your own original work is strictly prohibited by the license.

---
⭐ **If you found this template helpful, please give it a STAR to support open-source development!** ⭐
