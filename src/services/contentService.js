import { supabase, supabaseConfigured } from './supabaseClient';
import { courses as demoCourses } from '../data/demo';

const imageByCode = Object.fromEntries(demoCourses.map(c => [c.code, c.image]));

export async function getCourses(filters = {}) {
  if (!supabaseConfigured) return [];
  let query = supabase.from('courses').select('*').order('code');
  if (filters.institution) query = query.eq('institution', filters.institution);
  if (filters.department) query = query.eq('department', filters.department);
  if (filters.level) query = query.eq('level', filters.level);
  if (filters.semester) query = query.eq('semester', filters.semester);
  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map(c => ({ ...c, topics: c.topics ?? 0, progress: c.progress ?? 0, image: c.image_url || imageByCode[c.code] || '' }));
}

export async function getUserEnrollments(userId) {
  if (!supabaseConfigured || !userId) return [];
  const { data, error } = await supabase.from('course_enrollments').select('course_id').eq('user_id', userId);
  if (error) throw error;
  return (data || []).map(x => x.course_id);
}

export async function saveUserAcademicProfile({ userId, fullName, institution, department, level, semester }) {
  if (!supabaseConfigured || !userId) throw new Error('Supabase is not configured.');
  const { data, error } = await supabase.from('profiles').upsert({
    id: userId, full_name: fullName || null, institution, department, level, semester, updated_at: new Date().toISOString()
  }).select().single();
  if (error) throw error;
  return data;
}

export async function saveCourseEnrollments(userId, courseIds) {
  if (!supabaseConfigured || !userId) throw new Error('Supabase is not configured.');
  const { error: delError } = await supabase.from('course_enrollments').delete().eq('user_id', userId);
  if (delError) throw delError;
  if (!courseIds?.length) return [];
  const rows = courseIds.map(course_id => ({ user_id: userId, course_id }));
  const { data, error } = await supabase.from('course_enrollments').insert(rows).select();
  if (error) throw error;
  return data || [];
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

export async function createNote({ title, description, filePath, fileType, courseId, topicId, userId, isPublished = false }) {
  if (!supabaseConfigured) throw new Error('Supabase is not configured. Add your Vercel environment variables first.');
  const { data, error } = await supabase.from('notes').insert({
    title, description, file_path: filePath, file_type: fileType, course_id: courseId || null, topic_id: topicId || null, uploaded_by: userId, is_published: isPublished
  }).select().single();
  if (error) throw error;
  return data;
}
