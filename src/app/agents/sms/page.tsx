"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquareText, Smartphone, Calendar as CalendarIcon, UserCircle, Bot, Send, Settings, Check } from "lucide-react";

export default function SmsAgent() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi Sarah! This is Alex from Synchro IA. Saw you downloaded our guide on ERP integration. Do you have a quick question I can answer?", sender: "bot", time: "10:00 AM" },
    { id: 2, text: "Hi Alex. Actually yes. I'm wondering if your system integrates with QuickBooks Online or just Sage 50?", sender: "user", time: "10:15 AM" },
    { id: 3, text: "Great question! We integrate seamlessly with both QuickBooks Online and Sage 50. Would you be open to a quick 10-min intro call this week to see how it works for QBO?", sender: "bot", time: "10:16 AM" },
    { id: 4, text: "Sure, that sounds good. What times do you have?", sender: "user", time: "10:30 AM" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [appointmentSet, setAppointmentSet] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const advanceDemo = () => {
    if (demoStep === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: 5, text: "I have availability tomorrow at 11:00 AM or Thursday at 2:00 PM EST. Do either of those work?", sender: "bot", time: "10:31 AM" }]);
        setDemoStep(1);
      }, 1500);
    } else if (demoStep === 1) {
      setMessages(prev => [...prev, { id: 6, text: "Thursday at 2 PM is perfect.", sender: "user", time: "10:45 AM" }]);
      setDemoStep(2);
      
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { id: 7, text: "Awesome, you're booked! I've sent a calendar invite to sarah@example.com. Talk to you Thursday at 2:00 PM! \uD83D\uDE80", sender: "bot", time: "10:46 AM" }]);
          setDemoStep(3);
          setAppointmentSet(true);
        }, 1200);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI SMS Setter</h1>
          <p className="text-muted-foreground mt-1">Live view of the AI qualifying and booking prospects via text.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setDemoStep(0); setMessages(messages.slice(0,4)); setAppointmentSet(false); }} className="px-4 py-2 border border-border bg-card hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors">
            Reset Demo
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full border border-green-500/20 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Agent Online
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Phone Mockup / SMS Chat */}
        <div className="glass rounded-xl border border-border flex flex-col overflow-hidden items-center p-6 bg-muted/20 relative">
          
          <div className="w-full max-w-md h-full bg-background border-[8px] border-border rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden relative">
            {/* Phone Header */}
            <div className="bg-muted/80 backdrop-blur border-b border-border p-4 flex items-center justify-between z-10 shrink-0 pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-lg">
                  S
                </div>
                <div>
                  <div className="font-semibold">Sarah (Prospect)</div>
                  <div className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                  </div>
                </div>
              </div>
              <Smartphone size={20} className="text-muted-foreground" />
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a] dark:bg-[#050505]">
              <div className="text-center text-xs text-muted-foreground mb-6">Today</div>
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm relative ${
                    msg.sender === 'user' 
                      ? 'bg-[#262629] text-white rounded-tl-sm' 
                      : 'bg-primary text-primary-foreground rounded-tr-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 opacity-70 flex items-center ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                      {msg.time} {msg.sender === 'bot' && <Check size={10} className="ml-1" />}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-end">
                  <div className="bg-primary/80 text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="bg-muted p-3 border-t border-border shrink-0">
              <div className="bg-background rounded-full border border-border px-4 py-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground opacity-50">AI is handling conversation...</span>
                <Bot size={18} className="text-primary" />
              </div>
            </div>
          </div>

          {/* Interactive controls for demo */}
          {demoStep < 3 && (
            <button 
              onClick={advanceDemo}
              className="absolute bottom-10 right-10 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-105 transition-transform flex items-center gap-2 animate-bounce"
            >
              <MessageSquareText size={20} />
              <span className="font-medium">Trigger Next Step</span>
            </button>
          )}
        </div>

        {/* CRM / Agenda View */}
        <div className="flex flex-col gap-6 h-full">
          {/* CRM Card */}
          <div className="glass rounded-xl border border-border p-6 flex-1 max-h-[40%] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <UserCircle className="text-blue-500" /> Lead Profile
              </h3>
              <span className="bg-blue-500/10 text-blue-500 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/20">
                Warm Lead
              </span>
            </div>
            
            <div className="space-y-4 text-sm bg-background/50 rounded-lg p-4 border border-border/50 flex-1">
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Name:</span>
                <span className="col-span-2 font-medium">Sarah Jenkins</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Company:</span>
                <span className="col-span-2 font-medium">BuildIt Construction</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Source:</span>
                <span className="col-span-2 font-medium">ERP Guide Download</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Tech Stack:</span>
                <span className="col-span-2 font-medium bg-muted w-max px-2 py-0.5 rounded text-xs">QuickBooks Online</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="text-muted-foreground">Agent:</span>
                <span className="col-span-2 font-medium flex items-center gap-1 text-purple-400">
                  <Bot size={14} /> Synchro IA Setter
                </span>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <div className="glass rounded-xl border border-border p-6 flex-1 flex flex-col relative overflow-hidden">
            {appointmentSet && (
              <div className="absolute inset-0 bg-green-500/10 z-0 animate-in fade-in duration-1000 pointer-events-none" />
            )}
            
            <div className="flex justify-between items-center mb-6 relative z-10">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="text-purple-500" /> Live Agenda
              </h3>
              <div className="text-sm font-medium">Thursday, Nov 12</div>
            </div>

            <div className="flex-1 bg-background/50 rounded-lg border border-border/50 p-2 relative z-10 overflow-y-auto">
              {/* Calendar Timeline */}
              <div className="relative pl-12 space-y-8 py-4">
                <div className="absolute left-16 top-0 bottom-0 w-px bg-border"></div>
                
                {/* 1:00 PM */}
                <div className="relative">
                  <div className="absolute -left-12 text-xs text-muted-foreground font-medium top-1">1:00 PM</div>
                  <div className="ml-8 border-t border-border/50"></div>
                </div>
                
                {/* 2:00 PM - The Booked Slot */}
                <div className="relative group">
                  <div className="absolute -left-12 text-xs text-muted-foreground font-medium top-1">2:00 PM</div>
                  <div className="ml-8 border-t border-border/50 relative">
                    {appointmentSet ? (
                      <div className="absolute -top-1 left-0 w-full p-3 bg-gradient-to-r from-primary to-purple-600 rounded-lg shadow-lg border border-primary/50 animate-in zoom-in slide-in-from-left-4 duration-500">
                        <div className="text-xs font-bold text-white mb-1">Intro Call: Synchro IA + QBO Integration</div>
                        <div className="text-[10px] text-white/80 flex items-center gap-1">
                          <UserCircle size={10} /> Sarah Jenkins &bull; Booked via AI SMS
                        </div>
                      </div>
                    ) : (
                      <div className="absolute -top-1 left-0 w-full p-3 border border-dashed border-border rounded-lg text-muted-foreground text-xs flex items-center justify-center opacity-50 bg-background/50">
                        Available Slot
                      </div>
                    )}
                  </div>
                </div>
                
                {/* 3:00 PM */}
                <div className="relative">
                  <div className="absolute -left-12 text-xs text-muted-foreground font-medium top-1">3:00 PM</div>
                  <div className="ml-8 border-t border-border/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
