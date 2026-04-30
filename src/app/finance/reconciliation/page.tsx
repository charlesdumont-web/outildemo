"use client";

import { useState } from "react";
import { DollarSign, Sparkles, Check, X, ArrowRight, Link2 } from "lucide-react";

const bankTransactions = [
  { id: 1, date: "2026-04-29", desc: "VIR TECHCORP SYSTEMS", amount: -4500.00, matched: null as number | null, aiSuggestion: 1 },
  { id: 2, date: "2026-04-28", desc: "DÉP OFFICE SUPPLIES", amount: -345.50, matched: null as number | null, aiSuggestion: 2 },
  { id: 3, date: "2026-04-25", desc: "VIR CLIENT BEAUMONT", amount: 12000.00, matched: null as number | null, aiSuggestion: 3 },
  { id: 4, date: "2026-04-24", desc: "PRÉL ASSURANCE GROUPE", amount: -890.00, matched: null as number | null, aiSuggestion: null },
  { id: 5, date: "2026-04-23", desc: "VIR CLIENT DISTRIB EX", amount: 8500.00, matched: null as number | null, aiSuggestion: 5 },
];

const accountEntries = [
  { id: 1, ref: "INV-2026-001", desc: "Facture TechCorp Systems", amount: -4500.00 },
  { id: 2, ref: "INV-2026-002", desc: "Facture Office Supplies Co", amount: -345.50 },
  { id: 3, ref: "FAC-2026-012", desc: "Facture client Construction Beaumont", amount: 12000.00 },
  { id: 4, ref: "DEP-2026-008", desc: "Dépense assurance non classée", amount: -890.00 },
  { id: 5, ref: "FAC-2026-011", desc: "Facture client Distrib Express", amount: 8500.00 },
];

export default function ReconciliationPage() {
  const [matches, setMatches] = useState<Record<number, number>>({});

  const acceptSuggestion = (bankId: number, entryId: number) => {
    setMatches(prev => ({ ...prev, [bankId]: entryId }));
  };
  const acceptAll = () => {
    const all: Record<number, number> = {};
    bankTransactions.forEach(t => { if (t.aiSuggestion) all[t.id] = t.aiSuggestion; });
    setMatches(all);
  };

  const matched = Object.keys(matches).length;
  const total = bankTransactions.length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Conciliation Bancaire IA</h1><p className="text-muted-foreground mt-1">L'IA suggère les correspondances entre transactions et écritures.</p></div>
        <button onClick={acceptAll} className="px-4 py-2 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2"><Sparkles size={16} /> Approuver toutes les suggestions</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-green-500"><p className="text-sm text-muted-foreground">Conciliées</p><p className="text-2xl font-bold text-green-500 mt-1">{matched}</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-orange-500"><p className="text-sm text-muted-foreground">Suggestions IA</p><p className="text-2xl font-bold text-orange-500 mt-1">{bankTransactions.filter(t => t.aiSuggestion && !matches[t.id]).length}</p></div>
        <div className="glass rounded-xl p-4 border border-border border-l-4 border-l-blue-500"><p className="text-sm text-muted-foreground">Total transactions</p><p className="text-2xl font-bold mt-1">{total}</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50 font-semibold text-sm flex items-center gap-2"><DollarSign size={16} className="text-blue-500" /> Transactions bancaires</div>
          <div className="divide-y divide-border">
            {bankTransactions.map(t => (
              <div key={t.id} className={`p-4 transition-all ${matches[t.id] ? "bg-green-500/5" : t.aiSuggestion ? "bg-purple-500/5" : ""}`}>
                <div className="flex justify-between items-start">
                  <div><p className="font-medium text-sm">{t.desc}</p><p className="text-xs text-muted-foreground">{t.date}</p></div>
                  <span className={`font-bold text-sm ${t.amount > 0 ? "text-green-500" : "text-red-500"}`}>{t.amount > 0 ? "+" : ""}{t.amount.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}</span>
                </div>
                {matches[t.id] && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-green-500"><Check size={14} /><Link2 size={12} />Concilié avec {accountEntries.find(e => e.id === matches[t.id])?.ref}</div>
                )}
                {!matches[t.id] && t.aiSuggestion && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><Sparkles size={10} /> Suggestion IA</span>
                    <button onClick={() => acceptSuggestion(t.id, t.aiSuggestion!)} className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full hover:bg-green-500/20"><Check size={10} className="inline mr-0.5" />Accepter</button>
                    <button className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20"><X size={10} className="inline mr-0.5" />Rejeter</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50 font-semibold text-sm flex items-center gap-2"><DollarSign size={16} className="text-purple-500" /> Écritures comptables</div>
          <div className="divide-y divide-border">
            {accountEntries.map(e => {
              const isMatched = Object.values(matches).includes(e.id);
              return (
                <div key={e.id} className={`p-4 transition-all ${isMatched ? "bg-green-500/5" : ""}`}>
                  <div className="flex justify-between items-start">
                    <div><p className="font-medium text-sm">{e.desc}</p><p className="text-xs text-muted-foreground">{e.ref}</p></div>
                    <span className={`font-bold text-sm ${e.amount > 0 ? "text-green-500" : "text-red-500"}`}>{e.amount > 0 ? "+" : ""}{e.amount.toLocaleString("fr-CA", { style: "currency", currency: "CAD" })}</span>
                  </div>
                  {isMatched && <div className="mt-2 text-xs text-green-500 flex items-center gap-1"><Check size={14} /> Concilié</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
