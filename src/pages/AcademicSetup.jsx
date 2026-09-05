import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { institutions, departments, levels } from '../data/demo';

const workingSchool = 'Petroleum Training Institute (PTI)';
const workingDepartment = 'Mechanical Engineering';

export default function AcademicSetup(){
 const nav=useNavigate();
 const existing=JSON.parse(localStorage.getItem('engihub_user')||'{}');
 const [school,setSchool]=useState(existing.institution||workingSchool);
 const [department,setDepartment]=useState(existing.department||workingDepartment);
 const [level,setLevel]=useState(existing.level||'ND1');
 const [semester,setSemester]=useState(existing.semester||'');
 const [completedFirst,setCompletedFirst]=useState(existing.firstSemesterCompleted||false);
 const [message,setMessage]=useState('');
 const isSchoolOk=school===workingSchool;
 const isDeptOk=department===workingDepartment;
 const isLevelOk=level==='ND1';
 const save=(nextSemester)=>{
  if(!isSchoolOk){setMessage('This institution is coming soon. Please select PTI for the current EngiHub workspace.');return;}
  if(!isDeptOk){setMessage('This department is coming soon in the current EngiHub release.');return;}
  if(!isLevelOk){setMessage('Only ND1 is active in the current EngiHub release.');return;}
  if(nextSemester==='First Semester'){setMessage('First Semester is coming soon in the current EngiHub release.');return;}
  
  const user={...existing,institution:school,department,level,semester:nextSemester,firstSemesterCompleted:completedFirst};
  localStorage.setItem('engihub_user',JSON.stringify(user));
  nav('/dashboard');
 };
 return <div className="setup-page container-wide">
  <div className="setup-head"><span className="eyebrow">ACADEMIC WORKSPACE</span><h1>Choose where you study.</h1><p>EngiHub keeps your academic structure separate from the shared virtual laboratories.</p></div>
  <div className="setup-grid">
   <section className="setup-card">
    <span className="eyebrow">01 • SCHOOL</span><h2>Select institution</h2>
    <div className="option-list">{institutions.map(x=><button key={x} className={school===x?'option selected':'option'} onClick={()=>{setSchool(x);setMessage('')}}><span>{x===workingSchool?'●':'○'}</span><b>{x}</b><small>{x===workingSchool?'Working':'Coming Soon'}</small></button>)}</div>
   </section>
   <section className="setup-card">
    <span className="eyebrow">02 • DEPARTMENT</span><h2>Select department</h2>
    <div className="option-list">{departments.map(x=><button key={x} className={department===x?'option selected':'option'} onClick={()=>{setDepartment(x);setMessage('')}}><span>{x===workingDepartment?'●':'○'}</span><b>{x}</b><small>{x===workingDepartment&&school===workingSchool?'Working':'Coming Soon'}</small></button>)}</div>
   </section>
  </div>
  <section className="setup-card levels-card">
   <span className="eyebrow">03 • LEVEL</span><h2>{department}</h2>
   <div className="level-grid">{levels.map(x=><button key={x} className={level===x?'level selected':'level'} onClick={()=>setLevel(x)}><strong>{x}</strong><span>{x==='ND1'&&department===workingDepartment&&school===workingSchool?'Working':'Coming Soon'}</span></button>)}</div>
  </section>
  <section className="setup-card semester-card">
   <div><span className="eyebrow">04 • ND1 ACADEMIC YEAR</span><h2>Choose your semester</h2><p>Both semesters belong to the same ND1 workspace. Progress carries forward.</p></div>
   <div className="semester-grid">
    <button className="semester disabled" onClick={()=>save('First Semester')}><span>01</span><div><b>First Semester</b><small>Coming Soon</small></div></button>
    <button className={completedFirst?'semester ready':'semester'} onClick={()=>save('Second Semester')}><span>02</span><div><b>Second Semester</b><small>ACTIVE NOW • Enter workspace</small></div></button>
   </div>
   <div className="setup-message">Second Semester is the current active semester for ND1 Mechanical Engineering. First Semester remains visible as an upcoming academic workspace and will be populated with its full content later.</div>
   {message&&<div className="setup-message">{message}</div>}
  </section>
 </div>
}
