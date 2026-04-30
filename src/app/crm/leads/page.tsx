"use client";

import { Target, Sparkles, Globe, TrendingUp, ArrowUpRight, Mail, Phone } from "lucide-react";

const leads = [
  { id: 1, name: "Sophie Gagnon", company: "BioTech Montréal", title: "VP Opérations", score: 92, source: "LinkedIn Ad", sector: "Pharmaceutique", employees: 120, signals: ["Visite page pricing", "Ouvert 3 courriels", "Téléchargé guide ERP"], enriched: { website: "biotechmtl.ca", revenue: "12M $", techStack: "Sage 50, Excel" } },
  { id: 2, name: "François Dubé", company: "Électrique FD", title: "Président", score: 78, source: "Google Ads", sector: "Construction", employees: 45, signals: ["Formulaire contact", "Visite 5 pages"], enriched: { website: "electriquefd.com", revenue: "4M $", techStack: "QuickBooks" } },
  { id: 3, name: "Amélie Caron", company: "Réseau Santé QC", title: "Dir. TI", score: 65, source: "Référence", sector: "Santé", employees: 200, signals: ["Appel entrant"], enriched: { website: "rsqc.ca", revenue: "25M $", techStack: "SAP" } },
  { id: 4, name: "David Pelletier", company: "Logistique DP", title: "CFO", score: 45, source: "Webinaire", sector: "Distribution", employees: 80, signals: ["Inscription webinaire"], enriched: { website: "logistiquedp.ca", revenue: "8M $", techStack: "Acomba" } },
];

const getScoreColor = (s: number) => s >= 80 ? "text-green-500 bg-green-500/10 border-green-500/30" : s >= 60 ? "text-blue-500 bg-blue-500/10 border-blue-500/30" : s >= 40 ? "text-orange-500 bg-orange-500/10 border-orange-500/30" : "text-red-500 bg-red-500/10 border-red-500/30";

export default function LeadsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Leads & Scoring</h1><p className="text-muted-foreground mt-1">Prioritisation automatique et enrichissement IA des prospects.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full border border-purple-500/20 text-sm font-medium"><Sparkles size={16} /> Scoring actif</div>
      </div>

      <div className="space-y-4">
        {leads.map(lead => (
          <div key={lead.id} className="glass rounded-xl border border-border p-6 hover:border-primary/30 transition-all">
            <div className="flex items-start gap-6">
              <div className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-xl font-bold flex-shrink-0 ${getScoreColor(lead.score)}`}>{lead.score}</div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div><h3 className="font-semibold text-lg">{lead.name}</h3><p className="text-sm text-muted-foreground">{lead.title} — {lead.company}</p></div>
                  <div className="flex gap-2"><button className="p-2 border border-border rounded-md hover:bg-muted"><Phone size={14} /></button><button className="p-2 border border-border rounded-md hover:bg-muted"><Mail size={14} /></button></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                  <div className="bg-background rounded-lg p-2 border border-border/50"><span className="text-muted-foreground">Source</span><p className="font-medium">{lead.source}</p></div>
                  <div className="bg-background rounded-lg p-2 border border-border/50"><span className="text-muted-foreground">Secteur</span><p className="font-medium">{lead.sector}</p></div>
                  <div className="bg-background rounded-lg p-2 border border-border/50"><span className="text-muted-foreground">Employés</span><p className="font-medium">{lead.employees}</p></div>
                  <div className="bg-background rounded-lg p-2 border border-border/50"><span className="text-muted-foreground">Revenus</span><p className="font-medium">{lead.enriched.revenue}</p></div>
                </div>

                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-[10px] font-semibold text-purple-400 flex items-center gap-1"><Sparkles size={10} /> Signaux :</span>
                  {lead.signals.map((s, i) => <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded-full">{s}</span>)}
                </div>

                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1"><Globe size={10} /> {lead.enriched.website}</span>
                  <span>•</span>
                  <span>Stack : {lead.enriched.techStack}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
