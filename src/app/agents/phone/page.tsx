"use client";

import { useState, useEffect } from "react";
import { Phone, PhoneIncoming, PhoneOff, Mic, Volume2, ArrowRightLeft, MessageSquare, Clock, Sparkles, User } from "lucide-react";

const callLog = [
  { id: 1, caller: "+1 418-555-0142", name: "Pierre Tremblay", time: "14:32", duration: "2:45", result: "Rendez-vous pris", type: "inbound" },
  { id: 2, caller: "+1 514-555-0198", name: "Inconnu", time: "13:15", duration: "0:52", result: "Message pris", type: "inbound" },
  { id: 3, caller: "+1 450-555-0231", name: "Julie Martin", time: "11:48", duration: "4:12", result: "Transféré au support", type: "inbound" },
];

const transcriptLines = [
  { speaker: "IA", text: "Bonjour, merci d'appeler Synchro IA. Comment puis-je vous aider aujourd'hui?" },
  { speaker: "Client", text: "Oui bonjour, j'aimerais parler à quelqu'un pour une soumission pour un système ERP." },
  { speaker: "IA", text: "Bien sûr! Puis-je avoir votre nom et le nom de votre entreprise?" },
  { speaker: "Client", text: "Pierre Tremblay, de Construction Beaumont." },
  { speaker: "IA", text: "Merci Pierre! Je vois que nous avons déjà un dossier à votre nom. Souhaitez-vous planifier un appel avec notre spécialiste ERP?" },
  { speaker: "Client", text: "Oui, idéalement cette semaine si possible." },
  { speaker: "IA", text: "Parfait. J'ai une disponibilité jeudi à 10h ou vendredi à 14h. Quelle plage vous convient?" },
];

export default function PhoneAgentPage() {
  const [isLive, setIsLive] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [wavePhase, setWavePhase] = useState(0);

  useEffect(() => {
    if (isLive) {
      const lineTimer = setInterval(() => {
        setVisibleLines(prev => { if (prev >= transcriptLines.length) { clearInterval(lineTimer); return prev; } return prev + 1; });
      }, 2000);
      const waveTimer = setInterval(() => setWavePhase(prev => prev + 1), 150);
      return () => { clearInterval(lineTimer); clearInterval(waveTimer); };
    }
  }, [isLive]);

  const startDemo = () => { setIsLive(true); setVisibleLines(0); };
  const stopDemo = () => { setIsLive(false); setVisibleLines(0); };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div><h1 className="text-3xl font-bold tracking-tight">Agent Téléphonie IA</h1><p className="text-muted-foreground mt-1">Réceptionniste virtuel — triage, prise de messages, transfert.</p></div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${isLive ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-muted text-muted-foreground border-border"}`}>
          <span className={`w-2 h-2 rounded-full ${isLive ? "bg-green-500 animate-pulse" : "bg-muted-foreground"}`}></span>
          {isLive ? "Appel en cours" : "En attente"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Call View */}
        <div className="glass rounded-xl border border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50 flex justify-between items-center">
            <span className="font-semibold">Appel en direct</span>
            {isLive && <span className="text-xs text-green-500 flex items-center gap-1"><Clock size={12} /> 01:23</span>}
          </div>

          {!isLive ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12">
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-6 cursor-pointer hover:scale-105 transition-transform" onClick={startDemo}>
                <PhoneIncoming size={40} className="text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Simuler un appel entrant</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">Cliquez pour déclencher un appel de démonstration</p>
              <button onClick={startDemo} className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-medium transition-colors flex items-center gap-2">
                <Phone size={16} /> Lancer l'appel démo
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <div className="p-6 flex flex-col items-center border-b border-border">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-3"><User size={32} className="text-blue-500" /></div>
                <h3 className="font-semibold">Pierre Tremblay</h3>
                <p className="text-sm text-muted-foreground">+1 418-555-0142</p>
                {/* Waveform */}
                <div className="flex items-center gap-1 mt-4 h-8">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="w-1 bg-primary rounded-full transition-all duration-150" style={{ height: `${Math.abs(Math.sin((wavePhase + i) * 0.5)) * 24 + 4}px` }} />
                  ))}
                </div>
              </div>
              <div className="flex justify-center gap-4 p-4 border-b border-border">
                <button className="p-3 rounded-full bg-muted hover:bg-muted/80"><Mic size={20} /></button>
                <button className="p-3 rounded-full bg-muted hover:bg-muted/80"><Volume2 size={20} /></button>
                <button className="p-3 rounded-full bg-muted hover:bg-muted/80"><ArrowRightLeft size={20} /></button>
                <button onClick={stopDemo} className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white"><PhoneOff size={20} /></button>
              </div>
              {/* AI Decision */}
              <div className="p-4">
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-3">
                  <p className="text-xs font-semibold text-purple-400 flex items-center gap-1 mb-1"><Sparkles size={12} /> Décision IA</p>
                  <p className="text-sm">Client existant identifié. Intent détecté : <strong>demande de soumission ERP</strong>. Action : proposer un rendez-vous avec le spécialiste.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Transcript */}
        <div className="glass rounded-xl border border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50"><span className="font-semibold">Transcription temps réel</span></div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[400px]">
            {isLive && transcriptLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 ${line.speaker === "IA" ? "" : "flex-row-reverse"}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${line.speaker === "IA" ? "bg-purple-500/20 text-purple-400" : "bg-blue-500/20 text-blue-400"}`}>
                  {line.speaker === "IA" ? "IA" : "C"}
                </div>
                <div className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${line.speaker === "IA" ? "bg-muted" : "bg-primary/10"}`}>{line.text}</div>
              </div>
            ))}
            {!isLive && <div className="flex items-center justify-center h-full text-muted-foreground text-sm">La transcription apparaîtra ici pendant l'appel</div>}
          </div>
        </div>
      </div>

      {/* Call Log */}
      <div className="glass rounded-xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border bg-card/50"><h3 className="font-semibold">Historique des appels</h3></div>
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/30">
            <tr><th className="px-6 py-3 text-left font-medium">Appelant</th><th className="px-6 py-3 text-left font-medium">Heure</th><th className="px-6 py-3 text-left font-medium">Durée</th><th className="px-6 py-3 text-left font-medium">Résultat</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {callLog.map(call => (
              <tr key={call.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-3"><span className="font-medium">{call.name}</span><span className="text-muted-foreground ml-2 text-xs">{call.caller}</span></td>
                <td className="px-6 py-3 text-muted-foreground">{call.time}</td>
                <td className="px-6 py-3">{call.duration}</td>
                <td className="px-6 py-3"><span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">{call.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
