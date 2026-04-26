import React, { useState, useEffect } from 'react';

export default function VixenUltimateDashboard() {
  const [data, setData] = useState({
    messages_sent: 0,
    ai_replies: 0,
    active_group: 'SCANNING...',
    status: 'CONNECTING...',
    last_ping: 'NEVER',
    logs: []
  });

  // Render ka Backend URL
  const API_URL = "https://vixen-nkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Offline");
        const json = await res.json();
        
        // Map backend keys to frontend state
        setData({
          messages_sent: json.messages_sent || 0,
          ai_replies: json.ai_replies || 0,
          active_group: json.active_group || 'IDLE',
          status: json.status || 'ONLINE',
          last_ping: json.last_ping || 'N/A',
          logs: json.logs || []
        });
      } catch (e) {
        setData(prev => ({ ...prev, status: 'BACKEND OFFLINE' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000); // Har 5 sec mein update
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vixen-root">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;800&display=swap');
        body { margin: 0; background: #000; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
        .vixen-root { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 20px; max-width: 500px; margin: 0 auto; position: relative; }
        .vixen-root::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 200px; height: 200px; background: #3b82f6; filter: blur(120px); opacity: 0.15; z-index: -1; }
        .header { width: 100%; display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; margin-top: 20px; }
        .brand h1 { font-size: 20px; font-weight: 800; margin: 0; letter-spacing: -1px; }
        .brand h1 span { color: #3b82f6; }
        .brand p { font-size: 9px; color: #444; letter-spacing: 3px; margin: 5px 0 0 0; font-weight: 700; }
        .status-pill { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 8px 14px; border-radius: 100px; font-size: 10px; display: flex; align-items: center; gap: 8px; color: ${data.status.includes('OFFLINE') ? '#ff4b2b' : '#4ade80'}; font-weight: 700; }
        .pulse { width: 6px; height: 6px; border-radius: 50%; background: currentColor; box-shadow: 0 0 10px currentColor; }
        .stats-grid { width: 100%; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 25px; }
        .stat-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 24px; }
        .label { font-size: 9px; color: #444; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px; text-transform: uppercase; }
        .value { font-size: 32px; font-weight: 800; font-family: 'JetBrains Mono', monospace; }
        .radar-box { width: 100%; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 30px 20px; border-radius: 32px; text-align: center; margin-bottom: 25px; box-sizing: border-box; }
        .radar-title { font-size: 24px; font-weight: 800; color: #fff; margin-bottom: 5px; text-transform: uppercase; }
        .terminal { width: 100%; background: #080808; border: 1px solid #111; border-radius: 24px; overflow: hidden; margin-bottom: 40px; }
        .terminal-header { padding: 15px 20px; background: #0c0c0c; border-bottom: 1px solid #111; display: flex; justify-content: space-between; font-size: 9px; color: #444; font-weight: 800; letter-spacing: 1px; }
        .log-container { padding: 15px; display: flex; flex-direction: column; gap: 10px; min-height: 200px; }
        .log-row { font-family: 'JetBrains Mono', monospace; font-size: 11px; line-height: 1.6; display: flex; gap: 10px; }
        .log-time { color: #222; flex-shrink: 0; }
        .log-content { color: #555; }
        .log-success { color: #4ade80 !important; font-weight: 700; }
        footer { margin-top: auto; padding-bottom: 20px; text-align: center; opacity: 0.2; }
        footer p { font-size: 8px; letter-spacing: 5px; font-weight: 800; }
      `}</style>

      <div className="header">
        <div className="brand">
          <h1>VIXEN<span>OS</span></h1>
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
        <div style={{fontSize: '9px', color: '#222', marginTop: '15px', fontWeight: 800}}>
          LAST HEARTBEAT: {data.last_ping}
        </div>
      </div>

      <div className="terminal">
        <div className="terminal-header">
          <span>LIVE TRANSACTION STREAM</span>
          <span>SECURE_V2</span>
        </div>
        <div className="log-container">
          {data.logs && data.logs.length > 0 ? data.logs.map((log, i) => {
            const isSuccess = log.includes('Success') || log.includes('Hit');
            return (
              <div key={i} className="log-row">
                <span className="log-content ${isSuccess ? 'log-success' : ''}">{log}</span>
              </div>
            );
          }) : (
            <div className="log-row"><span className="log-content">Waiting for engine cycle...</span></div>
          )}
        </div>
      </div>

      <footer>
        <p>INDIA_FIRST_AI_REVENUE_ENGINE // 2026</p>
      </footer>
    </div>
  );
}
