import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ sent: 0, replies: 0, group: 'Loading...', status: 'Active' });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://vixen-mkjh.onrender.com/api/stats");
        const json = await res.json();
        setData({ sent: json.messages_sent, replies: json.ai_replies, group: json.active_group, status: json.status });
      } catch (e) { console.log(e); }
    };
    fetchStats();
    setInterval(fetchStats, 10000);
  }, []);

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>
      <h1 style={{color:'#3b82f6', fontSize:'40px', fontWeight:'900'}}>VIXEN <span style={{color:'#fff'}}>OS</span></h1>
      <p style={{color:'#444', fontSize:'10px', letterSpacing:'3px', marginBottom:'50px'}}>MANTU AI FOUNDER EDITION</p>
      
      <div style={{display:'flex', gap:'20px', marginBottom:'40px'}}>
        <div style={{background:'#111', padding:'30px', borderRadius:'25px', border:'1px solid #222', textAlign:'center', width:'150px'}}>
          <div style={{color:'#888', fontSize:'10px', marginBottom:'10px'}}>SENT</div>
          <div style={{fontSize:'40px', fontWeight:'bold', color:'#4ade80'}}>{data.sent}</div>
        </div>
        <div style={{background:'#111', padding:'30px', borderRadius:'25px', border:'1px solid #222', textAlign:'center', width:'150px'}}>
          <div style={{color:'#888', fontSize:'10px', marginBottom:'10px'}}>REPLIES</div>
          <div style={{fontSize:'40px', fontWeight:'bold', color:'#60a5fa'}}>{data.replies}</div>
        </div>
      </div>

      <div style={{background:'linear-gradient(to bottom, #111, #000)', padding:'30px', borderRadius:'30px', border:'1px solid #222', width:'350px', textAlign:'center'}}>
        <div style={{color:'#555', fontSize:'10px', marginBottom:'15px'}}>LIVE TARGETING</div>
        <div style={{fontSize:'25px', fontWeight:'bold', textTransform:'uppercase', color:'#fff'}}>{data.group}</div>
      </div>
    </div>
  );
}
