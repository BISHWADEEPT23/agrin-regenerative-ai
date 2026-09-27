/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExchangeKnowledgePackage } from '../types/farm';

export const DEMO_EXCHANGE_PACKAGES: ExchangeKnowledgePackage[] = [
  {
    id: 'PKG-BR-SOY-BIOFIX-01',
    country: 'Brazil',
    countryCode: 'BR',
    organization: 'Embrapa Soja · Low-Carbon Agriculture Network (ABC+)',
    modelTitle: 'Tropical Soil Regeneration & Biological Nitrogen Co-Inoculation Schema',
    cropDomain: 'Soybean & Safrinha Grass Systems · Oxisol Latosols',
    climateContext: 'Tropical Savanna (Cerrado) · High Solar Radiation & Warm Soils',
    version: 'v3.2-BioFix-Tropical',
    validationStatus: 'Field Tested',
    interoperabilityStatus: 'Standard Compliant',
    compatibilityStandard: 'AgriN Schema v1.02 / ISO 19156 OM',
    lastUpdated: '2026-09-02',
    abstract: 'Replaces 100% of synthetic nitrogen fertilizer through Bradyrhizobium and Azospirillum co-inoculation. Specifies peat carrier moisture thresholds, heat-tolerant bacterial strain survival formulas, and Safrinha Brachiaria cover-crop root biomass carbon accumulation.',
    sharedFeatures: [
      'Bradyrhizobium strain compatibility matrix across acidic latosols',
      'Soil temperature limit tables for bacterial nodulation survival',
      'Safrinha Brachiaria biomass carbon accumulation regression models'
    ],
    downloadsCount: 2340,
    supportedCrops: ['Soybean', 'Maize (Safrinha)', 'Brachiaria Grass', 'Dry Beans'],
    climateApplicability: 'Tropical Savanna, Subtropical Lowlands, Oxisol Latosol basins with mean temperature 22–32°C.',
    requiredInputFields: ['soil.ph', 'soil.organicCarbonPct', 'soil.moisturePct', 'weather.currentTempC', 'cropStage'],
    outputSchemaDescription: 'Co-inoculant dosage rate (mL/ha), expected biological N-fixation (kg N/ha), and carbon sequestration projection.',
    validationMetadata: 'Validated over 6 seasons across 42 commercial research parcels in Mato Grosso and Paraná under Embrapa Protocol ABC-2024.'
  },
  {
    id: 'PKG-RU-WHEAT-FROST-02',
    country: 'Russia',
    countryCode: 'RU',
    organization: 'Vavilov Institute of Plant Genetic Resources (VIR) & Timiryazev Academy',
    modelTitle: 'Cold-Climate Spring Wheat Resilience & Early Frost Hardening Model',
    cropDomain: 'Spring Wheat & Barley · Steppe Chernozem & Podzol Soils',
    climateContext: 'Continental Boreal & Steppe · Severe Winter Frost & Rapid Spring Thaw',
    version: 'v2.1-BorealShield',
    validationStatus: 'Peer-Validated',
    interoperabilityStatus: 'Standard Compliant',
    compatibilityStandard: 'AgriN Schema v1.02 / WMO AgriMet Standard',
    lastUpdated: '2026-08-28',
    abstract: 'Physiological degree-day calculation model estimating wheat crown frost tolerance, snow cover insulation buffering, and post-winter tillering survival under extreme temperature oscillations.',
    sharedFeatures: [
      'Snow cover thermal insulation coefficient formulas',
      'Sub-zero crown survival percentage curves by growth stage',
      'Early spring humic acid biostimulant recovery thresholds'
    ],
    downloadsCount: 1890,
    supportedCrops: ['Spring Wheat', 'Winter Wheat', 'Barley', 'Rye'],
    climateApplicability: 'Continental Boreal, Steppe zones with sub-zero winter temperatures, snow cover dynamics, and short growing seasons.',
    requiredInputFields: ['weather.currentTempC', 'weather.rainfallForecastSummary', 'soil.moisturePct', 'satellite.ndviCurrent', 'cropStage'],
    outputSchemaDescription: 'Crown frost injury index (0–100), winter survival probability, and spring biostimulant recovery window.',
    validationMetadata: 'Field verified across Rostov and Volga agro-climatic stations over 8 consecutive winters (2018–2026).'
  },
  {
    id: 'PKG-IN-RICE-AWD-03',
    country: 'India',
    countryCode: 'IN',
    organization: 'ICAR — National Rice Research Institute & AgriStack Open Protocol',
    modelTitle: 'Rice Water Optimization (AWD) & Blast Disease Risk Advisory Model',
    cropDomain: 'Rice (Paddy) · Alluvial Floodplains & Deltaic Basins',
    climateContext: 'Monsoon Subtropical & Tropical Deltaic · Extended High Humidity & Monsoon Rainfall',
    version: 'v2.4-AWD-Interoperable',
    validationStatus: 'Peer-Validated',
    interoperabilityStatus: 'Standard Compliant',
    compatibilityStandard: 'AgriN Schema v1.02 / OGC WaterML',
    lastUpdated: '2026-08-14',
    abstract: 'Field-tested hydrological thresholds for Alternate Wetting and Drying (AWD). Couples perforated pani pipe depth calibration with real-time leaf wetness and humidity triggers to prevent Magnaporthe blast outbreaks while cutting irrigation by 24–30%.',
    sharedFeatures: [
      'Perforated pani pipe depth calibration equations (15 cm threshold)',
      'Coupled blast spore germination risk formula (RH > 80% + Temp 24–28°C)',
      'Methane emission reduction factor coefficients for carbon crediting'
    ],
    downloadsCount: 3120,
    supportedCrops: ['Rice (Paddy)', 'Wetland Taro', 'Basmati Rice'],
    climateApplicability: 'Alluvial basins, monsoon-irrigated floodplains, and river delta agro-ecosystems.',
    requiredInputFields: ['weather.currentHumidityPct', 'weather.currentTempC', 'soil.moisturePct', 'cropStage', 'diseaseRisk'],
    outputSchemaDescription: 'Next irrigation timing recommendation (hours), blast spore pressure rating, and volumetric water saved (m³/ha).',
    validationMetadata: 'Peer-validated across 240 participatory smallholder demonstration clusters in Indo-Gangetic and Mahanadi basins.'
  },
  {
    id: 'PKG-CN-CANOPY-STRESS-04',
    country: 'China',
    countryCode: 'CN',
    organization: 'Chinese Academy of Agricultural Sciences (CAAS) · Institute of Agricultural Resources',
    modelTitle: 'Multi-Spectral Crop Stress & Canopy Nitrogen Deficit Detection Model',
    cropDomain: 'Maize, Rice & Winter Wheat · Intensive Precision Agro-Ecosystems',
    climateContext: 'Temperate to Subtropical Monsoonal · Intensive Double-Cropping Basins',
    version: 'v4.0-CanopyAI-Spec',
    validationStatus: 'Active Exchange',
    interoperabilityStatus: 'Standard Compliant',
    compatibilityStandard: 'AgriN Schema v1.02 / CEOS Earth Observation Standard',
    lastUpdated: '2026-09-18',
    abstract: 'Inverts multi-spectral Sentinel-2 and micro-satellite red-edge reflectances to separate nitrogen deficiency chlorosis from moisture deficit and soil salinity stress across small parcel mosaics.',
    sharedFeatures: [
      'Red-edge chlorophyll index (NDRE) nitrogen decoupling equations',
      'Micro-parcel boundary geometric correction algorithms',
      'Variable-rate organic top-dressing decision tree'
    ],
    downloadsCount: 2750,
    supportedCrops: ['Maize', 'Rice', 'Winter Wheat', 'Cotton'],
    climateApplicability: 'Intensive cropland basins with high parcel fragmentation and multi-season rotation.',
    requiredInputFields: ['satellite.ndviCurrent', 'satellite.cropStressLevel', 'soil.nitrogenKgHa', 'cropStage'],
    outputSchemaDescription: 'Canopy nitrogen sufficiency index (NSI 0–1), water vs nutrient stress attribution (%), and bio-fertilizer recommendation.',
    validationMetadata: 'Calibrated using ground-truth SPAD chlorophyll meters and hyperspectral UAV flights across Shandong and Jiangsu test sites.'
  },
  {
    id: 'PKG-ZA-SORGHUM-DROUGHT-05',
    country: 'South Africa',
    countryCode: 'ZA',
    organization: 'Agricultural Research Council (ARC) & Grain SA Climate Resilience Division',
    modelTitle: 'Drought-Resilient Maize & Grain Sorghum Water-Use Efficiency (WUE) Model',
    cropDomain: 'Grain Sorghum & Dryland Maize · Highveld Semi-Arid Steppe',
    climateContext: 'Semi-Arid Highveld Plateau · Erratic Rainfall & High Evapotranspiration',
    version: 'v1.9-Highveld-WUE',
    validationStatus: 'Peer-Validated',
    interoperabilityStatus: 'Standard Compliant',
    compatibilityStandard: 'AgriN Schema v1.02 / WMO AgriMet Standard',
    lastUpdated: '2026-07-28',
    abstract: 'Micro-catchment tied-ridge furrow design and root-zone water retention model. Delivers actionable planting window thresholds and drought-survival cultivation tactics for sub-humid to arid smallholder farms.',
    sharedFeatures: [
      'Tied-ridge basin micro-catchment water capture formulas',
      'Dough-stage moisture deficit leaf rolling index triggers',
      'Companion cowpea intercropping density recommendations'
    ],
    downloadsCount: 1640,
    supportedCrops: ['Grain Sorghum', 'Dryland Maize', 'Pearl Millet', 'Cowpea'],
    climateApplicability: 'Semi-arid steppes, highveld plateaus, and rainfall-uncertain subtropical corridors with annual precipitation < 550mm.',
    requiredInputFields: ['soil.moisturePct', 'weather.rainfallForecastSummary', 'weather.currentTempC', 'soil.organicCarbonPct'],
    outputSchemaDescription: 'Root water deficit index, optimal planting window status, and micro-catchment furrow spacing (cm).',
    validationMetadata: 'Field verified across Free State and Limpopo smallholder demonstration plots over 5 drought-prone seasons.'
  }
];
