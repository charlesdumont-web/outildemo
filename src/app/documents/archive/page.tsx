"use client";

import { useState } from "react";
import { Archive, Upload, Sparkles, FileText, Image, File, Search, FolderOpen, Check } from "lucide-react";

const documents = [
  { id: 1, name: "Contrat_ERP_Beaumont_2026.pdf", type: "Contrat", category: "Clients", date: "2026-04-28", size: "2.4 MB", aiClassified: true },
  { id: 2, name: "Facture_TechCorp_04871.pdf", type: "Facture", category: "Fournisseurs", date: "2026-04-25", size: "1.1 MB", aiClassified: true },
  { id: 3, name: "Politique_teletravail_v3.docx", type: "Politique interne", category: "RH", date: "2026-03-15", size: "340 KB", aiClassified: true },
  { id: 4, name: "Logo_SynchroIA_HD.png", type: "Image", category: "Marketing", date: "2026-01-10", size: "5.2 MB", aiClassified: false },
  { id: 5, name: "Rapport_audit_Q1.pdf", type: "Rapport", category: "Finance", date: "2026-04-01", size: "3.8 MB", aiClassified: true },
];

const categories = ["Tous", "Clients", "Fournisseurs", "RH", "Finance", "Marketing"];
const typeIcons: Record<string, typeof FileText> = { "Contrat": FileText, "Facture": FileText, "Politique interne": FileText, "Image": Image, "Rapport": FileText };

export default function ArchivePage() {
  const [filter, setFilter] = useState("Tous");
  const filtered = filter === "Tous" ? documents : documents.filter(d => d.category === filter);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Archivage Intelligent</h1><p className="text-muted-foreground mt-1">Upload de documents — l'IA les classe et les indexe.</p></div>
        <button className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium flex items-center gap-2"><Upload size={16} /> Téléverser</button>
      </div>

      <div className="glass rounded-xl border-2 border-dashed border-border p-8 flex flex-col items-center cursor-pointer hover:border-primary/50 transition-all">
        <Upload size={32} className="text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">Glissez vos fichiers ici — l'IA les classera automatiquement</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === c ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
      </div>

      <div className="glass rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
            <tr><th className="px-6 py-3 text-left font-medium">Document</th><th className="px-6 py-3 text-left font-medium">Type</th><th className="px-6 py-3 text-left font-medium">Catégorie</th><th className="px-6 py-3 text-left font-medium">Date</th><th className="px-6 py-3 text-right font-medium">Taille</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="px-6 py-3 flex items-center gap-2"><FileText size={16} className="text-red-500 flex-shrink-0" /><span className="font-medium">{d.name}</span></td>
                <td className="px-6 py-3">{d.type}</td>
                <td className="px-6 py-3"><span className="px-2 py-0.5 rounded-full text-xs bg-muted">{d.category}</span></td>
                <td className="px-6 py-3 text-muted-foreground">{d.date}</td>
                <td className="px-6 py-3 text-right text-muted-foreground flex items-center justify-end gap-2">{d.size}{d.aiClassified && <span className="text-[9px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded-full">IA</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
