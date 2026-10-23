import { supabase } from '../lib/supabaseClient.js';

async function signImagePath(path) {
  if (!supabase || !path) return null;
  const { data, error } = await supabase.storage.from('project-images').createSignedUrl(path, 60 * 60);
  return error ? null : data?.signedUrl || null;
}

export async function getPublishedProjects() {
  if (!supabase) return { data: [], error: new Error('Supabase is not configured.') };
  const result = await supabase.from('projects').select('*').eq('published', true).order('display_order', { ascending: true });
  if (result.error || !result.data?.length) return result;
  const { data: images, error: imageError } = await supabase.from('project_images').select('project_id,storage_path,sort_order').in('project_id', result.data.map(p => p.id)).order('sort_order', { ascending: true });
  const firstImageByProject = new Map();
  for (const image of images || []) if (!firstImageByProject.has(image.project_id)) firstImageByProject.set(image.project_id, image.storage_path);
  const data = await Promise.all(result.data.map(async project => ({
    ...project,
    preview_image_url: project.thumbnail_url || await signImagePath(firstImageByProject.get(project.id)),
  })));
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
