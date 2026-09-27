/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Farm, RegenerativeDimensions } from './farm';

export type SoilStatusCategory = 'Healthy' | 'Monitor' | 'Needs Attention' | 'High Concern';
export type WeatherRiskLevel = 'Low' | 'Moderate' | 'High';
export type VegetationStatusCategory = 'Healthy' | 'Monitor' | 'Stressed';
export type FarmRiskClassification = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export interface SoilActionWithWhy {
  action: string;
  why: string;
  urgency: 'Immediate' | 'Next Cycle' | 'Maintenance';
}

export interface SoilIntelligence {
  soilHealthScore: number; // 0-100
  soilStatus: SoilStatusCategory;
  keyObservations: string[]; // max 3
  recommendedActions: SoilActionWithWhy[]; // max 3
}

export interface WeatherIntelligence {
  weatherRisk: WeatherRiskLevel;
  agriculturalImplications: string[];
  recommendedAction: string;
  why: string;
}

export interface SatelliteIntelligence {
  vegetationStatus: VegetationStatusCategory;
  satelliteObservation: string;
  recommendedFieldCheck: string;
  why: string;
  ndvi: number;
  cropStress: string;
}

export interface FarmRiskIntelligence {
  farmRiskScore: number; // 0-100
  classification: FarmRiskClassification;
  drivers: string[];
  componentScores: {
    soilPenalty: number;
    weatherPenalty: number;
    vegetationPenalty: number;
    diseasePenalty: number;
  };
  why: string;
}

export interface WeakDimension {
  key: keyof RegenerativeDimensions;
  label: string;
  score: number;
}

export interface RegenerativeActionWithWhy {
  title: string;
  dimension: string;
  action: string;
  why: string;
  impactScore: string;
  feasibility: 'Immediate' | 'Next Season' | 'Long-Term';
}

export interface RegenerativeIntelligence {
  dimensions: RegenerativeDimensions;
  overallScore: number; // 0-100
  lowestDimensions: WeakDimension[];
  top3Actions: RegenerativeActionWithWhy[];
}

export interface PriorityTodayAdvisory {
  headline: string;
  actionableStep: string;
  urgency: 'Routine' | 'Attention Required' | 'Critical Window';
  why: string;
  triggerSource: 'Weather' | 'Disease' | 'Vegetation' | 'Soil' | 'Balanced';
}

export interface TodaysFarmIntelligence {
  farmRiskScore: number;
  farmRiskClass: FarmRiskClassification;
  soilHealthScore: number;
  soilStatus: SoilStatusCategory;
  weatherRisk: WeatherRiskLevel;
  vegetationStatus: VegetationStatusCategory;
  diseaseRisk: 'Low' | 'Moderate' | 'Elevated' | 'High';
  regenerativeScore: number;
  priorityToday: PriorityTodayAdvisory;
}

export interface FullFarmIntelligence {
  farm: Farm;
  soil: SoilIntelligence;
  weather: WeatherIntelligence;
  satellite: SatelliteIntelligence;
  risk: FarmRiskIntelligence;
  regenerative: RegenerativeIntelligence;
  today: TodaysFarmIntelligence;
}

export interface ZoneIntelligenceSummary {
  id: string;
  name: string;
  region: string;
  farmCount: number;
  primaryCrops: string[];
  averageFarmRisk: number;
  averageSoilHealth: number;
  averageNdvi: number;
  averageRegenScore: number;
  diseaseRiskCount: number;
  stressedFarmCount: number;
}

export interface RegionalMacroIntelligence {
  totalFarms: number;
  totalAreaHectares: number;
  cropsRepresented: string[];
  averageRiskScore: number;
  averageSoilScore: number;
  averageNdvi: number;
  averageRegenScore: number;
  highRiskCount: number;
  stressedCount: number;
  elevatedDiseaseCount: number;
  highestRiskZone: {
    id: string;
    name: string;
    meanRiskScore: number;
    primaryDriver: string;
  };
  zoneSummaries: ZoneIntelligenceSummary[];
  emergingSignals: string[];
  regionalPriorities: string[];
}

export type AdvisorLanguage = 'en' | 'hi' | 'pt' | 'ru' | 'zh';

export interface AdvisorEvidenceUsed {
  soilMoisture: string;
  rainfallForecast: string;
  ndvi: number | string;
  weatherRisk: string;
  farmRiskScore: number | string;
  cropStage: string;
}

export interface AdvisorStructuredData {
  situation: string;
  recommendedActions: string[];
  why: string;
  watchFor: string[];
  regenerativeOption: string;
  confidence: 'High' | 'Moderate' | 'Low';
  evidenceUsed: AdvisorEvidenceUsed;
  language: AdvisorLanguage | string;
  isAiGenerated: boolean;
  modelUsed?: string;
  fallbackNotice?: string;
}

export interface AdvisorMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text?: string;
  structured?: AdvisorStructuredData;
  error?: boolean;
}
