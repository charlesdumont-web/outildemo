"use client";

import { Truck, Package, ArrowRight, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

const shipments = [
  { id: "BL-2026-142", origin: "Entrepôt Montréal", dest: "Client Québec", items: 45, status: "En transit", eta: "2026-05-01 14:00" },
  { id: "BL-2026-141", origin: "Fournisseur Ontario", dest: "Entrepôt Montréal", items: 120, status: "Livré", eta: "2026-04-29" },
  { id: "BL-2026-140", origin: "Entrepôt Montréal", dest: "Client Sherbrooke", items: 18, status: "Préparation", eta: "2026-05-02" },
  { id: "BL-2026-139", origin: "Fournisseur BC", dest: "Entrepôt Montréal", items: 200, status: "Retard", eta: "2026-04-28" },
];

const statusStyles: Record<string, { icon: typeof CheckCircle2; color: string }> = {
  "Livré": { icon: CheckCircle2, color: "text-green-500 bg-green-500/10" },
  "En transit": { icon: Truck, color: "text-blue-500 bg-blue-500/10" },
  "Préparation": { icon: Clock, color: "text-orange-500 bg-orange-500/10" },
  "Retard": { icon: AlertTriangle, color: "text-red-500 bg-red-500/10" },
};

export default function DistributionPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><Truck className="text-green-500" /> Module Distribution</h1><p className="text-muted-foreground mt-1">Gestion des expéditions et bons de livraison.</p></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-blue-500"><p className="text-sm text-muted-foreground">En transit</p><p className="text-2xl font-bold mt-1">1</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-orange-500"><p className="text-sm text-muted-foreground">En préparation</p><p className="text-2xl font-bold mt-1">1</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-green-500"><p className="text-sm text-muted-foreground">Livrés (30j)</p><p className="text-2xl font-bold mt-1">1</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-red-500"><p className="text-sm text-muted-foreground">En retard</p><p className="text-2xl font-bold mt-1 text-red-500">1</p></div>
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
            <tr><th className="px-6 py-3 text-left font-medium">Bon de livraison</th><th className="px-6 py-3 text-left font-medium">Trajet</th><th className="px-6 py-3 text-right font-medium">Items</th><th className="px-6 py-3 text-left font-medium">Statut</th><th className="px-6 py-3 text-right font-medium">ETA</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {shipments.map(s => {
              const style = statusStyles[s.status];
              const Icon = style.icon;
              return (
                <tr key={s.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-3 font-medium">{s.id}</td>
                  <td className="px-6 py-3 flex items-center gap-2">{s.origin} <ArrowRight size={14} className="text-muted-foreground" /> {s.dest}</td>
                  <td className="px-6 py-3 text-right">{s.items}</td>
                  <td className="px-6 py-3"><span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.color}`}><Icon size={12} /> {s.status}</span></td>
                  <td className="px-6 py-3 text-right text-muted-foreground">{s.eta}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
