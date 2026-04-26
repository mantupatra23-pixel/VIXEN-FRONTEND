import React, { useState, useEffect } from 'react';

export default function VixenUltimateDashboard() {
  const [data, setData] = useState({
    messages_sent: 0,
    ai_replies: 0,
    active_group: 'INITIALIZING...',
    status: 'CONNECTING...',
    last_ping: 'NEVER',
    logs: []
  });

  // Aapka Updated Backend URL
  const API_URL = "https://vixen-nkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Offline');
        const json = await res.json();
        setData({
          messages_sent: json.messages_sent || 0,
          ai_replies: json.ai_replies || 0,
          active_group: json.active_group || 'SCANNING...',
          status: json.status || 'ONLINE',
          last_ping: json.last_ping || 'N/A',
          logs: json.logs || []
        });
      } catch (e) {
        setData(prev => ({ ...prev, status: 'BACKEND OFFLINE' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vixen-root">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;800&family=Plus+Jakarta+Sans:wght@400;800&display=swap');
        
        body { 
          margin: 0; background: #000; color: #fff; 
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        .vixen-root {
          min-height: 100vh;
          display: flex; flex-direction: column; align-items: center;
          padding: 20px; box-sizing: border-box;
          max-width: 500px; margin: 0 auto;
          position: relative;
        }

        /* Background Glow */
        .vixen-root::before {
          content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
          width: 200px; height: 200px; background: #3b82f6;
          filter: blur(120px); opacity: 0.15; z-index: -1;
        }

        .header { width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 20px 0; }
        
        .brand h1 { font-size: 26px; font-weight: 800; margin: 0; letter-spacing: -1.5px; color: #3b82f6; }
        .brand h1 span { color: #fff; }
        .brand p { font-size: 9px; color: #444; letter-spacing: 3px; margin-top: 4px; font-weight: 800; }

        .status-pill {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
          padding: 8px 14px; border-radius: 100px; font-size: 10px; font-weight: 800;
          display: flex; align-items: center; gap: 8px;
          color: ${data.status.includes('OFFLINE') ? '#ff4b2b' : '#4ade80'};
        }

        .pulse { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 10px currentColor; }

        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; width: 100%; margin: 20px 0; }
        
        .stat-card {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
          padding: 25px 15px; border-radius: 24px; text-align: center;
          backdrop-filter: blur(10px);
        }

        .label { font-size: 9px; color: #555; letter-spacing: 2px; font-weight: 800; margin-bottom: 10px; text-transform: uppercase; }
        .value { font-size: 38px; font-weight: 800; letter-spacing: -1px; }

        .radar-box {
          width: 100%; background: linear-gradient(180deg, #0a0a0a 0%, #000 100%);
          border: 1px solid #111; padding: 40px 20px; border-radius: 32px;
          text-align: center; margin-bottom: 20px; box-sizing: border-box;
        }

        .radar-title { font-size: 24px; font-weight: 800; color: #fff; text-transform: uppercase; font-style: italic; margin-top: 10px; }

        .terminal {
          width: 100%; background: #030303; border: 1px solid #111;
          border-radius: 24px; padding: 20px; box-sizing: border-box;
          min-height: 280px; display: flex; flex-direction: column;
        }

        .terminal-header { 
          font-size: 9px; color: #3b82f6; font-weight: 800; letter-spacing: 2px; 
          margin-bottom: 15px; display: flex; justify-content: space-between;
        }

        .log-container { display: flex; flex-direction: column; gap: 10px; }

        .log-row { 
          font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1.5; 
          padding-bottom: 8px; border-bottom: 1px solid #080808;
          display: flex; gap: 10px;
        }

        .log-time { color: #222; flex-shrink: 0; }
        .log-content { color: #555; }
        
        .log-reply { color: #3b82f6 !important; font-weight: 800; }
        .log-success { color: #4ade80 !important; }

        footer { margin-top: 40px; text-align: center; opacity: 0.2; }
        footer p { font-size: 8px; letter-spacing: 5px; font-weight: 800; }

        @media (max-width: 480px) {
          .value { font-size: 32px; }
          .radar-title { font-size: 20px; }
        }
      `}</style>

      <div className="header">
        <div className="brand">
          <h1>VIXEN <span>OS</span></h1>
          <p>MANTU AI FOUNDER EDITION</p>
        </div>
        <div className="status-pill">
          <div className="pulse"></div>
          {data.status}
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="label">TOTAL SENT</div>
          <div className="value" style={{color: '#4ade80'}}>{data.messages_sent}</div>
        </div>
        <div className="stat-card">
          <div className="label">AI REPLIES</div>
          <div className="value" style={{color: '#3b82f6'}}>{data.ai_replies}</div>
        </div>
      </div>

      <div className="radar-box">
        <div className="label">LIVE TARGET SNIPER</div>
        <div className="radar-title">{data.active_group}</div>
        <div style={{fontSize: '9px', color: '#222', marginTop: '15px', letterSpacing: '2px'}}>
          LAST HEARTBEAT: {data.last_ping}
        </div>
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <span>LIVE TRANSACTION STREAM</span>
          <span>SECURE_V2</span>
        </div>
        <div className="log-container">
          {data.logs.length > 0 ? data.logs.map((log, i) => {
            const isReply = log.includes('Reply');
            const isSuccess = log.includes('Success');
            const time = log.match(/\[(.*?)\]/)?.[1] || '--:--';
            const message = log.replace(/\[.*?\]/, '').trim();

            return (
              <div key={i} className="log-row">
                <span className="log-time">{time}</span>
                <span className={`log-content ${isReply ? 'log-reply' : isSuccess ? 'log-success' : ''}`}>
                  {message}
                </span>
              </div>
            );
          }) : (
            <div className="log-row"><span className="log-content">Waiting for encrypted sync...</span></div>
          )}
        </div>
      </div>

      <footer>
        <p>INDIA_FIRST_AI_REVENUE_ENGINE // 2026</p>
      </footer>
    </div>
  );
}
