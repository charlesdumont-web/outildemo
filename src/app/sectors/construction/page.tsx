"use client";

import { HardHat, FileText, MapPin, Clock, Users, CheckCircle2, AlertTriangle, DollarSign } from "lucide-react";

const chantiers = [
  { id: 1, name: "Résidence Mont-Royal", address: "456 ch. de la Côte, Montréal", status: "En cours", progress: 65, budget: "1.2M $", spent: "780K $", workers: 24, soumissions: 3, bonsT: 12 },
  { id: 2, name: "Commercial Place Laurier", address: "2700 boul. Laurier, Québec", status: "Démarrage", progress: 15, budget: "3.5M $", spent: "525K $", workers: 8, soumissions: 5, bonsT: 4 },
  { id: 3, name: "Rénovation École St-Jean", address: "112 rue Principale, Lévis", status: "Inspection", progress: 92, budget: "450K $", spent: "415K $", workers: 6, soumissions: 1, bonsT: 18 },
];

export default function ConstructionPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight flex items-center gap-3"><HardHat className="text-orange-500" /> Module Construction</h1><p className="text-muted-foreground mt-1">Soumissions, bons de travail et suivi de chantier.</p></div>

      <div className="space-y-4">
        {chantiers.map(c => (
          <div key={c.id} className="glass rounded-xl border border-border p-6 hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div><h3 className="font-semibold text-lg">{c.name}</h3><p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin size={12} /> {c.address}</p></div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${c.status === "En cours" ? "bg-blue-500/10 text-blue-500" : c.status === "Inspection" ? "bg-green-500/10 text-green-500" : "bg-orange-500/10 text-orange-500"}`}>{c.status}</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-3"><div className="h-full bg-primary rounded-full" style={{ width: `${c.progress}%` }} /></div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
              <div className="bg-background rounded-lg p-2 border border-border/50 text-center"><p className="text-muted-foreground text-xs">Budget</p><p className="font-bold">{c.budget}</p></div>
              <div className="bg-background rounded-lg p-2 border border-border/50 text-center"><p className="text-muted-foreground text-xs">Dépensé</p><p className="font-bold">{c.spent}</p></div>
              <div className="bg-background rounded-lg p-2 border border-border/50 text-center"><p className="text-muted-foreground text-xs">Travailleurs</p><p className="font-bold">{c.workers}</p></div>
              <div className="bg-background rounded-lg p-2 border border-border/50 text-center"><p className="text-muted-foreground text-xs">Soumissions</p><p className="font-bold">{c.soumissions}</p></div>
              <div className="bg-background rounded-lg p-2 border border-border/50 text-center"><p className="text-muted-foreground text-xs">Bons de travail</p><p className="font-bold">{c.bonsT}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
