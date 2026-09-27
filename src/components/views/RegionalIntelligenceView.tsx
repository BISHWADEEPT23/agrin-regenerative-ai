/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Farm } from '../../types/farm';
import {
  getFullFarmIntelligence,
  calculateRegionalMacroIntelligence,
} from '../../services/intelligenceEngine';
import {
  Globe2,
  AlertTriangle,
  Activity,
  Flame,
  Search,
  Filter,
  ArrowUpDown,
  TrendingUp,
  ShieldAlert,
  Leaf,
  CheckCircle,
  Eye,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { NavItemKey } from '../layout/Sidebar';

interface RegionalIntelligenceViewProps {
  allFarms: Farm[];
  currentFarm: Farm;
  onSelectFarm: (farm: Farm) => void;
  onNavigate: (key: NavItemKey) => void;
}

type SortField = 'farmRisk' | 'soilScore' | 'ndvi' | 'regenScore' | 'farmerName';
type SortDirection = 'asc' | 'desc';

export const RegionalIntelligenceView: React.FC<RegionalIntelligenceViewProps> = ({
  allFarms,
  currentFarm,
  onSelectFarm,
  onNavigate,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedCropFilter, setSelectedCropFilter] = useState<string>('all');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<SortField>('farmRisk');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // 1. Calculate full intelligence for all 12 farms through shared engine
  const allIntelligences = useMemo(
    () => allFarms.map((f) => getFullFarmIntelligence(f)),
    [allFarms]
  );

  // 2. Compute macro statistics across all 12 farms dynamically
  const macro = useMemo(
    () => calculateRegionalMacroIntelligence(allFarms, allIntelligences),
    [allFarms, allIntelligences]
  );

  // Distinct list of crops for filtering
  const distinctCrops = useMemo(
    () => Array.from(new Set(allFarms.map((f) => f.primaryCrop))).sort(),
    [allFarms]
  );

  // Sorting handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // 3. Filtered & Sorted Farm Risk Table
  const filteredAndSorted = useMemo(() => {
    return allIntelligences
      .filter((item) => {
        const matchesZone = selectedZone === 'all' || item.farm.zoneId === selectedZone;
        const matchesCrop = selectedCropFilter === 'all' || item.farm.primaryCrop === selectedCropFilter;
        const matchesRisk =
          selectedRiskFilter === 'all' ||
          item.risk.classification.toLowerCase() === selectedRiskFilter.toLowerCase();
        const matchesSearch =
          item.farm.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.farm.primaryCrop.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.farm.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.farm.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.farm.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesZone && matchesCrop && matchesRisk && matchesSearch;
      })
      .sort((a, b) => {
        let valA: number | string = 0;
        let valB: number | string = 0;

        switch (sortField) {
          case 'farmRisk':
            valA = a.risk.farmRiskScore;
            valB = b.risk.farmRiskScore;
            break;
          case 'soilScore':
            valA = a.soil.soilHealthScore;
            valB = b.soil.soilHealthScore;
            break;
          case 'ndvi':
            valA = a.satellite.ndvi;
            valB = b.satellite.ndvi;
            break;
          case 'regenScore':
            valA = a.regenerative.overallScore;
            valB = b.regenerative.overallScore;
            break;
          case 'farmerName':
            valA = a.farm.farmerName;
            valB = b.farm.farmerName;
            break;
        }

        if (typeof valA === 'string') {
          return sortDirection === 'asc'
            ? valA.localeCompare(valB as string)
            : (valB as string).localeCompare(valA);
        }
        return sortDirection === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [allIntelligences, selectedZone, selectedCropFilter, selectedRiskFilter, searchTerm, sortField, sortDirection]);

  const getRiskBadge = (cls: string, score: number) => {
    switch (cls) {
      case 'CRITICAL':
        return (
          <span className="text-[11px] font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2 py-0.5 rounded">
            CRITICAL ({score})
          </span>
        );
      case 'HIGH':
        return (
          <span className="text-[11px] font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2 py-0.5 rounded">
            HIGH ({score})
          </span>
        );
      case 'MODERATE':
        return (
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
            MODERATE ({score})
          </span>
        );
      case 'LOW':
      default:
        return (
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded">
            LOW ({score})
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            AgriN Regional Intelligence
          </h1>
          <p className="text-sm text-slate-600">
            Synthesized multi-farm surveillance, zone vulnerability benchmarking, and aggregated signals across all 12 demo holdings.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-2xs">
          <Globe2 className="h-3.5 w-3.5 text-emerald-700" />
          <span>Network Telemetry: 3 Agro-Ecological Zones</span>
        </div>
      </div>

      {/* HIGHEST-RISK ZONE CALLOUT (Section 2) */}
      <div className="rounded-xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50/50 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
            <Flame className="h-5 w-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                HIGHEST-RISK ZONE IDENTIFIED
              </span>
              <span className="text-xs text-slate-500 font-mono">· Automated Network Calculation</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display mt-0.5">
              {macro.highestRiskZone.name}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Primary Surveillance Trigger: <strong className="text-slate-800">{macro.highestRiskZone.primaryDriver}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-3 rounded-lg border border-amber-200 shrink-0">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 block uppercase">Mean Zone Risk</span>
            <span className="text-2xl font-bold font-mono text-amber-800">
              {macro.highestRiskZone.meanRiskScore} / 100
            </span>
          </div>
          <button
            onClick={() => setSelectedZone(macro.highestRiskZone.id)}
            className="rounded-lg bg-amber-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
          >
            Filter This Zone
          </button>
        </div>
      </div>

      {/* 1. REGIONAL SUMMARY METRICS (Section 1) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Regional Summary Telemetry (12 Demo Holdings)
          </h3>
          <span className="text-[11px] text-slate-500">Calculated dynamically from active dataset</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Demo Farms
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 block">
              {macro.totalFarms} Holdings
            </span>
            <span className="text-[11px] text-slate-500 block">Across 3 Zones</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Total Farm Area
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 block">
              {macro.totalAreaHectares} ha
            </span>
            <span className="text-[11px] text-slate-500 block">Aggregate cultivated land</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Crops Represented
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 block">
              {macro.cropsRepresented.length} Crops
            </span>
            <span className="text-[11px] text-slate-500 block truncate" title={macro.cropsRepresented.join(', ')}>
              {macro.cropsRepresented.slice(0, 3).join(', ')}...
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average Farm Risk
            </span>
            <span className="text-2xl font-bold font-mono text-amber-800 block">
              {macro.averageRiskScore} / 100
            </span>
            <span className="text-[11px] text-slate-500 block">4-Factor Network Mean</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average Soil Health
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-800 block">
              {macro.averageSoilScore} / 100
            </span>
            <span className="text-[11px] text-slate-500 block">Macro-nutrient balance</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average NDVI
            </span>
            <span className="text-2xl font-bold font-mono text-slate-900 block">
              {macro.averageNdvi}
            </span>
            <span className="text-[11px] text-slate-500 block">Canopy vigor baseline</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Average Regen Score
            </span>
            <span className="text-2xl font-bold font-mono text-emerald-800 block">
              {macro.averageRegenScore} / 100
            </span>
            <span className="text-[11px] text-slate-500 block">6-Pillar Mean Index</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              High-Risk Farms
            </span>
            <span className="text-2xl font-bold font-mono text-amber-800 block">
              {macro.highRiskCount} Holdings
            </span>
            <span className="text-[11px] text-slate-500 block">Risk score &ge; 50/100</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Elevated Disease Risk
            </span>
            <span className="text-2xl font-bold font-mono text-rose-700 block">
              {macro.elevatedDiseaseCount} Holdings
            </span>
            <span className="text-[11px] text-slate-500 block">Spore outbreak watch</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Vegetation Stressed
            </span>
            <span className="text-2xl font-bold font-mono text-amber-700 block">
              {macro.stressedCount} Holdings
            </span>
            <span className="text-[11px] text-slate-500 block">Satellite canopy stress</span>
          </div>
        </div>
      </div>

      {/* 2. ZONE INTELLIGENCE (Section 2) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Zone Intelligence Summaries
          </h3>
          <span className="text-xs text-slate-500">Across the 3 Agro-Ecological Basins</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {macro.zoneSummaries.map((zone) => {
            const isHighest = zone.id === macro.highestRiskZone.id;
            const isCurrentZone = currentFarm.zoneId === zone.id;

            return (
              <div
                key={zone.id}
                className={`rounded-xl border p-5 shadow-xs space-y-3 transition-all ${
                  isHighest
                    ? 'border-amber-300 bg-amber-50/20 ring-1 ring-amber-300'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                        {zone.region}
                      </span>
                      {isHighest && (
                        <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded">
                          Peak Risk
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      {zone.name}
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {zone.farmCount} Holdings
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">Risk</span>
                    <span className="font-mono font-bold text-slate-900">{zone.averageFarmRisk}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">Soil</span>
                    <span className="font-mono font-bold text-emerald-800">{zone.averageSoilHealth}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">NDVI</span>
                    <span className="font-mono font-bold text-slate-800">{zone.averageNdvi}</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="text-slate-400 block text-[10px]">Regen</span>
                    <span className="font-mono font-bold text-emerald-800">{zone.averageRegenScore}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Disease Risk Holdings:</span>
                    <span className="font-bold text-rose-700">{zone.diseaseRiskCount} of {zone.farmCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Stressed Holdings:</span>
                    <span className="font-bold text-amber-700">{zone.stressedFarmCount} of {zone.farmCount}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    Primary Crops: <strong>{zone.primaryCrops.join(', ')}</strong>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setSelectedZone(zone.id)}
                    className="w-full text-center rounded border border-slate-200 bg-white py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Filter Table to this Zone
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. EMERGING AGRICULTURAL SIGNALS & 5. REGIONAL PRIORITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emerging Signals */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Emerging Agricultural Signals
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Automated network telemetry derived deterministically from the 12 active holdings.
          </p>
          <div className="space-y-2 pt-1">
            {macro.emergingSignals.map((sig, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-xs text-slate-700 flex items-start gap-2.5"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{sig}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regional Priorities */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-700" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Regional Priorities (Decision-Support)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Top network-wide recommendations for agricultural officers and zonal coordinators.
          </p>
          <div className="space-y-2 pt-1">
            {macro.regionalPriorities.map((prio, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-950 flex items-start gap-2.5"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-200 text-[11px] font-bold text-amber-900 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed font-medium">{prio}</span>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 pt-1 italic">
            * Prototype Decision-Support Priorities — grounded in active farm telemetry.
          </div>
        </div>
      </div>

      {/* 3. AGRICULTURAL RISK TABLE (Section 3) */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Agricultural Risk & Surveillance Table
            </h3>
            <p className="text-xs text-slate-500">
              Filterable and sortable across all 11 indicators. Click any column header to sort; click any row to switch active farm context.
            </p>
          </div>

          {/* Filters Bar: Search, Zone, Crop, Risk Level */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search farmer or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none w-40 sm:w-48"
              />
            </div>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Zones</option>
              <option value="zone-1-indo-gangetic">Zone 1 (India)</option>
              <option value="zone-2-cerrado">Zone 2 (Brazil)</option>
              <option value="zone-3-semi-arid-highveld">Zone 3 (Africa & Nile)</option>
            </select>

            <select
              value={selectedCropFilter}
              onChange={(e) => setSelectedCropFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Crops</option>
              {distinctCrops.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={selectedRiskFilter}
              onChange={(e) => setSelectedRiskFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="moderate">Moderate Risk</option>
              <option value="high">High Risk</option>
              <option value="critical">Critical Risk</option>
            </select>
          </div>
        </div>

        {/* Table with all 11 required columns */}
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Farm ID</th>
                <th
                  onClick={() => handleSort('farmerName')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Farmer / Farm</span>
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-3">Zone</th>
                <th className="py-2.5 px-3">Crop</th>
                <th
                  onClick={() => handleSort('soilScore')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Soil Score</span>
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ndvi')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>NDVI</span>
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-3">Vegetation Status</th>
                <th className="py-2.5 px-3">Disease Risk</th>
                <th
                  onClick={() => handleSort('farmRisk')}
                  className="py-2.5 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Farm Risk</span>
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('regenScore')}
                  className="py-2.5 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Regen Score</span>
                    <ArrowUpDown className="h-3 w-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-3 text-center">Risk Level</th>
                <th className="py-2.5 px-3 text-center">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAndSorted.map((item, idx) => {
                const isCurrent = item.farm.id === currentFarm.id;
                return (
                  <tr
                    key={item.farm.id}
                    onClick={() => onSelectFarm(item.farm)}
                    className={`cursor-pointer transition-colors ${
                      isCurrent
                        ? 'bg-emerald-50/80 font-medium'
                        : 'hover:bg-slate-50/80 text-slate-700'
                    }`}
                  >
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                      {item.farm.id}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900">{item.farm.farmerName}</div>
                      <div className="text-[10px] text-slate-400">{item.farm.district}, {item.farm.country}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="text-[11px] font-medium text-slate-600 block">
                        {item.farm.zoneId === 'zone-1-indo-gangetic'
                          ? 'Zone 1 (IN)'
                          : item.farm.zoneId === 'zone-2-cerrado'
                          ? 'Zone 2 (BR)'
                          : 'Zone 3 (AFR)'}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-800">{item.farm.primaryCrop}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[100px]">{item.farm.cropStage}</div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">
                      {item.soil.soilHealthScore}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {item.satellite.ndvi}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        item.satellite.vegetationStatus === 'Stressed'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.satellite.vegetationStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        item.farm.diseaseRisk === 'High' || item.farm.diseaseRisk === 'Elevated'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.farm.diseaseRisk}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                      {item.risk.farmRiskScore} / 100
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-800">
                      {item.regenerative.overallScore}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {getRiskBadge(item.risk.classification, item.risk.farmRiskScore)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFarm(item.farm);
                          onNavigate('overview');
                        }}
                        className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-emerald-800 hover:text-white transition-colors"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Safety / Agronomic Limitations Disclaimer */}
      <div className="text-center py-2 text-xs text-slate-400">
        AgriN regional indicators are synthesized decision-support guidance based on 12 demo holdings. Ground verification recommended before deploying regional interventions.
      </div>
    </div>
  );
};
