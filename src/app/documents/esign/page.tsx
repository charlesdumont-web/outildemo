"use client";

import { FileSignature, Check, Clock, Send, Eye, User } from "lucide-react";

const documents = [
  { id: 1, name: "Contrat ERP - Construction Beaumont", signers: [{ name: "Pierre Beaumont", status: "Signé", date: "2026-04-28" }, { name: "Charles Dumont", status: "Signé", date: "2026-04-27" }] },
  { id: 2, name: "NDA - Medzy Pharma", signers: [{ name: "Picard Desjardins", status: "En attente", date: null }, { name: "Charles Dumont", status: "Signé", date: "2026-04-29" }] },
  { id: 3, name: "Soumission - Distrib Express", signers: [{ name: "Marc Roy", status: "En attente", date: null }, { name: "Charles Dumont", status: "Envoyé", date: "2026-04-30" }] },
];

export default function ESignPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Signature Électronique</h1><p className="text-muted-foreground mt-1">Suivi des documents envoyés pour signature.</p></div>
        <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium flex items-center gap-2"><Send size={16} /> Envoyer pour signature</button>
      </div>

      <div className="space-y-4">
        {documents.map(doc => {
          const allSigned = doc.signers.every(s => s.status === "Signé");
          return (
            <div key={doc.id} className={`glass rounded-xl border p-6 ${allSigned ? "border-green-500/50" : "border-border"}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3"><FileSignature size={20} className={allSigned ? "text-green-500" : "text-blue-500"} /><h3 className="font-semibold">{doc.name}</h3></div>
                {allSigned && <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 flex items-center gap-1"><Check size={12} /> Complété</span>}
              </div>
              <div className="space-y-2">
                {doc.signers.map((s, i) => (
                  <div key={i} className="flex items-center justify-between bg-background rounded-lg p-3 border border-border/50">
                    <div className="flex items-center gap-3"><User size={16} className="text-muted-foreground" /><span className="text-sm font-medium">{s.name}</span></div>
                    <div className="flex items-center gap-2">
                      {s.status === "Signé" && <span className="flex items-center gap-1 text-xs text-green-500 font-medium"><Check size={12} /> Signé le {s.date}</span>}
                      {s.status === "En attente" && <span className="flex items-center gap-1 text-xs text-orange-500 font-medium"><Clock size={12} /> En attente</span>}
                      {s.status === "Envoyé" && <span className="flex items-center gap-1 text-xs text-blue-500 font-medium"><Send size={12} /> Envoyé</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1.5 border border-border hover:bg-muted rounded-md text-xs font-medium flex items-center gap-1"><Eye size={12} /> Voir document</button>
                {!allSigned && <button className="px-3 py-1.5 border border-border hover:bg-muted rounded-md text-xs font-medium flex items-center gap-1"><Send size={12} /> Relancer</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
