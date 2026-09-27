/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DEMO_FARMS, DEFAULT_FARM } from './data/demoFarms';
import { Farm } from './types/farm';
import { Header } from './components/layout/Header';
import { Sidebar, NavItemKey } from './components/layout/Sidebar';
import { OverviewView } from './components/views/OverviewView';
import { MyFarmView } from './components/views/MyFarmView';
import { AgriAdvisorView } from './components/views/AgriAdvisorView';
import { CropDoctorView } from './components/views/CropDoctorView';
import { SoilIntelligenceView } from './components/views/SoilIntelligenceView';
import { WeatherView } from './components/views/WeatherView';
import { SatelliteMonitorView } from './components/views/SatelliteMonitorView';
import { RegenerativePlanView } from './components/views/RegenerativePlanView';
import { RegionalIntelligenceView } from './components/views/RegionalIntelligenceView';
import { ExchangeView } from './components/views/ExchangeView';
import {
  LayoutDashboard,
  Trees,
  Bot,
  Stethoscope,
  Globe2,
  Menu,
  X,
  Share2,
  Leaf,
  CloudSun,
  FlaskConical,
  Satellite,
} from 'lucide-react';

export default function App() {
  const [currentFarm, setCurrentFarm] = useState<Farm>(DEFAULT_FARM);
  const [activeNav, setActiveNav] = useState<NavItemKey>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [advisorInitialPrompt, setAdvisorInitialPrompt] = useState<string | null>(null);

  // Safe fallback if farm is ever missing
  const safeFarm = currentFarm || DEFAULT_FARM;

  const handleAskAgriN = (prompt?: string) => {
    setAdvisorInitialPrompt(prompt || 'What should I prioritize today?');
    setActiveNav('agri-advisor');
  };

  const renderActiveView = () => {
    switch (activeNav) {
      case 'overview':
        return <OverviewView farm={safeFarm} onNavigate={setActiveNav} onAskAgriN={handleAskAgriN} />;
      case 'my-farm':
        return (
          <MyFarmView
            currentFarm={safeFarm}
            allFarms={DEMO_FARMS}
            onSelectFarm={setCurrentFarm}
            onNavigate={setActiveNav}
          />
        );
      case 'agri-advisor':
        return (
          <AgriAdvisorView
            currentFarm={safeFarm}
            initialPrompt={advisorInitialPrompt}
            onClearInitialPrompt={() => setAdvisorInitialPrompt(null)}
          />
        );
      case 'crop-doctor':
        return <CropDoctorView currentFarm={safeFarm} />;
      case 'soil-intelligence':
        return <SoilIntelligenceView currentFarm={safeFarm} />;
      case 'weather':
        return <WeatherView currentFarm={safeFarm} />;
      case 'satellite-monitor':
        return <SatelliteMonitorView currentFarm={safeFarm} />;
      case 'regenerative-plan':
        return <RegenerativePlanView currentFarm={safeFarm} />;
      case 'regional-intelligence':
        return (
          <RegionalIntelligenceView
            allFarms={DEMO_FARMS}
            currentFarm={safeFarm}
            onSelectFarm={setCurrentFarm}
            onNavigate={setActiveNav}
          />
        );
      case 'agrin-exchange':
        return <ExchangeView currentFarm={safeFarm} />;
      default:
        return <OverviewView farm={safeFarm} onNavigate={setActiveNav} />;
    }
  };

  const navItemsList: { key: NavItemKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: 'overview', label: 'Overview', icon: LayoutDashboard },
    { key: 'my-farm', label: 'My Farm', icon: Trees },
    { key: 'agri-advisor', label: 'Agri Advisor', icon: Bot },
    { key: 'crop-doctor', label: 'Crop Doctor', icon: Stethoscope },
    { key: 'soil-intelligence', label: 'Soil Intelligence', icon: FlaskConical },
    { key: 'weather', label: 'Weather', icon: CloudSun },
    { key: 'satellite-monitor', label: 'Satellite Monitor', icon: Satellite },
    { key: 'regenerative-plan', label: 'Regenerative Plan', icon: Leaf },
    { key: 'regional-intelligence', label: 'Regional Intelligence', icon: Globe2 },
    { key: 'agrin-exchange', label: 'AgriN Exchange', icon: Share2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-slate-800 flex flex-col font-sans">
      {/* Top Header Contract */}
      <Header
        currentFarm={safeFarm}
        allFarms={DEMO_FARMS}
        onSelectFarm={setCurrentFarm}
        activeNav={activeNav}
      />

      {/* Mobile Navigation Drawer Trigger */}
      <div className="md:hidden flex items-center justify-between border-b border-emerald-950/10 bg-white px-4 py-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-900">Current View:</span>
          <span className="font-bold text-emerald-800 capitalize">
            {activeNav.replace('-', ' ')}
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700"
        >
          {isMobileMenuOpen ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
          <span>Menu</span>
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-xs top-24">
          <div className="bg-white p-4 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 pb-1">
              Navigate Sections
            </span>
            {navItemsList.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveNav(item.key);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium ${
                    isActive ? 'bg-emerald-800 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Body Frame: Sidebar + Viewport Canvas */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Desktop Sidebar (10 Items) */}
        <Sidebar
          activeNav={activeNav}
          onSelectNav={setActiveNav}
          currentFarm={safeFarm}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Bottom Editorial Legal / Transparency Ribbon */}
      <footer className="border-t border-emerald-950/10 bg-white py-4 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">AgriN Prototype</span>
            <span>·</span>
            <span>Local Intelligence. Regenerative Farming. Shared Resilience.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Synthetic Demonstration Dataset (12 Farms)</span>
            <span>·</span>
            <span>Build 06 · Final Hardened Release (Freeze)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
