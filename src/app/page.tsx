"use client";

import { 
  TrendingUp, 
  Users, 
  Bot, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Fév', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Avr', revenue: 2780, expenses: 3908 },
  { name: 'Mai', revenue: 1890, expenses: 4800 },
  { name: 'Juin', revenue: 2390, expenses: 3800 },
  { name: 'Juil', revenue: 3490, expenses: 4300 },
];

const aiActivityData = [
  { name: 'Lun', email: 40, sms: 24 },
  { name: 'Mar', email: 30, sms: 13 },
  { name: 'Mer', email: 20, sms: 98 },
  { name: 'Jeu', email: 27, sms: 39 },
  { name: 'Ven', email: 18, sms: 48 },
  { name: 'Sam', email: 23, sms: 38 },
  { name: 'Dim', email: 34, sms: 43 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aperçu du tableau de bord</h1>
          <p className="text-muted-foreground mt-1">De retour, voici ce qui se passe aujourd'hui.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-border bg-card hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors">
            Télécharger le rapport
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20">
            Générer une analyse IA
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Revenus totaux", value: "45 231,89 $", trend: "+20.1%", isUp: true, icon: TrendingUp, color: "text-green-500" },
          { title: "Prospects actifs", value: "2 350", trend: "+15.2%", isUp: true, icon: Users, color: "text-blue-500" },
          { title: "Tâches IA automatisées", value: "12 234", trend: "+54.3%", isUp: true, icon: Bot, color: "text-purple-500" },
          { title: "Comptes payables", value: "12 450,00 $", trend: "-4.5%", isUp: false, icon: CreditCard, color: "text-orange-500" },
        ].map((kpi, i) => (
          <div key={i} className="glass rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-foreground">{kpi.value}</h3>
              </div>
              <div className={`p-2 rounded-lg bg-muted ${kpi.color} bg-opacity-10`}>
                <kpi.icon size={20} className={kpi.color} />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className={`flex items-center font-medium ${kpi.isUp ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.isUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                {kpi.trend}
              </span>
              <span className="text-muted-foreground ml-2">vs mois dernier</span>
            </div>
            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl p-6 border border-border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Aperçu financier</h3>
            <p className="text-sm text-muted-foreground">Revenus vs Dépenses sur les 7 derniers mois</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                  itemStyle={{ color: '#0f172a' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-xl p-6 border border-border">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Activité des agents IA</h3>
            <p className="text-sm text-muted-foreground">Interactions automatisées gérées par Synchro IA</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(0,0,0,0.05)'}}
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="email" name="Brouillons courriel" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="sms" name="SMS traités" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Table (Preview) */}
      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h3 className="text-lg font-semibold">Activité récente du système</h3>
          <button className="text-sm text-primary hover:text-primary/80 font-medium">Tout voir</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
              <tr>
                <th className="px-6 py-3 font-medium">Événement</th>
                <th className="px-6 py-3 font-medium">Agent / Utilisateur</th>
                <th className="px-6 py-3 font-medium">Statut</th>
                <th className="px-6 py-3 font-medium text-right">Heure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { event: "Démo planifiée", user: "IA SMS Setter", status: "Succès", time: "Il y a 2 min", type: "success" },
                { event: "Bon de commande #BC-492", user: "Admin", status: "Approuvé", time: "Il y a 1 heure", type: "success" },
                { event: "Réception fournisseur", user: "Système", status: "En attente", time: "Il y a 3 heures", type: "warning" },
                { event: "Révision brouillon courriel", user: "IA Courriel", status: "Action requise", time: "Il y a 5 heures", type: "error" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{row.event}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {row.user.includes("AI") ? <Bot size={14} className="text-purple-400" /> : <Users size={14} className="text-blue-400" />}
                    {row.user}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${row.type === 'success' ? 'bg-green-500/10 text-green-500' : 
                        row.type === 'warning' ? 'bg-orange-500/10 text-orange-500' : 
                        'bg-red-500/10 text-red-500'}`
                    }>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
