import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    messages_sent: 0,
    ai_replies: 0,
    status: 'Initializing...',
    active_group: 'Scanning'
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://vixen-mkjh.onrender.com/api/stats");
        const data = await res.json();
        setStats({
          messages_sent: data.messages_sent || 0,
          ai_replies: data.ai_replies || 0,
          status: data.status || 'Active',
          active_group: data.active_group || 'Scanning...'
        });
      } catch (e) { console.log("Offline"); }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#000', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#3b82f6', marginBottom: '10px' }}>VIXEN AI OS</h1>
      <p style={{ color: '#444', fontSize: '10px', letterSpacing: '2px', marginBottom: '40px' }}>FOUNDER: MANTU AI</p>
      
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222', textAlign: 'center' }}>
          <div style={{ color: '#888', fontSize: '10px' }}>SENT</div>
          <div style={{ fontSize: '30px', color: '#4ade80' }}>{stats.messages_sent}</div>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px solid #222', textAlign: 'center' }}>
          <div style={{ color: '#888', fontSize: '10px' }}>REPLIES</div>
          <div style={{ fontSize: '30px', color: '#60a5fa' }}>{stats.ai_replies}</div>
        </div>
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center', background: '#0a0a0a', padding: '30px', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
        <div style={{ color: '#555', fontSize: '10px' }}>ACTIVE GROUP</div>
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '10px' }}>{stats.active_group}</div>
      </div>
    </div>
  );
}
