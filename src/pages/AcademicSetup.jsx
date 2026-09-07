import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { institutions, departments, levels } from '../data/demo';
import { getCourses, getUserEnrollments, saveCourseEnrollments, saveUserAcademicProfile } from '../services/contentService';
import { getSession } from '../services/authService';

const workingSchool = 'Petroleum Training Institute (PTI)';
const workingDepartment = 'Mechanical Engineering';

export default function AcademicSetup(){
 const nav=useNavigate();
 const existing=JSON.parse(localStorage.getItem('engihub_user')||'{}');
 const [school,setSchool]=useState(existing.institution||workingSchool);
 const [department,setDepartment]=useState(existing.department||workingDepartment);
 const [level,setLevel]=useState(existing.level||'ND1');
 const [semester,setSemester]=useState(existing.semester||'');
 const [courseList,setCourseList]=useState([]);
 const [selected,setSelected]=useState([]);
 const [loading,setLoading]=useState(false);
 const [message,setMessage]=useState('');
 const isWorking=school===workingSchool&&department===workingDepartment&&level==='ND1'&&semester==='Second Semester';

 useEffect(()=>{ if(!semester) return; setLoading(true); setMessage(''); getCourses({institution:school,department,level,semester}).then(async list=>{ setCourseList(list); const session=await getSession(); const ids=await getUserEnrollments(session?.user?.id); const valid=new Set(list.map(c=>c.id)); setSelected(ids.filter(id=>valid.has(id))); }).catch(e=>setMessage(e.message||'Unable to load courses from Supabase.')).finally(()=>setLoading(false)); },[school,department,level,semester]);

 const save=async()=>{
   if(!semester){setMessage('Choose a semester first.');return;}
   if(!isWorking){setMessage('This academic combination is coming soon. Choose PTI → Mechanical Engineering → ND1 → Second Semester for the current workspace.');return;}
   if(!courseList.length){setMessage('No courses have been published for this academic combination yet.');return;}
   if(!selected.length){setMessage('Select at least one course to continue.');return;}
   setLoading(true);setMessage('');
   try{const session=await getSession(); if(!session?.user) throw new Error('Please sign in again.'); await saveUserAcademicProfile({userId:session.user.id,fullName:session.user.user_metadata?.full_name||existing.name,institution:school,department,level,semester}); await saveCourseEnrollments(session.user.id,selected); const user={...existing,institution:school,department,level,semester,courses:selected}; localStorage.setItem('engihub_user',JSON.stringify(user)); nav('/dashboard');}catch(e){setMessage(e.message||'Could not save your academic setup.')}finally{setLoading(false)}
 };
 const toggle=id=>setSelected(s=>s.includes(id)?s.filter(x=>x!==id):[...s,id]);
 return <div className="setup-page container-wide">
  <div className="setup-head"><span className="eyebrow">ACADEMIC WORKSPACE</span><h1>Choose your academic path.</h1><p>Your recommendations come directly from the real courses published in Supabase. Nothing is invented.</p></div>
  <div className="setup-grid">
   <section className="setup-card"><span className="eyebrow">01 • SCHOOL</span><h2>Select institution</h2><div className="option-list">{institutions.map(x=><button key={x} className={school===x?'option selected':'option'} onClick={()=>{setSchool(x);setSemester('');setMessage('')}}><span>{x===workingSchool?'●':'○'}</span><b>{x}</b><small>{x===workingSchool?'Working':'Coming Soon'}</small></button>)}</div></section>
   <section className="setup-card"><span className="eyebrow">02 • DEPARTMENT</span><h2>Select department</h2><div className="option-list">{departments.map(x=><button key={x} className={department===x?'option selected':'option'} onClick={()=>{setDepartment(x);setSemester('');setMessage('')}}><span>{x===workingDepartment?'●':'○'}</span><b>{x}</b><small>{x===workingDepartment&&school===workingSchool?'Working':'Coming Soon'}</small></button>)}</div></section>
  </div>
  <section className="setup-card levels-card"><span className="eyebrow">03 • LEVEL</span><h2>{department}</h2><div className="level-grid">{levels.map(x=><button key={x} className={level===x?'level selected':'level'} onClick={()=>{setLevel(x);setSemester('')}}><strong>{x}</strong><span>{x==='ND1'&&department===workingDepartment&&school===workingSchool?'Working':'Coming Soon'}</span></button>)}</div></section>
  <section className="setup-card semester-card"><div><span className="eyebrow">04 • SEMESTER</span><h2>Choose your semester</h2><p>Then EngiHub will fetch the recommended courses for that exact academic combination.</p></div><div className="semester-grid"><button className={semester==='First Semester'?'semester ready':'semester'} onClick={()=>setSemester('First Semester')}><span>01</span><div><b>First Semester</b><small>{school===workingSchool&&department===workingDepartment&&level==='ND1'?'Coming Soon':'Coming Soon'}</small></div></button><button className={semester==='Second Semester'?'semester ready':'semester'} onClick={()=>setSemester('Second Semester')}><span>02</span><div><b>Second Semester</b><small>{isWorking?'ACTIVE NOW':'Coming Soon'}</small></div></button></div></section>
  {semester&&<section className="setup-card"><span className="eyebrow">05 • RECOMMENDED COURSES</span><h2>{loading?'Loading courses…':courseList.length?`Select the courses you want (${selected.length}/${courseList.length})`:'No published courses yet'}</h2><p>{courseList.length?'Untick anything you do not want on your dashboard. These courses are coming from Supabase.':'This combination has no course records in Supabase yet, so EngiHub will not invent any.'}</p>{courseList.length?<div className="course-picks">{courseList.map(c=><button type="button" className={selected.includes(c.id)?'pick selected':'pick'} key={c.id} onClick={()=>toggle(c.id)}><span>{selected.includes(c.id)?'✓':'+'}</span><div><b>{c.code}</b><strong>{c.name}</strong><small>{c.semester} • {c.level}</small></div></button>)}</div>:<div className="setup-message">Coming Soon — publish the real course rows in Supabase when this academic workspace is ready.</div>} {isWorking&&courseList.length>0&&<button className="primary full" disabled={loading} onClick={save}>{loading?'Saving…':'Save my courses →'}</button>}{message&&<div className="setup-message">{message}</div>}</section>}
 </div>
}
