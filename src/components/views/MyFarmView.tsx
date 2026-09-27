/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Farm } from '../../types/farm';
import { AGRICULTURAL_ZONES } from '../../data/demoFarms';
import { getFullFarmIntelligence } from '../../services/intelligenceEngine';
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  Layers,
  ChevronRight,
  TrendingUp,
  Activity,
  Droplet,
  AlertTriangle,
} from 'lucide-react';
import { NavItemKey } from '../layout/Sidebar';

interface MyFarmViewProps {
  currentFarm: Farm;
  allFarms: Farm[];
  onSelectFarm: (farm: Farm) => void;
  onNavigate: (key: NavItemKey) => void;
}

export const MyFarmView: React.FC<MyFarmViewProps> = ({
  currentFarm,
  allFarms,
  onSelectFarm,
  onNavigate,
}) => {
  const currentIntel = getFullFarmIntelligence(currentFarm);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');

  const filteredFarms = allFarms.filter((f) => {
    const matchesSearch =
      f.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.primaryCrop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone =
      selectedZoneFilter === 'all' || f.zoneId === selectedZoneFilter;

    return matchesSearch && matchesZone;
  });

  return (
    <div className="space-y-6">
      {/* Header section with context */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            My Farm Holding & Network Selector
          </h1>
          <p className="text-sm text-slate-600">
            Inspect the active farm profile or switch seamlessly between all 12 demo farms across 3 agricultural zones.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <Layers className="h-3.5 w-3.5" />
          <span>Active: {currentFarm.id} ({currentFarm.farmerName})</span>
        </div>
      </div>

      {/* Primary Farm Profile Detailed Card */}
      <div className="rounded-xl border border-emerald-950/15 bg-white p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold uppercase tracking-wider">
              <span>Selected Farm Profile</span>
              <span>·</span>
              <span className="font-mono">{currentFarm.id}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {currentFarm.farmerName}
            </h2>
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1 font-medium">
                <MapPin className="h-3.5 w-3.5 text-emerald-700" />
                {currentFarm.district}, {currentFarm.state}, {currentFarm.country}
              </span>
              <span>·</span>
              <span>{currentFarm.zoneName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('agri-advisor')}
              className="rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
            >
              Ask Advisor About {currentFarm.primaryCrop}
            </button>
            <button
              onClick={() => onNavigate('crop-doctor')}
              className="rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Diagnose Foliar Health
            </button>
          </div>
        </div>

        {/* Detailed Agronomic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-6">
          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">Primary Crop</span>
            <span className="text-sm font-bold text-slate-900 block">{currentFarm.primaryCrop}</span>
            <span className="text-[11px] text-slate-500 block truncate">{currentFarm.cropVariety}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">Crop Stage</span>
            <span className="text-sm font-bold text-slate-900 block">{currentFarm.cropStage}</span>
            <span className="text-[11px] text-slate-500 block">Sown: {currentFarm.sowingDate}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">Farm Size</span>
            <span className="text-sm font-bold text-slate-900 block font-mono">{currentFarm.farmAreaHectares} ha</span>
            <span className="text-[11px] text-slate-500 block">{(currentFarm.farmAreaHectares * 2.471).toFixed(1)} acres</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">Soil Class</span>
            <span className="text-sm font-bold text-slate-900 block truncate" title={currentFarm.soilType}>
              {currentFarm.soilType}
            </span>
            <span className="text-[11px] text-slate-500 block">pH {currentFarm.soil.ph} ({currentFarm.soil.phStatus})</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">NDVI Vegetation</span>
            <span className="text-sm font-bold text-slate-900 block font-mono">{currentFarm.satellite.ndviCurrent}</span>
            <span className="text-[11px] text-emerald-700 font-semibold block">{currentFarm.satellite.vegetationStatus}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">Farm Risk Score</span>
            <span className="text-sm font-bold text-slate-900 block font-mono">
              {currentIntel.risk.farmRiskScore} / 100
            </span>
            <span className="text-[11px] font-bold text-amber-800 block">
              {currentIntel.risk.classification}
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-medium text-slate-400 block">Regen Score</span>
            <span className="text-sm font-bold text-emerald-800 block font-mono">{currentIntel.regenerative.overallScore} / 100</span>
            <span className="text-[11px] text-slate-500 block">Active baseline</span>
          </div>
        </div>

        {/* Selected Farm Current Soil & Stress Summary */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4 border border-slate-200/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-semibold text-slate-700">Agronomic Status Summary:</span>
              <p className="text-slate-600">
                Priority: <strong>{currentIntel.today.priorityToday.headline}</strong> · Driver: <strong>{currentIntel.risk.drivers[0]}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('overview')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-900 underline"
              >
                Go to Dashboard Overview
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 12-Farm Network Switcher Interface */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              12-Farm Network Explorer
            </h3>
            <p className="text-xs text-slate-500">
              Click any farm card below to instantly update the entire application state.
            </p>
          </div>

          {/* Search and Zone Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search crop, farmer, country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none w-48 sm:w-60"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedZoneFilter('all')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedZoneFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Zones (12)
              </button>
              <button
                onClick={() => setSelectedZoneFilter('zone-1-indo-gangetic')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedZoneFilter === 'zone-1-indo-gangetic'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Zone 1 (India)
              </button>
              <button
                onClick={() => setSelectedZoneFilter('zone-2-cerrado')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedZoneFilter === 'zone-2-cerrado'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Zone 2 (Brazil)
              </button>
              <button
                onClick={() => setSelectedZoneFilter('zone-3-semi-arid-highveld')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedZoneFilter === 'zone-3-semi-arid-highveld'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Zone 3 (ZA, EG, ET)
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Farm Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFarms.map((farm) => {
            const isSelected = farm.id === currentFarm.id;
            return (
              <div
                key={farm.id}
                onClick={() => onSelectFarm(farm)}
                className={`cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-emerald-400/60 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-slate-500">{farm.id}</span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                          <CheckCircle2 className="h-3 w-3" />
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mt-1">{farm.farmerName}</h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {farm.district}, {farm.country}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-emerald-800 block">
                      {farm.farmAreaHectares} ha
                    </span>
                    <span className="text-[10px] text-slate-400 block">Area</span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Crop:</span>
                    <span className="font-semibold text-slate-800">{farm.primaryCrop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Stage:</span>
                    <span className="text-slate-700 truncate max-w-[150px]">{farm.cropStage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">NDVI / Regen:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {farm.satellite.ndviCurrent} · <span className="text-emerald-700">{farm.regenerativeScore}/100</span>
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                  <span className="text-slate-400">{farm.zoneName.split(':')[0]}</span>
                  <span className={`font-semibold ${isSelected ? 'text-emerald-800' : 'text-slate-600'}`}>
                    {isSelected ? 'Currently Loaded' : 'Select Farm →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
