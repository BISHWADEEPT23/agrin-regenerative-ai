/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Farm } from '../../types/farm';
import { analyzeRegenerative } from '../../services/intelligenceEngine';
import {
  Leaf,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Award,
  Layers,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Info,
} from 'lucide-react';

interface RegenerativePlanViewProps {
  currentFarm: Farm;
}

export const RegenerativePlanView: React.FC<RegenerativePlanViewProps> = ({ currentFarm }) => {
  const regenIntel = analyzeRegenerative(currentFarm);
  const [completedActions, setCompletedActions] = useState<Record<number, boolean>>({});
  const [expandedWhy, setExpandedWhy] = useState<Record<number, boolean>>({ 0: true });

  const toggleAction = (idx: number) => {
    setCompletedActions((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toggleWhy = (idx: number) => {
    setExpandedWhy((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const completedCount = Object.values(completedActions).filter(Boolean).length;
  const projectedBonus = completedCount * 3;
  const displayScore = Math.min(100, regenIntel.overallScore + projectedBonus);

  const dimensions = [
    { key: 'soilHealth', name: '1. Soil Health & Microbiome', score: regenIntel.dimensions.soilHealth, desc: 'Biological activity, CEC, aggregation, living root duration' },
    { key: 'waterEfficiency', name: '2. Water Efficiency & Retention', score: regenIntel.dimensions.waterEfficiency, desc: 'Rainwater harvesting, furrow optimization, transpiration ratio' },
    { key: 'biodiversity', name: '3. Biodiversity & Beneficial Habitats', score: regenIntel.dimensions.biodiversity, desc: 'Polyculture, pollinator strips, predatory insect perches' },
    { key: 'inputEfficiency', name: '4. Input Efficiency & Bio-Alternatives', score: regenIntel.dimensions.inputEfficiency, desc: 'Biological nitrogen fixation, botanical extracts, reduced synthetic load' },
    { key: 'climateResilience', name: '5. Climate Resilience & Risk Buffering', score: regenIntel.dimensions.climateResilience, desc: 'Stress-tolerant cultivars, micro-basin drainage, risk diversification' },
    { key: 'carbonPractices', name: '6. Carbon & Soil Organic Matter', score: regenIntel.dimensions.carbonPractices, desc: 'In-situ residue retention, green manuring, biochar integration' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            Regenerative Farming Intelligence & Transition Roadmap
          </h1>
          <p className="text-sm text-slate-600">
            Automated six-pillar ecological assessment identifying weak dimensions and generating tailored regenerative actions for {currentFarm.farmerName}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <Leaf className="h-3.5 w-3.5 text-emerald-700" />
          <span>Farm ID: {currentFarm.id} · {currentFarm.primaryCrop}</span>
        </div>
      </div>

      {/* Mandatory Prototype Regenerative Framework Notice */}
      <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3.5 flex items-start gap-3">
        <Info className="h-4 w-4 text-emerald-800 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-950 space-y-0.5">
          <span className="font-bold uppercase tracking-wider">PROTOTYPE REGENERATIVE FRAMEWORK:</span>{' '}
          <span>
            Ecological scoring across the six regenerative dimensions is computed deterministically to guide low-cost biological transitions without commercial bias or chemical marketing.
          </span>
        </div>
      </div>

      {/* Hero Score Showcase */}
      <div className="rounded-xl border border-emerald-950/15 bg-white p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Regenerative Farm Index
              </span>
              <span className="text-xs text-slate-400">· 6 Ecosystem Pillars</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-extrabold text-slate-900 font-mono">
                {displayScore}
              </span>
              <span className="text-xl text-slate-400 font-mono">/ 100</span>
              {projectedBonus > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  +{projectedBonus} Projected from Selected Practices
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Composite index calculated as the unweighted mean across all 6 regenerative pillars. Identifies priority agro-ecological transition areas without claiming guaranteed yield outcomes.
            </p>
          </div>

          {/* Identified Lowest Performing Dimensions Box (Section 6 Requirement) */}
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200/80 space-y-2 max-w-sm">
            <span className="text-xs font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-amber-700" />
              Priority Target Dimensions:
            </span>
            <div className="space-y-1 text-xs">
              {regenIntel.lowestDimensions.map((d, idx) => (
                <div key={d.key} className="flex justify-between items-center text-slate-700">
                  <span>{idx + 1}. {d.label}:</span>
                  <span className="font-mono font-bold text-amber-900">{d.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Dimensions Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
          {dimensions.map((dim, idx) => {
            const isWeak = regenIntel.lowestDimensions.some((w) => w.key === dim.key);
            return (
              <div
                key={idx}
                className={`rounded-xl border p-4 space-y-3 transition-all ${
                  isWeak
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-slate-200 bg-[#FCFDFC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate" title={dim.name}>
                    {dim.name}
                  </span>
                  <span className={`font-mono text-sm font-bold ${isWeak ? 'text-amber-800' : 'text-emerald-800'}`}>
                    {dim.score}/100
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWeak ? 'bg-amber-600' : 'bg-emerald-700'
                    }`}
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  {dim.desc}
                </p>
                {isWeak && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded inline-block">
                    Targeted in Recommendations Below
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* TOP 3 REGENERATIVE ACTIONS Connected to Weak Dimensions (Section 6 & 8 Requirement) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Deterministic Agro-Ecological Transition
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Top 3 Regenerative Actions for {currentFarm.farmerName}
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            {completedCount} of 3 practices simulated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {regenIntel.top3Actions.map((action, idx) => {
            const isCompleted = !!completedActions[idx];
            return (
              <div
                key={idx}
                className={`rounded-xl border p-5 flex flex-col justify-between transition-all space-y-4 ${
                  isCompleted
                    ? 'border-emerald-600 bg-emerald-50/50'
                    : 'border-slate-200 bg-[#FAFBF9]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Target: {action.dimension}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-slate-500">
                      {action.feasibility}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {action.action}
                  </p>
                </div>

                {/* Explain Why Component */}
                <div className="pt-2 border-t border-slate-200 text-xs">
                  <button
                    onClick={() => toggleWhy(idx)}
                    className="flex items-center justify-between w-full text-[11px] font-bold text-emerald-900 hover:text-emerald-700 py-1"
                  >
                    <span className="flex items-center gap-1">
                      <HelpCircle className="h-3 w-3 text-emerald-700" />
                      Why this practice?
                    </span>
                    {expandedWhy[idx] ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>

                  {expandedWhy[idx] && (
                    <p className="text-[11px] text-slate-600 leading-relaxed bg-white/90 p-2.5 rounded border border-slate-200 mt-1">
                      {action.why}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 font-mono">
                    {action.impactScore}
                  </span>
                  <button
                    onClick={() => toggleAction(idx)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                      isCompleted
                        ? 'bg-emerald-800 text-white'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{isCompleted ? 'Implemented' : 'Mark Practice'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety / Agronomic Limitations Disclaimer (Section 11 Requirement) */}
      <div className="text-center py-2 text-xs text-slate-400">
        AgriN prototype recommendations are decision-support guidance based on demo data. Field conditions should be verified before significant agricultural interventions.
      </div>
    </div>
  );
};
