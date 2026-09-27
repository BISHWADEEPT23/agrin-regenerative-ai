/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AgriculturalZoneId = 'zone-1-indo-gangetic' | 'zone-2-cerrado' | 'zone-3-semi-arid-highveld';

export interface WeatherDay {
  day: string;
  date: string;
  condition: 'Sunny' | 'Partly Cloudy' | 'Light Rain' | 'Scattered Showers' | 'Heavy Rain' | 'Humid Overcast';
  tempMax: number;
  tempMin: number;
  rainfallMm: number;
  humidityPct: number;
  windSpeedKmh: number;
  agriculturalImplication: string;
}

export interface SoilMetrics {
  ph: number;
  phStatus: 'Acidic' | 'Optimal / Neutral' | 'Slightly Alkaline' | 'Alkaline';
  nitrogenKgHa: number;
  nitrogenStatus: 'Low' | 'Moderate' | 'Good' | 'High';
  phosphorusKgHa: number;
  phosphorusStatus: 'Low' | 'Moderate' | 'Good' | 'High';
  potassiumKgHa: number;
  potassiumStatus: 'Low' | 'Moderate' | 'Good' | 'High';
  organicCarbonPct: number;
  organicCarbonStatus: 'Low' | 'Moderate' | 'Good' | 'High';
  moisturePct: number;
  moistureStatus: 'Deficit' | 'Adequate' | 'Surplus' | 'Waterlogged';
  soilHealthIndex: number; // 0-100
  recommendedActions: string[];
}

export interface SatelliteMetrics {
  ndviCurrent: number; // -1 to 1, usually 0.2 to 0.85
  ndviChange7d: number;
  vegetationStatus: 'Vigorous Vegetative' | 'Moderate Canopy' | 'Sparse / Stressed' | 'Senescent / Maturing';
  cropStressLevel: 'Low' | 'Low-Moderate' | 'Moderate (Water stress)' | 'Elevated' | 'Severe';
  historicalNdvi: { week: string; ndvi: number; benchmark: number }[];
  fieldParcels: { id: string; zoneName: string; ndvi: number; moisture: string; stress: 'Normal' | 'Watch' | 'Alert' }[];
}

export interface RegenerativeDimensions {
  soilHealth: number; // 0-100
  waterEfficiency: number; // 0-100
  biodiversity: number; // 0-100
  inputEfficiency: number; // 0-100
  climateResilience: number; // 0-100
  carbonPractices: number; // 0-100
}

export interface RegenerativeRecommendation {
  title: string;
  dimension: string;
  impactScore: string;
  description: string;
  feasibility: 'Immediate' | 'Next Season' | 'Long-Term';
}

export interface Farm {
  id: string;
  farmerName: string;
  zoneId: AgriculturalZoneId;
  zoneName: string;
  district: string;
  state: string;
  country: string;
  farmAreaHectares: number;
  primaryCrop: string;
  cropVariety: string;
  cropStage: string;
  sowingDate: string;
  soilType: string;
  soil: SoilMetrics;
  currentTempC: number;
  currentHumidityPct: number;
  rainfallForecastSummary: string;
  weather7Days: WeatherDay[];
  satellite: SatelliteMetrics;
  cropStressLevel: string;
  diseaseRisk: 'Low' | 'Moderate' | 'Elevated' | 'High';
  diseaseRiskDescription: string;
  climateRisk: 'Low' | 'Moderate' | 'Elevated' | 'High';
  climateRiskDescription: string;
  overallFarmRisk: 'Low Risk' | 'Moderate Risk' | 'Elevated Risk';
  regenerativeScore: number; // 0-100
  regenerativeExplanation: string;
  regenerativeDimensions: RegenerativeDimensions;
  regenerativeActions: RegenerativeRecommendation[];
  todaysAdvisory: {
    headline: string;
    actionableStep: string;
    urgency: 'Routine' | 'Attention Required' | 'Critical Window';
    rationale: string;
  };
}

export interface AgriAdvisorMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  sources?: string[];
  suggestedFollowUps?: string[];
}

export interface PossibleCondition {
  name: string;
  likelihood: string; // e.g. "Primary Suspect (High)", "Secondary Possibility (Moderate)"
  notes?: string;
}

export interface WhyAssessment {
  imageEvidence: string;
  farmContextCorrelation: string;
}

export interface CropDiagnosticResult {
  isCropImage?: boolean;
  unclearReason?: string | null;
  detectedCrop: string;
  cropMatch?: boolean;
  cropMismatchNote?: string | null;
  identifiedCondition: string; // primary condition (backward-compatible)
  possibleConditions: PossibleCondition[]; // up to 3 ordered by likelihood
  confidenceLevel: 'High' | 'Moderate' | 'Low/Uncertain';
  confidencePct: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  visibleSymptoms: string[]; // concise list of observed foliar markers
  symptomsObserved: string[]; // backward-compatible alias
  whyAssessment: WhyAssessment; // Image Evidence + Farm Context Correlation
  immediateActions: string[]; // up to 3 practical steps
  agronomicIntervention: string; // backward-compatible alias
  regenerativeOption: string; // 1 sustainable practice
  organicRemedy: string; // backward-compatible alias
  disclaimer: string;
  isAiGenerated?: boolean;
  modelUsed?: string;
  fallbackNotice?: string | null;
}

export interface ExchangeKnowledgePackage {
  id: string;
  country: string;
  countryCode: string;
  organization: string;
  modelTitle: string;
  cropDomain: string;
  climateContext: string;
  version: string;
  validationStatus: 'Peer-Validated' | 'Field Tested' | 'Candidate Schema' | 'Active Exchange';
  interoperabilityStatus: 'Standard Compliant' | 'Verified Schema' | 'Draft Interop';
  compatibilityStandard: string;
  lastUpdated: string;
  abstract: string;
  sharedFeatures: string[];
  downloadsCount: number;
  supportedCrops: string[];
  climateApplicability: string;
  requiredInputFields: string[];
  outputSchemaDescription: string;
  validationMetadata: string;
}
