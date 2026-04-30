"use client";

import { useState } from "react";
import { Mail, Check, X, Bot, Sparkles, CornerUpLeft, Calendar, Send } from "lucide-react";

export default function EmailAgent() {
  const [selectedEmail, setSelectedEmail] = useState(0);
  const [isSent, setIsSent] = useState(false);

  const emails = [
    {
      id: 1,
      sender: "j.smith@prospectco.com",
      name: "John Smith",
      subject: "Interested in your ERP integration demo",
      date: "10:42 AM",
      content: "Hi team,\n\nI saw your recent post about the new ERP integration modules. Could we schedule a 15-minute quick chat next Tuesday? We are currently using Sage 50 and want to see how it connects.\n\nBest,\nJohn",
      aiDraft: "Hi John,\n\nThanks for reaching out! I'd be happy to show you how our ERP integration modules connect seamlessly with Sage 50.\n\nI have availability next Tuesday at 10:00 AM or 2:30 PM EST. Does either of those times work for you? If not, feel free to use my calendar link below to pick a time that suits you better.\n\nLooking forward to speaking with you!\n\nBest regards,\n[Your Name/Synchro AI]\n[Calendar Link]",
      confidence: 96
    },
    {
      id: 2,
      sender: "m.davis@retailgroup.net",
      name: "Maria Davis",
      subject: "Pricing for 50 users",
      date: "09:15 AM",
      content: "Hello, we are looking to upgrade our current system. Can you send me the pricing for a 50 user license for the complete suite? Thanks.",
      aiDraft: "Hi Maria,\n\nThank you for your interest in our complete suite. For a team of 50 users, we offer a specialized enterprise tier that includes volume discounts and dedicated support.\n\nI've attached our preliminary pricing guide. Would you be open to a brief 10-minute call later this week so I can better understand your specific needs and tailor a precise quote?\n\nBest regards,\n[Your Name/Synchro AI]",
      confidence: 88
    }
  ];

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => {
      setSelectedEmail(1);
      setIsSent(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Email Responder</h1>
          <p className="text-muted-foreground mt-1">Review and approve AI-generated email drafts.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full border border-purple-500/20 text-sm font-medium">
          <Sparkles size={16} />
          Auto-Draft Active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Inbox List */}
        <div className="glass rounded-xl border border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-card/50 font-medium flex items-center justify-between">
            <span>Needs Review</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">2</span>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {emails.map((email, idx) => (
              <button 
                key={email.id}
                onClick={() => setSelectedEmail(idx)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedEmail === idx 
                    ? "bg-primary/10 border-primary shadow-sm" 
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm truncate">{email.name}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{email.date}</span>
                </div>
                <div className="text-xs font-medium truncate mb-1">{email.subject}</div>
                <div className="text-xs text-muted-foreground truncate">{email.content}</div>
                
                <div className="mt-2 flex items-center justify-between">
                  <span className="flex items-center text-[10px] text-purple-400 font-medium">
                    <Bot size={12} className="mr-1" /> Draft Ready
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-sm font-medium ${
                    email.confidence > 90 ? "bg-green-500/20 text-green-500" : "bg-orange-500/20 text-orange-500"
                  }`}>
                    {email.confidence}% match
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Email Viewer & AI Drafter */}
        <div className="md:col-span-2 glass rounded-xl border border-border flex flex-col overflow-hidden relative">
          {isSent && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center animate-in fade-in">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Send size={32} className="text-green-500 translate-x-1 -translate-y-1" />
              </div>
              <h2 className="text-xl font-bold">Email Sent!</h2>
              <p className="text-muted-foreground mt-1">Calendar link attached automatically.</p>
            </div>
          )}

          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold">{emails[selectedEmail].subject}</h2>
            <div className="flex items-center justify-between mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center font-bold text-blue-500">
                  {emails[selectedEmail].name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{emails[selectedEmail].name}</div>
                  <div className="text-muted-foreground text-xs">{emails[selectedEmail].sender}</div>
                </div>
              </div>
              <span className="text-muted-foreground">{emails[selectedEmail].date}</span>
            </div>
          </div>

          <div className="p-6 border-b border-border bg-background/50">
            <p className="text-sm whitespace-pre-wrap leading-relaxed">{emails[selectedEmail].content}</p>
          </div>

          <div className="flex-1 p-6 flex flex-col overflow-hidden bg-purple-500/5 relative">
            <div className="absolute top-0 right-8 px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-b-lg shadow-lg flex items-center gap-1">
              <Sparkles size={12} /> AI Suggested Reply
            </div>
            
            <div className="flex items-center gap-2 text-purple-400 font-medium text-sm mb-4 mt-2">
              <CornerUpLeft size={16} /> Drafted 2 mins ago
            </div>
            
            <div className="flex-1 bg-background border border-purple-500/30 rounded-lg p-4 text-sm whitespace-pre-wrap leading-relaxed shadow-inner overflow-y-auto focus-within:border-purple-500 focus-within:ring-1 focus-within:ring-purple-500" contentEditable suppressContentEditableWarning>
              {emails[selectedEmail].aiDraft}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-border bg-card hover:bg-muted rounded-md text-sm font-medium transition-colors">
                  Regenerate
                </button>
                <button className="px-3 py-1.5 border border-border bg-card hover:bg-muted rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                  <Calendar size={14} /> Edit Availability
                </button>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-1.5 border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded-md text-sm font-medium transition-colors flex items-center gap-2">
                  <X size={16} /> Discard
                </button>
                <button 
                  onClick={handleSend}
                  className="px-6 py-1.5 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20 flex items-center gap-2"
                >
                  <Send size={16} /> Send & Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
