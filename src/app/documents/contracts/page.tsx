"use client";

import { useState } from "react";
import { PenTool, Sparkles, FileText, Send, Check, Loader2, Download, ChevronRight, User } from "lucide-react";

const clients = [
  { id: 1, name: "Construction Beaumont", contact: "Pierre Beaumont", email: "p.beaumont@cbeaumont.ca" },
  { id: 2, name: "Services Financiers Léger", contact: "Isabelle Léger", email: "i.leger@sfleger.com" },
  { id: 3, name: "Transport Express QC", contact: "Marc-Antoine Roy", email: "ma.roy@teqc.ca" },
];

const contractTypes = ["Contrat de service", "Entente de confidentialité (NDA)", "Soumission de projet", "Contrat de licence logicielle"];

const clauseOptions = [
  { id: "payment", label: "Conditions de paiement Net 30", checked: true },
  { id: "confidentiality", label: "Clause de confidentialité", checked: true },
  { id: "liability", label: "Limitation de responsabilité", checked: true },
  { id: "termination", label: "Clause de résiliation (30 jours)", checked: false },
  { id: "sla", label: "Entente de niveau de service (SLA 99.9%)", checked: false },
  { id: "ip", label: "Propriété intellectuelle", checked: false },
];

export default function ContractsPage() {
  const [selectedClient, setSelectedClient] = useState(0);
  const [contractType, setContractType] = useState(0);
  const [clauses, setClauses] = useState(clauseOptions);
  const [stage, setStage] = useState<"form" | "generating" | "preview">("form");
  const [projectName, setProjectName] = useState("Implantation ERP Synchro IA");
  const [amount, setAmount] = useState("24 500,00");

  const toggleClause = (id: string) => {
    setClauses(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const generate = () => {
    setStage("generating");
    setTimeout(() => setStage("preview"), 2500);
  };

  const client = clients[selectedClient];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contrats & Soumissions</h1>
          <p className="text-muted-foreground mt-1">Générez des documents professionnels assistés par l'IA.</p>
        </div>
      </div>

      {stage === "generating" && (
        <div className="glass rounded-2xl border border-border p-16 flex flex-col items-center animate-in fade-in">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mb-6 relative">
            <Sparkles size={36} className="text-purple-500 animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Génération du document en cours...</h2>
          <p className="text-muted-foreground text-sm mb-6">L'IA rédige les clauses et met en page le PDF</p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Loader2 size={16} className="animate-spin" />
            <span>Application des clauses sélectionnées et données du client...</span>
          </div>
        </div>
      )}

      {stage === "form" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><User size={18} className="text-blue-500" /> Sélection du client</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {clients.map((c, i) => (
                  <button key={c.id} onClick={() => setSelectedClient(i)}
                    className={`p-4 rounded-lg border text-left transition-all ${selectedClient === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{c.contact}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><FileText size={18} className="text-purple-500" /> Détails du document</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-1.5">Type de document</label>
                  <div className="grid grid-cols-2 gap-2">
                    {contractTypes.map((t, i) => (
                      <button key={i} onClick={() => setContractType(i)}
                        className={`p-3 rounded-lg border text-sm font-medium text-left transition-all ${contractType === i ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1.5">Nom du projet</label>
                    <input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground block mb-1.5">Montant ($)</label>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2"><PenTool size={18} className="text-green-500" /> Clauses à inclure</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clauses.map((c) => (
                  <button key={c.id} onClick={() => toggleClause(c.id)}
                    className={`p-3 rounded-lg border text-sm text-left flex items-center gap-3 transition-all ${c.checked ? "border-green-500/50 bg-green-500/5" : "border-border hover:border-primary/30"}`}>
                    <div className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${c.checked ? "bg-green-500 border-green-500" : "border-border"}`}>
                      {c.checked && <Check size={12} className="text-white" />}
                    </div>
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass rounded-xl border border-border p-6 flex flex-col sticky top-24">
            <h3 className="font-semibold mb-4">Résumé</h3>
            <div className="space-y-3 text-sm flex-1">
              <div className="flex justify-between"><span className="text-muted-foreground">Client</span><span className="font-medium">{client.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{contractTypes[contractType]}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Projet</span><span className="font-medium">{projectName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Montant</span><span className="font-medium">{amount} $</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Clauses</span><span className="font-medium">{clauses.filter(c => c.checked).length}/{clauses.length}</span></div>
            </div>
            <button onClick={generate} className="mt-6 w-full px-4 py-3 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
              <Sparkles size={16} /> Générer le document
            </button>
          </div>
        </div>
      )}

      {stage === "preview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
          <div className="glass rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
              <span className="font-medium text-sm flex items-center gap-2"><FileText size={16} className="text-red-500" /> contrat_{client.name.toLowerCase().replace(/\s/g, "_")}.pdf</span>
              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-medium">Généré par IA</span>
            </div>
            <div className="bg-muted/50 p-8 min-h-[600px] flex items-start justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-gray-800 text-xs leading-relaxed space-y-4">
                <div className="text-center border-b border-gray-200 pb-4">
                  <div className="w-10 h-10 mx-auto mb-2 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-lg">S</div>
                  <h3 className="text-base font-bold text-gray-900 uppercase tracking-wider">{contractTypes[contractType]}</h3>
                  <p className="text-gray-500 mt-1">Réf: CTR-2026-{String(Math.floor(Math.random() * 900 + 100))}</p>
                </div>
                <div className="space-y-2">
                  <p><strong>Entre :</strong> Synchro IA Inc., 500 boul. René-Lévesque O., Montréal QC</p>
                  <p><strong>Et :</strong> {client.name}, att. {client.contact}</p>
                  <p><strong>Objet :</strong> {projectName}</p>
                  <p><strong>Montant :</strong> {amount} $ + taxes applicables</p>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <h4 className="font-bold mb-2">Clauses applicables</h4>
                  {clauses.filter(c => c.checked).map((c, i) => (
                    <p key={i} className="mb-1">• {c.label}</p>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-3 mt-4 flex justify-between">
                  <div><p className="font-bold">Synchro IA Inc.</p><div className="mt-4 border-b border-gray-300 w-32" /><p className="text-[9px] mt-1">Signature</p></div>
                  <div><p className="font-bold">{client.name}</p><div className="mt-4 border-b border-gray-300 w-32" /><p className="text-[9px] mt-1">Signature</p></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass rounded-xl border border-border p-6">
              <h3 className="font-semibold mb-4">Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Send size={16} /> Envoyer pour signature électronique
                </button>
                <button className="w-full px-4 py-3 border border-border hover:bg-muted rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <Download size={16} /> Télécharger le PDF
                </button>
                <button onClick={() => setStage("form")} className="w-full px-4 py-3 border border-border hover:bg-muted rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  <PenTool size={16} /> Modifier et regénérer
                </button>
              </div>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">
              <Sparkles size={18} className="text-purple-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-purple-400 mb-1">Note IA</p>
                <p className="text-sm text-muted-foreground">Le document a été généré avec les clauses standards québécoises. Je recommande d'ajouter la clause SLA si ce client a des besoins de disponibilité critique.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
