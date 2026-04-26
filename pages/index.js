import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ 
    messages_sent: 0, 
    ai_replies: 0, 
    active_group: 'SCANNING...', 
    status: 'CONNECTING...',
    last_ping: 'NEVER'
  });

  // Aapka Updated Backend URL
  const API_URL = "https://vixen-nkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Backend Offline');
        const json = await res.json();
        setData({
          messages_sent: json.messages_sent || 0,
          ai_replies: json.ai_replies || 0,
          active_group: json.active_group || 'INITIALIZING...',
          status: json.status || 'ACTIVE',
          last_ping: new Date().toLocaleTimeString()
        });
      } catch (e) {
        setData(prev => ({ ...prev, status: 'BACKEND OFFLINE' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Har 5 seconds mein live update
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: '#000',
      color: '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px',
      overflow: 'hidden'
    }}>
      
      {/* Top Status Badge */}
      <div style={{
        position: 'absolute',
        top: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255,255,255,0.03)',
        padding: '10px 25px',
        borderRadius: '100px',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          height: '10px',
          width: '10px',
          background: data.status.includes('OFFLINE') ? '#ff4b2b' : '#4ade80',
          borderRadius: '50%',
          boxShadow: data.status.includes('OFFLINE') ? '0 0 15px #ff4b2b' : '0 0 15px #4ade80'
        }}></div>
        <span style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '3px', color: '#fff' }}>{data.status}</span>
      </div>

      {/* Main Branding */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '70px', 
          fontWeight: '900', 
          letterSpacing: '-4px', 
          margin: '0',
          background: 'linear-gradient(to right, #3b82f6, #60a5fa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>VIXEN <span style={{ color: '#fff', WebkitTextFillColor: '#fff' }}>OS</span></h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.2)', 
          fontSize: '11px', 
          letterSpacing: '6px', 
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>Mantu AI Founder Edition</p>
      </div>
      
      {/* Stats Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px', 
        width: '100%', 
        maxWidth: '450px',
        marginBottom: '30px'
      }}>
        <div style={statCardStyle}>
          <div style={labelStyle}>MESSAGES SENT</div>
          <div style={{ fontSize: '50px', fontWeight: '900', color: '#4ade80' }}>{data.messages_sent}</div>
        </div>
        <div style={statCardStyle}>
          <div style={labelStyle}>AI REPLIES</div>
          <div style={{ fontSize: '50px', fontWeight: '900', color: '#3b82f6' }}>{data.ai_replies}</div>
        </div>
      </div>

      {/* Targeting Monitor */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 100%)',
        padding: '40px',
        borderRadius: '40px',
        border: '1px solid rgba(255,255,255,0.05)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <div style={{ color: '#444', fontSize: '10px', marginBottom: '15px', fontWeight: '900', letterSpacing: '4px' }}>LIVE RADAR FOCUS</div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '900', 
          textTransform: 'uppercase', 
          color: '#fff',
          fontStyle: 'italic',
          letterSpacing: '-1px'
        }}>{data.active_group}</div>
      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <p style={{ color: '#222', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>
          SECURE ENCRYPTED TERMINAL // LAST_PING: {data.last_ping}
        </p>
      </div>
    </div>
  );
}

// Styles
const statCardStyle = {
  background: 'rgba(255,255,255,0.02)',
  padding: '35px 20px',
  borderRadius: '35px',
  border: '1px solid rgba(255,255,255,0.05)',
  textAlign: 'center',
  backdropFilter: 'blur(10px)'
};

const labelStyle = {
  color: '#555',
  fontSize: '10px',
  marginBottom: '15px',
  fontWeight: 'bold',
  letterSpacing: '2px'
};
