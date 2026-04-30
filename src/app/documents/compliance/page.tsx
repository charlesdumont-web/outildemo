"use client";

import { Shield, AlertTriangle, ExternalLink, Bell, Check, Clock } from "lucide-react";

const alerts = [
  { id: 1, title: "Loi 25 — Nouvelles obligations septembre 2026", severity: "high", source: "Commission d'accès à l'information du Québec", date: "2026-04-28", summary: "Les entreprises de 25+ employés doivent désormais effectuer une évaluation des facteurs relatifs à la vie privée (ÉFVP) pour tout nouveau projet impliquant des renseignements personnels.", action: "Mettre à jour la politique de confidentialité et former l'équipe.", read: false },
  { id: 2, title: "Normes du travail — Hausse du salaire minimum", severity: "medium", source: "CNESST", date: "2026-04-15", summary: "Le salaire minimum passe à 16,50 $/h au 1er mai 2026. Vérifier la conformité des contrats à temps partiel.", action: "Auditer les contrats actuels et ajuster si nécessaire.", read: true },
  { id: 3, title: "Mise à jour norme ISO 27001:2026", severity: "low", source: "ISO", date: "2026-04-10", summary: "Nouvelles exigences en matière de sécurité cloud et gestion des accès privilégiés.", action: "Planifier un audit de conformité ISO au T3.", read: true },
];

const sevColors: Record<string, string> = { high: "border-l-red-500 bg-red-500/5", medium: "border-l-orange-500 bg-orange-500/5", low: "border-l-blue-500 bg-blue-500/5" };
const sevLabels: Record<string, { label: string; color: string }> = { high: { label: "Urgent", color: "bg-red-500/10 text-red-500" }, medium: { label: "Important", color: "bg-orange-500/10 text-orange-500" }, low: { label: "Info", color: "bg-blue-500/10 text-blue-500" } };

export default function CompliancePage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Veille Réglementaire</h1><p className="text-muted-foreground mt-1">L'IA surveille les changements légaux pertinents pour votre entreprise.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 text-sm font-medium"><Shield size={16} /> Surveillance active</div>
      </div>

      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className={`glass rounded-xl border border-border border-l-4 p-6 ${sevColors[a.severity]} ${!a.read ? "ring-1 ring-primary/20" : ""}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                {!a.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                <h3 className="font-semibold">{a.title}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${sevLabels[a.severity].color}`}>{sevLabels[a.severity].label}</span>
              </div>
              <span className="text-xs text-muted-foreground">{a.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{a.summary}</p>
            <p className="text-xs text-muted-foreground mb-3">Source : {a.source}</p>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 text-sm mb-3"><strong className="text-purple-400">Action recommandée :</strong> {a.action}</div>
            <button className="px-3 py-1.5 border border-border hover:bg-muted rounded-md text-xs font-medium flex items-center gap-1"><ExternalLink size={12} /> Consulter la source</button>
          </div>
        ))}
      </div>
    </div>
  );
}
