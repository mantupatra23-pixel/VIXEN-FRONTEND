import React, { useState, useEffect } from 'react';
import { Activity, Send, MessageSquare, Zap, Target } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    messages_sent: 0,
    ai_replies: 0,
    status: 'Connecting...',
    active_group: 'None'
  });

  // Render Backend URL (Apna backend URL yahan daalein)
  const BACKEND_URL = "https://vixen-mkjh.onrender.com/api/stats";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(BACKEND_URL);
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Backend offline");
      }
    };
    const interval = setInterval(fetchStats, 5000); // Har 5 sec mein update
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-800 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter text-blue-500">VIXEN AI <span className="text-white">OS</span></h1>
          <p className="text-gray-500 text-xs mt-1">Autonomous Affiliate Engine v2.0</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <div className={`h-2 w-2 rounded-full ${stats.status.includes('Hunting') ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></div>
          <span className="text-xs font-medium uppercase">{stats.status}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatBox icon={<Send size={20}/>} label="Global Sent" value={stats.messages_sent} color="text-green-400" />
        <StatBox icon={<MessageSquare size={20}/>} label="AI Replies" value={stats.ai_replies} color="text-blue-400" />
        <StatBox icon={<Target size={20}/>} label="Current Focus" value={stats.active_group} color="text-purple-400" />
        <StatBox icon={<Zap size={20}/>} label="Engine Load" value="Optimal" color="text-yellow-400" />
      </div>

      {/* Targeting Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10"><Activity size={100}/></div>
        <h3 className="text-gray-500 text-sm mb-2 uppercase tracking-widest">Active Lead Extraction</h3>
        <p className="text-5xl font-black text-white mb-4 tracking-tighter uppercase italic">
          {stats.active_group}
        </p>
        <div className="inline-block bg-blue-500/10 text-blue-500 px-4 py-1 rounded-full text-xs font-bold border border-blue-500/20">
          USA/UK HIGH-TICKET SECTOR
        </div>
      </div>

      <footer className="mt-10 text-center">
        <p className="text-gray-600 text-[10px]">FOUNDER: MANTU AI | ENCRYPTED TERMINAL ACCESS</p>
      </footer>
    </div>
  );
}

function StatBox({ icon, label, value, color }) {
  return (
    <div className="bg-gray-900/50 border border-gray-800 p-5 rounded-2xl">
      <div className="flex items-center gap-3 mb-3 text-gray-500">
        {icon} <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
      </div>
      <div className={`text-3xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
