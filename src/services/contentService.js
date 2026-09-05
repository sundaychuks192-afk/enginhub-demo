import { supabase, supabaseConfigured } from './supabaseClient';
import { courses as demoCourses } from '../data/demo';

export async function getCourses(filters = {}) {
  if (!supabaseConfigured) return demoCourses;
  let query = supabase.from('courses').select('*').order('code');
  if (filters.institution) query = query.eq('institution', filters.institution);
  if (filters.department) query = query.eq('department', filters.department);
  if (filters.level) query = query.eq('level', filters.level);
  if (filters.semester) query = query.eq('semester', filters.semester);
  const { data, error } = await query;
  if (error || !data?.length) return demoCourses;
  return data.map(c => ({ ...c, topics: c.topics ?? 0, progress: c.progress ?? 0, image: c.image_url || demoCourses.find(d => d.code === c.code)?.image }));
}

export async function getTopic(topicId) {
  if (!supabaseConfigured || !topicId) return null;
  const { data, error } = await supabase.from('topics').select('*, courses(*)').eq('id', topicId).single();
  if (error) throw error;
  return data;
}

export async function getNotes({ courseId, topicId } = {}) {
  if (!supabaseConfigured) return [];
  let query = supabase.from('notes').select('*').eq('is_published', true).order('created_at', { ascending: false });
  if (courseId) query = query.eq('course_id', courseId);
  if (topicId) query = query.eq('topic_id', topicId);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function createNote({ title, description, filePath, fileType, courseId, topicId, userId }) {
  if (!supabaseConfigured) throw new Error('Supabase is not configured. Add your Vercel environment variables first.');
  const { data, error } = await supabase.from('notes').insert({
    title, description, file_path: filePath, file_type: fileType, course_id: courseId || null, topic_id: topicId || null, uploaded_by: userId, is_published: true
  }).select().single();
  if (error) throw error;
  return data;
}
