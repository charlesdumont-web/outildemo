"use client";

import { useState, useRef, useEffect } from "react";
import { MessagesSquare, Send, Bot, User, Sparkles, BookOpen, ThumbsUp, ThumbsDown } from "lucide-react";

const quickQuestions = ["Combien de jours de vacances ai-je?", "Politique de télétravail?", "Comment soumettre une dépense?", "Qui contacter pour un problème IT?"];

interface Message { id: number; text: string; sender: "user" | "bot"; sources?: string[]; }

const botResponses: Record<string, { text: string; sources: string[] }> = {
  vacances: { text: "Selon la politique RH de Synchro IA (mise à jour janvier 2026), les employés à temps plein bénéficient de :\n\n• **2 semaines** (0-3 ans d'ancienneté)\n• **3 semaines** (3-5 ans)\n• **4 semaines** (5+ ans)\n\nLes demandes doivent être soumises au minimum 2 semaines à l'avance via le module Absences & Vacances.", sources: ["Politique RH v2.4", "Convention collective 2026"] },
  teletravail: { text: "La politique de télétravail de Synchro IA est en mode **hybride flexible** :\n\n• **3 jours au bureau** minimum par semaine\n• Mardi et jeudi sont les **journées de présence obligatoire**\n• Le télétravail complet est permis lors de semaines de focus (1 par mois)\n\nTout changement doit être approuvé par votre gestionnaire direct.", sources: ["Politique télétravail 2026", "Guide de l'employé p.24"] },
  depense: { text: "Pour soumettre une dépense :\n\n1. Photographiez le reçu\n2. Allez dans **Finance → Comptes Payables**\n3. Cliquez sur « Nouvelle dépense »\n4. Joignez la photo et remplissez les champs\n5. Soumettez pour approbation\n\nLes remboursements sont traités dans un délai de **5 jours ouvrables** après approbation.", sources: ["Procédure dépenses v3.1", "FAQ Finance"] },
  default: { text: "Merci pour votre question! J'ai consulté notre base de connaissances interne et voici ce que j'ai trouvé :\n\nPour les problèmes informatiques, contactez le **helpdesk** par courriel à support@synchro-ia.com ou via le canal Slack #support-ti. Le temps de réponse moyen est de **2 heures** pendant les heures de bureau.", sources: ["Guide IT", "SLA Support interne"] },
};

export default function InternalChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, text: "Bonjour! 👋 Je suis l'assistant IA interne de Synchro IA. Posez-moi n'importe quelle question sur les politiques RH, les procédures internes, ou les avantages sociaux.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const lower = text.toLowerCase();
    let response = botResponses.default;
    if (lower.includes("vacances") || lower.includes("congé")) response = botResponses.vacances;
    else if (lower.includes("télétravail") || lower.includes("bureau")) response = botResponses.teletravail;
    else if (lower.includes("dépense") || lower.includes("remboursement")) response = botResponses.depense;

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: response.text, sender: "bot", sources: response.sources }]);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div><h1 className="text-3xl font-bold tracking-tight">Clavardage Interne</h1><p className="text-muted-foreground mt-1">Chatbot employé — RH, politiques, procédures internes.</p></div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full border border-purple-500/20 text-sm font-medium"><Sparkles size={16} />Base de connaissances connectée</div>
      </div>

      <div className="flex-1 glass rounded-xl border border-border flex flex-col overflow-hidden min-h-0">
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === "bot" ? "bg-purple-500/20" : "bg-blue-500/20"}`}>
                {msg.sender === "bot" ? <Bot size={16} className="text-purple-400" /> : <User size={16} className="text-blue-400" />}
              </div>
              <div className={`max-w-[70%] ${msg.sender === "user" ? "text-right" : ""}`}>
                <div className={`rounded-xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                {msg.sources && (
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <BookOpen size={12} className="text-muted-foreground" />
                    {msg.sources.map((s, i) => <span key={i} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{s}</span>)}
                  </div>
                )}
                {msg.sender === "bot" && msg.id !== 0 && (
                  <div className="mt-2 flex gap-1">
                    <button className="p-1 rounded hover:bg-muted text-muted-foreground"><ThumbsUp size={12} /></button>
                    <button className="p-1 rounded hover:bg-muted text-muted-foreground"><ThumbsDown size={12} /></button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 animate-in fade-in">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><Bot size={16} className="text-purple-400" /></div>
              <div className="bg-muted rounded-xl px-4 py-3 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-4 bg-card/50 shrink-0">
          <div className="flex gap-2 mb-3 flex-wrap">
            {quickQuestions.map((q, i) => (
              <button key={i} onClick={() => sendMessage(q)} className="px-3 py-1 bg-muted hover:bg-muted/80 border border-border rounded-full text-xs font-medium transition-colors">{q}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage(input)}
              placeholder="Posez votre question..." className="flex-1 bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" />
            <button onClick={() => sendMessage(input)} className="p-2.5 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors"><Send size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
