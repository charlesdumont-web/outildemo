"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, BarChart3, ArrowUpRight, GripVertical, Sparkles, User, Phone, Mail, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const forecastData = [
  { month: "Jan", closed: 42000, projected: 0 }, { month: "Fév", closed: 38000, projected: 0 },
  { month: "Mar", closed: 55000, projected: 0 }, { month: "Avr", closed: 48000, projected: 0 },
  { month: "Mai", closed: 0, projected: 62000 }, { month: "Juin", closed: 0, projected: 71000 },
];

interface Deal { id: number; name: string; company: string; value: string; stage: string; probability: number; contact: string; nextAction: string; }

const initialDeals: Deal[] = [
  { id: 1, name: "Implantation ERP", company: "Construction Beaumont", value: "45 000 $", stage: "Nouveau", probability: 20, contact: "Pierre B.", nextAction: "Appel de découverte" },
  { id: 2, name: "Automatisation RH", company: "Groupe Santé Plus", value: "28 000 $", stage: "Qualifié", probability: 40, contact: "Julie M.", nextAction: "Démo planifiée" },
  { id: 3, name: "Migration Cloud", company: "Distrib Express", value: "62 000 $", stage: "Proposition", probability: 60, contact: "Marc R.", nextAction: "Envoi de soumission" },
  { id: 4, name: "Module Finance", company: "Cabinet Léger", value: "18 500 $", stage: "Négociation", probability: 80, contact: "Isabelle L.", nextAction: "Négocier conditions" },
  { id: 5, name: "Suite complète IA", company: "Transport QC", value: "85 000 $", stage: "Qualifié", probability: 35, contact: "Alain T.", nextAction: "2e rencontre" },
  { id: 6, name: "Intégration Sage 50", company: "Excavation JPM", value: "32 000 $", stage: "Proposition", probability: 55, contact: "Jean-Pierre M.", nextAction: "Suivi post-démo" },
  { id: 7, name: "Chatbot client", company: "Medzy Pharma", value: "15 000 $", stage: "Gagné", probability: 100, contact: "Picard D.", nextAction: "Onboarding" },
];

const stages = ["Nouveau", "Qualifié", "Proposition", "Négociation", "Gagné"];
const stageColors: Record<string, string> = { "Nouveau": "border-t-slate-500", "Qualifié": "border-t-blue-500", "Proposition": "border-t-purple-500", "Négociation": "border-t-orange-500", "Gagné": "border-t-green-500" };

export default function SalesPage() {
  const [deals] = useState(initialDeals);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const totalPipeline = deals.reduce((sum, d) => sum + parseInt(d.value.replace(/[^0-9]/g, "")), 0);
  const weighted = deals.reduce((sum, d) => sum + parseInt(d.value.replace(/[^0-9]/g, "")) * d.probability / 100, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ventes & Pipeline</h1>
          <p className="text-muted-foreground mt-1">Vue Kanban des opportunités avec prévisions.</p>
        </div>
        <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20">
          + Nouvelle opportunité
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-5 border border-border"><p className="text-sm text-muted-foreground">Pipeline total</p><h3 className="text-2xl font-bold mt-1">{totalPipeline.toLocaleString()} $</h3></div>
        <div className="glass rounded-xl p-5 border border-border"><p className="text-sm text-muted-foreground">Pondéré</p><h3 className="text-2xl font-bold mt-1 text-blue-500">{Math.round(weighted).toLocaleString()} $</h3></div>
        <div className="glass rounded-xl p-5 border border-border"><p className="text-sm text-muted-foreground">Deals actifs</p><h3 className="text-2xl font-bold mt-1">{deals.filter(d => d.stage !== "Gagné").length}</h3></div>
        <div className="glass rounded-xl p-5 border border-border"><p className="text-sm text-muted-foreground">Taux de conversion</p><h3 className="text-2xl font-bold mt-1 text-green-500">28%</h3></div>
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const stageTotal = stageDeals.reduce((s, d) => s + parseInt(d.value.replace(/[^0-9]/g, "")), 0);
          return (
            <div key={stage} className="min-w-[260px] flex-1">
              <div className={`glass rounded-xl border border-border border-t-4 ${stageColors[stage]} flex flex-col`}>
                <div className="p-3 border-b border-border flex justify-between items-center">
                  <div><h4 className="font-semibold text-sm">{stage}</h4><p className="text-xs text-muted-foreground">{stageDeals.length} deals • {stageTotal.toLocaleString()} $</p></div>
                </div>
                <div className="p-2 space-y-2 min-h-[200px]">
                  {stageDeals.map((deal) => (
                    <button key={deal.id} onClick={() => setSelectedDeal(deal)}
                      className={`w-full text-left p-3 rounded-lg border transition-all hover:shadow-md ${selectedDeal?.id === deal.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}>
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-sm">{deal.name}</p>
                        <GripVertical size={14} className="text-muted-foreground" />
                      </div>
                      <p className="text-xs text-muted-foreground">{deal.company}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-bold text-primary">{deal.value}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{deal.probability}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast */}
        <div className="glass rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-1">Prévisions de revenus</h3>
          <p className="text-sm text-muted-foreground mb-4">Réalisé vs Projeté</p>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={forecastData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ backgroundColor: "rgba(17,24,39,0.95)", borderColor: "#1f2937", borderRadius: "8px" }} />
                <Bar dataKey="closed" name="Réalisé" fill="#3b82f6" radius={[4,4,0,0]} barSize={24} />
                <Bar dataKey="projected" name="Projeté" fill="#8b5cf6" radius={[4,4,0,0]} barSize={24} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Deal Detail */}
        <div className="glass rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold mb-4">Détail de l'opportunité</h3>
          {selectedDeal ? (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold">{selectedDeal.name}</h4>
                <span className="text-lg font-bold text-primary">{selectedDeal.value}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Entreprise</p><p className="font-medium">{selectedDeal.company}</p></div>
                <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Probabilité</p><p className="font-medium">{selectedDeal.probability}%</p></div>
                <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Contact</p><p className="font-medium">{selectedDeal.contact}</p></div>
                <div className="bg-background rounded-lg p-3 border border-border/50"><p className="text-muted-foreground text-xs">Étape</p><p className="font-medium">{selectedDeal.stage}</p></div>
              </div>
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                <p className="text-xs font-semibold text-purple-400 mb-1 flex items-center gap-1"><Sparkles size={12} /> Prochaine action IA</p>
                <p className="text-sm">{selectedDeal.nextAction}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium flex items-center justify-center gap-1.5"><Phone size={14} /> Appeler</button>
                <button className="flex-1 px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium flex items-center justify-center gap-1.5"><Mail size={14} /> Courriel</button>
                <button className="flex-1 px-3 py-2 border border-border hover:bg-muted rounded-md text-sm font-medium flex items-center justify-center gap-1.5"><Calendar size={14} /> Planifier</button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <BarChart3 size={48} className="mb-4 opacity-30" />
              <p className="text-sm">Sélectionnez une opportunité dans le Kanban</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
