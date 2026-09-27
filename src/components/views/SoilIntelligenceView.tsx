/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Farm } from '../../types/farm';
import { analyzeSoil } from '../../services/intelligenceEngine';
import {
  FlaskConical,
  Droplets,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SoilIntelligenceViewProps {
  currentFarm: Farm;
}

export const SoilIntelligenceView: React.FC<SoilIntelligenceViewProps> = ({ currentFarm }) => {
  const { soil } = currentFarm;
  const soilIntel = analyzeSoil(currentFarm);

  // Expanded "Why?" states for recommended actions
  const [expandedWhy, setExpandedWhy] = useState<Record<number, boolean>>({ 0: true });

  const toggleWhy = (idx: number) => {
    setExpandedWhy((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Healthy':
      case 'Good':
      case 'Optimal / Neutral':
      case 'Adequate':
        return <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">Healthy / Good</span>;
      case 'Monitor':
      case 'Moderate':
      case 'Slightly Alkaline':
        return <span className="text-[11px] font-bold text-sky-800 bg-sky-100/80 px-2 py-0.5 rounded">Monitor</span>;
      case 'Needs Attention':
        return <span className="text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">Needs Attention</span>;
      case 'High Concern':
      case 'Low':
      case 'Deficit':
      case 'Acidic':
      case 'Alkaline':
      default:
        return <span className="text-[11px] font-bold text-rose-800 bg-rose-100/80 px-2 py-0.5 rounded">High Concern / Low</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            Soil Intelligence & Microbiome Health
          </h1>
          <p className="text-sm text-slate-600">
            Chemical and physical soil indicators analyzed deterministically for {currentFarm.soilType} in {currentFarm.district}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <FlaskConical className="h-3.5 w-3.5 text-emerald-700" />
          <span>Farm ID: {currentFarm.id} · {currentFarm.primaryCrop}</span>
        </div>
      </div>

      {/* Mandatory Prototype Soil Indicators Transparency Notice */}
      <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3.5 flex items-start gap-3">
        <Info className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-950 space-y-0.5">
          <span className="font-bold uppercase tracking-wider">PROTOTYPE SOIL INDICATORS:</span>{' '}
          <span>
            Soil parameters and microbiome metrics are evaluated deterministically from synthetic agro-ecological baseline soil profiles for prototype smallholder demonstration.
          </span>
        </div>
      </div>

      {/* Top Banner: Soil Health Score & Status (Section 2 Requirement) */}
      <div className="rounded-xl border border-emerald-950/15 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Soil Health Score
              </span>
              <span className="text-xs text-slate-400">· Deterministic Composite</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-slate-900 font-mono">
                {soilIntel.soilHealthScore}
              </span>
              <span className="text-slate-400 text-lg font-medium">/ 100</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                soilIntel.soilStatus === 'Healthy'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : soilIntel.soilStatus === 'Monitor'
                  ? 'bg-sky-100 text-sky-800 border border-sky-200'
                  : soilIntel.soilStatus === 'Needs Attention'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-rose-100 text-rose-800 border border-rose-200'
              }`}>
                STATUS: {soilIntel.soilStatus}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Evaluated across soil reaction (pH), microbial organic carbon substrate, macronutrient availability (N, P, K), and volumetric moisture status.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-slate-400 block text-[11px]">Soil Substrate</span>
              <span className="font-bold text-slate-900 text-xs block">{currentFarm.soilType}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Organic Carbon</span>
              <span className="font-mono font-bold text-slate-900 block">{soil.organicCarbonPct}% ({soil.organicCarbonStatus})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Soil Reaction</span>
              <span className="font-mono font-bold text-slate-900 block">pH {soil.ph} ({soil.phStatus})</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Moisture Equilibrium</span>
              <span className="font-mono font-bold text-slate-900 block">{soil.moisturePct}% ({soil.moistureStatus})</span>
            </div>
          </div>
        </div>

        {/* Key Observations Section (Section 2 Requirement: Max 3 observations) */}
        <div className="pt-5 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Key Soil Observations (Max 3):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {soilIntel.keyObservations.map((obs, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-slate-50/80 border border-slate-200 p-3 text-xs text-slate-700 flex items-start gap-2"
              >
                <div className="h-5 w-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 text-[11px] font-bold">
                  {idx + 1}
                </div>
                <p className="leading-relaxed">{obs}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Core Soil Telemetry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {/* pH Indicator */}
          <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Soil Reaction (pH)
              </span>
              {getStatusBadge(soil.phStatus)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-slate-900">{soil.ph}</span>
              <span className="text-xs text-slate-500">Benchmark: 6.2 – 7.2</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${Math.min(100, (soil.ph / 14) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Classification: <strong className="text-slate-700">{soil.phStatus}</strong>
            </span>
          </div>

          {/* Nitrogen Indicator */}
          <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Available Nitrogen (N)
              </span>
              {getStatusBadge(soil.nitrogenStatus)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-slate-900">{soil.nitrogenKgHa}</span>
              <span className="text-xs text-slate-500 font-mono">kg / ha</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${Math.min(100, (soil.nitrogenKgHa / 300) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Rating: <strong className="text-slate-700">{soil.nitrogenStatus}</strong> (Ideal: 240–280 kg/ha)
            </span>
          </div>

          {/* Phosphorus Indicator */}
          <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Available Phosphorus (P)
              </span>
              {getStatusBadge(soil.phosphorusStatus)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-slate-900">{soil.phosphorusKgHa}</span>
              <span className="text-xs text-slate-500 font-mono">kg / ha</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${Math.min(100, (soil.phosphorusKgHa / 40) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Rating: <strong className="text-slate-700">{soil.phosphorusStatus}</strong> (Ideal: 22–35 kg/ha)
            </span>
          </div>

          {/* Potassium Indicator */}
          <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Available Potassium (K)
              </span>
              {getStatusBadge(soil.potassiumStatus)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-slate-900">{soil.potassiumKgHa}</span>
              <span className="text-xs text-slate-500 font-mono">kg / ha</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${Math.min(100, (soil.potassiumKgHa / 300) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Rating: <strong className="text-slate-700">{soil.potassiumStatus}</strong> (Ideal: 180–240 kg/ha)
            </span>
          </div>

          {/* Soil Organic Carbon */}
          <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Organic Carbon (SOC)
              </span>
              {getStatusBadge(soil.organicCarbonStatus)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-slate-900">{soil.organicCarbonPct}%</span>
              <span className="text-xs text-slate-500">Target &gt; 0.85%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${Math.min(100, (soil.organicCarbonPct / 1.5) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Rating: <strong className="text-slate-700">{soil.organicCarbonStatus}</strong> (Microbial carbon sink)
            </span>
          </div>

          {/* Soil Moisture */}
          <div className="rounded-xl border border-slate-200 bg-[#FCFDFC] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Volumetric Moisture
              </span>
              {getStatusBadge(soil.moistureStatus)}
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-bold font-mono text-slate-900">{soil.moisturePct}%</span>
              <span className="text-xs text-slate-500">Root zone 0-30 cm</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${soil.moisturePct}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block">
              Rating: <strong className="text-slate-700">{soil.moistureStatus}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Recommended Soil Actions Section with "Why?" Explanations (Section 2 & 8 Requirement) */}
      <div className="rounded-xl border border-emerald-950/10 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Agronomic Action Plan
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Recommended Soil Actions for {currentFarm.farmerName} (Max 3)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Calibrated: {currentFarm.soilType}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {soilIntel.recommendedActions.map((rec, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-[#FAFBF9] p-4 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-700" />
                    <span>Action #{idx + 1}</span>
                  </div>
                  <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded">
                    {rec.urgency}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {rec.action}
                </p>
              </div>

              {/* Expandable "Why?" section */}
              <div className="pt-2 border-t border-slate-200 text-xs">
                <button
                  onClick={() => toggleWhy(idx)}
                  className="flex items-center justify-between w-full text-[11px] font-bold text-emerald-900 hover:text-emerald-700 py-1"
                >
                  <span className="flex items-center gap-1">
                    <HelpCircle className="h-3 w-3 text-emerald-700" />
                    Why this action?
                  </span>
                  {expandedWhy[idx] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                </button>

                {expandedWhy[idx] && (
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-white/80 p-2 rounded border border-slate-200 mt-1">
                    {rec.why}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety / Agronomic Limitations Disclaimer */}
      <div className="text-center py-2 text-xs text-slate-400">
        AgriN prototype recommendations are decision-support guidance based on demo data. Field conditions should be verified before significant agricultural interventions.
      </div>
    </div>
  );
};
