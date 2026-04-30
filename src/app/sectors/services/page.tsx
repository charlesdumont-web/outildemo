"use client";

import { Briefcase, Clock, DollarSign, User, CheckCircle2 } from "lucide-react";

const mandats = [
  { id: 1, name: "Audit comptable Q1", client: "Groupe Financier Léger", responsible: "Isabelle Léger", hours: { budgeted: 120, logged: 95 }, rate: "185 $/h", status: "En cours", invoiced: "17 575 $" },
  { id: 2, name: "Consultation TI — Migration", client: "Distrib Express", responsible: "Marc Roy", hours: { budgeted: 80, logged: 80 }, rate: "200 $/h", status: "Complété", invoiced: "16 000 $" },
  { id: 3, name: "Accompagnement RH", client: "Medzy Pharma", responsible: "Julie Martin", hours: { budgeted: 40, logged: 18 }, rate: "165 $/h", status: "En cours", invoiced: "2 970 $" },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Briefcase className="text-blue-500" /> Services Professionnels</h1><p className="text-muted-foreground mt-1">Facturation à l'heure, gestion des mandats.</p></div>

      <div className="space-y-4">
        {mandats.map(m => {
          const pct = Math.round((m.hours.logged / m.hours.budgeted) * 100);
          return (
            <div key={m.id} className="glass rounded-xl border border-border p-6">
              <div className="flex justify-between items-start mb-4">
                <div><h3 className="font-semibold text-lg">{m.name}</h3><p className="text-sm text-muted-foreground">{m.client} — Resp. : {m.responsible}</p></div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${m.status === "Complété" ? "bg-green-500/10 text-green-500" : "bg-blue-500/10 text-blue-500"}`}>{m.status}</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3"><div className={`h-full rounded-full ${pct >= 100 ? "bg-green-500" : "bg-primary"}`} style={{ width: `${Math.min(pct, 100)}%` }} /></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="bg-background rounded-lg p-2 border border-border/50"><p className="text-muted-foreground text-xs flex items-center gap-1"><Clock size={10} /> Heures</p><p className="font-bold">{m.hours.logged}/{m.hours.budgeted}h</p></div>
                <div className="bg-background rounded-lg p-2 border border-border/50"><p className="text-muted-foreground text-xs">Taux</p><p className="font-bold">{m.rate}</p></div>
                <div className="bg-background rounded-lg p-2 border border-border/50"><p className="text-muted-foreground text-xs">Facturé</p><p className="font-bold text-green-500">{m.invoiced}</p></div>
                <div className="bg-background rounded-lg p-2 border border-border/50"><p className="text-muted-foreground text-xs">Utilisation</p><p className="font-bold">{pct}%</p></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
