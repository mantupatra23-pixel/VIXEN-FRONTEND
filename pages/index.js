import React, { useState, useEffect } from 'react';
// Correct imports for Next.js Production Build
import { Activity, Send, MessageSquare, Zap, Target } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    messages_sent: 0,
    ai_replies: 0,
    status: 'Connecting...',
    active_group: 'None',
    last_ping: 'Never'
  });

  // Render Backend API URL
  const BACKEND_URL = "https://vixen-mkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setStats(prev => ({
          ...prev,
          messages_sent: data.messages_sent || 0,
          ai_replies: data.ai_replies || 0,
          status: data.status || 'Active',
          active_group: data.active_group || 'Scanning...',
          last_ping: data.last_ping || 'Just now'
        }));
      } catch (err) {
        console.error("VIXEN Backend Offline or CORS Error");
        setStats(prev => ({ ...prev, status: 'Backend Offline' }));
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // 10 seconds refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-10 font-sans selection:bg-blue-500">
      {/* Top Navigation */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
            VIXEN <span className="text-white">OS</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-mono tracking-[0.2em] mt-1 uppercase">Autonomous Revenue Engine</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/10">
          <div className={`h-2 w-2 rounded-full ${stats.status.includes('Offline') ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></div>
          <span className="text-[10px] font-bold uppercase tracking-widest">{stats.status}</span>
        </div>
      </div>

      {/* Hero Analytics Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={<Send size={18}/>} label="Total Sent" value={stats.messages_sent} color="text-green-400" />
        <StatCard icon={<MessageSquare size={18}/>} label="AI Replies" value={stats.ai_replies} color="text-blue-400" />
        <StatCard icon={<Zap size={18}/>} label="Engine Uptime" value="100%" color="text-yellow-400" />
        <StatCard icon={<Activity size={18}/>} label="Last Ping" value={stats.last_ping} color="text-gray-400" />
      </div>

      {/* Target Radar Card */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden group">
          <div className="absolute -right-20 -bottom-20 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-700">
             <Target size={400} />
          </div>
          
          <div className="relative z-10">
            <h3 className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <span className="flex h-2 w-2 bg-red-500 rounded-full"></span> 
              Live Targeting Radar
            </h3>
            <p className="text-6xl md:text-8xl font-black text-white tracking-tighter italic uppercase">
              {stats.active_group}
            </p>
            <div className="mt-8 flex gap-4">
              <span className="bg-blue-500/10 text-blue-400 text-[10px] font-black px-4 py-2 rounded-xl border border-blue-500/20 uppercase tracking-widest">USA Market</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] font-black px-4 py-2 rounded-xl border border-purple-500/20 uppercase tracking-widest">SaaS Vertical</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Log */}
      <div className="max-w-7xl mx-auto mt-12 text-center border-t border-white/5 pt-8">
        <p className="text-gray-600 text-[9px] font-mono tracking-widest uppercase">
          System encrypted // Founder: Mantu AI // {new Date().getFullYear()} Global Operations
        </p>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/[0.03] border border-white/5 p-6 rounded-3xl hover:bg-white/[0.05] transition-colors duration-300">
      <div className="flex items-center gap-3 mb-4 text-gray-500">
        <div className="p-2 bg-black rounded-xl border border-white/5">{icon}</div>
        <span className="text-[9px] uppercase font-black tracking-[0.2em]">{label}</span>
      </div>
      <div className={`text-4xl font-black tracking-tighter ${color}`}>
        {value}
      </div>
    </div>
  );
}
