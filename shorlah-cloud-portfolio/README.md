# Shorlah Cloud Portfolio

Responsive React + Vite portfolio connected to the existing Supabase project and ready for Netlify's build system.

## Included
- Home, About, Projects, project case study, Skills, and Contact pages.
- Public pages read published projects, visible skills, and the profile row from Supabase.
- Contact form submits enquiries to `public.contact_messages`.
- Private `/admin` login using Supabase Auth plus the existing `public.is_admin()` check.
- Admin overview, edit profile details, create/edit/publish/unpublish projects, upload project images, add/show/hide skills, and review/mark contact messages as read.
- Netlify single-page route fallback in `netlify.toml`.
- NPFL+ stays unpublished by default because its current description is explicitly a placeholder.

## Supabase configuration
The app has the project's public Supabase URL and publishable key as safe browser fallbacks in `src/lib/supabaseClient.js`. These are public values, not service-role credentials. You may override them with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables.

Never add a service-role key or secret key to this project. RLS is relied on for private data protection.

## Run/build
1. Install Node.js and npm.
2. Run `npm install`.
3. Run `npm run dev` to work locally.
4. Run `npm run build`; the deployable site is output to `dist/`.

Netlify uses `npm run build` and publishes `dist/` according to `netlify.toml`.

## Admin access
Visit `/admin` and sign in using the existing Supabase Auth account whose UUID is already present in `public.admin_users`. The dashboard does not create accounts or reset passwords. If the account cannot sign in, reset its password through Supabase Auth before using the dashboard. Access is checked server-side through the existing database function and table policies; hiding the admin page is not the security boundary.

## Content and limitations to review before launch
- The current NPFL+ row remains a draft (`published=false`) and includes placeholder text. Replace it with an accurate, reviewed case study before publishing.
- Project image uploads are supported through the admin editor. The bucket is private; images use signed URLs and are intended to be displayed only for published projects (or to an authorised admin).
- The dashboard does not yet delete projects/messages/skills or remove previously uploaded images.
- Supabase security advisors previously reported that `is_admin()` and `contact_messages_throttle()` are executable through the public API and that leaked-password protection is disabled. Review those findings in Supabase before treating the project as production-hardened. No database security changes are made by this frontend.


## Social Media Manager update

A Social links section is available in `/admin`. Before using it, run `supabase/migrations/202610220001_social_links.sql` once in the Supabase SQL Editor. See `SOCIAL-LINKS-SETUP.txt` for deployment and security notes. Enabled links are fetched dynamically by the public layout.


## Release notes — 22 October 2026

- The official Shorlah Cloud monogram is bundled at `public/shorlah-cloud-logo.png` and used in the public header, admin sidebar, admin sign-in, and browser favicon.
- Admin route: `/admin`. It uses the existing Supabase Auth account and checks `public.is_admin()` before showing dashboard data.
- Dashboard sections: overview, projects (create/edit/publish/unpublish), skills/tools (add/show/hide), social media manager (add/edit/show/hide/delete), profile details, and contact messages.
- Supabase URL and browser publishable key are supplied in `.env.example` and as safe public-client defaults in `src/lib/supabaseClient.js`. Do not add a service-role/secret key.
- Apply `supabase/migrations/202610220001_social_links.sql` in the existing Supabase project if it has not already been applied. It depends on the existing `public.is_admin()` authorization function.
- Production build command: `npm install` then `npm run build`; Netlify publishes `dist`. The current working environment could not download npm dependencies, so this package has not been certified by a completed Vite production build.
