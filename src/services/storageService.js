import { supabase, supabaseConfigured } from './supabaseClient';

export async function uploadNoteFile(file, userId) {
  if (!supabaseConfigured) throw new Error('Supabase is not configured.');
  if (!file) throw new Error('Choose a file first.');
  if (!userId) throw new Error('Your account session is missing. Please sign in again.');
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
  const path = `${userId}/${Date.now()}-${safeName}`;
  const { data, error } = await supabase.storage.from('engihub-notes').upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (error) throw error;
  return data.path;
}

export async function getNoteUrl(path, expiresIn = 3600) {
  if (!supabaseConfigured || !path) return null;
  const { data, error } = await supabase.storage.from('engihub-notes').createSignedUrl(path, expiresIn);
  if (error) throw error;
  return data.signedUrl;
}
