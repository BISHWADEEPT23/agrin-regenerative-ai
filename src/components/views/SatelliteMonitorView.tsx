/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Farm } from '../../types/farm';
import { analyzeSatellite } from '../../services/intelligenceEngine';
import {
  Satellite,
  Activity,
  Layers,
  TrendingUp,
  Info,
  Calendar,
  Eye,
  SlidersHorizontal,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';

interface SatelliteMonitorViewProps {
  currentFarm: Farm;
}

export const SatelliteMonitorView: React.FC<SatelliteMonitorViewProps> = ({ currentFarm }) => {
  const { satellite } = currentFarm;
  const satIntel = analyzeSatellite(currentFarm);
  const [activeBandIndex, setActiveBandIndex] = useState<'ndvi' | 'moisture' | 'rgb'>('ndvi');
  const [showWhy, setShowWhy] = useState<boolean>(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Healthy':
        return <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded">Healthy</span>;
      case 'Monitor':
        return <span className="text-xs font-bold text-sky-800 bg-sky-100 border border-sky-200 px-2.5 py-0.5 rounded">Monitor</span>;
      case 'Stressed':
      default:
        return <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded">Stressed</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            Satellite Vegetation Intelligence & Canopy Biomass
          </h1>
          <p className="text-sm text-slate-600">
            Multi-spectral vegetation index analysis, deterministic canopy health classification, and field check guidance for {currentFarm.farmerName}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <Satellite className="h-3.5 w-3.5 text-emerald-700" />
          <span>Resolution: Sentinel-2 10m Simulated Composite</span>
        </div>
      </div>

      {/* Mandatory Prototype Satellite Indicators Label (Section 4 Requirement) */}
      <div className="rounded-lg border border-purple-200 bg-purple-50/70 p-3.5 flex items-start gap-3">
        <Info className="h-4 w-4 text-purple-700 shrink-0 mt-0.5" />
        <div className="text-xs text-purple-950 space-y-0.5">
          <span className="font-bold uppercase tracking-wider">PROTOTYPE SATELLITE INDICATORS:</span>{' '}
          <span>
            Vegetation indices and parcel grids are simulated demonstration models. Earth Engine and Copernicus Hub APIs will be integrated in subsequent releases.
          </span>
        </div>
      </div>

      {/* Satellite Intelligence Synthesis Card (Section 4 Requirement) */}
      <div className="rounded-xl border border-emerald-950/15 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Satellite Intelligence Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">· Automated Spectral Classification</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-display mt-0.5">
              Canopy Classification & Ground-Truthing Field Check
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Vegetation Status:</span>
            {getStatusBadge(satIntel.vegetationStatus)}
          </div>
        </div>

        {/* Observation & Field Check */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-200 bg-[#FAFBF9] p-4 space-y-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Satellite Observation:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {satIntel.satelliteObservation}
            </p>
            <div className="text-[11px] text-slate-400 pt-1">
              Reflectance Value: <strong className="text-slate-700 font-mono">NDVI {satIntel.ndvi}</strong>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider block">
                Recommended Field Check:
              </span>
              <p className="text-xs text-emerald-800 leading-relaxed font-medium mt-1">
                {satIntel.recommendedFieldCheck}
              </p>
            </div>

            {/* Interactive Explain Why (Section 8 Requirement) */}
            <div className="pt-2 border-t border-emerald-200">
              <button
                onClick={() => setShowWhy(!showWhy)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-700"
              >
                <HelpCircle className="h-3.5 w-3.5 text-emerald-700" />
                <span>Why this field check?</span>
                {showWhy ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {showWhy && (
                <p className="text-[11px] text-slate-700 bg-white/90 p-2.5 rounded border border-emerald-200/80 mt-1 leading-relaxed">
                  {satIntel.why}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Top Quadrant: Core Satellite Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Current Canopy NDVI
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-slate-900">
              {satellite.ndviCurrent}
            </span>
            <span className="text-xs font-semibold text-emerald-600 font-mono">
              +{satellite.ndviChange7d} (7d)
            </span>
          </div>
          <span className="text-[11px] text-slate-400 block">
            Normalized Difference Vegetation Index
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Vegetation Canopy State
          </span>
          <span className="text-lg font-bold text-emerald-800 block truncate">
            {satellite.vegetationStatus}
          </span>
          <span className="text-[11px] text-slate-500 block">
            Chlorophyll absorption: Optimum
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Canopy Stress Level
          </span>
          <span className="text-lg font-bold text-slate-800 block truncate">
            {satellite.cropStressLevel}
          </span>
          <span className="text-[11px] text-slate-400 block">
            Water-stress index: Low
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Overpass Recurrence
          </span>
          <span className="text-lg font-bold text-slate-900 block font-mono">
            Every 5 Days
          </span>
          <span className="text-[11px] text-slate-400 block">
            Next Pass: Tomorrow, 10:42 AM
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Farm Parcel Vegetation Visualizer & Trend History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Simulated Farm Parcel Canopy Grid */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="space-y-0.5">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Spatial Field Visualization
              </span>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Field Parcel Zoning & Spectral Map
              </h3>
            </div>

            {/* Spectral Band Selector */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs">
              <button
                onClick={() => setActiveBandIndex('ndvi')}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                  activeBandIndex === 'ndvi'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NDVI Density
              </button>
              <button
                onClick={() => setActiveBandIndex('moisture')}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                  activeBandIndex === 'moisture'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Moisture Band (NDWI)
              </button>
              <button
                onClick={() => setActiveBandIndex('rgb')}
                className={`px-2.5 py-1 font-medium rounded-md transition-colors ${
                  activeBandIndex === 'rgb'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                True Color RGB
              </button>
            </div>
          </div>

          {/* Visual Farm Map Simulation Canvas */}
          <div className="relative rounded-xl border border-slate-300/80 bg-[#1A251E] p-4 sm:p-6 text-white min-h-[260px] flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center text-xs text-emerald-200/80 border-b border-white/10 pb-2">
              <span className="font-mono">Coordinates: 23°14'N · 87°51'E</span>
              <span className="font-mono">FOV: {currentFarm.farmAreaHectares} Hectares</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
              {satellite.fieldParcels.map((parcel) => (
                <div
                  key={parcel.id}
                  className={`rounded-lg p-3 border backdrop-blur-xs transition-all ${
                    parcel.stress === 'Alert'
                      ? 'border-amber-400/80 bg-amber-950/40 text-amber-100'
                      : parcel.stress === 'Watch'
                      ? 'border-emerald-400/60 bg-emerald-950/40 text-emerald-100'
                      : 'border-emerald-400/40 bg-emerald-900/30 text-emerald-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-bold">{parcel.id}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      parcel.stress === 'Alert' ? 'bg-amber-600/60 text-white' : 'bg-emerald-600/60 text-white'
                    }`}>
                      {parcel.stress}
                    </span>
                  </div>
                  <div className="text-xs font-semibold truncate">{parcel.zoneName}</div>
                  <div className="mt-2 pt-2 border-t border-white/10 flex justify-between text-[11px] font-mono">
                    <span>NDVI {parcel.ndvi}</span>
                    <span className="text-emerald-300">{parcel.moisture}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-slate-300">
              <span className="text-emerald-400">Dense Vegetation (0.80)</span>
              <div className="h-2 w-32 rounded-full bg-gradient-to-r from-amber-500 via-emerald-400 to-emerald-700" />
              <span className="text-amber-300">Sparse Canopy (0.20)</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Parcel boundaries represent micro-zones within {currentFarm.farmerName}'s {currentFarm.farmAreaHectares} ha holding.
          </p>
        </div>

        {/* Right 5 Cols: Multi-Week Historical Trend & Benchmarking */}
        <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Biomass Growth Curve
            </span>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Canopy Trend vs Regional Benchmark
            </h3>
          </div>

          <div className="space-y-3 pt-1">
            {satellite.historicalNdvi.map((pt, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{pt.week}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-emerald-800 font-bold">Farm: {pt.ndvi}</span>
                    <span className="text-slate-400">Avg: {pt.benchmark}</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex gap-0.5">
                  <div
                    className="h-full bg-emerald-700 rounded-full"
                    style={{ width: `${(pt.ndvi / 1.0) * 100}%` }}
                    title={`Farm NDVI: ${pt.ndvi}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-slate-50 p-3.5 border border-slate-200 text-xs space-y-1">
            <span className="font-bold text-slate-800">Growth Analysis:</span>
            <p className="text-slate-600 leading-relaxed">
              {currentFarm.primaryCrop} vegetative progression is running <strong>+4.3% above the 5-year regional baseline</strong>, confirming healthy stand density.
            </p>
          </div>
        </div>
      </div>

      {/* Safety / Agronomic Limitations Disclaimer */}
      <div className="text-center py-2 text-xs text-slate-400">
        AgriN prototype recommendations are decision-support guidance based on demo data. Field conditions should be verified before significant agricultural interventions.
      </div>
    </div>
  );
};
