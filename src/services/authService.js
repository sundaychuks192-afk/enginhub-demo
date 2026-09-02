import { supabase, supabaseConfigured } from './supabaseClient';

function requireSupabase(){
  if(!supabaseConfigured) throw new Error('Supabase is not connected. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel Environment Variables, then redeploy.');
}

export async function login(email,password){
  requireSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if(error) throw error;
  return data.user;
}

export async function signup(email,password,metadata={}){
  requireSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options:{ data: metadata }
  });
  if(error) throw error;
  return data;
}

export async function loginWithGoogle(){
  requireSupabase();
  const { error } = await supabase.auth.signInWithOAuth({
    provider:'google',
    options:{ redirectTo: `${window.location.origin}/setup` }
  });
  if(error) throw error;
}

export async function logout(){
  if(supabaseConfigured) await supabase.auth.signOut();
  localStorage.removeItem('engihub_user');
}

export async function getSession(){
  if(!supabaseConfigured) return null;
  const { data, error } = await supabase.auth.getSession();
  if(error) throw error;
  return data.session;
}
