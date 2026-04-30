"use client";

import { Landmark, AlertTriangle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

const projects = [
  { name: "Implantation ERP Beaumont", budget: 45000, spent: 32500, progress: 72 },
  { name: "Migration Cloud Distrib Express", budget: 62000, spent: 58900, progress: 95 },
  { name: "Automatisation RH Santé Plus", budget: 28000, spent: 15200, progress: 54 },
];

const categories = [
  { cat: "Main-d'œuvre", budget: 22000, actual: 21500 },
  { cat: "Logiciels / Licences", budget: 8000, actual: 9200 },
  { cat: "Sous-traitance", budget: 6000, actual: 3800 },
  { cat: "Équipements", budget: 5000, actual: 4500 },
  { cat: "Formation", budget: 4000, actual: 2000 },
];

export default function BudgetPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight">Suivi Budget Projet</h1><p className="text-muted-foreground mt-1">Dépenses vs budget en temps réel avec alertes de dépassement.</p></div>

      <div className="space-y-4">
        {projects.map((p, i) => {
          const pct = Math.round((p.spent / p.budget) * 100);
          const isOver = pct > 90;
          return (
            <div key={i} className={`glass rounded-xl border p-6 ${isOver ? "border-red-500/50" : "border-border"}`}>
              <div className="flex justify-between items-start mb-3">
                <div><h3 className="font-semibold">{p.name}</h3><p className="text-sm text-muted-foreground">Avancement : {p.progress}%</p></div>
                <div className="text-right"><p className="text-sm text-muted-foreground">Budget</p><p className="font-bold">{p.budget.toLocaleString()} $</p></div>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-2">
                <div className={`h-full rounded-full transition-all ${pct > 90 ? "bg-red-500" : pct > 75 ? "bg-orange-500" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
              <div className="flex justify-between text-sm">
                <span>Dépensé : <strong>{p.spent.toLocaleString()} $</strong> ({pct}%)</span>
                <span className={isOver ? "text-red-500 font-medium flex items-center gap-1" : "text-green-500"}>
                  {isOver && <AlertTriangle size={14} />}{isOver ? "Attention — proche du budget" : `Restant : ${(p.budget - p.spent).toLocaleString()} $`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold mb-4">Budget vs Actuel par catégorie</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categories} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="cat" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "rgba(17,24,39,0.95)", borderColor: "#1f2937", borderRadius: "8px" }} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="budget" name="Budget" fill="#3b82f6" radius={[0,4,4,0]} barSize={14} />
              <Bar dataKey="actual" name="Actuel" radius={[0,4,4,0]} barSize={14}>
                {categories.map((c, i) => <Cell key={i} fill={c.actual > c.budget ? "#ef4444" : "#22c55e"} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
