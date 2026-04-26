import React, { useState, useEffect } from 'react';

export default function VixenDashboard() {
  const [data, setData] = useState({
    messages_sent: 0,
    ai_replies: 0,
    active_group: 'SCANNING...',
    status: 'BOOTING...',
    logs: []
  });

  // Updated Backend URL
  const API_URL = "https://vixen-nkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        setData({
          messages_sent: json.messages_sent || 0,
          ai_replies: json.ai_replies || 0,
          active_group: json.active_group || 'SCANNING...',
          status: json.status || 'ONLINE',
          logs: json.logs || []
        });
      } catch (e) {
        setData(prev => ({ ...prev, status: 'OFFLINE' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vixen-wrapper">
      <style jsx global>{`
        body { 
          margin: 0; 
          padding: 0; 
          background: #000; 
          color: #fff; 
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        .vixen-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          box-sizing: border-box;
        }
        .container {
          width: 100%;
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        /* Header Section */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 0;
          margin-top: 10px;
        }
        .brand h1 {
          font-size: 28px;
          font-weight: 900;
          margin: 0;
          letter-spacing: -1.5px;
          color: #3b82f6;
        }
        .brand h1 span { color: #fff; }
        .brand p {
          font-size: 9px;
          color: #444;
          letter-spacing: 3px;
          margin: 4px 0 0;
          font-weight: bold;
        }
        .status-pill {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${data.status === 'OFFLINE' ? '#ff4b2b' : '#4ade80'};
        }
        .pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 10px currentColor;
        }

        /* Stats Section */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }
        .stat-card {
          background: #080808;
          border: 1px solid #141414;
          padding: 25px 15px;
          border-radius: 24px;
          text-align: center;
        }
        .stat-label {
          font-size: 9px;
          color: #555;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .stat-value {
          font-size: 36px;
          font-weight: 900;
          letter-spacing: -1px;
        }

        /* Radar Box */
        .radar-box {
          background: linear-gradient(180deg, #0a0a0a 0%, #000 100%);
          border: 1px solid #1a1a1a;
          padding: 35px 20px;
          border-radius: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .radar-box::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at center, #3b82f610 0%, transparent 70%);
          pointer-events: none;
        }
        .radar-title {
          font-size: 26px;
          font-weight: 900;
          color: #fff;
          text-transform: uppercase;
          font-style: italic;
          margin: 10px 0;
        }

        /* Terminal Logs */
        .terminal {
          background: #030303;
          border: 1px solid #111;
          border-radius: 24px;
          padding: 20px;
          min-height: 180px;
        }
        .terminal-header {
          font-size: 9px;
          color: #3b82f6;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
        }
        .log-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .log-row {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          line-height: 1.4;
          color: #444;
          display: flex;
          gap: 10px;
        }
        .log-row.newest { color: #4ade80; }
        .log-time { color: #222; flex-shrink: 0; }

        /* Responsive Fixes */
        @media (max-width: 480px) {
          .brand h1 { font-size: 24px; }
          .stat-value { font-size: 30px; }
          .radar-title { font-size: 20px; }
        }
      `}</style>

      <div className="container">
        <header className="header">
          <div className="brand">
            <h1>VIXEN <span>OS</span></h1>
            <p>FOUNDER: MANTU AI</p>
          </div>
          <div className="status-pill">
            <div className="pulse"></div>
            {data.status}
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">TOTAL SENT</div>
            <div className="stat-value" style={{color: '#4ade80'}}>{data.messages_sent}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">AI REPLIES</div>
            <div className="stat-value" style={{color: '#60a5fa'}}>{data.ai_replies}</div>
          </div>
        </div>

        <div className="radar-box">
          <div className="stat-label">LIVE RADAR FOCUS</div>
          <div className="radar-title">{data.active_group}</div>
        </div>

        <div className="terminal">
          <div className="terminal-header">
            <span>LIVE TRANSACTION LOGS</span>
            <span style={{opacity: 0.3}}>SECURE_V2</span>
          </div>
          <div className="log-list">
            {data.logs.length > 0 ? data.logs.map((log, i) => {
              const time = log.match(/\[(.*?)\]/)?.[1] || '--:--';
              const text = log.replace(/\[.*?\]/, '').trim();
              return (
                <div key={i} className={`log-row ${i === 0 ? 'newest' : ''}`}>
                  <span className="log-time">{time}</span>
                  <span>{text}</span>
                </div>
              );
            }) : (
              <div className="log-row">Waiting for network sync...</div>
            )}
          </div>
        </div>

        <footer style={{textAlign: 'center', marginTop: '20px'}}>
            <p style={{fontSize: '8px', color: '#1a1a1a', letterSpacing: '4px', fontWeight: 'bold'}}>
                INDIA_FIRST_AI_ENGINE // ENCRYPTED_ACCESS_ONLY
            </p>
        </footer>
      </div>
    </div>
  );
}
