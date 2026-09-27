/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Farm } from '../../types/farm';
import { getFullFarmIntelligence } from '../../services/intelligenceEngine';
import {
  Sprout,
  Calendar,
  CloudRain,
  Thermometer,
  Droplets,
  Activity,
  AlertTriangle,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Info,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Award,
  Layers,
  Bot,
} from 'lucide-react';
import { NavItemKey } from '../layout/Sidebar';

interface OverviewViewProps {
  farm: Farm;
  onNavigate: (key: NavItemKey) => void;
  onAskAgriN?: (prompt?: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ farm, onNavigate, onAskAgriN }) => {
  // Single deterministic source of truth for all intelligence calculations
  const intelligence = getFullFarmIntelligence(farm);
  const { soil, weather, satellite, risk, regenerative, today } = intelligence;

  // Interactive "Why?" accordion states for explainable AI
  const [showPriorityWhy, setShowPriorityWhy] = useState<boolean>(true);
  const [showRiskWhy, setShowRiskWhy] = useState<boolean>(false);
  const [showSoilWhy, setShowSoilWhy] = useState<boolean>(false);
  const [showWeatherWhy, setShowWeatherWhy] = useState<boolean>(false);
  const [showSatelliteWhy, setShowSatelliteWhy] = useState<boolean>(false);

  const getRiskColor = (classification: string) => {
    switch (classification) {
      case 'CRITICAL':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'HIGH':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'MODERATE':
        return 'text-amber-700 bg-amber-50/60 border-amber-200/80';
      case 'LOW':
      default:
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
    }
  };

  const getSoilStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'text-emerald-800 bg-emerald-50 border-emerald-200';
      case 'Monitor':
        return 'text-sky-800 bg-sky-50 border-sky-200';
      case 'Needs Attention':
        return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'High Concern':
      default:
        return 'text-rose-800 bg-rose-50 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-lg border border-emerald-900/10 bg-white p-3 sm:px-4 shadow-2xs">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[11px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            DETERMINISTIC INTELLIGENCE ENGINE ACTIVE
          </span>
          <span className="hidden md:inline text-slate-400">·</span>
          <span className="hidden md:inline">
            Cross-analyzing Soil, Weather, and Satellite indicators for {farm.zoneName}.
          </span>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          Holding ID: {farm.id}
        </div>
      </div>

      {/* 1. Farm Summary Hero Card */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium">
              <span>{farm.zoneName}</span>
              <span>·</span>
              <span>{farm.district}, {farm.state}, {farm.country}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              {farm.farmerName}'s Holding ({farm.id})
            </h1>
            <p className="text-sm text-slate-600">
              Primary Crop: <strong className="text-slate-800">{farm.primaryCrop}</strong> ({farm.cropVariety}) · Stage: <strong className="text-slate-800">{farm.cropStage}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onNavigate('my-farm')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
            >
              Change Holding (12 Available)
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onNavigate('agri-advisor')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              <Sprout className="h-3.5 w-3.5" />
              Ask Agri Advisor
            </button>
          </div>
        </div>

        {/* Quick Micro-Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-500 block text-[11px]">Farm Area</span>
            <span className="font-semibold text-slate-900 text-sm font-mono">{farm.farmAreaHectares} ha</span>
            <span className="text-slate-400 text-[10px] block">{(farm.farmAreaHectares * 2.471).toFixed(1)} acres</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Sowing Date</span>
            <span className="font-semibold text-slate-900 text-sm font-mono">{farm.sowingDate}</span>
            <span className="text-slate-400 text-[10px] block">Active Field Season</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Soil Substrate</span>
            <span className="font-semibold text-slate-900 text-sm truncate block" title={farm.soilType}>
              {farm.soilType}
            </span>
            <span className="text-slate-400 text-[10px] block">pH {farm.soil.ph}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[11px]">Farm Risk Index</span>
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold border ${getRiskColor(risk.classification)}`}>
                {risk.classification} ({risk.farmRiskScore}/100)
              </span>
            </div>
            <span className="text-slate-400 text-[10px] block mt-0.5">Synthesized Multi-Risk</span>
          </div>
        </div>
      </div>

      {/* 2. TODAY'S FARM INTELLIGENCE SECTION (Section 7 Requirement) */}
      <div className="rounded-xl border-2 border-emerald-800/20 bg-gradient-to-b from-white to-[#F9FCF8] p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-2 py-0.5 rounded">
                INTELLIGENCE LAYER
              </span>
              <span className="text-xs text-slate-400 font-mono">· Automated Synthesis</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 font-display mt-1">
              TODAY'S FARM INTELLIGENCE
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline">
              Calibrated for: <strong className="text-slate-800">{farm.primaryCrop}</strong> ({farm.cropStage})
            </span>
            <button
              onClick={() => {
                if (onAskAgriN) {
                  onAskAgriN('What should I prioritize today?');
                } else {
                  onNavigate('agri-advisor');
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-800 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors shrink-0"
              title="Open Agri Advisor with today's priority prompt"
            >
              <Bot className="h-3.5 w-3.5" />
              <span>Ask AgriN</span>
            </button>
          </div>
        </div>

        {/* The 6 Core Synthesized Intelligence Metrics (Section 7 Requirement) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Farm Risk Score */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Farm Risk Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-slate-900">
                {today.farmRiskScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getRiskColor(today.farmRiskClass)}`}>
              {today.farmRiskClass}
            </span>
          </div>

          {/* 2. Soil Health Score */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Soil Health Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-emerald-800">
                {today.soilHealthScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${getSoilStatusColor(today.soilStatus)}`}>
              {today.soilStatus}
            </span>
          </div>

          {/* 3. Weather Risk */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Weather Risk
            </span>
            <div className="text-xl font-bold text-slate-900 font-display">
              {today.weatherRisk}
            </div>
            <span className="text-[10px] text-slate-500 block truncate">
              {farm.rainfallForecastSummary.split(';')[0]}
            </span>
          </div>

          {/* 4. Vegetation Status */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Vegetation Status
            </span>
            <div className="text-xl font-bold text-slate-900 font-display">
              {today.vegetationStatus}
            </div>
            <span className="text-[10px] text-emerald-700 font-mono font-semibold block">
              NDVI {satellite.ndvi}
            </span>
          </div>

          {/* 5. Disease Risk */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Disease Risk
            </span>
            <div className="text-xl font-bold text-slate-900 font-display">
              {today.diseaseRisk}
            </div>
            <span className="text-[10px] text-slate-500 block truncate" title={farm.diseaseRiskDescription}>
              {farm.diseaseRiskDescription.split(' ')[0]} alert
            </span>
          </div>

          {/* 6. Regenerative Score */}
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 space-y-1.5 shadow-2xs">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Regenerative Score
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold font-mono text-emerald-800">
                {today.regenerativeScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">
              6 Pillars Calibrated
            </span>
          </div>
        </div>

        {/* PRIORITY TODAY CARD (Section 7 & 8 Requirement) */}
        <div className="rounded-xl border-2 border-emerald-700/30 bg-emerald-50/60 p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-emerald-800 text-white px-2.5 py-0.5 rounded shadow-2xs">
                PRIORITY TODAY
              </span>
              <span className="text-xs font-bold text-emerald-950">
                {today.priorityToday.headline}
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-white/80 border border-emerald-200 px-2 py-0.5 rounded">
              Urgency: {today.priorityToday.urgency}
            </span>
          </div>

          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {today.priorityToday.actionableStep}
          </p>

          {/* EXPLAIN WHY Component (Section 8 Requirement) */}
          <div className="pt-2 border-t border-emerald-200/70">
            <button
              onClick={() => setShowPriorityWhy(!showPriorityWhy)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-700 transition-colors"
            >
              <HelpCircle className="h-3.5 w-3.5 text-emerald-700" />
              <span>Why this priority?</span>
              {showPriorityWhy ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showPriorityWhy && (
              <div className="mt-2 rounded-lg bg-white/90 border border-emerald-200 p-3 text-xs text-slate-700 leading-relaxed space-y-1">
                <span className="font-semibold text-emerald-900 block">Agronomic Rationale:</span>
                <p>{today.priorityToday.why}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  Trigger Source: <strong className="text-slate-600">{today.priorityToday.triggerSource} Sensor Logic</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Deep Dive Quadrant: Weather, Soil, Satellite, Risk with Explain Why */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Weather Intelligence Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Weather Intelligence
            </span>
            <Thermometer className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-slate-900">
                {farm.currentTempC}°C
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Risk: <strong className="text-slate-800">{weather.weatherRisk}</strong>
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              {weather.recommendedAction}
            </p>
          </div>

          <button
            onClick={() => setShowWeatherWhy(!showWeatherWhy)}
            className="flex items-center justify-between w-full text-[11px] font-semibold text-emerald-800 pt-2 border-t border-slate-100 hover:text-emerald-950"
          >
            <span>Why this weather recommendation?</span>
            {showWeatherWhy ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showWeatherWhy && (
            <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-200 space-y-1">
              <p>{weather.why}</p>
              <div className="text-slate-400 text-[10px]">
                Implications: {weather.agriculturalImplications[0]}
              </div>
            </div>
          )}

          <div
            onClick={() => onNavigate('weather')}
            className="cursor-pointer flex items-center justify-between text-[11px] text-slate-500 hover:text-emerald-800 pt-1"
          >
            <span>View 7-day forecast & DEMO data</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>

        {/* Soil Intelligence Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Soil Intelligence
            </span>
            <Droplets className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-emerald-800">
                {soil.soilHealthScore}<span className="text-sm text-slate-400 font-normal">/100</span>
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${getSoilStatusColor(soil.soilStatus)}`}>
                {soil.soilStatus}
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              {soil.keyObservations[0]}
            </p>
          </div>

          <button
            onClick={() => setShowSoilWhy(!showSoilWhy)}
            className="flex items-center justify-between w-full text-[11px] font-semibold text-emerald-800 pt-2 border-t border-slate-100 hover:text-emerald-950"
          >
            <span>Why this soil score?</span>
            {showSoilWhy ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showSoilWhy && (
            <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">Key Observation:</span>
              <p>{soil.keyObservations[1] || soil.keyObservations[0]}</p>
              <div className="text-emerald-800 font-medium pt-1">
                Action: {soil.recommendedActions[0]?.action}
              </div>
            </div>
          )}

          <div
            onClick={() => onNavigate('soil-intelligence')}
            className="cursor-pointer flex items-center justify-between text-[11px] text-slate-500 hover:text-emerald-800 pt-1"
          >
            <span>Explore NPK & soil actions</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>

        {/* Satellite Canopy Health Card */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Satellite Intelligence
            </span>
            <Activity className="h-4 w-4 text-emerald-700" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-slate-900">
                {satellite.ndvi}
              </span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                satellite.vegetationStatus === 'Healthy'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {satellite.vegetationStatus}
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              {satellite.satelliteObservation}
            </p>
          </div>

          <button
            onClick={() => setShowSatelliteWhy(!showSatelliteWhy)}
            className="flex items-center justify-between w-full text-[11px] font-semibold text-emerald-800 pt-2 border-t border-slate-100 hover:text-emerald-950"
          >
            <span>Why this field check?</span>
            {showSatelliteWhy ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showSatelliteWhy && (
            <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-200 space-y-1">
              <p>{satellite.why}</p>
              <div className="text-slate-500 text-[10px]">
                Note: NDVI indicates canopy vigor reduction, not direct etiology.
              </div>
            </div>
          )}

          <div
            onClick={() => onNavigate('satellite-monitor')}
            className="cursor-pointer flex items-center justify-between text-[11px] text-slate-500 hover:text-emerald-800 pt-1"
          >
            <span>Inspect sub-field parcel map</span>
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>

        {/* Farm Risk Engine Card (Section 5 Requirement) */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Farm Risk Engine
            </span>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold font-mono text-slate-900">
                {risk.farmRiskScore}<span className="text-sm text-slate-400 font-normal">/100</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getRiskColor(risk.classification)}`}>
                {risk.classification}
              </span>
            </div>
            <div className="text-xs text-slate-600">
              Primary Driver: <strong className="text-slate-800">{risk.drivers[0]}</strong>
            </div>
          </div>

          <button
            onClick={() => setShowRiskWhy(!showRiskWhy)}
            className="flex items-center justify-between w-full text-[11px] font-semibold text-emerald-800 pt-2 border-t border-slate-100 hover:text-emerald-950"
          >
            <span>Why this risk score?</span>
            {showRiskWhy ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showRiskWhy && (
            <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600 border border-slate-200 space-y-1.5">
              <span className="font-semibold text-slate-800 block">Risk Component Penalties:</span>
              <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                <div>Soil: {risk.componentScores.soilPenalty}/25</div>
                <div>Weather: {risk.componentScores.weatherPenalty}/25</div>
                <div>Canopy: {risk.componentScores.vegetationPenalty}/25</div>
                <div>Disease: {risk.componentScores.diseasePenalty}/25</div>
              </div>
              <p className="text-[10px] text-slate-500 pt-1">{risk.why}</p>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Formula: Deterministic 4-Factor</span>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
          </div>
        </div>
      </div>

      {/* 4. Regenerative Intelligence Summary Section (Section 6 Requirement) */}
      <div className="rounded-xl border border-emerald-950/10 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Regenerative Intelligence & Roadmap
              </span>
              <span className="text-[10px] text-slate-400">· Weak Dimension Targeting</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Regenerative Score: <span className="text-emerald-800 font-mono">{regenerative.overallScore}</span> / 100
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Targeted transition interventions derived from lowest-scoring pillars ({regenerative.lowestDimensions.map(d => d.label).join(', ')}).
            </p>
          </div>
          <button
            onClick={() => onNavigate('regenerative-plan')}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-800 text-emerald-800 px-3.5 py-2 text-xs font-semibold hover:bg-emerald-50 transition-colors shrink-0"
          >
            <span>Full Regenerative Plan (6 Pillars)</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Top 3 Deterministic Actions Mapped to Weak Dimensions with Why */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {regenerative.top3Actions.map((action, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-[#FAFBF9] p-4 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {action.dimension}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-800">
                    {action.impactScore}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {action.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {action.action}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <span className="font-semibold text-emerald-900 block">Why?</span>
                <p>{action.why}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety / Agronomic Limitations Disclaimer (Section 11 Requirement) */}
      <div className="text-center py-2 text-xs text-slate-400">
        AgriN prototype recommendations are decision-support guidance based on demo data. Field conditions should be verified before significant agricultural interventions.
      </div>
    </div>
  );
};
