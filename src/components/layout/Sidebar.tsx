/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutDashboard,
  Trees,
  Bot,
  Stethoscope,
  FlaskConical,
  CloudSun,
  Satellite,
  Leaf,
  Globe2,
  Share2,
} from 'lucide-react';
import { Farm } from '../../types/farm';

export type NavItemKey =
  | 'overview'
  | 'my-farm'
  | 'agri-advisor'
  | 'crop-doctor'
  | 'soil-intelligence'
  | 'weather'
  | 'satellite-monitor'
  | 'regenerative-plan'
  | 'regional-intelligence'
  | 'agrin-exchange';

interface SidebarProps {
  activeNav: NavItemKey;
  onSelectNav: (key: NavItemKey) => void;
  currentFarm: Farm;
}

interface NavItemDef {
  key: NavItemKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const NAV_ITEMS: NavItemDef[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'my-farm', label: 'My Farm', icon: Trees },
  { key: 'agri-advisor', label: 'Agri Advisor', icon: Bot, tag: 'AI' },
  { key: 'crop-doctor', label: 'Crop Doctor', icon: Stethoscope },
  { key: 'soil-intelligence', label: 'Soil Intelligence', icon: FlaskConical },
  { key: 'weather', label: 'Weather', icon: CloudSun },
  { key: 'satellite-monitor', label: 'Satellite Monitor', icon: Satellite },
  { key: 'regenerative-plan', label: 'Regenerative Plan', icon: Leaf },
  { key: 'regional-intelligence', label: 'Regional Intelligence', icon: Globe2 },
  { key: 'agrin-exchange', label: 'AgriN Exchange', icon: Share2, tag: 'BRICS' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  currentFarm,
}) => {
  return (
    <aside className="w-64 shrink-0 flex-col border-r border-emerald-950/10 bg-white hidden md:flex min-h-[calc(100vh-4rem)]">
      {/* Navigation Group */}
      <div className="flex-1 px-3 py-4 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Farm Intelligence
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectNav(item.key)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.tag && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-emerald-700/80 text-white'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200/50'
                  }`}
                >
                  {item.tag}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Farm Mini Telemetry Card */}
      <div className="p-3 border-t border-slate-100 bg-[#FBFDFB]">
        <div className="rounded-lg border border-slate-200/80 bg-white p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Selected Farm</span>
            <span className="font-mono text-emerald-800 font-semibold">{currentFarm.id}</span>
          </div>
          <div className="text-xs font-semibold text-slate-800 truncate">
            {currentFarm.primaryCrop} ({currentFarm.farmAreaHectares} ha)
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Regen Score</span>
            <span className="font-mono font-bold text-emerald-700">{currentFarm.regenerativeScore}/100</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500">NDVI Health</span>
            <span className="font-mono font-bold text-slate-700">{currentFarm.satellite.ndviCurrent}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
