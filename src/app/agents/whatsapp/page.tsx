"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, Check, Smartphone } from "lucide-react";

const messages = [
  { id: 1, text: "Salut! 👋 C'est l'équipe Synchro IA. On a vu que tu avais demandé plus d'infos sur nos solutions. Est-ce que t'as 2 minutes?", sender: "bot", time: "10:00" },
  { id: 2, text: "Oui pas de problème!", sender: "user", time: "10:05" },
  { id: 3, text: "Super! Tu gères combien d'employés environ dans ton entreprise?", sender: "bot", time: "10:05" },
  { id: 4, text: "On est environ 65", sender: "user", time: "10:08" },
  { id: 5, text: "Parfait! Et c'est quoi votre plus gros pain point en ce moment? La gestion des factures, le suivi de projets, ou autre chose?", sender: "bot", time: "10:08" },
  { id: 6, text: "Surtout la facturation et les relances clients. On perd beaucoup de temps là-dessus", sender: "user", time: "10:12" },
  { id: 7, text: "Je comprends totalement. On a justement un module qui automatise tout ça. Est-ce qu'on pourrait te montrer ça en 15 min cette semaine? 📅", sender: "bot", time: "10:12" },
];

export default function WhatsAppPage() {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div><h1 className="text-3xl font-bold tracking-tight">Agent WhatsApp / Messenger</h1><p className="text-muted-foreground mt-1">Qualification de leads via messagerie instantanée.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 text-sm font-medium"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />Agent actif</div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0">
        <div className="w-full max-w-md h-full max-h-[700px] bg-background border-[8px] border-border rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative">
          {/* WhatsApp Header */}
          <div className="bg-[#075e54] p-4 flex items-center gap-3 shrink-0 pt-8">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Bot size={20} className="text-white" /></div>
            <div className="flex-1"><p className="font-semibold text-white text-sm">Synchro IA</p><p className="text-[11px] text-white/70">en ligne</p></div>
            <MessageCircle size={20} className="text-white/70" />
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ background: "linear-gradient(180deg, #0b141a 0%, #0d1418 100%)" }}>
            <div className="text-center text-[10px] text-gray-500 bg-gray-800/50 rounded px-3 py-1 w-max mx-auto mb-4">Aujourd'hui</div>
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-[13px] relative ${msg.sender === "user" ? "bg-[#202c33] text-white" : "bg-[#005c4b] text-white"}`}>
                  {msg.text}
                  <div className="text-[9px] text-white/50 mt-1 flex items-center justify-end gap-1">{msg.time}{msg.sender === "bot" && <Check size={10} />}{msg.sender === "bot" && <Check size={10} className="-ml-1.5" />}</div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="bg-[#1f2c34] p-2 flex items-center gap-2 shrink-0">
            <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 flex items-center">
              <span className="text-sm text-gray-400">L'IA gère la conversation...</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#00a884] flex items-center justify-center"><Bot size={18} className="text-white" /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
