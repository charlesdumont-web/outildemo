"use client";

import { useState } from "react";
import { Bell, AlertTriangle, TrendingDown, CreditCard, Package, Users, Sparkles, Check, X, ChevronRight } from "lucide-react";

const alertsData = [
  { id: 1, type: "critical", icon: TrendingDown, title: "Chute des ventes de 15% ce mois", description: "Les revenus de la dernière semaine sont 15% sous la moyenne mensuelle. 3 deals majeurs sont bloqués en phase de négociation.", suggestion: "Relancer les 3 prospects en négociation et offrir un incitatif (rabais 5% si signature avant le 15 mai).", time: "Il y a 12 min" },
  { id: 2, type: "warning", icon: CreditCard, title: "Facture #INV-2026-005 en retard de 12 jours", description: "Legal Partners — 2 500,00 $. Aucune réponse aux 2 rappels automatiques envoyés.", suggestion: "Escalader : envoyer un courriel personnalisé du directeur financier et planifier un appel.", time: "Il y a 1h" },
  { id: 3, type: "warning", icon: Package, title: "3 items inventaire sous le seuil critique", description: "AWS Server Credits (3/6), Ergonomic Chairs (12/15), Office Desks (5/5) nécessitent un réapprovisionnement.", suggestion: "Générer automatiquement un bon de commande groupé pour les 3 fournisseurs concernés.", time: "Il y a 2h" },
  { id: 4, type: "info", icon: Users, title: "Nouvel employé : onboarding incomplet", description: "Marc Pelletier (développeur) a rejoint l'équipe il y a 5 jours mais 3 étapes d'onboarding ne sont pas complétées.", suggestion: "Envoyer un rappel automatique à Marc et à son gestionnaire avec la liste des tâches manquantes.", time: "Il y a 3h" },
  { id: 5, type: "info", icon: Sparkles, title: "Rapport hebdomadaire IA disponible", description: "Le résumé automatisé de la semaine 18 est prêt. Inclut : performance ventes, KPIs opérationnels, et recommandations.", suggestion: "Consulter le rapport et l'envoyer à l'équipe de direction par courriel.", time: "Il y a 5h" },
];

export default function AlertsPage() {
  const [resolved, setResolved] = useState<number[]>([]);

  const resolve = (id: number) => setResolved((prev) => [...prev, id]);

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "critical": return { border: "border-l-red-500", bg: "bg-red-500/5", badge: "bg-red-500/10 text-red-500", label: "Critique" };
      case "warning": return { border: "border-l-orange-500", bg: "bg-orange-500/5", badge: "bg-orange-500/10 text-orange-500", label: "Attention" };
      default: return { border: "border-l-blue-500", bg: "bg-blue-500/5", badge: "bg-blue-500/10 text-blue-500", label: "Info" };
    }
  };

  const active = alertsData.filter((a) => !resolved.includes(a.id));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alertes Intelligentes</h1>
          <p className="text-muted-foreground mt-1">L'IA détecte les anomalies et propose des actions correctives.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 text-sm font-medium">
          <Bell size={16} /> {active.length} alertes actives
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-red-500">
          <p className="text-sm text-muted-foreground">Critiques</p>
          <p className="text-2xl font-bold text-red-500 mt-1">{active.filter(a => a.type === "critical").length}</p>
        </div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-orange-500">
          <p className="text-sm text-muted-foreground">Attention</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">{active.filter(a => a.type === "warning").length}</p>
        </div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Informatives</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">{active.filter(a => a.type === "info").length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {alertsData.map((alert) => {
          const styles = getTypeStyles(alert.type);
          const isResolved = resolved.includes(alert.id);
          const Icon = alert.icon;
          return (
            <div key={alert.id} className={`glass rounded-xl border border-border border-l-4 ${styles.border} overflow-hidden transition-all duration-500 ${isResolved ? "opacity-40 scale-[0.98]" : ""}`}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${styles.bg}`}><Icon size={20} /></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>{styles.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert.time}</span>
                </div>

                <div className="mt-4 ml-12 bg-purple-500/5 border border-purple-500/20 rounded-lg p-3 flex items-start gap-2">
                  <Sparkles size={16} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-purple-400 mb-1">Suggestion IA</p>
                    <p className="text-sm text-muted-foreground">{alert.suggestion}</p>
                  </div>
                </div>

                {!isResolved && (
                  <div className="mt-4 ml-12 flex gap-2">
                    <button onClick={() => resolve(alert.id)} className="px-4 py-1.5 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-1.5">
                      <Check size={14} /> Appliquer la suggestion
                    </button>
                    <button onClick={() => resolve(alert.id)} className="px-4 py-1.5 border border-border hover:bg-muted rounded-md text-sm font-medium transition-colors flex items-center gap-1.5">
                      <X size={14} /> Ignorer
                    </button>
                    <button className="px-4 py-1.5 border border-border hover:bg-muted rounded-md text-sm font-medium transition-colors flex items-center gap-1.5">
                      Voir détails <ChevronRight size={14} />
                    </button>
                  </div>
                )}
                {isResolved && (
                  <div className="mt-4 ml-12 text-sm text-green-500 flex items-center gap-1.5"><Check size={16} /> Résolu</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
