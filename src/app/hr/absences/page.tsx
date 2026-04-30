"use client";

import { CalendarDays, Check, X, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const absences = [
  { name: "Julie Martin", type: "Vacances", start: "2026-05-05", end: "2026-05-09", status: "Approuvé" },
  { name: "Marc Pelletier", type: "Personnel", start: "2026-05-12", end: "2026-05-12", status: "En attente" },
  { name: "Sophie Lavoie", type: "Maladie", start: "2026-04-29", end: "2026-04-30", status: "Approuvé" },
  { name: "Alain Roy", type: "Vacances", start: "2026-05-19", end: "2026-05-30", status: "En attente" },
];

const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const calDays = Array.from({ length: 31 }, (_, i) => i + 1);
const highlightDays = [5, 6, 7, 8, 9, 12, 29, 30]; // days with absences

export default function AbsencesPage() {
  const getStatusBadge = (s: string) => {
    if (s === "Approuvé") return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 flex items-center gap-1"><Check size={10} /> {s}</span>;
    return <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 flex items-center gap-1"><Clock size={10} /> {s}</span>;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight">Absences & Vacances</h1><p className="text-muted-foreground mt-1">Gestion des demandes et calendrier d'équipe.</p></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50 flex justify-between items-center">
            <div className="flex items-center gap-3"><ChevronLeft size={18} className="text-muted-foreground cursor-pointer" /><h3 className="font-semibold">Mai 2026</h3><ChevronRight size={18} className="text-muted-foreground cursor-pointer" /></div>
            <button className="px-4 py-1.5 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium">+ Demande d'absence</button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 mb-2">{days.map(d => <div key={d} className="text-center text-xs text-muted-foreground font-medium py-1">{d}</div>)}</div>
            <div className="grid grid-cols-7 gap-1">
              {/* offset for May 2026 starting on Friday */}
              {[0, 0, 0, 0].map((_, i) => <div key={`e${i}`} />)}
              {calDays.map(d => (
                <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-colors cursor-pointer ${highlightDays.includes(d) ? "bg-primary/20 text-primary border border-primary/30" : "hover:bg-muted"} ${d === 1 ? "ring-2 ring-primary" : ""}`}>{d}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-xl border border-border p-4">
          <h3 className="font-semibold mb-4">Demandes récentes</h3>
          <div className="space-y-3">
            {absences.map((a, i) => (
              <div key={i} className="bg-background rounded-lg p-3 border border-border/50">
                <div className="flex justify-between items-start mb-1"><span className="font-medium text-sm">{a.name}</span>{getStatusBadge(a.status)}</div>
                <p className="text-xs text-muted-foreground">{a.type} — {a.start} au {a.end}</p>
                {a.status === "En attente" && (
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium hover:bg-green-500/20">Approuver</button>
                    <button className="flex-1 px-2 py-1 bg-red-500/10 text-red-500 rounded text-xs font-medium hover:bg-red-500/20">Refuser</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
