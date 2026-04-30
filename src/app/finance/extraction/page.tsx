"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, Sparkles, Check, AlertCircle, Loader2, X, RotateCcw } from "lucide-react";

interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

const mockExtraction: ExtractedField[] = [
  { label: "Fournisseur", value: "Équipements Borealis Inc.", confidence: 99 },
  { label: "Numéro de facture", value: "FB-2026-04871", confidence: 98 },
  { label: "Date de facture", value: "2026-04-25", confidence: 97 },
  { label: "Date d'échéance", value: "2026-05-25", confidence: 95 },
  { label: "Sous-total", value: "4 250,00 $", confidence: 96 },
  { label: "TPS (5%)", value: "212,50 $", confidence: 94 },
  { label: "TVQ (9.975%)", value: "423,94 $", confidence: 93 },
  { label: "Total", value: "4 886,44 $", confidence: 99 },
  { label: "Conditions", value: "Net 30", confidence: 82 },
  { label: "No. Bon de commande", value: "PO-2026-492", confidence: 76 },
];

export default function ExtractionPage() {
  const [stage, setStage] = useState<"upload" | "scanning" | "results">("upload");
  const [scanStep, setScanStep] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const scanSteps = [
    { label: "Lecture du document PDF...", icon: FileText },
    { label: "Reconnaissance optique (OCR)...", icon: Sparkles },
    { label: "Détection des champs...", icon: Sparkles },
    { label: "Extraction des données...", icon: Sparkles },
    { label: "Validation croisée IA...", icon: Check },
  ];

  const startScan = useCallback(() => {
    setStage("scanning");
    setScanStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step >= scanSteps.length) {
        clearInterval(interval);
        setTimeout(() => setStage("results"), 600);
      } else {
        setScanStep(step);
      }
    }, 900);
  }, []);

  const getConfidenceColor = (c: number) => {
    if (c >= 90) return "text-green-500 bg-green-500/10";
    if (c >= 80) return "text-orange-500 bg-orange-500/10";
    return "text-red-500 bg-red-500/10";
  };

  const reset = () => {
    setStage("upload");
    setScanStep(0);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Extraction de Factures PDF</h1>
          <p className="text-muted-foreground mt-1">
            Téléversez une facture — l'IA extrait automatiquement toutes les données.
          </p>
        </div>
        {stage !== "upload" && (
          <button
            onClick={reset}
            className="px-4 py-2 border border-border bg-card hover:bg-muted text-foreground rounded-md text-sm font-medium transition-colors flex items-center gap-2"
          >
            <RotateCcw size={16} /> Nouvelle facture
          </button>
        )}
      </div>

      {stage === "upload" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); startScan(); }}
          onClick={startScan}
          className={`glass rounded-2xl border-2 border-dashed p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            dragOver
              ? "border-primary bg-primary/5 scale-[1.01]"
              : "border-border hover:border-primary/50 hover:bg-muted/30"
          }`}
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
            <Upload size={36} className="text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Glissez votre facture PDF ici</h2>
          <p className="text-muted-foreground text-sm mb-6">ou cliquez pour sélectionner un fichier</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><FileText size={12} /> PDF, PNG, JPG</span>
            <span>•</span>
            <span>Max 25 MB</span>
          </div>
        </div>
      )}

      {stage === "scanning" && (
        <div className="glass rounded-2xl border border-border p-12 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-8 relative">
            <Sparkles size={40} className="text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
          </div>
          <h2 className="text-xl font-semibold mb-8">Analyse en cours...</h2>

          <div className="w-full max-w-md space-y-4">
            {scanSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isDone = idx < scanStep;
              const isCurrent = idx === scanStep;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-500 ${
                    isDone
                      ? "bg-green-500/10 text-green-500"
                      : isCurrent
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground opacity-40"
                  }`}
                >
                  {isDone ? (
                    <Check size={18} className="flex-shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 size={18} className="flex-shrink-0 animate-spin" />
                  ) : (
                    <div className="w-[18px] h-[18px] rounded-full border border-current flex-shrink-0" />
                  )}
                  <span className="text-sm font-medium">{step.label}</span>
                </div>
              );
            })}
          </div>

          <div className="w-full max-w-md mt-8 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
              style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {stage === "results" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PDF Preview */}
          <div className="glass rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-red-500" />
                <span className="font-medium text-sm">facture_borealis_04871.pdf</span>
              </div>
              <span className="text-xs text-muted-foreground">2 pages • 1.4 MB</span>
            </div>
            <div className="bg-muted/50 p-8 min-h-[500px] flex items-center justify-center">
              <div className="w-full max-w-sm bg-white rounded-lg shadow-xl p-8 text-gray-800 text-xs leading-relaxed space-y-4">
                <div className="text-center border-b border-gray-200 pb-4">
                  <h3 className="text-base font-bold text-gray-900">Équipements Borealis Inc.</h3>
                  <p className="text-gray-500">1250, boul. Industriel, Québec QC G1K 4T2</p>
                  <p className="text-gray-500">TPS: 123456789RT0001 | TVQ: 1234567890TQ0001</p>
                </div>
                <div className="flex justify-between">
                  <div><span className="font-semibold">Facture :</span> FB-2026-04871</div>
                  <div><span className="font-semibold">Date :</span> 2026-04-25</div>
                </div>
                <div><span className="font-semibold">Échéance :</span> 2026-05-25 (Net 30)</div>
                <div><span className="font-semibold">Réf. PO :</span> PO-2026-492</div>
                <table className="w-full mt-4 text-[10px]">
                  <thead><tr className="border-b border-gray-300"><th className="text-left py-1">Description</th><th className="text-right py-1">Qté</th><th className="text-right py-1">Prix</th><th className="text-right py-1">Total</th></tr></thead>
                  <tbody>
                    <tr className="border-b border-gray-100"><td className="py-1">Pompe hydraulique HD-500</td><td className="text-right">2</td><td className="text-right">1 500,00 $</td><td className="text-right">3 000,00 $</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1">Kit joints d'étanchéité</td><td className="text-right">5</td><td className="text-right">250,00 $</td><td className="text-right">1 250,00 $</td></tr>
                  </tbody>
                </table>
                <div className="text-right space-y-1 pt-2 border-t border-gray-200">
                  <div>Sous-total: 4 250,00 $</div>
                  <div>TPS (5%): 212,50 $</div>
                  <div>TVQ (9.975%): 423,94 $</div>
                  <div className="font-bold text-sm text-gray-900">Total: 4 886,44 $</div>
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Data */}
          <div className="glass rounded-xl border border-border overflow-hidden flex flex-col">
            <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-purple-500" />
                <span className="font-medium text-sm">Données extraites par l'IA</span>
              </div>
              <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-medium">
                10/10 champs détectés
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {mockExtraction.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-all animate-in fade-in slide-in-from-right-4"
                  style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "backwards" }}
                >
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-0.5">{field.label}</div>
                    <div className="font-medium text-sm">{field.value}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getConfidenceColor(field.confidence)}`}>
                      {field.confidence}%
                    </span>
                    {field.confidence >= 90 ? (
                      <Check size={16} className="text-green-500" />
                    ) : (
                      <AlertCircle size={16} className="text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border bg-card/50 flex gap-3">
              <button className="flex-1 px-4 py-2.5 border border-border bg-card hover:bg-muted rounded-md text-sm font-medium transition-colors">
                Modifier manuellement
              </button>
              <button className="flex-1 px-4 py-2.5 bg-primary hover:bg-blue-600 text-primary-foreground rounded-md text-sm font-medium transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
                <Check size={16} /> Approuver et créer la facture
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
