import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    messages_sent: 0,
    ai_replies: 0,
    status: 'Initializing...',
    active_group: 'Scanning',
    last_ping: 'Never'
  });

  const BACKEND_URL = "https://vixen-mkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        setStats({
          messages_sent: data.messages_sent || 0,
          ai_replies: data.ai_replies || 0,
          status: data.status || 'Active',
          active_group: data.active_group || 'Scanning...',
          last_ping: data.last_ping || 'Just now'
        });
      } catch (err) {
        setStats(prev => ({ ...prev, status: 'Backend Offline' }));
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ borderBottom: '1px solid #222', paddingBottom: '20px', marginBottom: '40px' }}>
        <h1 style={{ margin: 0, fontSize: '28px', color: '#3b82f6', letterSpacing: '-1px' }}>VIXEN AI <span style={{color: '#fff'}}>OS</span></h1>
        <p style={{ margin: '5px 0 0', color: '#555', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>FOUNDER: MANTU AI</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
          <p style={{ color: '#444', fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>TOTAL MESSAGES SENT</p>
          <h2 style={{ fontSize: '42px', margin: 0, color: '#4ade80' }}>{stats.messages_sent}</h2>
        </div>
        <div style={{ background: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
          <p style={{ color: '#444', fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>AI SMART REPLIES</p>
          <h2 style={{ fontSize: '42px', margin: 0, color: '#60a5fa' }}>{stats.ai_replies}</h2>
        </div>
        <div style={{ background: '#0a0a0a', padding: '25px', borderRadius: '20px', border: '1px solid #1a1a1a' }}>
          <p style={{ color: '#444', fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>ENGINE STATUS</p>
          <h2 style={{ fontSize: '20px', margin: 0, color: '#fbbf24' }}>{stats.status}</h2>
        </div>
      </div>

      <div style={{ background: 'linear-gradient(145deg, #0f172a, #000)', padding: '50px', borderRadius: '30px', border: '1px solid #1e293b', textAlign: 'center' }}>
        <p style={{ color: '#64748b', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px', letterSpacing: '3px' }}>CURRENT TARGET GROUP</p>
        <h2 style={{ fontSize: '60px', fontWeight: '900', margin: 0, textTransform: 'uppercase', italic: 'true' }}>{stats.active_group}</h2>
        <div style={{ marginTop: '20px', fontSize: '10px', color: '#334155' }}>GLOBAL REVENUE MODE ACTIVE</div>
      </div>

      <footer style={{ marginTop: '60px', textAlign: 'center', color: '#333', fontSize: '10px', letterSpacing: '1px' }}>
        SYSTEM_V2.0_ENCRYPTED_ACCESS // {new Date().getFullYear()}
      </footer>
    </div>
  );
}
