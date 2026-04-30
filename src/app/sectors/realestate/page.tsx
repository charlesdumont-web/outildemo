"use client";

import { Building2, DollarSign, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const units = [
  { id: "A-101", address: "500 boul. René-Lévesque, #101", tenant: "Cabinet Léger Inc.", rent: "2 800 $/mois", lease: "2024-06-01 → 2027-05-31", status: "Occupé", renewalDue: false },
  { id: "A-204", address: "500 boul. René-Lévesque, #204", tenant: "Tech Solutions QC", rent: "3 200 $/mois", lease: "2023-01-01 → 2026-06-30", status: "Renouvellement", renewalDue: true },
  { id: "B-301", address: "1200 rue St-Jean, #301", tenant: "—", rent: "1 900 $/mois", lease: "—", status: "Vacant", renewalDue: false },
  { id: "B-102", address: "1200 rue St-Jean, #102", tenant: "Clinique Santé+", rent: "2 100 $/mois", lease: "2025-09-01 → 2028-08-31", status: "Occupé", renewalDue: false },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  "Occupé": { color: "bg-green-500/10 text-green-500", icon: CheckCircle2 },
  "Renouvellement": { color: "bg-orange-500/10 text-orange-500", icon: Clock },
  "Vacant": { color: "bg-red-500/10 text-red-500", icon: AlertTriangle },
};

export default function RealEstatePage() {
  const occupied = units.filter(u => u.status === "Occupé").length;
  const totalRent = 10100; // simplified for demo

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Building2 className="text-indigo-500" /> Module Immobilier</h1><p className="text-muted-foreground mt-1">Suivi des unités, baux et renouvellements.</p></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 border border-border"><p className="text-sm text-muted-foreground">Unités totales</p><p className="text-2xl font-bold mt-1">{units.length}</p></div>
        <div className="glass rounded-xl p-4 border border-border"><p className="text-sm text-muted-foreground">Taux d'occupation</p><p className="text-2xl font-bold mt-1 text-green-500">{Math.round((occupied / units.length) * 100)}%</p></div>
        <div className="glass rounded-xl p-4 border border-border"><p className="text-sm text-muted-foreground">Revenus mensuels</p><p className="text-2xl font-bold mt-1">{totalRent.toLocaleString()} $</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-orange-500"><p className="text-sm text-muted-foreground">Renouvellements</p><p className="text-2xl font-bold mt-1 text-orange-500">{units.filter(u => u.renewalDue).length}</p></div>
      </div>

      <div className="space-y-4">
        {units.map(u => {
          const cfg = statusConfig[u.status];
          const Icon = cfg.icon;
          return (
            <div key={u.id} className={`glass rounded-xl border p-5 ${u.renewalDue ? "border-orange-500/50" : "border-border"}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-1"><h3 className="font-semibold">Unité {u.id}</h3><span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.color}`}><Icon size={10} /> {u.status}</span></div>
                  <p className="text-sm text-muted-foreground">{u.address}</p>
                </div>
                <p className="font-bold text-primary">{u.rent}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-3 text-sm">
                <div><span className="text-muted-foreground text-xs">Locataire</span><p className="font-medium">{u.tenant}</p></div>
                <div><span className="text-muted-foreground text-xs">Bail</span><p className="font-medium">{u.lease}</p></div>
              </div>
              {u.renewalDue && (
                <div className="mt-3 bg-orange-500/5 border border-orange-500/20 rounded-lg p-3 text-sm text-orange-500 font-medium flex items-center gap-2"><Clock size={14} /> Renouvellement à planifier — bail expire le 30 juin 2026</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
