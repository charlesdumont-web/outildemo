"use client";

import { useState } from "react";
import { UserPlus, Check, Circle, Send, FileText, Key, Monitor, Users } from "lucide-react";

const steps = [
  { id: 1, title: "Contrat signé et reçu", responsible: "RH", icon: FileText, done: true },
  { id: 2, title: "Accès systèmes créés (courriel, VPN, Slack)", responsible: "TI", icon: Key, done: true },
  { id: 3, title: "Poste de travail préparé", responsible: "TI", icon: Monitor, done: true },
  { id: 4, title: "Documents d'accueil envoyés", responsible: "RH", icon: Send, done: false },
  { id: 5, title: "Rencontre gestionnaire planifiée", responsible: "Gestionnaire", icon: Users, done: false },
  { id: 6, title: "Formation outils internes", responsible: "Formation", icon: Monitor, done: false },
];

export default function OnboardingPage() {
  const [checklist, setChecklist] = useState(steps);

  const toggle = (id: number) => {
    setChecklist(prev => prev.map(s => s.id === id ? { ...s, done: !s.done } : s));
  };

  const done = checklist.filter(s => s.done).length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div><h1 className="text-3xl font-bold tracking-tight">Onboarding Automatisé</h1><p className="text-muted-foreground mt-1">Checklist IA pour l'intégration des nouveaux employés.</p></div>

      <div className="glass rounded-xl border border-border p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xl">MP</div>
          <div><h3 className="font-semibold text-lg">Marc Pelletier</h3><p className="text-sm text-muted-foreground">Développeur Full-Stack — Début : 28 avril 2026</p></div>
          <div className="ml-auto text-right"><p className="text-sm text-muted-foreground">Progression</p><p className="text-2xl font-bold text-primary">{done}/{checklist.length}</p></div>
        </div>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden mb-6"><div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(done / checklist.length) * 100}%` }} /></div>

        <div className="space-y-3">
          {checklist.map(step => {
            const Icon = step.icon;
            return (
              <button key={step.id} onClick={() => toggle(step.id)} className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all text-left ${step.done ? "bg-green-500/5 border-green-500/30" : "border-border hover:border-primary/30"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-green-500" : "border-2 border-border"}`}>
                  {step.done ? <Check size={16} className="text-white" /> : <Circle size={16} className="text-muted-foreground" />}
                </div>
                <Icon size={18} className={step.done ? "text-green-500" : "text-muted-foreground"} />
                <div className="flex-1"><p className={`font-medium text-sm ${step.done ? "line-through text-muted-foreground" : ""}`}>{step.title}</p><p className="text-xs text-muted-foreground">Responsable : {step.responsible}</p></div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
