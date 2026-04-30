"use client";

import { useState } from "react";
import { Kanban, GripVertical, Sparkles, Phone, Mail, Calendar, DollarSign, User } from "lucide-react";

interface Deal { id: number; name: string; company: string; value: string; probability: number; contact: string; nextAction: string; }

const initialDeals: Deal[] = [
  { id: 1, name: "Implantation ERP", company: "Construction Beaumont", value: "45 000 $", probability: 20, contact: "Pierre B.", nextAction: "Appel de découverte" },
  { id: 2, name: "Automatisation RH", company: "Groupe Santé Plus", value: "28 000 $", probability: 40, contact: "Julie M.", nextAction: "Démo planifiée" },
  { id: 3, name: "Migration Cloud", company: "Distrib Express", value: "62 000 $", probability: 60, contact: "Marc R.", nextAction: "Envoi soumission" },
  { id: 4, name: "Module Finance", company: "Cabinet Léger", value: "18 500 $", probability: 80, contact: "Isabelle L.", nextAction: "Négocier conditions" },
  { id: 5, name: "Suite complète IA", company: "Transport QC", value: "85 000 $", probability: 35, contact: "Alain T.", nextAction: "2e rencontre" },
  { id: 6, name: "Intégration Sage 50", company: "Excavation JPM", value: "32 000 $", probability: 55, contact: "J-Pierre M.", nextAction: "Suivi post-démo" },
  { id: 7, name: "Chatbot client", company: "Medzy Pharma", value: "15 000 $", probability: 100, contact: "Picard D.", nextAction: "Onboarding" },
];

const stageMap: Record<string, number[]> = { "Nouveau": [1], "Qualifié": [2, 5], "Proposition": [3, 6], "Négociation": [4], "Gagné": [7] };
const stages = Object.keys(stageMap);
const stageColors: Record<string, string> = { "Nouveau": "border-t-slate-500", "Qualifié": "border-t-blue-500", "Proposition": "border-t-purple-500", "Négociation": "border-t-orange-500", "Gagné": "border-t-green-500" };

export default function PipelinePage() {
  const [selected, setSelected] = useState<Deal | null>(null);
  const deals = initialDeals;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Pipeline CRM</h1><p className="text-muted-foreground mt-1">Vue Kanban des opportunités avec actions suggérées par l'IA.</p></div>
        <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors">+ Nouvelle opportunité</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => {
          const ids = stageMap[stage];
          const stageDeals = deals.filter(d => ids.includes(d.id));
          return (
            <div key={stage} className="min-w-[240px] flex-1">
              <div className={`glass rounded-xl border border-border border-t-4 ${stageColors[stage]}`}>
                <div className="p-3 border-b border-border"><h4 className="font-semibold text-sm">{stage}</h4><p className="text-xs text-muted-foreground">{stageDeals.length} deals</p></div>
                <div className="p-2 space-y-2 min-h-[200px]">
                  {stageDeals.map(deal => (
                    <button key={deal.id} onClick={() => setSelected(deal)} className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-md ${selected?.id === deal.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}>
                      <p className="font-medium text-sm">{deal.name}</p><p className="text-xs text-muted-foreground">{deal.company}</p>
                      <div className="flex justify-between items-center mt-2"><span className="text-sm font-bold text-primary">{deal.value}</span><span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{deal.probability}%</span></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <div className="glass rounded-xl border border-border p-6 animate-in fade-in">
          <div className="flex justify-between items-start mb-4"><h3 className="text-xl font-bold">{selected.name}</h3><span className="text-lg font-bold text-primary">{selected.value}</span></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
            <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Entreprise</p><p className="font-medium">{selected.company}</p></div>
            <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Contact</p><p className="font-medium">{selected.contact}</p></div>
            <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Probabilité</p><p className="font-medium">{selected.probability}%</p></div>
            <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Prochaine action</p><p className="font-medium">{selected.nextAction}</p></div>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 mb-4"><p className="text-xs font-semibold text-purple-400 flex items-center gap-1 mb-1"><Sparkles size={12} /> Suggestion IA</p><p className="text-sm">{selected.nextAction}</p></div>
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium flex items-center gap-1.5"><Phone size={14} /> Appeler</button>
            <button className="px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium flex items-center gap-1.5"><Mail size={14} /> Courriel</button>
            <button className="px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium flex items-center gap-1.5"><Calendar size={14} /> Planifier</button>
          </div>
        </div>
      )}
    </div>
  );
}
