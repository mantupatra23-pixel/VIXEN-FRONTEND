import React, { useState, useEffect } from 'react';

export default function VixenOS() {
  const [data, setData] = useState({
    messages_sent: 0,
    ai_replies: 0,
    active_group: 'SCANNING...',
    status: 'BOOTING...',
    logs: ["Initializing VIXEN Core...", "Connecting to Neural Network...", "Ready for Hunting."]
  });

  const API_URL = "https://vixen-nkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        
        setData(prev => ({
          ...prev,
          messages_sent: json.messages_sent || 0,
          ai_replies: json.ai_replies || 0,
          active_group: json.active_group || 'SCANNING...',
          status: json.status || 'ONLINE',
          // New log logic (Simulated for UI)
          logs: json.messages_sent > prev.messages_sent 
                ? [`[${new Date().toLocaleTimeString()}] New Lead Found in ${json.active_group}`, ...prev.logs].slice(0, 5)
                : prev.logs
        }));
      } catch (e) {
        setData(prev => ({ ...prev, status: 'OFFLINE' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={containerStyle}>
      {/* Glow Effect */}
      <div style={glowStyle}></div>

      {/* Header */}
      <header style={headerStyle}>
        <div>
          <h1 style={logoStyle}>VIXEN <span style={{color: '#fff'}}>OS</span></h1>
          <p style={subtitleStyle}>AUTONOMOUS REVENUE ENGINE v2.0</p>
        </div>
        <div style={statusBadgeStyle(data.status)}>
          <div style={pulseStyle(data.status)}></div>
          {data.status}
        </div>
      </header>

      {/* Main Grid */}
      <div style={gridStyle}>
        <StatCard label="TOTAL SENT" value={data.messages_sent} color="#4ade80" />
        <StatCard label="AI REPLIES" value={data.ai_replies} color="#60a5fa" />
      </div>

      {/* Target Radar */}
      <div style={radarCardStyle}>
        <p style={labelStyle}>LIVE TARGET RADAR</p>
        <h2 style={groupNameStyle}>{data.active_group}</h2>
        <div style={barContainer}><div style={barFill}></div></div>
      </div>

      {/* Live Logs Stream */}
      <div style={logContainerStyle}>
        <p style={labelStyle}>SYSTEM LOGS</p>
        <div style={logBoxStyle}>
          {data.logs.map((log, i) => (
            <div key={i} style={{color: i === 0 ? '#4ade80' : '#444', marginBottom: '5px'}}>
              {`> ${log}`}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={footerStyle}>
        SECURE TERMINAL // FOUNDER: MANTU AI // INDIA OPERATIONS
      </footer>
    </div>
  );
}

// --- Styles (Founder Edition) ---
const containerStyle = {
  background: '#000', color: '#fff', minHeight: '100vh', padding: '40px 20px',
  fontFamily: 'monospace', display: 'flex', flexDirection: 'column', alignItems: 'center',
  position: 'relative', overflow: 'hidden'
};

const logoStyle = { fontSize: '40px', fontWeight: '900', letterSpacing: '-2px', margin: 0, color: '#3b82f6' };
const subtitleStyle = { fontSize: '9px', color: '#444', letterSpacing: '4px', marginTop: '5px' };

const headerStyle = { width: '100%', maxWidth: '500px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' };

const statusBadgeStyle = (status) => ({
  background: 'rgba(255,255,255,0.05)', padding: '8px 15px', borderRadius: '10px',
  border: '1px solid rgba(255,255,255,0.1)', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: status === 'OFFLINE' ? '#ff4b2b' : '#4ade80'
});

const pulseStyle = (status) => ({
  height: '6px', width: '6px', borderRadius: '50%', 
  background: status === 'OFFLINE' ? '#ff4b2b' : '#4ade80',
  boxShadow: status === 'OFFLINE' ? 'none' : '0 0 10px #4ade80',
  animation: 'pulse 1.5s infinite'
});

const gridStyle = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', width: '100%', maxWidth: '500px', marginBottom: '15px' };

const radarCardStyle = {
  width: '100%', maxWidth: '500px', background: 'linear-gradient(180deg, #0a0a0a, #000)',
  padding: '30px', borderRadius: '25px', border: '1px solid #111', textAlign: 'center', marginBottom: '15px'
};

const groupNameStyle = { fontSize: '28px', fontWeight: 'bold', margin: '15px 0', color: '#fff', letterSpacing: '-1px' };

const logContainerStyle = { width: '100%', maxWidth: '500px', background: '#050505', padding: '20px', borderRadius: '20px', border: '1px solid #111' };

const logBoxStyle = { fontSize: '11px', lineHeight: '1.6', height: '100px', overflowY: 'hidden' };

const labelStyle = { fontSize: '9px', color: '#333', fontWeight: 'bold', letterSpacing: '2px' };

const footerStyle = { marginTop: '40px', fontSize: '9px', color: '#222', letterSpacing: '1px' };

const barContainer = { width: '100%', height: '2px', background: '#111', marginTop: '10px' };
const barFill = { width: '40%', height: '100%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' };

const glowStyle = {
  position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
  width: '300px', height: '300px', background: '#3b82f6', filter: 'blur(150px)', opacity: '0.1', zIndex: 0
};

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: '#0a0a0a', padding: '25px', borderRadius: '25px', border: '1px solid #111', textAlign: 'center' }}>
      <p style={labelStyle}>{label}</p>
      <h2 style={{ fontSize: '35px', margin: '10px 0 0', color: color }}>{value}</h2>
    </div>
  );
}
