export const institutions = ['Petroleum Training Institute (PTI)','University of Lagos','University of Nigeria, Nsukka','Federal University of Technology, Owerri','University of Benin','University of Port Harcourt'];
export const departments = ['Mechanical Engineering','Electrical/Electronic Engineering','Civil Engineering','Chemical Engineering','Petroleum Engineering','Mechatronics Engineering'];
export const levels = ['ND1','ND2','HND1','HND2'];
export const activeProgram = { institution:'Petroleum Training Institute (PTI)', department:'Mechanical Engineering', level:'ND1', semester:'Second Semester' };
export const courses = [
 {code:'MEC 124',name:'Engineering Mechanics II',progress:68,topics:12,image:'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85'},
 {code:'MEC 125',name:'Machine Tools & Practice',progress:42,topics:9,image:'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85'},
 {code:'MEC 126',name:'Workshop Technology',progress:25,topics:14,image:'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=1200&q=85'},
 {code:'MEC 127',name:'Technical Drawing II',progress:15,topics:10,image:'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85'}
];
export const leaderboard = [['Chinedu',1480],['Gift',1410],['Emmanuel',1260],['Precious',1180],['John',1020],['Aisha',960],['Daniel',920]];
export const readiness = [['Linear Motion',92],['Projectile Motion',78],['Work & Energy',61],['Momentum',43]];
export const questions = [
 {level:'Easy',q:'A body starts from rest with acceleration 2 m/s² for 5 s. What is its final velocity?',options:['5 m/s','10 m/s','15 m/s','20 m/s'],answer:1,explanation:'Use v = u + at. With u = 0, a = 2 m/s² and t = 5 s, v = 10 m/s.'},
 {level:'Medium',q:'A car moves at 10 m/s and accelerates at 2 m/s² for 5 s. What distance does it cover?',options:['50 m','60 m','75 m','100 m'],answer:2,explanation:'Use s = ut + ½at² = 10×5 + ½×2×25 = 75 m.'},
 {level:'Hard',q:'A machine part slows from 18 m/s to 6 m/s over 4 s. What is its average acceleration?',options:['-2 m/s²','-3 m/s²','3 m/s²','6 m/s²'],answer:1,explanation:'Average acceleration is (v-u)/t = (6-18)/4 = -3 m/s².'}
];
export const flashcards = [['What is acceleration?','The rate of change of velocity with respect to time.'],['SI unit of acceleration?','m/s².'],['Equation when time is not given?','v² = u² + 2as.'],['What does displacement tell an engineer?','The change in position of an object in a chosen direction.']];
export const topicSections = ['Introduction','Why it matters','Engineering explanation','Formula & variables','Worked example','Real-world application','Video explainer','Audio overview','Flashcards','Practice questions','PTI past questions'];
export const ptiQuestions = [
 {year:'2025',q:'A vehicle moves from rest with constant acceleration. Explain the physical meaning of the area under its velocity-time graph.',answer:'The area under a velocity-time graph represents displacement. For constant velocity it is a rectangle; for changing velocity it can form a triangle or trapezium.'},
 {year:'2024',q:'State Newton’s second law and explain one engineering application.',answer:'Newton’s second law states that the net force on a body equals mass times acceleration. Engineers use it to size actuators, estimate vehicle acceleration and analyse machine components.'},
 {year:'2023',q:'A 5 kg component experiences a net force of 20 N. Determine its acceleration.',answer:'a = F/m = 20/5 = 4 m/s².'}
];
