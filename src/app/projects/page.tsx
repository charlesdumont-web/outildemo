"use client";

import { FolderKanban, AlertTriangle, CheckCircle2, Clock, Sparkles, BarChart3 } from "lucide-react";

const projects = [
  { id: 1, name: "Implantation ERP - Beaumont", client: "Construction Beaumont", progress: 72, status: "En cours", deadline: "2026-06-15", tasks: { total: 24, done: 17 }, risk: "low", aiNote: "Projet en avance de 3 jours. Suggérer de commencer la phase formation." },
  { id: 2, name: "Migration Cloud - Distrib Express", client: "Distrib Express", progress: 45, status: "En cours", deadline: "2026-07-30", tasks: { total: 32, done: 14 }, risk: "medium", aiNote: "Retard potentiel sur l'intégration API. Réaffecter un dev backend cette semaine." },
  { id: 3, name: "Automatisation RH - Santé Plus", client: "Groupe Santé Plus", progress: 15, status: "Démarrage", deadline: "2026-09-01", tasks: { total: 18, done: 3 }, risk: "low", aiNote: "Phase de découverte terminée. Prêt pour le sprint 1." },
  { id: 4, name: "Chatbot Client - Medzy", client: "Medzy Pharma", progress: 95, status: "Livraison", deadline: "2026-05-05", tasks: { total: 12, done: 11 }, risk: "high", aiNote: "1 tâche bloquante : tests d'intégration Twilio. Priorité critique pour livraison à temps." },
];

const riskColors: Record<string, string> = { low: "text-green-500 bg-green-500/10", medium: "text-orange-500 bg-orange-500/10", high: "text-red-500 bg-red-500/10" };
const riskLabels: Record<string, string> = { low: "Faible", medium: "Moyen", high: "Élevé" };

export default function ProjectsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Projets</h1><p className="text-muted-foreground mt-1">Statut, jalons, tâches et analyse de risques IA.</p></div>
        <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2"><Sparkles size={16} /> Générer rapport hebdo</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-blue-500"><p className="text-sm text-muted-foreground">Projets actifs</p><p className="text-2xl font-bold mt-1">{projects.length}</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-green-500"><p className="text-sm text-muted-foreground">Tâches complétées</p><p className="text-2xl font-bold mt-1 text-green-500">{projects.reduce((s, p) => s + p.tasks.done, 0)}</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-orange-500"><p className="text-sm text-muted-foreground">Tâches restantes</p><p className="text-2xl font-bold mt-1">{projects.reduce((s, p) => s + p.tasks.total - p.tasks.done, 0)}</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-red-500"><p className="text-sm text-muted-foreground">Risques élevés</p><p className="text-2xl font-bold mt-1 text-red-500">{projects.filter(p => p.risk === "high").length}</p></div>
      </div>

      <div className="space-y-4">
        {projects.map(p => (
          <div key={p.id} className={`glass rounded-xl border p-6 transition-all hover:border-primary/30 ${p.risk === "high" ? "border-red-500/50" : "border-border"}`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-lg">{p.name}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${riskColors[p.risk]}`}><AlertTriangle size={10} className="inline mr-0.5" />Risque {riskLabels[p.risk]}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.client} — Échéance : {p.deadline}</p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground"><CheckCircle2 size={14} className="text-green-500" /> {p.tasks.done}/{p.tasks.total} tâches</span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">{p.status}</span>
              </div>
            </div>

            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full transition-all ${p.risk === "high" ? "bg-red-500" : "bg-primary"}`} style={{ width: `${p.progress}%` }} />
            </div>
            <div className="flex justify-between text-sm mb-3"><span>{p.progress}% complété</span></div>

            <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 flex items-start gap-2">
              <Sparkles size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-muted-foreground">{p.aiNote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
