/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Farm } from '../../types/farm';
import { ChevronDown, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentFarm: Farm;
  allFarms: Farm[];
  onSelectFarm: (farm: Farm) => void;
  activeNav: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentFarm,
  allFarms,
  onSelectFarm,
}) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-emerald-950/10 bg-white/95 px-4 backdrop-blur-md sm:px-6">
      {/* Zone 1: Brand Wordmark (Single Text Element / Clean Display) */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-800 text-white shadow-sm font-bold text-lg tracking-wider">
          A
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              AgriN
            </span>
            <span className="hidden sm:inline-block text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/60 rounded px-1.5 py-0.5">
              PROTOTYPE
            </span>
          </div>
          <span className="hidden md:block text-[11px] text-slate-500 font-medium">
            Local Intelligence · Regenerative Farming · Shared Resilience
          </span>
        </div>
      </div>

      {/* Zone 2: Farm Quick Switcher & Context */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Farm Switcher Dropdown */}
        <div className="relative flex items-center">
          <label htmlFor="farm-selector" className="sr-only">Select Demo Farm</label>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs text-slate-700 hover:border-emerald-500 transition-colors">
            <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
            <div className="flex flex-col text-left">
              <span className="font-semibold text-slate-900 truncate max-w-[120px] sm:max-w-[180px]">
                {currentFarm.farmerName}
              </span>
              <span className="text-[10px] text-slate-500 truncate max-w-[120px] sm:max-w-[180px]">
                {currentFarm.primaryCrop} · {currentFarm.district}
              </span>
            </div>
            <select
              id="farm-selector"
              value={currentFarm.id}
              onChange={(e) => {
                const found = allFarms.find((f) => f.id === e.target.value);
                if (found) onSelectFarm(found);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              aria-label="Select Farm"
            >
              <optgroup label="Zone 1: Indo-Gangetic Basin (India)">
                {allFarms
                  .filter((f) => f.zoneId === 'zone-1-indo-gangetic')
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.farmerName} — {f.primaryCrop} ({f.district}, {f.country})
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Zone 2: Cerrado Savanna (Brazil)">
                {allFarms
                  .filter((f) => f.zoneId === 'zone-2-cerrado')
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.farmerName} — {f.primaryCrop} ({f.district}, {f.country})
                    </option>
                  ))}
              </optgroup>
              <optgroup label="Zone 3: Semi-Arid & Nile Corridor (ZA, EG, ET)">
                {allFarms
                  .filter((f) => f.zoneId === 'zone-3-semi-arid-highveld')
                  .map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.farmerName} — {f.primaryCrop} ({f.district}, {f.country})
                    </option>
                  ))}
              </optgroup>
            </select>
            <ChevronDown className="h-3 w-3 text-slate-400 shrink-0 ml-1" />
          </div>
        </div>

        {/* Global Demo Status Flag */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50/80 border border-amber-200/80 rounded-lg px-2.5 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-amber-600 shrink-0" />
          <span className="font-medium">12 Demo Farms Active</span>
        </div>
      </div>
    </header>
  );
};
