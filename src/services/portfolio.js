import { supabase } from '../lib/supabaseClient.js';

async function signImagePath(path) {
  if (!supabase || !path) return null;
  const { data, error } = await supabase.storage.from('project-images').createSignedUrl(path, 60 * 60);
  return error ? null : data?.signedUrl || null;
}

export const DEFAULT_SITE_SETTINGS = {
  "heroTitle": "Building useful digital experiences",
  "heroAccent": "that move work forward.",
  "heroDescription": "I create modern websites and practical automation experiences that help businesses communicate better, work smarter, and grow with confidence.",
  "heroPrimaryLabel": "Explore my work",
  "heroSecondaryLabel": "Let’s talk",
  "heroMeta": [
    "Web development",
    "Workflow automation",
    "Communication tools"
  ],
  "trustItems": [
    "THOUGHTFUL BY DESIGN",
    "BUILT FOR REAL PEOPLE",
    "FOCUSED ON USEFUL OUTCOMES"
  ],
  "servicesEyebrow": "WHAT I DO",
  "servicesTitle": "Technology that solves,",
  "servicesAccent": "not just impresses.",
  "servicesDescription": "From a clear online presence to smoother customer communication, I focus on making digital tools practical and easy to use.",
  "services": [
    {
      "title": "Web development",
      "description": "Responsive websites and landing pages designed to explain your offer clearly and help visitors take the next step.",
      "label": "Discuss a website",
      "category": "01 / WEB",
      "visible": true
    },
    {
      "title": "Workflow automation",
      "description": "Connect repetitive tasks and business tools into more consistent workflows, reducing manual follow-up.",
      "label": "Explore automation",
      "category": "02 / AUTOMATION",
      "visible": true
    },
    {
      "title": "Customer messaging",
      "description": "Practical WhatsApp and SMS notification experiences that help businesses keep conversations moving.",
      "label": "Improve communication",
      "category": "03 / COMMUNICATION",
      "visible": true
    }
  ],
  "projectsEyebrow": "SELECTED WORK",
  "projectsTitle": "Projects with a",
  "projectsAccent": "clear purpose.",
  "projectsDescription": "",
  "showTrustStrip": true,
  "showHeroArtwork": true,
  "showServices": true,
  "showProjects": true,
  "showAboutBand": true,
  "showFinalCta": true,
  "sectionOrder": [
    "trust",
    "services",
    "projects",
    "about",
    "cta"
  ],
  "appearance": {
    "background": "#0b0d1a",
    "panel": "#131627",
    "text": "#eceef8",
    "muted": "#a3a9c9",
    "accent": "#8b5cf6",
    "accentSecondary": "#4f7cff",
    "headingFont": "Sora",
    "bodyFont": "DM Sans",
    "contentWidth": 1200,
    "sectionSpacing": 4.5
  }
};

export async function getSiteSettings() {
  if (!supabase) return { data: DEFAULT_SITE_SETTINGS, error: new Error('Supabase is not configured.') };
  const { data, error } = await supabase.from('site_settings').select('settings').eq('id', 'main').maybeSingle();
  return { data: { ...DEFAULT_SITE_SETTINGS, ...(data?.settings || {}), appearance: { ...DEFAULT_SITE_SETTINGS.appearance, ...(data?.settings?.appearance || {}) } }, error };
}

export async function getPublishedProjects() {
  if (!supabase) return { data: [], error: new Error('Supabase is not configured.') };
  const result = await supabase.from('projects').select('*').eq('published', true).order('display_order', { ascending: true });
  if (result.error || !result.data?.length) return result;
  const { data: images, error: imageError } = await supabase.from('project_images').select('project_id,storage_path,sort_order').in('project_id', result.data.map(p => p.id)).order('sort_order', { ascending: true });
  const firstImageByProject = new Map();
  for (const image of images || []) if (!firstImageByProject.has(image.project_id)) firstImageByProject.set(image.project_id, image.storage_path);
  const data = await Promise.all(result.data.map(async project => ({ ...project, preview_image_url: project.thumbnail_url || await signImagePath(firstImageByProject.get(project.id)) })));
  return { ...result, data, error: imageError || result.error };
}
export async function getVisibleSkills() {
  if (!supabase) return { data: [], error: new Error('Supabase is not configured.') };
  return supabase.from('Skills').select('*').eq('visible', true).order('display_order', { ascending: true });
}
export async function getProfile() {
  if (!supabase) return { data: null, error: null };
  return supabase.from('profiles').select('*').order('id', { ascending: true }).limit(1).maybeSingle();
}
export async function getSignedProjectImage(path) { return signImagePath(path); }
