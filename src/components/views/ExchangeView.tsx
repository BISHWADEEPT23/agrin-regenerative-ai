/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DEMO_EXCHANGE_PACKAGES } from '../../data/exchangeData';
import { ExchangeKnowledgePackage, Farm } from '../../types/farm';
import {
  Globe2,
  Download,
  CheckCircle2,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  Search,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  RefreshCw,
  FileCode,
  Building2,
  Check,
  X,
  AlertTriangle,
  GitBranch,
} from 'lucide-react';

interface ExchangeViewProps {
  currentFarm: Farm;
}

export const ExchangeView: React.FC<ExchangeViewProps> = ({ currentFarm }) => {
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<string>('all');
  const [selectedPackage, setSelectedPackage] = useState<ExchangeKnowledgePackage>(
    DEMO_EXCHANGE_PACKAGES[0]
  );
  const [importModalOpen, setImportModalOpen] = useState<boolean>(false);
  const [importingPackage, setImportingPackage] = useState<ExchangeKnowledgePackage | null>(null);
  const [importStatus, setImportStatus] = useState<'idle' | 'checking' | 'success'>('idle');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const filteredPackages = DEMO_EXCHANGE_PACKAGES.filter((pkg) => {
    return selectedCountryFilter === 'all' || pkg.country === selectedCountryFilter;
  });

  const handleOpenImport = (pkg: ExchangeKnowledgePackage) => {
    setImportingPackage(pkg);
    setImportStatus('checking');
    setImportModalOpen(true);

    setTimeout(() => {
      setImportStatus('success');
    }, 700);
  };

  const handleSimulateDownload = (pkg: ExchangeKnowledgePackage) => {
    setDownloadNotice(`Simulated bundle: "${pkg.modelTitle}" (${pkg.version}) exported to local runtime cache.`);
    setTimeout(() => {
      setDownloadNotice(null);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      {/* 6. EXCHANGE HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
              AgriN Exchange
            </h1>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-300 px-2 py-0.5 rounded">
              PROTOTYPE EXCHANGE
            </span>
          </div>
          <p className="text-sm font-semibold text-emerald-900 mt-0.5">
            Interoperable Agricultural Intelligence for Shared Climate Resilience
          </p>
          <p className="text-xs text-slate-600 mt-1 max-w-3xl">
            AgriN Exchange demonstrates how participating agricultural systems could share approved models, knowledge packages and interoperability schemas while retaining sovereign control of underlying agricultural data.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg shadow-2xs shrink-0">
          <Globe2 className="h-3.5 w-3.5 text-emerald-700" />
          <span>Prototype Cooperation Network</span>
        </div>
      </div>

      {/* 13. PROMINENT LOCAL VALIDATION PRINCIPLE BANNER */}
      <div className="rounded-xl border-2 border-emerald-600/30 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/40 p-4 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900 bg-emerald-200/80 px-2 py-0.5 rounded">
                CORE ARCHITECTURAL PRINCIPLE: LOCAL VALIDATION REQUIRED
              </span>
            </div>
            <p className="text-xs text-slate-700 mt-1 leading-relaxed">
              Shared agricultural intelligence should be evaluated against local crops, climate, soils and agronomic conditions before operational deployment. A model calibrated for Brazilian latosols or Siberian steppe is not assumed universally applicable without local verification.
            </p>
          </div>
        </div>
      </div>

      {/* 14. FARM → REGION → COOPERATION STORY VISUAL JOURNEY */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <GitBranch className="h-3.5 w-3.5 text-emerald-700" />
            <span>The AgriN Knowledge Lifecycle: From Micro-Parcel to Multilateral Exchange</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">End-to-End Conceptual Flow</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs pt-1">
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Step 1</span>
            <span className="font-bold text-slate-900 block text-xs">Farmer</span>
            <span className="text-[10px] text-slate-500 block">Field inputs & photos</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Step 2</span>
            <span className="font-bold text-slate-900 block text-xs">Farm Intel</span>
            <span className="text-[10px] text-slate-500 block">Soil, weather & NDVI</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Step 3</span>
            <span className="font-bold text-slate-900 block text-xs">Regional Signals</span>
            <span className="text-[10px] text-slate-500 block">Macro-risk aggregation</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Step 4</span>
            <span className="font-bold text-slate-900 block text-xs">Approved Packages</span>
            <span className="text-[10px] text-slate-500 block">Validated algorithms</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-emerald-700 block uppercase">Step 5</span>
            <span className="font-bold text-emerald-900 block text-xs">AgriN Exchange</span>
            <span className="text-[10px] text-emerald-700 block">Interoperable protocol</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Step 6</span>
            <span className="font-bold text-slate-900 block text-xs">Cross-Border Learn</span>
            <span className="text-[10px] text-slate-500 block">Climate adaptation</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 p-2.5 rounded-lg space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Step 7</span>
            <span className="font-bold text-slate-900 block text-xs">Local Advisory</span>
            <span className="text-[10px] text-slate-500 block">Verified decision aid</span>
          </div>
        </div>
      </div>

      {/* 11. COOPERATION NETWORK VISUALIZATION */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Multilateral Cooperation Topology (BRICS Participating Nodes)
            </h3>
            <p className="text-xs text-slate-500">
              Decentralized sovereign nodes exchanging standardized schemas without central data aggregation.
            </p>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
            5 Core Participating Nodes
          </span>
        </div>

        {/* Lightweight SVG Topology */}
        <div className="relative rounded-lg bg-slate-900 p-6 text-white overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            {/* Center Node */}
            <div className="order-2 md:order-1 flex-1 text-center md:text-left space-y-2">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-3 py-1 rounded-full text-xs font-mono font-bold">
                <Globe2 className="h-4 w-4" />
                <span>AGRIN PROTOCOL EXCHANGE</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md leading-relaxed">
                Connects heterogeneous national agricultural information systems (Embrapa, ICAR, CAAS, ARC, Vavilov Institute) through open data contracts and federated knowledge packages.
              </p>
            </div>

            {/* Country Nodes Grid */}
            <div className="order-1 md:order-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 w-full md:w-auto">
              <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-2.5 text-center space-y-1">
                <span className="text-base block">🇧🇷</span>
                <span className="text-xs font-bold text-slate-200 block">Brazil</span>
                <span className="text-[10px] text-emerald-400 block font-mono">Embrapa</span>
              </div>
              <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-2.5 text-center space-y-1">
                <span className="text-base block">🇷🇺</span>
                <span className="text-xs font-bold text-slate-200 block">Russia</span>
                <span className="text-[10px] text-emerald-400 block font-mono">Vavilov Inst</span>
              </div>
              <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-2.5 text-center space-y-1">
                <span className="text-base block">🇮🇳</span>
                <span className="text-xs font-bold text-slate-200 block">India</span>
                <span className="text-[10px] text-emerald-400 block font-mono">ICAR / AgriStack</span>
              </div>
              <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-2.5 text-center space-y-1">
                <span className="text-base block">🇨🇳</span>
                <span className="text-xs font-bold text-slate-200 block">China</span>
                <span className="text-[10px] text-emerald-400 block font-mono">CAAS Precision</span>
              </div>
              <div className="rounded-lg bg-slate-800/90 border border-slate-700 p-2.5 text-center space-y-1">
                <span className="text-base block">🇿🇦</span>
                <span className="text-xs font-bold text-slate-200 block">South Africa</span>
                <span className="text-[10px] text-emerald-400 block font-mono">ARC Resilient</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Alert Toast if triggered */}
      {downloadNotice && (
        <div className="rounded-lg bg-emerald-800 text-white px-4 py-2.5 text-xs flex items-center justify-between shadow-xs transition-all">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-300" />
            <span>{downloadNotice}</span>
          </div>
          <button
            onClick={() => setDownloadNotice(null)}
            className="text-emerald-200 hover:text-white text-xs ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* MAIN SECTION: 7. KNOWLEDGE PACKAGES CATALOG & 8. DETAILS INSPECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Package Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Approved Multilateral Knowledge Packages ({filteredPackages.length})
              </h3>
              <p className="text-xs text-slate-500">
                Peer-reviewed agronomic models and regenerative protocols.
              </p>
            </div>

            {/* Country Filter Bar */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs overflow-x-auto">
              {['all', 'Brazil', 'Russia', 'India', 'China', 'South Africa'].map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCountryFilter(c)}
                  className={`px-2.5 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedCountryFilter === c
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {c === 'all' ? 'All (5)' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-3">
            {filteredPackages.map((pkg) => {
              const isSelected = selectedPackage.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-emerald-400/60 hover:shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                          {pkg.country} ({pkg.countryCode})
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {pkg.version}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                          {pkg.validationStatus}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {pkg.modelTitle}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {pkg.organization} · {pkg.cropDomain}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-bold text-slate-700 block">
                        {pkg.downloadsCount}
                      </span>
                      <span className="text-[10px] text-slate-400 block">Peers Synced</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.abstract}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Standard: {pkg.compatibilityStandard}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackage(pkg);
                          handleOpenImport(pkg);
                        }}
                        className="rounded border border-emerald-600 bg-emerald-50 px-2 py-0.5 font-bold text-emerald-800 hover:bg-emerald-100"
                      >
                        Simulate Import
                      </button>
                      <span className="font-semibold text-emerald-800">
                        {isSelected ? 'Viewing Specification →' : 'Explore Package'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 8. PACKAGE DETAILS & SOVEREIGNTY CALLOUT */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20 rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Package Specification
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-mono">
                  {selectedPackage.id}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenImport(selectedPackage)}
                  className="inline-flex items-center gap-1 rounded-lg bg-emerald-800 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Simulate Import</span>
                </button>
                <button
                  onClick={() => handleSimulateDownload(selectedPackage)}
                  className="rounded-lg border border-slate-200 bg-white p-1.5 text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Export JSON-LD Schema"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* WHAT IT CONTAINS (Section 8) */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Contributing Organization</span>
                <span className="font-semibold text-slate-800">{selectedPackage.organization}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Supported Crops</span>
                <span className="font-medium text-slate-700">{selectedPackage.supportedCrops.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Climate Applicability</span>
                <span className="text-slate-600 leading-snug">{selectedPackage.climateApplicability}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Required Input Fields (Standard Interface)</span>
                <span className="font-mono text-[11px] text-emerald-800 block mt-0.5 bg-emerald-50 p-1.5 rounded">
                  {selectedPackage.requiredInputFields.join(', ')}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Output Schema Definition</span>
                <span className="text-slate-700">{selectedPackage.outputSchemaDescription}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Validation & Field Trials</span>
                <span className="text-slate-600 leading-snug">{selectedPackage.validationMetadata}</span>
              </div>
            </div>

            {/* WHAT IT DOES NOT SHARE (Data Sovereignty - Section 8 Requirement) */}
            <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-rose-900 font-bold text-xs">
                <Lock className="h-3.5 w-3.5 text-rose-700" />
                <span>WHAT THIS PROTOCOL DOES NOT SHARE:</span>
              </div>
              <ul className="text-[11px] text-rose-800 space-y-1 list-disc list-inside">
                <li><strong>Zero Raw Farmer Identities:</strong> Names, contact records, and personal IDs never leave the sovereign local environment.</li>
                <li><strong>Zero Unrestricted Farm-Level Personal Data:</strong> Micro-parcel spatial boundaries remain strictly under national governance.</li>
                <li><strong>Zero Confidential Domestic Datasets:</strong> Models exchange functional parameters and schemas, not underlying sovereign databases.</li>
              </ul>
            </div>

            {/* Simulated JSON-LD Manifest Preview */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-[11px] font-bold text-slate-400 font-mono uppercase">
                Interoperability Schema (JSON-LD):
              </span>
              <pre className="rounded-lg bg-slate-900 p-3 text-[10px] text-emerald-400 font-mono overflow-x-auto leading-relaxed max-h-32">
{`{
  "@context": "https://agrin.network/schemas/v1",
  "packageId": "${selectedPackage.id}",
  "countryCode": "${selectedPackage.countryCode}",
  "version": "${selectedPackage.version}",
  "status": "${selectedPackage.validationStatus}",
  "standard": "${selectedPackage.compatibilityStandard}",
  "requiredInputs": [
    ${selectedPackage.requiredInputFields.map(f => `"${f}"`).join(', ')}
  ]
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* 9. COMMON INTEROPERABILITY SCHEMA SECTION */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Standardized AgriN Farm Context Interface (v1.02)
            </h3>
            <p className="text-xs text-slate-500">
              Common agricultural schema enabling plug-and-play models across heterogeneous national systems.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Open Schema Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-7 bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-slate-300 overflow-x-auto">
            <span className="text-emerald-400 font-bold block mb-1">
              // AgriN Standardized Agricultural Context Contract
            </span>
            <pre className="text-slate-300 leading-relaxed">
{`AGRIN_FARM_CONTEXT {
  country_code: string ("IN" | "BR" | "RU" | "CN" | "ZA")
  region: string
  crop: string
  crop_stage: string

  soil: {
    ph: float
    nitrogen: float (kg/ha)
    phosphorus: float (kg/ha)
    potassium: float (kg/ha)
    organic_carbon: float (%)
    moisture: float (%)
  }

  weather: {
    temperature: float (°C)
    humidity: float (%)
    rainfall_forecast: string
  }

  satellite: {
    ndvi: float (-1.0 to +1.0)
    vegetation_status: string
  }

  risk: {
    farm_risk_score: int (0-100)
    disease_risk: string
  }

  regenerative: {
    score: int (0-100)
    priority_actions: string[]
  }
}`}
            </pre>
          </div>

          <div className="md:col-span-5 space-y-3 text-xs text-slate-600 flex flex-col justify-center">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 block">Why Common Schemas Matter</span>
              <p className="leading-relaxed">
                Different countries run divergent agronomic databases, satellite ground stations, and extension formats. Standardized data contracts allow an advisory model built in Brazil to accept telemetry from an Indian rice paddy or a South African sorghum holding without modifying the model core.
              </p>
            </div>
            <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-200 text-emerald-900 space-y-0.5">
              <span className="font-bold block">Zero Vendor Lock-in</span>
              <p className="text-[11px] text-emerald-800">
                Any public institution or cooperative can implement the AgriN connector using open HTTP/JSON endpoints.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 10. DIGITAL PUBLIC GOOD PRINCIPLES */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Designed as Digital Public Infrastructure (DPI)
            </h3>
            <p className="text-xs text-slate-500">
              Architectural foundation for sovereign, collaborative agricultural technology.
            </p>
          </div>
          <span className="text-[11px] text-slate-400 italic">
            * Conceptual DPG Alignment (Non-certified prototype)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 text-xs">
          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1">
            <span className="font-bold text-slate-900 block">1. Open Standards</span>
            <p className="text-slate-600 text-[11px]">
              Open-source JSON-LD / OGC data schemas ensure complete transparency and free access for non-commercial farm extension.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1">
            <span className="font-bold text-slate-900 block">2. Modular Architecture</span>
            <p className="text-slate-600 text-[11px]">
              Participating ministries or cooperatives connect existing systems without discarding current databases.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1">
            <span className="font-bold text-slate-900 block">3. Interoperable</span>
            <p className="text-slate-600 text-[11px]">
              AI models consume standardized agricultural context regardless of origin language or underlying server runtime.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1">
            <span className="font-bold text-slate-900 block">4. Local Data Control</span>
            <p className="text-slate-600 text-[11px]">
              Sovereignty is absolute: underlying farmer records and soil surveys remain strictly governed by the originating jurisdiction.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1">
            <span className="font-bold text-slate-900 block">5. Multilingual By Design</span>
            <p className="text-slate-600 text-[11px]">
              Shared intelligence is translated dynamically into local farmer vernaculars (Hindi, Portuguese, Russian, Mandarin, English).
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-3 bg-slate-50/60 space-y-1">
            <span className="font-bold text-slate-900 block">6. Extensible Commons</span>
            <p className="text-slate-600 text-[11px]">
              New agro-ecological zones, indigenous cover crop recipes, and emerging climate scenarios can be contributed seamlessly.
            </p>
          </div>
        </div>
      </div>

      {/* 12. SIMULATE IMPORT MODAL */}
      {importModalOpen && importingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-2xs p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Simulated Model Sandbox Import
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {importingPackage.modelTitle}
                </h3>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Compatibility Check */}
            <div className="space-y-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">1. Schema Compatibility Check:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Passed (100% Contract Match)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Standard {importingPackage.compatibilityStandard} successfully parsed against active farm context.
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-700 block">2. Required Input Fields Verified:</span>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {importingPackage.requiredInputFields.map((f) => (
                    <span key={f} className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-700">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Local Validation Warning (Mandatory Rule 12 & 13) */}
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-900 font-bold">
                  <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>LOCAL VALIDATION WARNING:</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Importing an international model package into the prototype sandbox does not automatically make it authoritative for local field use. Agronomists must validate thresholds against active local soil and microclimate telemetry.
                </p>
              </div>

              {/* Success Result */}
              {importStatus === 'success' && (
                <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-3 flex items-center gap-2.5 text-emerald-900">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold block">Prototype package successfully loaded into the AgriN sandbox.</span>
                    <span className="text-[11px] text-emerald-700">
                      Operational models and 12-farm deterministic dataset preserved intact without modification.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setImportModalOpen(false)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
              >
                Close Sandbox Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
