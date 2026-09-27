/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Farm } from '../../types/farm';
import { getFullFarmIntelligence } from '../../services/intelligenceEngine';
import {
  AdvisorLanguage,
  AdvisorMessageItem,
  AdvisorStructuredData,
} from '../../types/intelligence';
import {
  Send,
  Mic,
  Bot,
  User,
  Sparkles,
  Info,
  Layers,
  ShieldAlert,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Globe2,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Activity,
} from 'lucide-react';

interface AgriAdvisorViewProps {
  currentFarm: Farm;
  initialPrompt?: string | null;
  onClearInitialPrompt?: () => void;
}

const SUPPORTED_LANGUAGES: { code: AdvisorLanguage; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'pt', label: 'Portuguese', native: 'Português' },
  { code: 'ru', label: 'Russian', native: 'Русский' },
  { code: 'zh', label: 'Chinese', native: '中文' },
];

const QUICK_QUESTIONS = [
  'Should I irrigate today?',
  'How healthy is my soil?',
  'Is my crop under stress?',
  'What should I do before rainfall?',
  'How can I improve soil health?',
  'What regenerative action should I prioritize?',
];

export const AgriAdvisorView: React.FC<AgriAdvisorViewProps> = ({
  currentFarm,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const intel = getFullFarmIntelligence(currentFarm);
  const [selectedLanguage, setSelectedLanguage] = useState<AdvisorLanguage>('en');
  const [messages, setMessages] = useState<AdvisorMessageItem[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expandedWhyIds, setExpandedWhyIds] = useState<Record<string, boolean>>({});
  const [expandedEvidenceIds, setExpandedEvidenceIds] = useState<Record<string, boolean>>({});
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on farm change or first load
  useEffect(() => {
    const updatedIntel = getFullFarmIntelligence(currentFarm);
    const greetingStructured: AdvisorStructuredData = {
      situation: `Farm context loaded for ${currentFarm.farmerName}'s holding (${currentFarm.id}) in ${currentFarm.district}, ${currentFarm.country}. Active crop is ${currentFarm.primaryCrop} (${currentFarm.cropStage}).`,
      recommendedActions: [
        `Today's Priority: ${updatedIntel.today.priorityToday.headline}`,
        `Operational Step: ${updatedIntel.today.priorityToday.actionableStep}`,
        'Ask any agronomic question below to receive localized decision-support.',
      ],
      why: `Synthesized from Soil Health Score (${updatedIntel.soil.soilHealthScore}/100), Weather Risk (${updatedIntel.weather.weatherRisk}), and Satellite Canopy (${updatedIntel.satellite.vegetationStatus} · NDVI ${updatedIntel.satellite.ndvi}).`,
      watchFor: [
        `Farm Risk Driver: ${updatedIntel.risk.drivers[0] || 'Moisture equilibrium'}`,
        `Disease Alert: ${currentFarm.diseaseRisk} level`,
      ],
      regenerativeOption: updatedIntel.regenerative.top3Actions[0]?.title || 'Maintain soil cover and residue recycling.',
      confidence: 'High',
      evidenceUsed: {
        soilMoisture: `${currentFarm.soil.moisturePct}% (${currentFarm.soil.moistureStatus})`,
        rainfallForecast: currentFarm.rainfallForecastSummary,
        ndvi: `${updatedIntel.satellite.ndvi} (${updatedIntel.satellite.vegetationStatus})`,
        weatherRisk: updatedIntel.weather.weatherRisk,
        farmRiskScore: `${updatedIntel.risk.farmRiskScore}/100 (${updatedIntel.risk.classification})`,
        cropStage: `${currentFarm.primaryCrop} · ${currentFarm.cropStage}`,
      },
      language: selectedLanguage,
      isAiGenerated: false,
      modelUsed: 'agrin-context-engine',
    };

    setMessages([
      {
        id: `init-${currentFarm.id}-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        structured: greetingStructured,
      },
    ]);
  }, [currentFarm.id]);

  // Handle incoming initialPrompt from Overview "Ask AgriN" button
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      handleSendMessage(initialPrompt.trim());
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const toggleWhy = (msgId: string) => {
    setExpandedWhyIds((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const toggleEvidence = (msgId: string) => {
    setExpandedEvidenceIds((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isLoading) return;

    setErrorMessage(null);

    const userMsg: AdvisorMessageItem = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      timestamp: 'Just now',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    // Prepare full farm context for backend proxy
    const currentIntel = getFullFarmIntelligence(currentFarm);
    const farmContextPayload = {
      id: currentFarm.id,
      farmerName: currentFarm.farmerName,
      country: currentFarm.country,
      state: currentFarm.state,
      district: currentFarm.district,
      zoneName: currentFarm.zoneName,
      crop: currentFarm.primaryCrop,
      cropVariety: currentFarm.cropVariety,
      cropStage: currentFarm.cropStage,
      farmAreaHectares: currentFarm.farmAreaHectares,
      soil: {
        ph: currentFarm.soil.ph,
        phStatus: currentFarm.soil.phStatus,
        nitrogenKgHa: currentFarm.soil.nitrogenKgHa,
        nitrogenStatus: currentFarm.soil.nitrogenStatus,
        phosphorusKgHa: currentFarm.soil.phosphorusKgHa,
        phosphorusStatus: currentFarm.soil.phosphorusStatus,
        potassiumKgHa: currentFarm.soil.potassiumKgHa,
        potassiumStatus: currentFarm.soil.potassiumStatus,
        organicCarbonPct: currentFarm.soil.organicCarbonPct,
        organicCarbonStatus: currentFarm.soil.organicCarbonStatus,
        moisturePct: currentFarm.soil.moisturePct,
        moistureStatus: currentFarm.soil.moistureStatus,
        soilHealthScore: currentIntel.soil.soilHealthScore,
      },
      weather: {
        currentTempC: currentFarm.currentTempC,
        currentHumidityPct: currentFarm.currentHumidityPct,
        rainfallForecastSummary: currentFarm.rainfallForecastSummary,
        weatherRisk: currentIntel.weather.weatherRisk,
      },
      satellite: {
        ndviCurrent: currentFarm.satellite.ndviCurrent,
        vegetationStatus: currentIntel.satellite.vegetationStatus,
        cropStressLevel: currentFarm.satellite.cropStressLevel,
      },
      risk: {
        diseaseRisk: currentFarm.diseaseRisk,
        farmRiskScore: currentIntel.risk.farmRiskScore,
        classification: currentIntel.risk.classification,
        drivers: currentIntel.risk.drivers,
      },
      regenerative: {
        overallScore: currentIntel.regenerative.overallScore,
        lowestDimensions: currentIntel.regenerative.lowestDimensions,
        top3Actions: currentIntel.regenerative.top3Actions,
      },
      today: {
        priorityToday: currentIntel.today.priorityToday,
      },
    };

    // Extract recent session history for context preservation
    const historyPayload = messages.map((m) => ({
      sender: m.sender,
      text: m.text || m.structured?.situation || '',
    }));

    try {
      const response = await fetch('/api/advisor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: text,
          farmContext: farmContextPayload,
          history: historyPayload,
          language: selectedLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const json = await response.json();
      const structuredData: AdvisorStructuredData = json.data;

      const botMsg: AdvisorMessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        structured: structuredData,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.warn('[Agri Advisor] Server call error, switching to resilient fallback:', err);
      setErrorMessage('AI advisory is temporarily unavailable. Your farm intelligence dashboard remains available.');

      // Construct a safe client-side fallback message so the app never breaks
      const fallbackStructured: AdvisorStructuredData = {
        situation: `Telemetry analysis for ${currentFarm.farmerName}'s ${currentFarm.primaryCrop} (${currentFarm.soil.moisturePct}% moisture, risk ${currentIntel.risk.farmRiskScore}/100).`,
        recommendedActions: [
          currentIntel.today.priorityToday.actionableStep,
          'Inspect soil moisture in root zone before making field interventions.',
          'Consult local extension officer if symptoms spread rapidly.',
        ],
        why: `Ground telemetry: ${currentFarm.soil.moisturePct}% soil moisture, NDVI ${currentFarm.satellite.ndviCurrent}, and weather risk evaluated as ${currentIntel.weather.weatherRisk}.`,
        watchFor: ['Field drainage blockages', 'Foliar lesions on lower canopy'],
        regenerativeOption: currentIntel.regenerative.top3Actions[0]?.title || 'Maintain organic mulch layer.',
        confidence: 'Moderate',
        evidenceUsed: {
          soilMoisture: `${currentFarm.soil.moisturePct}% (${currentFarm.soil.moistureStatus})`,
          rainfallForecast: currentFarm.rainfallForecastSummary,
          ndvi: `${currentFarm.satellite.ndviCurrent} (${currentIntel.satellite.vegetationStatus})`,
          weatherRisk: currentIntel.weather.weatherRisk,
          farmRiskScore: `${currentIntel.risk.farmRiskScore}/100 (${currentIntel.risk.classification})`,
          cropStage: `${currentFarm.primaryCrop} · ${currentFarm.cropStage}`,
        },
        language: selectedLanguage,
        isAiGenerated: false,
        fallbackNotice: 'AI advisory is temporarily in fallback mode. Your farm intelligence dashboard remains available.',
      };

      const fallbackMsg: AdvisorMessageItem = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'assistant',
        timestamp: 'Just now',
        structured: fallbackStructured,
        error: true,
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    setIsListeningVoice((prev) => !prev);
    if (!isListeningVoice) {
      setTimeout(() => {
        setIsListeningVoice(false);
        handleSendMessage('Should I irrigate today?');
      }, 1800);
    }
  };

  const handleRetryLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.sender === 'user');
    if (lastUser && lastUser.text) {
      handleSendMessage(lastUser.text);
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Language Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            Agri Advisor — Gemini Agricultural Intelligence
          </h1>
          <p className="text-sm text-slate-600">
            Localized, multi-lingual agronomic decision-support grounded in real farm soil, weather, and satellite parameters.
          </p>
        </div>

        {/* Multilingual Selector (Section 6 Requirement) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs shadow-2xs">
            <Globe2 className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
            <span className="text-slate-500 font-medium hidden sm:inline">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as AdvisorLanguage)}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1"
              aria-label="Select Advisory Language"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.native} ({lang.label})
                </option>
              ))}
            </select>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-lg">
            <Sparkles className="h-3.5 w-3.5 text-emerald-700" />
            <span>AI Reasoning Connected</span>
          </div>
        </div>
      </div>

      {/* Safety / Agronomic Limitation Disclaimer (Section 11 & 12 Requirement) */}
      <div className="rounded-lg border border-emerald-900/10 bg-white p-3 flex items-start gap-2.5 shadow-2xs text-xs text-slate-600">
        <Info className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-800">Decision-Support Notice:</span>{' '}
          <span>
            AgriN prototype recommendations are decision-support guidance based on demo data. Field conditions should be verified before significant agricultural interventions.
          </span>
        </div>
      </div>

      {/* Error Alert with Retry if failure occurred */}
      {errorMessage && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-3.5 flex items-start justify-between gap-3 text-xs text-amber-900 shadow-2xs">
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Advisory Connection Note:</span>
              <span>{errorMessage}</span>
            </div>
          </div>
          <button
            onClick={handleRetryLast}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-800 text-white font-semibold text-[11px] hover:bg-amber-900 shrink-0"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Main Conversational Interface Container */}
      <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden h-[660px]">
        {/* Selected Farm Context Ribbon */}
        <div className="border-b border-slate-100 bg-[#F9FBF8] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="font-bold text-emerald-950 font-mono">{currentFarm.id}:</span>
            <span className="font-semibold text-slate-900">{currentFarm.farmerName}</span>
            <span>·</span>
            <span>{currentFarm.primaryCrop} ({currentFarm.cropStage})</span>
            <span>·</span>
            <span>Moisture: <strong className="text-slate-900">{currentFarm.soil.moisturePct}%</strong></span>
            <span>·</span>
            <span>NDVI: <strong className="text-slate-900">{currentFarm.satellite.ndviCurrent}</strong></span>
            <span>·</span>
            <span>Risk: <strong className="text-slate-900">{intel.risk.farmRiskScore}/100</strong></span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Ground Truth: Deterministic Build 02 Active
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            const structured = msg.structured;

            if (isUser) {
              return (
                <div key={msg.id} className="flex gap-3 max-w-2xl ml-auto flex-row-reverse">
                  <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tr-xs bg-slate-900 text-white px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-2xs">
                    {msg.text}
                  </div>
                </div>
              );
            }

            // Assistant Structured Response (Section 4 Requirement)
            if (structured) {
              const isWhyOpen = !!expandedWhyIds[msg.id];
              const isEvidenceOpen = !!expandedEvidenceIds[msg.id];

              return (
                <div key={msg.id} className="flex gap-3 max-w-3xl">
                  <div className="h-8 w-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Bot className="h-4 w-4" />
                  </div>

                  <div className="space-y-3 flex-1 min-w-0">
                    {/* Main Card */}
                    <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 sm:p-5 text-xs sm:text-sm text-slate-800 space-y-4 shadow-2xs">
                      {/* Card Header with Confidence Badge & AI Stamp */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                            AgriN Advisory
                          </span>
                          {structured.isAiGenerated ? (
                            <span className="text-[10px] text-emerald-700 font-medium inline-flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              Gemini Grounded Reasoning
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-medium">
                              Deterministic Rule Matrix
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-400">Confidence:</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              structured.confidence === 'High'
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                : structured.confidence === 'Moderate'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-rose-100 text-rose-900 border border-rose-200'
                            }`}
                          >
                            {structured.confidence}
                          </span>
                        </div>
                      </div>

                      {/* Fallback Notice if triggered */}
                      {structured.fallbackNotice && (
                        <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-800 flex items-center gap-2">
                          <Info className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span>{structured.fallbackNotice}</span>
                        </div>
                      )}

                      {/* 1. Situation */}
                      <div className="space-y-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                          Situation
                        </span>
                        <p className="text-slate-800 leading-relaxed font-medium">
                          {structured.situation}
                        </p>
                      </div>

                      {/* 2. Recommended Action (Max 3) */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                          Recommended Action
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {structured.recommendedActions.map((action, idx) => (
                            <li key={idx} className="flex items-start gap-2 bg-white rounded-lg border border-slate-200/80 p-2.5 shadow-2xs">
                              <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                              <span className="leading-snug">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 3. Why (Expandable Explainability) */}
                      <div className="rounded-lg bg-emerald-50/50 border border-emerald-100 p-3 space-y-1">
                        <button
                          onClick={() => toggleWhy(msg.id)}
                          className="w-full flex items-center justify-between text-xs font-bold text-emerald-900 hover:text-emerald-700 text-left"
                        >
                          <div className="flex items-center gap-1.5">
                            <HelpCircle className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                            <span>Why is this recommended?</span>
                          </div>
                          {isWhyOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>
                        {isWhyOpen && (
                          <p className="text-xs text-emerald-900/90 pt-1.5 leading-relaxed border-t border-emerald-200/60 mt-1">
                            {structured.why}
                          </p>
                        )}
                      </div>

                      {/* 4. Watch For (Red flags) */}
                      {structured.watchFor && structured.watchFor.length > 0 && (
                        <div className="space-y-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                            Watch For
                          </span>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {structured.watchFor.map((item, idx) => (
                              <span key={idx} className="bg-amber-50 border border-amber-200 text-amber-900 rounded-md px-2.5 py-1">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. Regenerative Option */}
                      {structured.regenerativeOption && (
                        <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100/50 border border-emerald-200 p-3 flex items-start gap-2.5">
                          <Leaf className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                          <div className="text-xs space-y-0.5">
                            <span className="font-bold text-emerald-950 block">Regenerative Practice Option:</span>
                            <span className="text-emerald-900">{structured.regenerativeOption}</span>
                          </div>
                        </div>
                      )}

                      {/* 6. Evidence Used (Compact Expandable Section - Section 10 Requirement) */}
                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => toggleEvidence(msg.id)}
                          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-800"
                        >
                          <div className="flex items-center gap-1.5">
                            <Layers className="h-3.5 w-3.5 text-slate-400" />
                            <span>Evidence Used (Grounded Build 02 Telemetry)</span>
                          </div>
                          {isEvidenceOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                        </button>

                        {isEvidenceOpen && structured.evidenceUsed && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2.5 mt-1 border-t border-slate-100 text-[11px] font-mono">
                            <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="text-slate-400 block text-[9px] uppercase">Soil Moisture</span>
                              <span className="font-bold text-slate-800">{structured.evidenceUsed.soilMoisture}</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="text-slate-400 block text-[9px] uppercase">Rainfall Forecast</span>
                              <span className="font-bold text-slate-800 truncate block" title={structured.evidenceUsed.rainfallForecast}>
                                {structured.evidenceUsed.rainfallForecast}
                              </span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="text-slate-400 block text-[9px] uppercase">Canopy NDVI</span>
                              <span className="font-bold text-slate-800">{structured.evidenceUsed.ndvi}</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="text-slate-400 block text-[9px] uppercase">Weather Risk</span>
                              <span className="font-bold text-slate-800">{structured.evidenceUsed.weatherRisk}</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="text-slate-400 block text-[9px] uppercase">Farm Risk Score</span>
                              <span className="font-bold text-slate-800">{structured.evidenceUsed.farmRiskScore}</span>
                            </div>
                            <div className="bg-slate-50 p-2 rounded border border-slate-200/80">
                              <span className="text-slate-400 block text-[9px] uppercase">Crop Context</span>
                              <span className="font-bold text-slate-800 truncate block">{structured.evidenceUsed.cropStage}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}

          {/* Loading Animation (Section 11 Requirement) */}
          {isLoading && (
            <div className="flex gap-3 max-w-3xl">
              <div className="h-8 w-8 rounded-full bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 text-xs text-slate-600 flex items-center gap-3 shadow-2xs">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-emerald-600 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
                <span className="font-medium text-slate-800">
                  AgriN is analysing your farm context…
                </span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar & Quick Questions (Section 8 Requirement) */}
        <div className="border-t border-slate-200 bg-white p-3 sm:p-4 space-y-2.5">
          {/* Quick Clickable Questions */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Quick Prompt:</span>
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-700 hover:border-emerald-600 hover:text-emerald-800 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleVoiceToggle}
              title="Voice advisory placeholder"
              className={`p-2.5 rounded-lg border transition-colors shrink-0 ${
                isListeningVoice
                  ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Mic className="h-4 w-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask Gemini about ${currentFarm.primaryCrop}, moisture, pests, or practices...`}
              disabled={isLoading}
              className="flex-1 rounded-lg border border-slate-200 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="rounded-lg bg-emerald-800 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors disabled:opacity-50 shrink-0 inline-flex items-center gap-1.5"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ask AI</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
