"use client";

import { useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownRight, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const cashflowData = {
  optimiste: [
    { month: "Mai", entrees: 85000, sorties: 52000, solde: 103000 },
    { month: "Juin", entrees: 92000, sorties: 58000, solde: 137000 },
    { month: "Juil", entrees: 78000, sorties: 55000, solde: 160000 },
    { month: "Août", entrees: 105000, sorties: 62000, solde: 203000 },
    { month: "Sept", entrees: 98000, sorties: 60000, solde: 241000 },
    { month: "Oct", entrees: 110000, sorties: 65000, solde: 286000 },
  ],
  realiste: [
    { month: "Mai", entrees: 72000, sorties: 58000, solde: 84000 },
    { month: "Juin", entrees: 68000, sorties: 62000, solde: 90000 },
    { month: "Juil", entrees: 60000, sorties: 65000, solde: 85000 },
    { month: "Août", entrees: 75000, sorties: 68000, solde: 92000 },
    { month: "Sept", entrees: 80000, sorties: 64000, solde: 108000 },
    { month: "Oct", entrees: 85000, sorties: 70000, solde: 123000 },
  ],
  pessimiste: [
    { month: "Mai", entrees: 55000, sorties: 62000, solde: 63000 },
    { month: "Juin", entrees: 48000, sorties: 65000, solde: 46000 },
    { month: "Juil", entrees: 42000, sorties: 68000, solde: 20000 },
    { month: "Août", entrees: 50000, sorties: 70000, solde: 0 },
    { month: "Sept", entrees: 55000, sorties: 66000, solde: -11000 },
    { month: "Oct", entrees: 60000, sorties: 64000, solde: -15000 },
  ],
};

type Scenario = "optimiste" | "realiste" | "pessimiste";
const labels: Record<Scenario, { label: string; bg: string }> = {
  optimiste: { label: "Optimiste", bg: "bg-green-500" },
  realiste: { label: "Réaliste", bg: "bg-blue-500" },
  pessimiste: { label: "Pessimiste", bg: "bg-red-500" },
};

export default function TresoreriePage() {
  const [scenario, setScenario] = useState<Scenario>("realiste");
  const data = cashflowData[scenario];
  const lastSolde = data[data.length - 1].solde;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prévision de Trésorerie</h1>
          <p className="text-muted-foreground mt-1">Cashflow prévisionnel 30/60/90 jours avec scénarios.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
          {(Object.keys(labels) as Scenario[]).map((s) => (
            <button key={s} onClick={() => setScenario(s)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${scenario === s ? `${labels[s].bg} text-white shadow-sm` : "text-muted-foreground hover:text-foreground"}`}>
              {labels[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-5 border border-border">
          <div className="flex justify-between items-start mb-3"><p className="text-sm text-muted-foreground">Solde actuel</p><DollarSign size={18} className="text-blue-500" /></div>
          <h3 className="text-2xl font-bold">70 000 $</h3><p className="text-xs text-muted-foreground mt-1">Au 30 avril 2026</p>
        </div>
        <div className="glass rounded-xl p-5 border border-border">
          <div className="flex justify-between items-start mb-3"><p className="text-sm text-muted-foreground">Entrées prévues (30j)</p><ArrowUpRight size={18} className="text-green-500" /></div>
          <h3 className="text-2xl font-bold text-green-500">{data[0].entrees.toLocaleString()} $</h3>
        </div>
        <div className="glass rounded-xl p-5 border border-border">
          <div className="flex justify-between items-start mb-3"><p className="text-sm text-muted-foreground">Sorties prévues (30j)</p><ArrowDownRight size={18} className="text-red-500" /></div>
          <h3 className="text-2xl font-bold text-red-500">{data[0].sorties.toLocaleString()} $</h3>
        </div>
        <div className={`glass rounded-xl p-5 border ${lastSolde < 20000 ? "border-red-500/50" : "border-border"}`}>
          <div className="flex justify-between items-start mb-3"><p className="text-sm text-muted-foreground">Solde projeté (90j)</p>{lastSolde < 20000 ? <AlertTriangle size={18} className="text-red-500" /> : <TrendingUp size={18} className="text-green-500" />}</div>
          <h3 className={`text-2xl font-bold ${lastSolde < 0 ? "text-red-500" : lastSolde < 20000 ? "text-orange-500" : "text-green-500"}`}>{lastSolde.toLocaleString()} $</h3>
          {lastSolde < 20000 && <p className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertTriangle size={10} /> Seuil critique</p>}
        </div>
      </div>

      {scenario === "pessimiste" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-in fade-in">
          <Sparkles size={20} className="text-red-500 mt-0.5" />
          <div><h4 className="font-semibold text-red-500">Alerte IA — Trésorerie à risque</h4>
            <p className="text-sm text-muted-foreground mt-1">Dans le scénario pessimiste, votre trésorerie atteint 0 $ en août 2026. Recommandation : accélérer la facturation des comptes clients en retard (12 450 $) et négocier un report fournisseurs de 15 jours.</p>
          </div>
        </div>
      )}

      <div className="glass rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold mb-1">Projection du solde</h3>
        <p className="text-sm text-muted-foreground mb-6">Prévision sur 6 mois — Scénario {labels[scenario].label}</p>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="cSolde" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={scenario === "pessimiste" ? "#ef4444" : "#3b82f6"} stopOpacity={0.3} /><stop offset="95%" stopColor={scenario === "pessimiste" ? "#ef4444" : "#3b82f6"} stopOpacity={0} /></linearGradient>
                <linearGradient id="cEntrees" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "8px", color: "#0f172a" }} formatter={(v) => [`${Number(v).toLocaleString()} $`, ""]} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              <Area type="monotone" dataKey="entrees" name="Entrées" stroke="#22c55e" fillOpacity={1} fill="url(#cEntrees)" />
              <Area type="monotone" dataKey="sorties" name="Sorties" stroke="#ef4444" fillOpacity={0} fill="none" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="solde" name="Solde" stroke={scenario === "pessimiste" ? "#ef4444" : "#3b82f6"} fillOpacity={1} fill="url(#cSolde)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
