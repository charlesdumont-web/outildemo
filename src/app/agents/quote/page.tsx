"use client";

import { useState } from "react";
import { Mail, FileSpreadsheet, Sparkles, Loader2, Check, Download, Send, ArrowRight, DollarSign, User, Building } from "lucide-react";

const incomingEmail = {
  from: "pierre.beaumont@cbeaumont.ca",
  name: "Pierre Beaumont",
  company: "Construction Beaumont",
  subject: "Demande de soumission - Système ERP complet",
  body: `Bonjour,\n\nNous sommes une entreprise de construction de 85 employés basée à Québec. Nous cherchons à moderniser notre gestion avec un système ERP complet incluant :\n\n- Gestion de projets et chantiers\n- Suivi des bons de travail\n- Comptabilité et facturation\n- Gestion des sous-traitants\n\nPouvez-vous nous envoyer une soumission détaillée?\n\nMerci,\nPierre Beaumont\nVP Opérations`,
};

const extractedNeeds = [
  { need: "Module Gestion de Projets", price: "8 500 $", detected: true },
  { need: "Module Bons de Travail", price: "4 200 $", detected: true },
  { need: "Module Comptabilité & Facturation", price: "6 800 $", detected: true },
  { need: "Module Sous-traitants", price: "3 500 $", detected: true },
  { need: "Implantation & Formation", price: "5 000 $", detected: false },
  { need: "Support Premium (12 mois)", price: "4 800 $", detected: false },
];

export default function QuoteAgentPage() {
  const [stage, setStage] = useState<"inbox" | "analyzing" | "quote">("inbox");

  const analyze = () => { setStage("analyzing"); setTimeout(() => setStage("quote"), 2500); };
  const total = extractedNeeds.reduce((s, n) => s + parseInt(n.price.replace(/[^0-9]/g, "")), 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Agent Soumission</h1><p className="text-muted-foreground mt-1">L'IA analyse la demande client et génère une soumission automatiquement.</p></div>
        {stage !== "inbox" && <button onClick={() => setStage("inbox")} className="px-4 py-2 border border-border bg-card hover:bg-muted rounded-md text-sm font-medium transition-colors">Nouvelle demande</button>}
      </div>

      {stage === "inbox" && (
        <div className="glass rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50 flex items-center gap-2"><Mail size={18} className="text-blue-500" /><span className="font-semibold">Demande entrante</span></div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-500">PB</div><div><p className="font-medium">{incomingEmail.name}</p><p className="text-xs text-muted-foreground">{incomingEmail.from}</p></div></div>
              <span className="text-xs text-muted-foreground">Il y a 15 min</span>
            </div>
            <h3 className="font-semibold mb-3">{incomingEmail.subject}</h3>
            <p className="text-sm whitespace-pre-wrap leading-relaxed text-muted-foreground bg-background rounded-lg p-4 border border-border/50">{incomingEmail.body}</p>
            <button onClick={analyze} className="mt-6 px-6 py-2.5 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20 flex items-center gap-2">
              <Sparkles size={16} /> Analyser et générer la soumission
            </button>
          </div>
        </div>
      )}

      {stage === "analyzing" && (
        <div className="glass rounded-2xl border border-border p-16 flex flex-col items-center animate-in fade-in">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 relative"><Sparkles size={36} className="text-purple-500 animate-pulse" /><div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" /></div>
          <h2 className="text-xl font-semibold mb-2">Analyse de la demande en cours...</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-4"><Loader2 size={16} className="animate-spin" />Identification des besoins, calcul des prix, rédaction de la soumission...</div>
        </div>
      )}

      {stage === "quote" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><Sparkles size={18} className="text-purple-500" /> Besoins détectés par l'IA</h3>
              <div className="space-y-2">
                {extractedNeeds.map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${n.detected ? "bg-green-500" : "bg-blue-500"}`}><Check size={12} className="text-white" /></div>
                      <span className="text-sm font-medium">{n.need}</span>
                      {n.detected && <span className="text-[10px] bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-full font-medium">Détecté</span>}
                      {!n.detected && <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded-full font-medium">Suggéré par IA</span>}
                    </div>
                    <span className="font-medium text-sm">{n.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg flex justify-between items-center">
                <span className="font-semibold text-lg">Total soumission</span>
                <span className="text-2xl font-bold text-primary">{total.toLocaleString()} $</span>
              </div>
            </div>

            {/* PDF Preview mini */}
            <div className="glass rounded-xl border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-card/50 flex items-center gap-2"><FileSpreadsheet size={16} className="text-red-500" /><span className="text-sm font-medium">soumission_construction_beaumont.pdf</span></div>
              <div className="bg-muted/50 p-6 flex justify-center">
                <div className="w-full max-w-sm bg-white rounded shadow-lg p-6 text-gray-800 text-[10px] space-y-3">
                  <div className="text-center border-b border-gray-200 pb-3"><div className="w-8 h-8 mx-auto mb-1 rounded bg-blue-600 flex items-center justify-center text-white font-bold">S</div><h4 className="font-bold text-sm uppercase">Soumission</h4><p className="text-gray-500">SOQ-2026-087</p></div>
                  <p><strong>Client :</strong> Construction Beaumont — Pierre Beaumont</p>
                  <p><strong>Date :</strong> 30 avril 2026</p>
                  <p><strong>Validité :</strong> 30 jours</p>
                  <table className="w-full mt-2"><thead><tr className="border-b border-gray-300"><th className="text-left py-1">Module</th><th className="text-right py-1">Prix</th></tr></thead>
                    <tbody>{extractedNeeds.map((n, i) => <tr key={i} className="border-b border-gray-100"><td className="py-1">{n.need}</td><td className="text-right">{n.price}</td></tr>)}</tbody>
                  </table>
                  <div className="text-right font-bold text-sm border-t border-gray-200 pt-2">Total : {total.toLocaleString()} $ + taxes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2"><User size={16} className="text-blue-500" /> Fiche client</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Entreprise</span><span className="font-medium">Construction Beaumont</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Contact</span><span className="font-medium">Pierre Beaumont</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Employés</span><span className="font-medium">85</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Secteur</span><span className="font-medium">Construction</span></div>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"><Send size={16} /> Envoyer au client</button>
              <button className="w-full px-4 py-3 border border-border hover:bg-muted rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2"><Download size={16} /> Télécharger PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
