/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Farm, WeatherDay } from '../../types/farm';
import { analyzeWeather } from '../../services/intelligenceEngine';
import {
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  Droplets,
  Wind,
  Thermometer,
  AlertTriangle,
  Info,
  Calendar,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
} from 'lucide-react';

interface WeatherViewProps {
  currentFarm: Farm;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ currentFarm }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);
  const selectedDay: WeatherDay = currentFarm.weather7Days[selectedDayIndex] || currentFarm.weather7Days[0];

  const weatherIntel = analyzeWeather(currentFarm);
  const [showWhy, setShowWhy] = useState<boolean>(true);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="h-6 w-6 text-amber-500" />;
      case 'Light Rain':
      case 'Scattered Showers':
      case 'Heavy Rain':
        return <CloudRain className="h-6 w-6 text-sky-600" />;
      case 'Humid Overcast':
        return <Cloud className="h-6 w-6 text-slate-400" />;
      case 'Partly Cloudy':
      default:
        return <CloudSun className="h-6 w-6 text-amber-600" />;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'High':
        return <span className="text-xs font-bold text-rose-800 bg-rose-100 border border-rose-200 px-2.5 py-0.5 rounded">High Risk</span>;
      case 'Moderate':
        return <span className="text-xs font-bold text-amber-800 bg-amber-100 border border-amber-200 px-2.5 py-0.5 rounded">Moderate Risk</span>;
      case 'Low':
      default:
        return <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded">Low Risk</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">
            Agro-Meteorological Forecast & Weather Intelligence
          </h1>
          <p className="text-sm text-slate-600">
            Localized 7-day agricultural weather forecast and operational field implications for {currentFarm.district}, {currentFarm.country}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
          <CloudSun className="h-3.5 w-3.5 text-emerald-700" />
          <span>Station: {currentFarm.district} Synthetic Grid</span>
        </div>
      </div>

      {/* Mandatory Demo Weather Data Label (Section 3 Requirement) */}
      <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3.5 flex items-start gap-3">
        <Info className="h-4 w-4 text-sky-700 shrink-0 mt-0.5" />
        <div className="text-xs text-sky-950 space-y-0.5">
          <span className="font-bold uppercase tracking-wider">DEMO WEATHER DATA:</span>{' '}
          <span>
            Meteorological records displayed are synthetic prototype forecast vectors generated for hackathon demonstration. Not sourced from live radar feeds.
          </span>
        </div>
      </div>

      {/* Weather Intelligence Engine Synthesis Box (Section 3 Requirement) */}
      <div className="rounded-xl border border-emerald-950/15 bg-white p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Weather Intelligence Synthesis
              </span>
              <span className="text-xs text-slate-400 font-mono">· Automated Rule Analysis</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-display mt-0.5">
              Agricultural Weather Risk & Operational Action
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Overall Weather Risk:</span>
            {getRiskBadge(weatherIntel.weatherRisk)}
          </div>
        </div>

        {/* Recommended Action with "Why?" (Section 3 & 8 Requirement) */}
        <div className="rounded-xl border border-emerald-800/20 bg-[#FAFBF8] p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Recommended Agricultural Action:
            </span>
            <span className="text-xs text-slate-400 font-mono">For {currentFarm.primaryCrop}</span>
          </div>

          <p className="text-sm font-semibold text-slate-900 leading-relaxed">
            {weatherIntel.recommendedAction}
          </p>

          {/* Interactive Explain Why */}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => setShowWhy(!showWhy)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-700"
            >
              <HelpCircle className="h-3.5 w-3.5 text-emerald-700" />
              <span>Why this weather action?</span>
              {showWhy ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            {showWhy && (
              <div className="mt-2 rounded-lg bg-white p-3 text-xs text-slate-700 border border-emerald-100 leading-relaxed space-y-1">
                <span className="font-semibold text-emerald-900 block">Meteorological Rationale:</span>
                <p>{weatherIntel.why}</p>
              </div>
            )}
          </div>
        </div>

        {/* Agricultural Implications List (Section 3 Requirement) */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Current Agricultural Implications:
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {weatherIntel.agriculturalImplications.map((imp, idx) => (
              <div
                key={idx}
                className="rounded-lg bg-slate-50 border border-slate-200 p-2.5 text-slate-700 flex items-start gap-2"
              >
                <Thermometer className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                <span className="leading-snug">{imp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Today Current Condition Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0">
              {getWeatherIcon(selectedDay.condition)}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>{selectedDay.day} ({selectedDay.date})</span>
                <span>·</span>
                <span className="text-emerald-800 font-semibold">{selectedDay.condition}</span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-4xl font-extrabold text-slate-900 font-mono">
                  {selectedDay.tempMax}°C
                </span>
                <span className="text-base text-slate-400 font-mono">
                  / {selectedDay.tempMin}°C min
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <CloudRain className="h-3 w-3 text-sky-600" /> Precipitation
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">
                {selectedDay.rainfallMm} mm
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <Droplets className="h-3 w-3 text-emerald-600" /> Relative Humidity
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">
                {selectedDay.humidityPct}%
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] flex items-center gap-1">
                <Wind className="h-3 w-3 text-slate-500" /> Surface Wind
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm mt-0.5 block">
                {selectedDay.windSpeedKmh} km/h
              </span>
            </div>
          </div>
        </div>

        {/* Agricultural Implication Callout for Selected Day */}
        <div className="mt-5 rounded-lg border border-emerald-900/10 bg-emerald-50/50 p-4">
          <div className="flex items-start gap-2.5">
            <Thermometer className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-900 block">
                Field Implication for {selectedDay.day}:
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedDay.agriculturalImplication}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Interactive Forecast Cards */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 font-display">
          7-Day Weather Forecast Horizon
        </h3>
        <p className="text-xs text-slate-500">
          Click any day card to inspect day-specific field operations guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {currentFarm.weather7Days.map((day, idx) => {
            const isSelected = selectedDayIndex === idx;
            return (
              <div
                key={day.date}
                onClick={() => setSelectedDayIndex(idx)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all text-center space-y-2 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-emerald-400/60 hover:shadow-2xs'
                }`}
              >
                <div className="text-xs font-semibold text-slate-800">
                  {day.day}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {day.date}
                </div>
                <div className="flex justify-center py-1">
                  {getWeatherIcon(day.condition)}
                </div>
                <div className="text-xs font-bold font-mono text-slate-900">
                  {day.tempMax}° / {day.tempMin}°
                </div>
                <div className="text-[11px] text-sky-700 font-semibold font-mono">
                  {day.rainfallMm} mm rain
                </div>
                <div className="text-[10px] text-slate-500 truncate" title={day.condition}>
                  {day.condition}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safety / Agronomic Limitations Disclaimer */}
      <div className="text-center py-2 text-xs text-slate-400">
        AgriN prototype recommendations are decision-support guidance based on demo data. Field conditions should be verified before significant agricultural interventions.
      </div>
    </div>
  );
};
