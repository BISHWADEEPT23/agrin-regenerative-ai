/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Farm } from '../types/farm';

export const AGRICULTURAL_ZONES = [
  {
    id: 'zone-1-indo-gangetic',
    name: 'Zone 1: Indo-Gangetic Alluvial & Deltaic Basin',
    region: 'South Asia (India)',
    description: 'Intensive rice-wheat-pulse systems, monsoon-dependent hydrological cycles, and alluvial river floodplains.',
    targetCrops: ['Rice (Paddy)', 'Wheat', 'Chickpea', 'Mustard', 'Cotton']
  },
  {
    id: 'zone-2-cerrado',
    name: 'Zone 2: Cerrado & Subtropical Savanna Basin',
    region: 'South America (Brazil)',
    description: 'Deep oxisol and ultisol soils, high biomass cycling, integrated crop-livestock-forest systems and legume rotation.',
    targetCrops: ['Soybean', 'Maize (Safrinha)', 'Dry Beans', 'Cassava']
  },
  {
    id: 'zone-3-semi-arid-highveld',
    name: 'Zone 3: Semi-Arid Steppe & Nile Agro-Ecological Corridor',
    region: 'Africa & Near East (South Africa, Egypt, Ethiopia)',
    description: 'Water-limited grain sorghum, millet, tef, and drought-tolerant legumes with high focus on soil moisture conservation.',
    targetCrops: ['Grain Sorghum', 'Pearl Millet', 'Faba Bean', 'Tef & Pulses']
  }
];

export const DEMO_FARMS: Farm[] = [
  // ==========================================
  // ZONE 1: Indo-Gangetic Alluvial Plains (4 Farms)
  // ==========================================
  {
    // FARM 1: DEFAULT PRIMARY DEMO FARM
    id: 'FARM-IN-01',
    farmerName: 'Rameshwar Sen',
    zoneId: 'zone-1-indo-gangetic',
    zoneName: 'Indo-Gangetic Alluvial & Deltaic Basin',
    district: 'Bardhaman District',
    state: 'West Bengal',
    country: 'India',
    farmAreaHectares: 2.1,
    primaryCrop: 'Rice (Paddy)',
    cropVariety: 'Swarna Sub-1 (Flood-Tolerant Wet Season Variety)',
    cropStage: 'Vegetative (Active Tillering)',
    sowingDate: '2026-06-18',
    soilType: 'Alluvial Silty Clay Loam',
    soil: {
      ph: 6.4,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 215,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 26,
      phosphorusStatus: 'Good',
      potassiumKgHa: 195,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.68,
      organicCarbonStatus: 'Moderate',
      moisturePct: 64,
      moistureStatus: 'Adequate',
      soilHealthIndex: 78,
      recommendedActions: [
        'Apply neem-coated urea split dose during maximum tillering rather than blanket application.',
        'Incorporate azolla (bio-fertilizer) in flooded paddy inter-row spaces to fix atmospheric nitrogen.',
        'Retain rice stubble and apply microbial decomposer post-harvest to lift organic carbon above 0.8%.'
      ]
    },
    currentTempC: 29.4,
    currentHumidityPct: 78,
    rainfallForecastSummary: '18mm predicted over next 48 hours; light pre-monsoon showers',
    weather7Days: [
      {
        day: 'Today',
        date: 'Sep 26',
        condition: 'Humid Overcast',
        tempMax: 30,
        tempMin: 24,
        rainfallMm: 4,
        humidityPct: 78,
        windSpeedKmh: 12,
        agriculturalImplication: 'High humidity favors foliar moisture; check leaf tips for early bacterial streak.'
      },
      {
        day: 'Tomorrow',
        date: 'Sep 27',
        condition: 'Scattered Showers',
        tempMax: 29,
        tempMin: 23,
        rainfallMm: 14,
        humidityPct: 84,
        windSpeedKmh: 15,
        agriculturalImplication: 'Postpone fertilizer application until runoff danger subsides; keep bund outlets clear.'
      },
      {
        day: 'Sunday',
        date: 'Sep 28',
        condition: 'Partly Cloudy',
        tempMax: 31,
        tempMin: 24,
        rainfallMm: 2,
        humidityPct: 72,
        windSpeedKmh: 10,
        agriculturalImplication: 'Optimal soil moisture window for manual or mechanical weeding between rows.'
      },
      {
        day: 'Monday',
        date: 'Sep 29',
        condition: 'Sunny',
        tempMax: 32,
        tempMin: 25,
        rainfallMm: 0,
        humidityPct: 65,
        windSpeedKmh: 9,
        agriculturalImplication: 'Favorable photosynthetic window; standing water level can be maintained at 3-5 cm.'
      },
      {
        day: 'Tuesday',
        date: 'Sep 30',
        condition: 'Partly Cloudy',
        tempMax: 31,
        tempMin: 24,
        rainfallMm: 1,
        humidityPct: 69,
        windSpeedKmh: 11,
        agriculturalImplication: 'Good window for bio-pesticide scouting along field margins.'
      },
      {
        day: 'Wednesday',
        date: 'Oct 01',
        condition: 'Light Rain',
        tempMax: 29,
        tempMin: 23,
        rainfallMm: 6,
        humidityPct: 76,
        windSpeedKmh: 14,
        agriculturalImplication: 'Natural replenishment of irrigation requirement; shut off solar tubewell pump.'
      },
      {
        day: 'Thursday',
        date: 'Oct 02',
        condition: 'Sunny',
        tempMax: 32,
        tempMin: 24,
        rainfallMm: 0,
        humidityPct: 63,
        windSpeedKmh: 8,
        agriculturalImplication: 'Low fungal risk; soil aeration around root zone is healthy.'
      }
    ],
    satellite: {
      ndviCurrent: 0.72,
      ndviChange7d: 0.04,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1 (Sowing)', ndvi: 0.22, benchmark: 0.20 },
        { week: 'W3 (Emergence)', ndvi: 0.35, benchmark: 0.32 },
        { week: 'W6 (Tillering)', ndvi: 0.54, benchmark: 0.50 },
        { week: 'W9 (Active Canopy)', ndvi: 0.68, benchmark: 0.64 },
        { week: 'W12 (Current)', ndvi: 0.72, benchmark: 0.69 }
      ],
      fieldParcels: [
        { id: 'P-1A', zoneName: 'North Canal Parcel', ndvi: 0.75, moisture: '66% (Optimum)', stress: 'Normal' },
        { id: 'P-1B', zoneName: 'East Terrace Parcel', ndvi: 0.71, moisture: '62% (Optimum)', stress: 'Normal' },
        { id: 'P-1C', zoneName: 'South Lowland Basin', ndvi: 0.69, moisture: '68% (High)', stress: 'Watch' }
      ]
    },
    cropStressLevel: 'Low (Uniform canopy development)',
    diseaseRisk: 'Moderate',
    diseaseRiskDescription: 'Bacterial leaf blight potential due to high overnight humidity (78%) and standing water.',
    climateRisk: 'Low',
    climateRiskDescription: 'Normal monsoon trajectory; temperature within safe photosynthetic threshold.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 74,
    regenerativeExplanation: 'Solid organic matter cycling with azolla integration; water efficiency could improve via alternate wetting and drying (AWD).',
    regenerativeDimensions: {
      soilHealth: 78,
      waterEfficiency: 68,
      biodiversity: 72,
      inputEfficiency: 76,
      climateResilience: 75,
      carbonPractices: 77
    },
    regenerativeActions: [
      {
        title: 'Adopt Alternate Wetting & Drying (AWD)',
        dimension: 'Water Efficiency',
        impactScore: '+8 pts Water Score',
        description: 'Install perforated field tubes to monitor perched water table; reduce irrigation water input by 22% without yield penalty.',
        feasibility: 'Immediate'
      },
      {
        title: 'Leguminous Relay Cropping with Lathyrus / Lentil',
        dimension: 'Biodiversity & Carbon',
        impactScore: '+6 pts Carbon Score',
        description: 'Broadcast grass pea seed 10 days before paddy harvest into moist soil to build residual root biomass and fix soil nitrogen.',
        feasibility: 'Next Season'
      },
      {
        title: 'On-Farm Bio-Enriched Compost & Trichoderma',
        dimension: 'Soil Health & Inputs',
        impactScore: '+5 pts Soil Index',
        description: 'Introduce fungal biocontrol agent Trichoderma viride in organic compost to suppress soil-borne fungal pathogens naturally.',
        feasibility: 'Immediate'
      }
    ],
    todaysAdvisory: {
      headline: 'Maintain standing water at 4 cm; defer top-dressing until Tuesday',
      actionableStep: 'Inspect north-east field perimeter bunds for seepage; prepare for anticipated 14mm rain on Sep 27.',
      urgency: 'Attention Required',
      rationale: 'Synthetic model projects adequate soil moisture; nitrogen broadcast before heavy showers causes leaching losses.'
    }
  },

  {
    id: 'FARM-IN-02',
    farmerName: 'Sunita Devi',
    zoneId: 'zone-1-indo-gangetic',
    zoneName: 'Indo-Gangetic Alluvial & Deltaic Basin',
    district: 'Ludhiana District',
    state: 'Punjab',
    country: 'India',
    farmAreaHectares: 3.4,
    primaryCrop: 'Wheat (Rotational Mustard Border)',
    cropVariety: 'HD-3226 (Biofortified Rust-Resistant)',
    cropStage: 'Vegetative (Crown Root Initiation)',
    sowingDate: '2026-07-02',
    soilType: 'Loamy Sand Alluvium',
    soil: {
      ph: 7.8,
      phStatus: 'Slightly Alkaline',
      nitrogenKgHa: 170,
      nitrogenStatus: 'Low',
      phosphorusKgHa: 19,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 210,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.42,
      organicCarbonStatus: 'Low',
      moisturePct: 48,
      moistureStatus: 'Deficit',
      soilHealthIndex: 61,
      recommendedActions: [
        'Switch to Happy Seeder direct drilling to keep 100% surface paddy mulch in place.',
        'Apply gypsum along field borders to balance elevated soil sodicity and improve percolation.'
      ]
    },
    currentTempC: 31.8,
    currentHumidityPct: 54,
    rainfallForecastSummary: 'Dry spell expected; zero rainfall forecasted in upcoming 5 days',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 33, tempMin: 22, rainfallMm: 0, humidityPct: 52, windSpeedKmh: 14, agriculturalImplication: 'High evapotranspiration; irrigate crown roots within 48h.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Sunny', tempMax: 34, tempMin: 23, rainfallMm: 0, humidityPct: 48, windSpeedKmh: 12, agriculturalImplication: 'Surface crusting risk on light sandy soils.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Partly Cloudy', tempMax: 32, tempMin: 21, rainfallMm: 0, humidityPct: 56, windSpeedKmh: 10, agriculturalImplication: 'Mulched rows retain 40% more moisture.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 33, tempMin: 22, rainfallMm: 0, humidityPct: 50, windSpeedKmh: 11, agriculturalImplication: 'Ideal timing for foliar zinc sulfate spray.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 34, tempMin: 23, rainfallMm: 0, humidityPct: 49, windSpeedKmh: 13, agriculturalImplication: 'Low fungal risk.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Partly Cloudy', tempMax: 32, tempMin: 22, rainfallMm: 0, humidityPct: 53, windSpeedKmh: 12, agriculturalImplication: 'Consistent solar radiation favors root expansion.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 33, tempMin: 21, rainfallMm: 0, humidityPct: 47, windSpeedKmh: 10, agriculturalImplication: 'Plan scheduled micro-sprinkler cycle.' }
    ],
    satellite: {
      ndviCurrent: 0.61,
      ndviChange7d: -0.02,
      vegetationStatus: 'Moderate Canopy',
      cropStressLevel: 'Moderate (Water stress)',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.18, benchmark: 0.22 },
        { week: 'W4', ndvi: 0.38, benchmark: 0.42 },
        { week: 'W8', ndvi: 0.58, benchmark: 0.62 },
        { week: 'W12', ndvi: 0.61, benchmark: 0.67 }
      ],
      fieldParcels: [
        { id: 'L-1', zoneName: 'Roadside Tubewell Field', ndvi: 0.64, moisture: '51%', stress: 'Normal' },
        { id: 'L-2', zoneName: 'Sandy Ridge Field', ndvi: 0.57, moisture: '44%', stress: 'Alert' }
      ]
    },
    cropStressLevel: 'Moderate (Moisture deficit in Sandy Ridge zone)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Dry canopy suppresses foliar rust; minor aphid surveillance needed.',
    climateRisk: 'Moderate',
    climateRiskDescription: 'Elevated daytime temperatures accelerate soil surface drying.',
    overallFarmRisk: 'Moderate Risk',
    regenerativeScore: 66,
    regenerativeExplanation: 'Transitioning away from crop residue burning; needs deep organic manure addition to rebuild depleted soil carbon.',
    regenerativeDimensions: {
      soilHealth: 59,
      waterEfficiency: 63,
      biodiversity: 65,
      inputEfficiency: 68,
      climateResilience: 70,
      carbonPractices: 71
    },
    regenerativeActions: [
      {
        title: 'Zero-Tillage Straw Retention',
        dimension: 'Carbon Practices',
        impactScore: '+12 pts Carbon Score',
        description: 'Keep standing wheat stubble undisturbed to prevent moisture loss and build mycorrhizal fungi networks.',
        feasibility: 'Immediate'
      },
      {
        title: 'Precision Micro-Irrigation Line',
        dimension: 'Water Efficiency',
        impactScore: '+9 pts Water Score',
        description: 'Deploy solar drip line on sandy ridge to cut water withdrawal by 35%.',
        feasibility: 'Next Season'
      },
      {
        title: 'Mustard Companion Border Planting',
        dimension: 'Biodiversity',
        impactScore: '+7 pts Biodiversity',
        description: 'Sow brassica border rows to attract beneficial predatory wasps and hoverflies.',
        feasibility: 'Immediate'
      }
    ],
    todaysAdvisory: {
      headline: 'Schedule light irrigation cycle for Sandy Ridge parcel within 36 hours',
      actionableStep: 'Activate solar tubewell for 90 minutes; inspect soil moisture at 15 cm depth before next irrigation.',
      urgency: 'Attention Required',
      rationale: 'Crown roots require moist zone for secondary tiller development.'
    }
  },

  {
    id: 'FARM-IN-03',
    farmerName: 'Anand Rao',
    zoneId: 'zone-1-indo-gangetic',
    zoneName: 'Indo-Gangetic Alluvial & Deltaic Basin',
    district: 'Warangal District',
    state: 'Telangana',
    country: 'India',
    farmAreaHectares: 1.8,
    primaryCrop: 'Cotton (Intercropped with Pigeonpea)',
    cropVariety: 'Desi Herbaceum Hybrids (Sucking Pest Tolerant)',
    cropStage: 'Flowering & Early Boll Formation',
    sowingDate: '2026-06-25',
    soilType: 'Deep Black Cotton Vertisol',
    soil: {
      ph: 8.1,
      phStatus: 'Alkaline',
      nitrogenKgHa: 185,
      nitrogenStatus: 'Low',
      phosphorusKgHa: 14,
      phosphorusStatus: 'Low',
      potassiumKgHa: 260,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.51,
      organicCarbonStatus: 'Moderate',
      moisturePct: 58,
      moistureStatus: 'Adequate',
      soilHealthIndex: 65,
      recommendedActions: [
        'Apply PSB (Phosphorus Solubilizing Bacteria) bio-inoculant to unlock bound phosphorus in alkaline clay.',
        'Install yellow sticky traps and neem oil repellent for sucking pest suppression.'
      ]
    },
    currentTempC: 30.5,
    currentHumidityPct: 71,
    rainfallForecastSummary: 'Intermittent drizzles totaling 8mm across next 72 hours',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Partly Cloudy', tempMax: 31, tempMin: 23, rainfallMm: 2, humidityPct: 71, windSpeedKmh: 11, agriculturalImplication: 'High morning humidity encourages whitefly scouting.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Light Rain', tempMax: 29, tempMin: 22, rainfallMm: 6, humidityPct: 79, windSpeedKmh: 13, agriculturalImplication: 'Good moisture absorption in deep vertisols.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Partly Cloudy', tempMax: 30, tempMin: 23, rainfallMm: 0, humidityPct: 68, windSpeedKmh: 10, agriculturalImplication: 'Ideal leaf window for spray application of botanical extracts.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 32, tempMin: 24, rainfallMm: 0, humidityPct: 62, windSpeedKmh: 9, agriculturalImplication: 'Boll retention supported by high sunlight.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 32, tempMin: 23, rainfallMm: 0, humidityPct: 64, windSpeedKmh: 10, agriculturalImplication: 'Stable dry weather.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Partly Cloudy', tempMax: 31, tempMin: 23, rainfallMm: 1, humidityPct: 67, windSpeedKmh: 11, agriculturalImplication: 'Mild breeze keeps canopy dry.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 33, tempMin: 24, rainfallMm: 0, humidityPct: 60, windSpeedKmh: 8, agriculturalImplication: 'Safe boll opening conditions.' }
    ],
    satellite: {
      ndviCurrent: 0.68,
      ndviChange7d: 0.03,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.20, benchmark: 0.19 },
        { week: 'W4', ndvi: 0.36, benchmark: 0.35 },
        { week: 'W8', ndvi: 0.55, benchmark: 0.53 },
        { week: 'W12', ndvi: 0.68, benchmark: 0.65 }
      ],
      fieldParcels: [
        { id: 'W-01', zoneName: 'Main Vertisol Block', ndvi: 0.70, moisture: '60%', stress: 'Normal' },
        { id: 'W-02', zoneName: 'Intercrop Pigeonpea Row', ndvi: 0.65, moisture: '55%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Healthy boll retention)',
    diseaseRisk: 'Elevated',
    diseaseRiskDescription: 'Boll rot risk elevated due to warm humid spells coinciding with flower drop.',
    climateRisk: 'Low',
    climateRiskDescription: 'Vertisol moisture buffering provides 10-day buffer against dry spells.',
    overallFarmRisk: 'Moderate Risk',
    regenerativeScore: 71,
    regenerativeExplanation: 'Intercropped pigeonpea supplies biological nitrogen; pest management is shifting to botanical sprays.',
    regenerativeDimensions: {
      soilHealth: 66,
      waterEfficiency: 74,
      biodiversity: 76,
      inputEfficiency: 70,
      climateResilience: 73,
      carbonPractices: 67
    },
    regenerativeActions: [
      {
        title: 'Trap Cropping with Marigold & Castor',
        dimension: 'Biodiversity',
        impactScore: '+8 pts Pest Resilience',
        description: 'Plant borders of marigold and castor to divert American bollworm larvae away from cotton squares.',
        feasibility: 'Immediate'
      },
      {
        title: 'In-Situ Pigeonpea Leaf Litter Composting',
        dimension: 'Carbon Practices',
        impactScore: '+6 pts Carbon Index',
        description: 'Shred and incorporate fallen pigeonpea leaves into vertisol cracks to build humic substances.',
        feasibility: 'Next Season'
      },
      {
        title: 'Cow Dung-Urine Microbial Wash (Jeevamrutha)',
        dimension: 'Input Efficiency',
        impactScore: '+5 pts Input Score',
        description: 'Drench soil with fermented bio-stimulant to stimulate native earthworm populations in clay layers.',
        feasibility: 'Immediate'
      }
    ],
    todaysAdvisory: {
      headline: 'Deploy pheromone traps across cotton plots; scout pigeonpea flowers',
      actionableStep: 'Hang 5 pheromone traps per hectare to monitor adult bollworm flights after evening drizzle.',
      urgency: 'Routine',
      rationale: 'Proactive biological surveillance prevents economic threshold breaches without chemical sprays.'
    }
  },

  {
    id: 'FARM-IN-04',
    farmerName: 'Parvati Patel',
    zoneId: 'zone-1-indo-gangetic',
    zoneName: 'Indo-Gangetic Alluvial & Deltaic Basin',
    district: 'Junagadh District',
    state: 'Gujarat',
    country: 'India',
    farmAreaHectares: 2.5,
    primaryCrop: 'Groundnut (Peanut) & Sesame',
    cropVariety: 'GG-20 (High Oil Semi-Spreading)',
    cropStage: 'Pod Development & Pegging',
    sowingDate: '2026-06-15',
    soilType: 'Medium Calcareous Black Loam',
    soil: {
      ph: 7.4,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 230,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 31,
      phosphorusStatus: 'Good',
      potassiumKgHa: 240,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.82,
      organicCarbonStatus: 'Good',
      moisturePct: 61,
      moistureStatus: 'Adequate',
      soilHealthIndex: 85,
      recommendedActions: [
        'Apply gypsum broadcast at pegging stage to ensure high calcium availability for shell hardening.',
        'Maintain mulched cover on inter-row space using groundnut haulms and sesame stalks.'
      ]
    },
    currentTempC: 28.9,
    currentHumidityPct: 68,
    rainfallForecastSummary: 'Clear sunny sky; trace precipitation only',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 31, tempMin: 22, rainfallMm: 0, humidityPct: 65, windSpeedKmh: 13, agriculturalImplication: 'Good peg penetration into loose friable soil.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Partly Cloudy', tempMax: 30, tempMin: 21, rainfallMm: 0, humidityPct: 64, windSpeedKmh: 14, agriculturalImplication: 'Low risk of foliar tikka leaf spot under moderate humidity.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Sunny', tempMax: 31, tempMin: 22, rainfallMm: 0, humidityPct: 60, windSpeedKmh: 12, agriculturalImplication: 'Optimal photosynthetic day.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 32, tempMin: 23, rainfallMm: 0, humidityPct: 58, windSpeedKmh: 11, agriculturalImplication: 'High sunshine promotes oil accumulation.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Partly Cloudy', tempMax: 31, tempMin: 22, rainfallMm: 1, humidityPct: 63, windSpeedKmh: 10, agriculturalImplication: 'Comfortable microclimate.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Sunny', tempMax: 32, tempMin: 23, rainfallMm: 0, humidityPct: 61, windSpeedKmh: 12, agriculturalImplication: 'Check for white grub emergence.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 32, tempMin: 22, rainfallMm: 0, humidityPct: 59, windSpeedKmh: 11, agriculturalImplication: 'Consistent soil firmness.' }
    ],
    satellite: {
      ndviCurrent: 0.77,
      ndviChange7d: 0.02,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.24, benchmark: 0.22 },
        { week: 'W4', ndvi: 0.44, benchmark: 0.41 },
        { week: 'W8', ndvi: 0.69, benchmark: 0.66 },
        { week: 'W12', ndvi: 0.77, benchmark: 0.73 }
      ],
      fieldParcels: [
        { id: 'J-01', zoneName: 'Organic Groundnut Terraced Field', ndvi: 0.79, moisture: '63%', stress: 'Normal' },
        { id: 'J-02', zoneName: 'Sesame Border Ridge', ndvi: 0.74, moisture: '58%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Ideal pegging canopy)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Canopy is healthy and well-aerated; nil tikka disease detected.',
    climateRisk: 'Low',
    climateRiskDescription: 'Stable coastal breeze maintains balanced ambient temperatures.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 84,
    regenerativeExplanation: 'Exemplary regenerative farm using farmyard manure, border biodiversity, and biological seed treatment.',
    regenerativeDimensions: {
      soilHealth: 87,
      waterEfficiency: 82,
      biodiversity: 85,
      inputEfficiency: 86,
      climateResilience: 83,
      carbonPractices: 82
    },
    regenerativeActions: [
      {
        title: 'Maintain Gypsum Banding for Shell Formation',
        dimension: 'Soil Health',
        impactScore: '+4 pts Shell Quality',
        description: 'Provide 200 kg/ha calcium sulfate during peg entry to avoid empty pods (pops).',
        feasibility: 'Immediate'
      },
      {
        title: 'Vermicompost Tea Foliar Booster',
        dimension: 'Input Efficiency',
        impactScore: '+5 pts Nutrient Uptake',
        description: 'Spray aerated compost tea mixed with sea-weed extract to nourish developing pods.',
        feasibility: 'Immediate'
      },
      {
        title: 'Crop Rotation with Sorghum / Chickpea',
        dimension: 'Biodiversity',
        impactScore: '+6 pts Long-Term Health',
        description: 'Rotate with non-legume winter cereal to disrupt nematode cycles naturally.',
        feasibility: 'Next Season'
      }
    ],
    todaysAdvisory: {
      headline: 'Ensure soil around plant collar remains uncompacted during pegging',
      actionableStep: 'Light shallow hoeing near plant rows to ease underground peg penetration before soil dries.',
      urgency: 'Routine',
      rationale: 'Hard soil crust prevents pegs from penetrating down, reducing final pod count.'
    }
  },

  // ==========================================
  // ZONE 2: Cerrado & Subtropical Savanna (4 Farms)
  // ==========================================
  {
    id: 'FARM-BR-01',
    farmerName: 'Thiago Silva',
    zoneId: 'zone-2-cerrado',
    zoneName: 'Cerrado & Subtropical Savanna Basin',
    district: 'Sorriso',
    state: 'Mato Grosso',
    country: 'Brazil',
    farmAreaHectares: 4.8,
    primaryCrop: 'Soybean (Direct Seeded)',
    cropVariety: 'BRS 1003 IPRO (Low-Carbon Biological Inoculated)',
    cropStage: 'Reproductive (R3 - Early Pod Development)',
    sowingDate: '2026-06-20',
    soilType: 'Deep Rhodic Ferralsol (Red Latosol)',
    soil: {
      ph: 5.8,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 240,
      nitrogenStatus: 'High',
      phosphorusKgHa: 22,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 175,
      potassiumStatus: 'Moderate',
      organicCarbonPct: 0.74,
      organicCarbonStatus: 'Moderate',
      moisturePct: 67,
      moistureStatus: 'Adequate',
      soilHealthIndex: 81,
      recommendedActions: [
        'Co-inoculate Bradyrhizobium and Azospirillum to maximize symbiotic nitrogen fixation without synthetic urea.',
        'Deploy Brachiaria ruziziensis as cover crop in second-crop window (safrinha) to accumulate soil carbon.'
      ]
    },
    currentTempC: 31.2,
    currentHumidityPct: 75,
    rainfallForecastSummary: 'Afternoon convection showers; 22mm expected in 48 hours',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Partly Cloudy', tempMax: 32, tempMin: 22, rainfallMm: 4, humidityPct: 74, windSpeedKmh: 10, agriculturalImplication: 'High solar radiation drives fast biomass accumulation.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Scattered Showers', tempMax: 30, tempMin: 21, rainfallMm: 18, humidityPct: 82, windSpeedKmh: 16, agriculturalImplication: 'Heavy afternoon downpour; avoid heavy field sprayer compaction.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Light Rain', tempMax: 30, tempMin: 22, rainfallMm: 8, humidityPct: 79, windSpeedKmh: 12, agriculturalImplication: 'Moisture deepens into Cerrado subsoil latosol profile.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Partly Cloudy', tempMax: 31, tempMin: 23, rainfallMm: 2, humidityPct: 71, windSpeedKmh: 11, agriculturalImplication: 'Optimal pod elongation conditions.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 33, tempMin: 22, rainfallMm: 0, humidityPct: 66, windSpeedKmh: 9, agriculturalImplication: 'High photosynthetic index.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Partly Cloudy', tempMax: 32, tempMin: 23, rainfallMm: 3, humidityPct: 70, windSpeedKmh: 10, agriculturalImplication: 'Steady growth rhythm.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 33, tempMin: 23, rainfallMm: 0, humidityPct: 65, windSpeedKmh: 9, agriculturalImplication: 'Excellent canopy aeration.' }
    ],
    satellite: {
      ndviCurrent: 0.81,
      ndviChange7d: 0.05,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.22, benchmark: 0.21 },
        { week: 'W4', ndvi: 0.46, benchmark: 0.43 },
        { week: 'W8', ndvi: 0.72, benchmark: 0.69 },
        { week: 'W12', ndvi: 0.81, benchmark: 0.77 }
      ],
      fieldParcels: [
        { id: 'MT-01', zoneName: 'Plateau Direct Drill Block', ndvi: 0.83, moisture: '69%', stress: 'Normal' },
        { id: 'MT-02', zoneName: 'Riparian Buffer Contour', ndvi: 0.78, moisture: '65%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Dense uniform nodulation)',
    diseaseRisk: 'Elevated',
    diseaseRiskDescription: 'Asian soybean rust (Phakopsora pachyrhizi) alert triggered by 82% humidity and warm rains.',
    climateRisk: 'Low',
    climateRiskDescription: 'Regular convective rainfall pattern supports peak pod filling.',
    overallFarmRisk: 'Moderate Risk',
    regenerativeScore: 80,
    regenerativeExplanation: 'Strict zero-till practice with 100% biological nitrogen fixation; rust surveillance is current priority.',
    regenerativeDimensions: {
      soilHealth: 83,
      waterEfficiency: 81,
      biodiversity: 77,
      inputEfficiency: 84,
      climateResilience: 79,
      carbonPractices: 86
    },
    regenerativeActions: [
      {
        title: 'Preventive Biological Bio-fungicide Spray',
        dimension: 'Input Efficiency',
        impactScore: '+7 pts Disease Shield',
        description: 'Apply Bacillus subtilis bio-fungicide formulation before tomorrow afternoon downpour to coat lower leaves.',
        feasibility: 'Immediate'
      },
      {
        title: 'Inter-Row Brachiaria Cover Seeding',
        dimension: 'Carbon Practices',
        impactScore: '+8 pts Soil Carbon',
        description: 'Direct-seed tropical grass cover crop into standing soybean canopy to capture solar energy immediately post-harvest.',
        feasibility: 'Next Season'
      },
      {
        title: 'Beneficial Parasitoid Wasp Release (Trichogramma)',
        dimension: 'Biodiversity',
        impactScore: '+6 pts Biological Control',
        description: 'Release native parasitoid cards to manage velvetbean caterpillar without synthetic pyrethroids.',
        feasibility: 'Immediate'
      }
    ],
    todaysAdvisory: {
      headline: 'Inspect lower trifoliate leaves for Asian Rust pustules; apply bio-shield',
      actionableStep: 'Scout 20 plants across plateau parcel; prioritize bio-control spray prior to Friday showers.',
      urgency: 'Critical Window',
      rationale: 'Elevated relative humidity creates 6-hour continuous leaf wetness, optimal for fungal spore germination.'
    }
  },

  {
    id: 'FARM-BR-02',
    farmerName: 'Beatriz Costa',
    zoneId: 'zone-2-cerrado',
    zoneName: 'Cerrado & Subtropical Savanna Basin',
    district: 'Rio Verde',
    state: 'Goiás',
    country: 'Brazil',
    farmAreaHectares: 3.2,
    primaryCrop: 'Maize (Safrinha Intercropped with Brachiaria)',
    cropVariety: 'BRS 3046 (High Biomass Non-GMO)',
    cropStage: 'Silking & Tasseling',
    sowingDate: '2026-06-28',
    soilType: 'Dystrophic Dark Red Latosol',
    soil: {
      ph: 6.1,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 205,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 18,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 160,
      potassiumStatus: 'Moderate',
      organicCarbonPct: 0.65,
      organicCarbonStatus: 'Moderate',
      moisturePct: 59,
      moistureStatus: 'Adequate',
      soilHealthIndex: 73,
      recommendedActions: [
        'Apply silicate rock powder (remineralizer) to strengthen plant cuticle and supply micronutrients.',
        'Maintain grass root biomass to stimulate glomalin production in the soil.'
      ]
    },
    currentTempC: 30.1,
    currentHumidityPct: 69,
    rainfallForecastSummary: '12mm forecast over the next 3 days',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Partly Cloudy', tempMax: 31, tempMin: 20, rainfallMm: 1, humidityPct: 67, windSpeedKmh: 12, agriculturalImplication: 'Pollen shedding active in calm morning hours.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Light Rain', tempMax: 29, tempMin: 19, rainfallMm: 7, humidityPct: 75, windSpeedKmh: 14, agriculturalImplication: 'Gentle moisture promotes silk receptivity.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Scattered Showers', tempMax: 28, tempMin: 19, rainfallMm: 4, humidityPct: 78, windSpeedKmh: 11, agriculturalImplication: 'Intercropped grass absorbs residual moisture.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 31, tempMin: 21, rainfallMm: 0, humidityPct: 64, windSpeedKmh: 10, agriculturalImplication: 'Kernel formation proceeds smoothly.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 32, tempMin: 21, rainfallMm: 0, humidityPct: 61, windSpeedKmh: 9, agriculturalImplication: 'Low disease pressure.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Partly Cloudy', tempMax: 30, tempMin: 20, rainfallMm: 2, humidityPct: 66, windSpeedKmh: 11, agriculturalImplication: 'Steady grain development.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 31, tempMin: 20, rainfallMm: 0, humidityPct: 62, windSpeedKmh: 10, agriculturalImplication: 'Good root respiration.' }
    ],
    satellite: {
      ndviCurrent: 0.74,
      ndviChange7d: 0.02,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.21, benchmark: 0.20 },
        { week: 'W4', ndvi: 0.42, benchmark: 0.40 },
        { week: 'W8', ndvi: 0.67, benchmark: 0.64 },
        { week: 'W12', ndvi: 0.74, benchmark: 0.71 }
      ],
      fieldParcels: [
        { id: 'GO-01', zoneName: 'Contour Bunded Maize Area', ndvi: 0.76, moisture: '61%', stress: 'Normal' },
        { id: 'GO-02', zoneName: 'Grass Buffer Margin', ndvi: 0.72, moisture: '57%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Synchronized pollination)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Good aeration keeps cercospora leaf spot in check.',
    climateRisk: 'Low',
    climateRiskDescription: 'Late rain front extended safrinha moisture window.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 75,
    regenerativeExplanation: 'Effective crop-pasture integration with Brachiaria creating permanent root channels.',
    regenerativeDimensions: {
      soilHealth: 74,
      waterEfficiency: 76,
      biodiversity: 73,
      inputEfficiency: 75,
      climateResilience: 77,
      carbonPractices: 80
    },
    regenerativeActions: [
      {
        title: 'Local Agrominerals Application',
        dimension: 'Soil Health',
        impactScore: '+5 pts Soil Fertility',
        description: 'Apply crushed regional basalt fines to replenish potassium and magnesium sustainably.',
        feasibility: 'Next Season'
      },
      {
        title: 'Spodoptera Bio-Control with NPV Virus',
        dimension: 'Input Efficiency',
        impactScore: '+6 pts Toxin Elimination',
        description: 'Deploy Baculovirus spodoptera targeted strictly at fall armyworm without damaging natural predators.',
        feasibility: 'Immediate'
      },
      {
        title: 'Continuous Soil Living Root Maintenance',
        dimension: 'Carbon Practices',
        impactScore: '+7 pts Carbon Sequestration',
        description: 'Allow intercropped grass to grow after corn grain harvest to keep soil covered through dry winter.',
        feasibility: 'Next Season'
      }
    ],
    todaysAdvisory: {
      headline: 'Silking phase in progress; avoid machinery access during morning pollination',
      actionableStep: 'Keep spray tractors off rows between 08:00 and 11:00 AM to prevent knocking off viable pollen.',
      urgency: 'Routine',
      rationale: 'Corn pollen viability is highest in mid-morning and mechanical vibration can decrease seed set.'
    }
  },

  {
    id: 'FARM-BR-03',
    farmerName: 'Carlos Mendes',
    zoneId: 'zone-2-cerrado',
    zoneName: 'Cerrado & Subtropical Savanna Basin',
    district: 'Luis Eduardo Magalhaes',
    state: 'Bahia',
    country: 'Brazil',
    farmAreaHectares: 2.6,
    primaryCrop: 'Common Dry Beans (Feijao Carioca)',
    cropVariety: 'BRS Estilo (Upright Architecture)',
    cropStage: 'Flowering & Early Pod Setting',
    sowingDate: '2026-07-05',
    soilType: 'Sandy Loam Cerrado Oxisol',
    soil: {
      ph: 6.5,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 195,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 30,
      phosphorusStatus: 'Good',
      potassiumKgHa: 220,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.88,
      organicCarbonStatus: 'Good',
      moisturePct: 62,
      moistureStatus: 'Adequate',
      soilHealthIndex: 88,
      recommendedActions: [
        'Maintain heavy crop residue layer to buffer sandy soil against rapid solar drying.',
        'Use drip fertigation with bio-stimulants for uniform flower retention.'
      ]
    },
    currentTempC: 29.8,
    currentHumidityPct: 64,
    rainfallForecastSummary: '6mm showers expected within 72 hours',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 31, tempMin: 18, rainfallMm: 0, humidityPct: 61, windSpeedKmh: 14, agriculturalImplication: 'Good bee pollinator activity observed.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Partly Cloudy', tempMax: 30, tempMin: 19, rainfallMm: 1, humidityPct: 65, windSpeedKmh: 13, agriculturalImplication: 'Mild conditions preserve flower buds.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Light Rain', tempMax: 29, tempMin: 18, rainfallMm: 5, humidityPct: 72, windSpeedKmh: 12, agriculturalImplication: 'Moisture absorbed rapidly by organic mulch.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 30, tempMin: 18, rainfallMm: 0, humidityPct: 62, windSpeedKmh: 10, agriculturalImplication: 'Low anthracnose risk under rapid sun drying.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 31, tempMin: 19, rainfallMm: 0, humidityPct: 59, windSpeedKmh: 11, agriculturalImplication: 'Favorable pod growth.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Sunny', tempMax: 32, tempMin: 20, rainfallMm: 0, humidityPct: 58, windSpeedKmh: 12, agriculturalImplication: 'High sunshine.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Partly Cloudy', tempMax: 31, tempMin: 19, rainfallMm: 0, humidityPct: 61, windSpeedKmh: 10, agriculturalImplication: 'Stable conditions.' }
    ],
    satellite: {
      ndviCurrent: 0.79,
      ndviChange7d: 0.03,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.23, benchmark: 0.21 },
        { week: 'W4', ndvi: 0.45, benchmark: 0.42 },
        { week: 'W8', ndvi: 0.71, benchmark: 0.67 },
        { week: 'W12', ndvi: 0.79, benchmark: 0.74 }
      ],
      fieldParcels: [
        { id: 'BA-01', zoneName: 'Drip Mulched Bean Parcel', ndvi: 0.81, moisture: '64%', stress: 'Normal' },
        { id: 'BA-02', zoneName: 'Agroforestry Border', ndvi: 0.77, moisture: '60%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Strong pod formation)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Upright architecture allows air circulation, minimizing white mold (Sclerotinia).',
    climateRisk: 'Low',
    climateRiskDescription: 'Moderate night temperatures protect flower retention.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 86,
    regenerativeExplanation: 'High organic carbon built through 8 years of continuous cover cropping and agroforestry windbreaks.',
    regenerativeDimensions: {
      soilHealth: 90,
      waterEfficiency: 86,
      biodiversity: 84,
      inputEfficiency: 88,
      climateResilience: 85,
      carbonPractices: 87
    },
    regenerativeActions: [
      {
        title: 'Maintain Multi-Species Cover Residue',
        dimension: 'Carbon Practices',
        impactScore: '+5 pts Soil Moisture',
        description: 'Preserve rye and crotalaria mulch to maintain root zone temperature 4°C cooler than bare soil.',
        feasibility: 'Immediate'
      },
      {
        title: 'Biological Nodule Reinforcement with Molybdenum',
        dimension: 'Input Efficiency',
        impactScore: '+4 pts Nitrogen Fixation',
        description: 'Foliar application of trace molybdenum at flowering to activate nitrogenase enzyme in root nodules.',
        feasibility: 'Immediate'
      },
      {
        title: 'Native Stingless Bee Apiary Expansion',
        dimension: 'Biodiversity',
        impactScore: '+6 pts Pollination & Yield',
        description: 'Install 4 additional native stingless bee boxes along tree line to increase pod set count.',
        feasibility: 'Next Season'
      }
    ],
    todaysAdvisory: {
      headline: 'Optimal flowering window; verify soil moisture at 10 cm under mulch',
      actionableStep: 'Keep drip irrigation run at 40 minutes per day to avoid flower shedding during pod initiation.',
      urgency: 'Routine',
      rationale: 'Common bean is highly sensitive to water stress during the first 14 days of flowering.'
    }
  },

  {
    id: 'FARM-BR-04',
    farmerName: 'Luciana Ribeiro',
    zoneId: 'zone-2-cerrado',
    zoneName: 'Cerrado & Subtropical Savanna Basin',
    district: 'Montes Claros',
    state: 'Minas Gerais',
    country: 'Brazil',
    farmAreaHectares: 3.8,
    primaryCrop: 'Cassava & Intercropped Cowpea (Feijao-Caupi)',
    cropVariety: 'BRS Dourada (High Dry-Matter Vitamin A)',
    cropStage: 'Vegetative (Tuber Bulking Initiation)',
    sowingDate: '2026-05-10',
    soilType: 'Structured Red-Yellow Latosol',
    soil: {
      ph: 5.6,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 220,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 21,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 230,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.92,
      organicCarbonStatus: 'Good',
      moisturePct: 56,
      moistureStatus: 'Adequate',
      soilHealthIndex: 89,
      recommendedActions: [
        'Continue strip-intercropping with cowpea to feed soil microbes and protect soil from direct tropical sunlight.',
        'Use mycorrhizal fungal inoculants at planting to enhance root phosphorus uptake in low-P soils.'
      ]
    },
    currentTempC: 28.5,
    currentHumidityPct: 62,
    rainfallForecastSummary: 'Seasonal dry transition; 0mm forecasted for the upcoming week',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 30, tempMin: 17, rainfallMm: 0, humidityPct: 60, windSpeedKmh: 11, agriculturalImplication: 'High solar interception; cassava stores starch efficiently.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Sunny', tempMax: 30, tempMin: 18, rainfallMm: 0, humidityPct: 58, windSpeedKmh: 12, agriculturalImplication: 'Cowpea flowers attract beneficial pollinators.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Partly Cloudy', tempMax: 29, tempMin: 17, rainfallMm: 0, humidityPct: 63, windSpeedKmh: 10, agriculturalImplication: 'Low fungal risk.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 31, tempMin: 18, rainfallMm: 0, humidityPct: 57, windSpeedKmh: 9, agriculturalImplication: 'Ideal weather for organic compost tea application.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 31, tempMin: 18, rainfallMm: 0, humidityPct: 56, windSpeedKmh: 11, agriculturalImplication: 'Deep roots access deep soil water.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Sunny', tempMax: 32, tempMin: 19, rainfallMm: 0, humidityPct: 55, windSpeedKmh: 12, agriculturalImplication: 'Dry canopy halts bacterial blight spread.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 31, tempMin: 18, rainfallMm: 0, humidityPct: 58, windSpeedKmh: 10, agriculturalImplication: 'Predictable climate stability.' }
    ],
    satellite: {
      ndviCurrent: 0.83,
      ndviChange7d: 0.01,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.25, benchmark: 0.23 },
        { week: 'W4', ndvi: 0.48, benchmark: 0.45 },
        { week: 'W8', ndvi: 0.74, benchmark: 0.70 },
        { week: 'W12', ndvi: 0.83, benchmark: 0.79 }
      ],
      fieldParcels: [
        { id: 'MG-01', zoneName: 'Agroecological Cassava Strip', ndvi: 0.85, moisture: '58%', stress: 'Normal' },
        { id: 'MG-02', zoneName: 'Cowpea Living Mulch', ndvi: 0.81, moisture: '54%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Deep root tuber development)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Cassava mosaic virus resistant cultivar; zero whitefly vectors spotted.',
    climateRisk: 'Low',
    climateRiskDescription: 'Drought-hardy cassava possesses high water-use efficiency during seasonal dry-downs.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 89,
    regenerativeExplanation: 'Outstanding agroecological design with bio-diverse polyculture and closed-loop farm nutrient cycles.',
    regenerativeDimensions: {
      soilHealth: 92,
      waterEfficiency: 88,
      biodiversity: 91,
      inputEfficiency: 93,
      climateResilience: 90,
      carbonPractices: 87
    },
    regenerativeActions: [
      {
        title: 'Selective Pruning of Cowpea Biomass',
        dimension: 'Input Efficiency',
        impactScore: '+5 pts Nitrogen Release',
        description: 'Chop and drop cowpea foliage along cassava ridges to supply natural green manure.',
        feasibility: 'Immediate'
      },
      {
        title: 'Biochar Enriched Compost Trenching',
        dimension: 'Carbon Practices',
        impactScore: '+6 pts Carbon Sequestration',
        description: 'Bury pyrolyzed crop residue compost in contour trenches to retain water and mycorrhizae.',
        feasibility: 'Next Season'
      },
      {
        title: 'Perennial Agroforestry Hedgerows (Gliricidia)',
        dimension: 'Biodiversity',
        impactScore: '+6 pts Wind & Microclimate',
        description: 'Plant nitrogen-fixing tree corridors to reduce wind erosion and provide animal fodder.',
        feasibility: 'Long-Term'
      }
    ],
    todaysAdvisory: {
      headline: 'Tuber bulking is active; preserve inter-row living mulch intact',
      actionableStep: 'Avoid disturbing soil near cassava root crowns; ensure cowpea cover remains un-tilled.',
      urgency: 'Routine',
      rationale: 'Shallow weeding during tuber enlargement can damage developing storage roots.'
    }
  },

  // ==========================================
  // ZONE 3: Semi-Arid Steppe & Nile Corridor (4 Farms)
  // ==========================================
  {
    id: 'FARM-ZA-01',
    farmerName: 'Thabo Ndlovu',
    zoneId: 'zone-3-semi-arid-highveld',
    zoneName: 'Semi-Arid Steppe & Nile Agro-Ecological Corridor',
    district: 'Lejweleputswa District',
    state: 'Free State',
    country: 'South Africa',
    farmAreaHectares: 4.2,
    primaryCrop: 'Grain Sorghum (Drought-Resilient Bicolor)',
    cropVariety: 'PAN 8816 (Bird-Resistant Red Sorghum)',
    cropStage: 'Reproductive (Grain Filling / Dough Stage)',
    sowingDate: '2026-06-10',
    soilType: 'Sandy Clay Avalon Plinthic Soil',
    soil: {
      ph: 6.8,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 165,
      nitrogenStatus: 'Low',
      phosphorusKgHa: 17,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 190,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.54,
      organicCarbonStatus: 'Moderate',
      moisturePct: 44,
      moistureStatus: 'Deficit',
      soilHealthIndex: 72,
      recommendedActions: [
        'Construct tied-ridges (basin tillage) to capture 100% of episodic highveld storm runoff.',
        'Incorporate kraal manure in planting furrows to increase sandy soil water-holding capacity.'
      ]
    },
    currentTempC: 27.6,
    currentHumidityPct: 42,
    rainfallForecastSummary: 'Dry highveld conditions; 2mm isolated shower in 5 days',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 28, tempMin: 12, rainfallMm: 0, humidityPct: 40, windSpeedKmh: 18, agriculturalImplication: 'Dry air assists grain desiccation; zero fungal risk.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Sunny', tempMax: 29, tempMin: 13, rainfallMm: 0, humidityPct: 38, windSpeedKmh: 19, agriculturalImplication: 'High evapotranspiration; sorghum stomatal closure prevents wilting.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Partly Cloudy', tempMax: 27, tempMin: 12, rainfallMm: 0, humidityPct: 45, windSpeedKmh: 16, agriculturalImplication: 'Mild temperature window.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Partly Cloudy', tempMax: 26, tempMin: 11, rainfallMm: 1, humidityPct: 49, windSpeedKmh: 14, agriculturalImplication: 'Light moisture droplet capture.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Light Rain', tempMax: 25, tempMin: 11, rainfallMm: 2, humidityPct: 53, windSpeedKmh: 15, agriculturalImplication: 'Welcome soil surface cooling.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Sunny', tempMax: 27, tempMin: 12, rainfallMm: 0, humidityPct: 44, windSpeedKmh: 16, agriculturalImplication: 'Clear blue skies.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 28, tempMin: 13, rainfallMm: 0, humidityPct: 39, windSpeedKmh: 17, agriculturalImplication: 'Steady ripening pace.' }
    ],
    satellite: {
      ndviCurrent: 0.64,
      ndviChange7d: -0.01,
      vegetationStatus: 'Moderate Canopy',
      cropStressLevel: 'Low-Moderate',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.17, benchmark: 0.18 },
        { week: 'W4', ndvi: 0.35, benchmark: 0.36 },
        { week: 'W8', ndvi: 0.58, benchmark: 0.59 },
        { week: 'W12', ndvi: 0.64, benchmark: 0.65 }
      ],
      fieldParcels: [
        { id: 'ZA-01', zoneName: 'Highveld Plinthic Ridge', ndvi: 0.65, moisture: '45%', stress: 'Normal' },
        { id: 'ZA-02', zoneName: 'Contour Basined Plot', ndvi: 0.63, moisture: '43%', stress: 'Watch' }
      ]
    },
    cropStressLevel: 'Low-Moderate (Expected seasonal grain desiccation)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Low ambient humidity prevents ergot or head smut proliferation.',
    climateRisk: 'Moderate',
    climateRiskDescription: 'Low soil moisture (44%) manageable due to sorghum drought tolerance mechanism.',
    overallFarmRisk: 'Moderate Risk',
    regenerativeScore: 76,
    regenerativeExplanation: 'Excellent climate-adapted crop selection; basin tillage captures rare rain efficiently.',
    regenerativeDimensions: {
      soilHealth: 72,
      waterEfficiency: 82,
      biodiversity: 69,
      inputEfficiency: 78,
      climateResilience: 84,
      carbonPractices: 71
    },
    regenerativeActions: [
      {
        title: 'Maintain Contour Earth Bunds & Tied Ridges',
        dimension: 'Water Efficiency',
        impactScore: '+8 pts Water Harvesting',
        description: 'Reinforce small cross-ties in furrows to hold any sudden thunderstorm runoff in place.',
        feasibility: 'Immediate'
      },
      {
        title: 'Legume Intercropping with Cowpea',
        dimension: 'Soil Health & Nitrogen',
        impactScore: '+6 pts Soil Index',
        description: 'Broadcast cowpea at dough stage to create ground cover and produce forage after sorghum harvest.',
        feasibility: 'Next Season'
      },
      {
        title: 'Holistic Grazing Residue Management',
        dimension: 'Carbon Practices',
        impactScore: '+6 pts Organic Carbon',
        description: 'Use high-density short-duration cattle trampling to break down sorghum stalks into soil organic layer.',
        feasibility: 'Next Season'
      }
    ],
    todaysAdvisory: {
      headline: 'Grain panicles reaching hard dough; prepare bird repellent measures',
      actionableStep: 'Ensure bird scaring ribbons and reflective strips are taut across the upper panicle zone.',
      urgency: 'Routine',
      rationale: 'Quelea bird flocks scout maturing red sorghum panicles in early morning hours.'
    }
  },

  {
    id: 'FARM-ZA-02',
    farmerName: 'Nomvula Khumalo',
    zoneId: 'zone-3-semi-arid-highveld',
    zoneName: 'Semi-Arid Steppe & Nile Agro-Ecological Corridor',
    district: 'Vhembe District',
    state: 'Limpopo',
    country: 'South Africa',
    farmAreaHectares: 1.9,
    primaryCrop: 'Pearl Millet & Pigeon Pea Multi-Layer',
    cropVariety: 'Agrised Babala Pearl Millet',
    cropStage: 'Heading & Flowering',
    sowingDate: '2026-06-22',
    soilType: 'Red Sandy Loam Hutton Soil',
    soil: {
      ph: 6.9,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 190,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 20,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 215,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.69,
      organicCarbonStatus: 'Moderate',
      moisturePct: 49,
      moistureStatus: 'Adequate',
      soilHealthIndex: 82,
      recommendedActions: [
        'Utilize zai pits (planting basins enriched with compost) to concentrate runoff and nutrients directly at roots.',
        'Apply moringa leaf extract as natural plant growth booster at flowering.'
      ]
    },
    currentTempC: 30.2,
    currentHumidityPct: 48,
    rainfallForecastSummary: 'Scattered clouds; zero rain expected next 6 days',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 31, tempMin: 16, rainfallMm: 0, humidityPct: 47, windSpeedKmh: 13, agriculturalImplication: 'Vigorous flowering without rain wash.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Partly Cloudy', tempMax: 30, tempMin: 15, rainfallMm: 0, humidityPct: 50, windSpeedKmh: 14, agriculturalImplication: 'Good seed head formation.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Sunny', tempMax: 31, tempMin: 16, rainfallMm: 0, humidityPct: 46, windSpeedKmh: 12, agriculturalImplication: 'Millet thrives under intense sunlight.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 32, tempMin: 17, rainfallMm: 0, humidityPct: 42, windSpeedKmh: 11, agriculturalImplication: 'Dry canopy suppresses mildews.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Partly Cloudy', tempMax: 31, tempMin: 16, rainfallMm: 0, humidityPct: 45, windSpeedKmh: 13, agriculturalImplication: 'Comfortable diurnal cycle.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Sunny', tempMax: 32, tempMin: 17, rainfallMm: 0, humidityPct: 41, windSpeedKmh: 14, agriculturalImplication: 'High solar gain.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 33, tempMin: 18, rainfallMm: 0, humidityPct: 38, windSpeedKmh: 12, agriculturalImplication: 'Low humidity.' }
    ],
    satellite: {
      ndviCurrent: 0.70,
      ndviChange7d: 0.02,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.19, benchmark: 0.18 },
        { week: 'W4', ndvi: 0.39, benchmark: 0.37 },
        { week: 'W8', ndvi: 0.61, benchmark: 0.58 },
        { week: 'W12', ndvi: 0.70, benchmark: 0.66 }
      ],
      fieldParcels: [
        { id: 'LP-01', zoneName: 'Zai Pit Terraced Basin', ndvi: 0.72, moisture: '51%', stress: 'Normal' },
        { id: 'LP-02', zoneName: 'Pigeonpea Contour Line', ndvi: 0.68, moisture: '47%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Zai micro-basins retain moisture)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Downy mildew resistant millet strain; dry air limits sporulation.',
    climateRisk: 'Low',
    climateRiskDescription: 'Pearl millet represents peak agro-ecological fitness for semi-arid conditions.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 84,
    regenerativeExplanation: 'Community-praised regenerative farmer utilizing traditional Zai micro-catchments with deep bio-compost.',
    regenerativeDimensions: {
      soilHealth: 83,
      waterEfficiency: 89,
      biodiversity: 85,
      inputEfficiency: 87,
      climateResilience: 88,
      carbonPractices: 79
    },
    regenerativeActions: [
      {
        title: 'Mulch Planting Basins with Dry Grass',
        dimension: 'Water Efficiency',
        impactScore: '+5 pts Evaporation Barrier',
        description: 'Cover each Zai pit opening with dry veld grass to slash direct sun evaporation by half.',
        feasibility: 'Immediate'
      },
      {
        title: 'Moringa Leaf Extract Foliar Application',
        dimension: 'Input Efficiency',
        impactScore: '+6 pts Plant Vigor',
        description: 'Spray 1:30 diluted moringa leaf extract containing zeatin hormone to prolong photosynthetic canopy.',
        feasibility: 'Immediate'
      },
      {
        title: 'Indigenous Agroforestry Tree Integration (Faidherbia)',
        dimension: 'Biodiversity',
        impactScore: '+7 pts Long-Term Resilience',
        description: 'Plant Faidherbia albida (reverse phenology tree) that drops leaves during crop growing season, fertilizing soil.',
        feasibility: 'Long-Term'
      }
    ],
    todaysAdvisory: {
      headline: 'Pearl millet flowering underway; apply moringa foliar booster to heads',
      actionableStep: 'Spray diluted bio-extract in late afternoon (after 16:30) to maximize leaf absorption.',
      urgency: 'Routine',
      rationale: 'Foliar cytokinins enhance grain number per head during peak pollination.'
    }
  },

  {
    id: 'FARM-EG-01',
    farmerName: 'Tariq Mansour',
    zoneId: 'zone-3-semi-arid-highveld',
    zoneName: 'Semi-Arid Steppe & Nile Agro-Ecological Corridor',
    district: 'Kafr El Sheikh Governorate',
    state: 'Nile Delta',
    country: 'Egypt',
    farmAreaHectares: 2.2,
    primaryCrop: 'Broad Faba Bean (Giza 843 Rotational Cereal)',
    cropVariety: 'Giza 843 (Broomrape / Orobanche Tolerant)',
    cropStage: 'Vegetative & Early Podding',
    sowingDate: '2026-06-30',
    soilType: 'Heavy Alluvial Nile Delta Clay',
    soil: {
      ph: 7.9,
      phStatus: 'Slightly Alkaline',
      nitrogenKgHa: 200,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 24,
      phosphorusStatus: 'Good',
      potassiumKgHa: 270,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.62,
      organicCarbonStatus: 'Moderate',
      moisturePct: 58,
      moistureStatus: 'Adequate',
      soilHealthIndex: 76,
      recommendedActions: [
        'Apply elemental sulfur and organic compost to moderate root zone alkalinity and enhance trace metal availability.',
        'Utilize subsurface laser-leveled raised beds to curb canal water consumption and prevent salinization.'
      ]
    },
    currentTempC: 28.2,
    currentHumidityPct: 65,
    rainfallForecastSummary: '0mm rainfall; completely reliant on scheduled canal rotational turn',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Sunny', tempMax: 29, tempMin: 20, rainfallMm: 0, humidityPct: 64, windSpeedKmh: 15, agriculturalImplication: 'Mediterranean breeze moderates delta heat.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Sunny', tempMax: 30, tempMin: 21, rainfallMm: 0, humidityPct: 62, windSpeedKmh: 14, agriculturalImplication: 'Laser beds maintain uniform root irrigation.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Partly Cloudy', tempMax: 28, tempMin: 19, rainfallMm: 0, humidityPct: 68, windSpeedKmh: 16, agriculturalImplication: 'Morning dew supplies canopy moisture.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 29, tempMin: 20, rainfallMm: 0, humidityPct: 63, windSpeedKmh: 13, agriculturalImplication: 'Stable sunlight.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 30, tempMin: 21, rainfallMm: 0, humidityPct: 60, windSpeedKmh: 14, agriculturalImplication: 'High photosynthesis.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Partly Cloudy', tempMax: 29, tempMin: 20, rainfallMm: 0, humidityPct: 65, windSpeedKmh: 15, agriculturalImplication: 'Canal delivery window opens.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 30, tempMin: 21, rainfallMm: 0, humidityPct: 61, windSpeedKmh: 13, agriculturalImplication: 'Safe raised-bed drainage.' }
    ],
    satellite: {
      ndviCurrent: 0.73,
      ndviChange7d: 0.03,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.20, benchmark: 0.20 },
        { week: 'W4', ndvi: 0.41, benchmark: 0.40 },
        { week: 'W8', ndvi: 0.65, benchmark: 0.63 },
        { week: 'W12', ndvi: 0.73, benchmark: 0.70 }
      ],
      fieldParcels: [
        { id: 'EG-01', zoneName: 'Laser Raised Bed Field', ndvi: 0.75, moisture: '60%', stress: 'Normal' },
        { id: 'EG-02', zoneName: 'Canal Tail Drainage Strip', ndvi: 0.71, moisture: '56%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Good nitrogen nodule clusters)',
    diseaseRisk: 'Moderate',
    diseaseRiskDescription: 'Chocolate spot (Botrytis fabae) alert triggered by dense canopy and coastal humidity.',
    climateRisk: 'Low',
    climateRiskDescription: 'Delta canal rotation verified; water supply secure for upcoming 10-day cycle.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 78,
    regenerativeExplanation: 'Adoption of laser land leveling and leguminous rotation cut irrigation water waste by 30%.',
    regenerativeDimensions: {
      soilHealth: 77,
      waterEfficiency: 85,
      biodiversity: 74,
      inputEfficiency: 81,
      climateResilience: 76,
      carbonPractices: 75
    },
    regenerativeActions: [
      {
        title: 'Laser Raised Bed Precision Delivery',
        dimension: 'Water Efficiency',
        impactScore: '+7 pts Water Savings',
        description: 'Irrigate only furrows between raised faba beds; keeps plant collars dry to deter fungal collar rot.',
        feasibility: 'Immediate'
      },
      {
        title: 'Biological Suppression of Broomrape Weed',
        dimension: 'Input Efficiency',
        impactScore: '+6 pts Weed Suppression',
        description: 'Plant trap crops of fenugreek around borders to trigger suicidal germination of Orobanche seeds.',
        feasibility: 'Next Season'
      },
      {
        title: 'Humic Acid Soil Flush via Drip/Furrow',
        dimension: 'Soil Health',
        impactScore: '+5 pts Nutrient Availability',
        description: 'Inject liquid humates into canal water stream to liberate tied-up phosphorus and iron in calcareous clay.',
        feasibility: 'Immediate'
      }
    ],
    todaysAdvisory: {
      headline: 'Next canal water allocation arrives Wednesday; clear field drainage ditches',
      actionableStep: 'Ensure tail-end drainage ditches are cleared of reed debris to prevent salt accumulation.',
      urgency: 'Attention Required',
      rationale: 'Stagnant irrigation water in delta clay raises soil salinity and damages faba bean rhizobia.'
    }
  },

  {
    id: 'FARM-ET-01',
    farmerName: 'Alemayehu Tadesse',
    zoneId: 'zone-3-semi-arid-highveld',
    zoneName: 'Semi-Arid Steppe & Nile Agro-Ecological Corridor',
    district: 'East Shewa Zone',
    state: 'Oromia',
    country: 'Ethiopia',
    farmAreaHectares: 1.7,
    primaryCrop: 'Tef (Eragrostis tef) & Intercropped Chickpea',
    cropVariety: 'Quncho DZ-Cr-387 (High Yield White Tef)',
    cropStage: 'Vegetative (Active Tillering)',
    sowingDate: '2026-07-08',
    soilType: 'Highland Vertisol & Eutric Nitisol',
    soil: {
      ph: 6.3,
      phStatus: 'Optimal / Neutral',
      nitrogenKgHa: 195,
      nitrogenStatus: 'Moderate',
      phosphorusKgHa: 16,
      phosphorusStatus: 'Moderate',
      potassiumKgHa: 205,
      potassiumStatus: 'Good',
      organicCarbonPct: 0.77,
      organicCarbonStatus: 'Moderate',
      moisturePct: 63,
      moistureStatus: 'Adequate',
      soilHealthIndex: 82,
      recommendedActions: [
        'Utilize broad-bed and furrow (BBF) systems on highland vertisols to evacuate excess water during torrential showers.',
        'Inoculate chickpea seed with Mesorhizobium ciceri before planting into tef stubble.'
      ]
    },
    currentTempC: 24.8,
    currentHumidityPct: 68,
    rainfallForecastSummary: '16mm rainfall expected over the next 48 hours; mild highland showers',
    weather7Days: [
      { day: 'Today', date: 'Sep 26', condition: 'Partly Cloudy', tempMax: 25, tempMin: 13, rainfallMm: 4, humidityPct: 66, windSpeedKmh: 10, agriculturalImplication: 'Gentle rain encourages tef tillering.' },
      { day: 'Tomorrow', date: 'Sep 27', condition: 'Light Rain', tempMax: 24, tempMin: 12, rainfallMm: 12, humidityPct: 74, windSpeedKmh: 13, agriculturalImplication: 'Broad-bed furrows safely drain excess runoff.' },
      { day: 'Sunday', date: 'Sep 28', condition: 'Partly Cloudy', tempMax: 25, tempMin: 13, rainfallMm: 2, humidityPct: 69, windSpeedKmh: 11, agriculturalImplication: 'Cool highland air prevents heat stress.' },
      { day: 'Monday', date: 'Sep 29', condition: 'Sunny', tempMax: 26, tempMin: 13, rainfallMm: 0, humidityPct: 62, windSpeedKmh: 9, agriculturalImplication: 'High solar radiation at 1800m altitude.' },
      { day: 'Tuesday', date: 'Sep 30', condition: 'Sunny', tempMax: 26, tempMin: 14, rainfallMm: 0, humidityPct: 61, windSpeedKmh: 10, agriculturalImplication: 'Optimal root tillering.' },
      { day: 'Wednesday', date: 'Oct 01', condition: 'Partly Cloudy', tempMax: 25, tempMin: 13, rainfallMm: 3, humidityPct: 67, windSpeedKmh: 11, agriculturalImplication: 'Mild humidity.' },
      { day: 'Thursday', date: 'Oct 02', condition: 'Sunny', tempMax: 26, tempMin: 13, rainfallMm: 0, humidityPct: 60, windSpeedKmh: 9, agriculturalImplication: 'Clear sunny sky.' }
    ],
    satellite: {
      ndviCurrent: 0.75,
      ndviChange7d: 0.04,
      vegetationStatus: 'Vigorous Vegetative',
      cropStressLevel: 'Low',
      historicalNdvi: [
        { week: 'W1', ndvi: 0.22, benchmark: 0.21 },
        { week: 'W4', ndvi: 0.44, benchmark: 0.42 },
        { week: 'W8', ndvi: 0.66, benchmark: 0.63 },
        { week: 'W12', ndvi: 0.75, benchmark: 0.71 }
      ],
      fieldParcels: [
        { id: 'ET-01', zoneName: 'Highland Vertisol BBF Plot', ndvi: 0.77, moisture: '65%', stress: 'Normal' },
        { id: 'ET-02', zoneName: 'Chickpea Relay Border', ndvi: 0.73, moisture: '61%', stress: 'Normal' }
      ]
    },
    cropStressLevel: 'Low (Vigorous tillering and stand establishment)',
    diseaseRisk: 'Low',
    diseaseRiskDescription: 'Tef rust (Uromyces eragrostidis) incidence low at current moderate temperatures.',
    climateRisk: 'Low',
    climateRiskDescription: 'Highland precipitation within optimal agronomic window for cereal development.',
    overallFarmRisk: 'Low Risk',
    regenerativeScore: 82,
    regenerativeExplanation: 'Excellent adoption of Broad Bed Furrows to handle vertisol waterlogging, combined with bio-diverse pulse relay.',
    regenerativeDimensions: {
      soilHealth: 84,
      waterEfficiency: 83,
      biodiversity: 86,
      inputEfficiency: 82,
      climateResilience: 81,
      carbonPractices: 79
    },
    regenerativeActions: [
      {
        title: 'Check Drainage Furrows Ahead of 12mm Rainfall',
        dimension: 'Water Efficiency',
        impactScore: '+5 pts Water Regulation',
        description: 'Clear furrows between raised tef beds to avoid temporary anaerobic root suffocation.',
        feasibility: 'Immediate'
      },
      {
        title: 'Chickpea Relay Broadcast at Grain Filling',
        dimension: 'Biodiversity & Nitrogen',
        impactScore: '+7 pts Residual Fertility',
        description: 'Broadcast inoculated chickpea seeds directly into moist tef stand 15 days before harvest.',
        feasibility: 'Next Season'
      },
      {
        title: 'Agroforestry Acacia albida Parklands Protection',
        dimension: 'Climate Resilience',
        impactScore: '+6 pts Organic Carbon',
        description: 'Maintain scattered native acacia trees across fields to improve nitrogen mineralization in topsoil.',
        feasibility: 'Long-Term'
      }
    ],
    todaysAdvisory: {
      headline: 'Inspect vertisol drainage furrows before Friday afternoon showers',
      actionableStep: 'Walk field boundaries to confirm excess runoff flows smoothly toward community grassed waterway.',
      urgency: 'Attention Required',
      rationale: 'Vertisols swell rapidly when wet; unguided ponding depresses tef seedling root development.'
    }
  }
];

export const DEFAULT_FARM: Farm = DEMO_FARMS[0];
