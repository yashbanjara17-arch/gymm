import React from 'react';

export default function StatsCard({ title, value, subtitle, icon: Icon, color = 'yellow', trend }) {
  const colorMap = {
    yellow: 'bg-yellow-500/10 text-yellow-500 dark:text-yellow-400 border-yellow-500/20',
    green: 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20',
    blue: 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20',
    purple: 'bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20',
    red: 'bg-rose-500/10 text-rose-500 dark:text-rose-400 border-rose-500/20',
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2 tracking-tight">{value}</h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-4 rounded-xl border ${colorMap[color] || colorMap.yellow}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
