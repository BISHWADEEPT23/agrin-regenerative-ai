/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Farm, AgriculturalZoneId, RegenerativeDimensions } from '../types/farm';
import {
  SoilIntelligence,
  SoilStatusCategory,
  SoilActionWithWhy,
  WeatherIntelligence,
  WeatherRiskLevel,
  SatelliteIntelligence,
  VegetationStatusCategory,
  FarmRiskIntelligence,
  FarmRiskClassification,
  WeakDimension,
  RegenerativeActionWithWhy,
  RegenerativeIntelligence,
  PriorityTodayAdvisory,
  TodaysFarmIntelligence,
  FullFarmIntelligence,
  RegionalMacroIntelligence,
} from '../types/intelligence';

/**
 * SOIL INTELLIGENCE ENGINE
 * Analyzes: pH, Nitrogen, Phosphorus, Potassium, Organic Carbon, Volumetric Moisture
 */
export function analyzeSoil(farm: Farm): SoilIntelligence {
  const { soil } = farm;

  // 1. Deterministic Soil Health Score calculation (0-100)
  // Penalties from optimal benchmarks:
  // pH optimal is 6.5 - 7.2. Deviation reduces score.
  const phDeviation = Math.abs(soil.ph - 6.8);
  const phScore = Math.max(30, Math.min(100, Math.round(100 - phDeviation * 25)));

  // Organic carbon: optimal >= 0.85%
  const ocScore = Math.max(30, Math.min(100, Math.round((soil.organicCarbonPct / 0.9) * 100)));

  // Nitrogen score
  const nScore = soil.nitrogenStatus === 'High' ? 95 : soil.nitrogenStatus === 'Good' ? 90 : soil.nitrogenStatus === 'Moderate' ? 70 : 45;

  // Phosphorus score
  const pScore = soil.phosphorusStatus === 'High' ? 95 : soil.phosphorusStatus === 'Good' ? 90 : soil.phosphorusStatus === 'Moderate' ? 72 : 45;

  // Potassium score
  const kScore = soil.potassiumStatus === 'High' ? 95 : soil.potassiumStatus === 'Good' ? 90 : soil.potassiumStatus === 'Moderate' ? 74 : 45;

  // Moisture score: Adequate is best
  const mScore = soil.moistureStatus === 'Adequate' ? 92 : soil.moistureStatus === 'Surplus' ? 70 : soil.moistureStatus === 'Deficit' ? 52 : 40;

  // Composite weighted score
  const computedScore = Math.round(
    phScore * 0.15 + ocScore * 0.25 + nScore * 0.20 + pScore * 0.15 + kScore * 0.15 + mScore * 0.10
  );
  const soilHealthScore = Math.min(100, Math.max(35, computedScore));

  // 2. Soil Status Classification
  let soilStatus: SoilStatusCategory;
  if (soilHealthScore >= 80) {
    soilStatus = 'Healthy';
  } else if (soilHealthScore >= 66) {
    soilStatus = 'Monitor';
  } else if (soilHealthScore >= 52) {
    soilStatus = 'Needs Attention';
  } else {
    soilStatus = 'High Concern';
  }

  // 3. Key Observations (Max 3, deterministic from data)
  const keyObservations: string[] = [];

  if (soil.organicCarbonPct < 0.65) {
    keyObservations.push(
      `Organic carbon is low at ${soil.organicCarbonPct}% (below preferred demonstration benchmark of >0.80%).`
    );
  } else {
    keyObservations.push(
      `Organic carbon is favorable at ${soil.organicCarbonPct}%, maintaining biological microbial activity.`
    );
  }

  if (soil.ph < 6.0) {
    keyObservations.push(
      `Soil reaction is acidic (pH ${soil.ph}), which may restrict phosphorus bioavailability.`
    );
  } else if (soil.ph > 7.5) {
    keyObservations.push(
      `Soil reaction is alkaline (pH ${soil.ph}), requiring micronutrient monitoring (zinc, iron).`
    );
  } else {
    keyObservations.push(
      `Soil reaction is within the optimal neutral zone (pH ${soil.ph}) for ${farm.primaryCrop}.`
    );
  }

  if (soil.moistureStatus === 'Deficit') {
    keyObservations.push(
      `Volumetric soil moisture is in deficit (${soil.moisturePct}%), increasing root transpiration stress.`
    );
  } else if (soil.nitrogenStatus === 'Low') {
    keyObservations.push(
      `Available nitrogen is low (${soil.nitrogenKgHa} kg/ha), limiting vigorous canopy vegetative tillering.`
    );
  } else {
    keyObservations.push(
      `Macronutrient status is balanced with potassium at ${soil.potassiumKgHa} kg/ha (${soil.potassiumStatus}).`
    );
  }

  // 4. Recommended Actions (Max 3, deterministic with "why")
  const recommendedActions: SoilActionWithWhy[] = [];

  if (soil.organicCarbonPct < 0.75) {
    recommendedActions.push({
      action: 'In-situ crop residue retention and organic compost incorporation',
      why: `Current organic carbon is ${soil.organicCarbonPct}%. Stubble retention elevates humic substances and microbial water retention without chemical additives.`,
      urgency: 'Next Cycle',
    });
  } else {
    recommendedActions.push({
      action: 'Maintain living root rhizosphere with inter-row cover cropping',
      why: 'Preserves the established 0.8%+ organic carbon equilibrium and feeds mycorrhizal networks continuously.',
      urgency: 'Maintenance',
    });
  }

  if (soil.ph > 7.5) {
    recommendedActions.push({
      action: 'Apply agricultural gypsum or bio-sulfur with PSB inoculants',
      why: `High pH (${soil.ph}) immobilizes free phosphate ions. PSB bacteria solubilize bound tricalcium phosphate for ${farm.primaryCrop} root hairs.`,
      urgency: 'Immediate',
    });
  } else if (soil.ph < 6.0) {
    recommendedActions.push({
      action: 'Incorporate agricultural limestone or crushed silicate agrominerals',
      why: `Slight acidity (pH ${soil.ph}) increases aluminum saturation risk. Agrominerals neutralize active hydrogen ions and replenish exchangeable calcium.`,
      urgency: 'Next Cycle',
    });
  } else {
    recommendedActions.push({
      action: 'Apply split bio-stimulant or fermented organic vermiwash',
      why: 'Neutral pH is primed for rapid nutrient absorption; bio-stimulants enhance micronutrient mobility.',
      urgency: 'Immediate',
    });
  }

  if (soil.moistureStatus === 'Deficit') {
    recommendedActions.push({
      action: 'Deploy organic mulch layer (straw/leaves) over plant rows',
      why: `Soil moisture is at ${soil.moisturePct}%. A 5 cm mulch blanket curbs direct soil evaporation by up to 40% under current daytime temperatures.`,
      urgency: 'Immediate',
    });
  } else {
    recommendedActions.push({
      action: 'Deploy targeted bio-fertilizer split dosing (Azotobacter / Rhizobia)',
      why: 'Maximizes nutrient-use efficiency and avoids fertilizer run-off during upcoming rainfall windows.',
      urgency: 'Maintenance',
    });
  }

  return {
    soilHealthScore,
    soilStatus,
    keyObservations: keyObservations.slice(0, 3),
    recommendedActions: recommendedActions.slice(0, 3),
  };
}

/**
 * WEATHER INTELLIGENCE ENGINE
 * Analyzes: Temperature, Humidity, Rainfall Forecast, Crop, Crop Stage
 */
export function analyzeWeather(farm: Farm): WeatherIntelligence {
  const currentTemp = farm.currentTempC;
  const currentHumidity = farm.currentHumidityPct;
  const next48hRainMm = farm.weather7Days.slice(0, 2).reduce((sum, d) => sum + d.rainfallMm, 0);

  // 1. Weather Risk Level
  let weatherRisk: WeatherRiskLevel = 'Low';
  const riskDrivers: string[] = [];

  if (next48hRainMm >= 15) {
    weatherRisk = 'High';
    riskDrivers.push(`Heavy rainfall exposure (${next48hRainMm}mm in 48h)`);
  } else if (next48hRainMm >= 6) {
    weatherRisk = 'Moderate';
    riskDrivers.push(`Moderate rainfall expected (${next48hRainMm}mm)`);
  }

  if (currentHumidity >= 75 && currentTemp >= 27) {
    if (weatherRisk === 'Low') weatherRisk = 'Moderate';
    riskDrivers.push('Warm-humid canopy conditions favorable for fungal sporulation');
  }

  if (currentTemp >= 33) {
    if (weatherRisk === 'Low') weatherRisk = 'Moderate';
    riskDrivers.push(`Elevated ambient daytime temperature (${currentTemp}°C) inducing heat stress`);
  }

  // 2. Agricultural Implications
  const agriculturalImplications: string[] = [];
  if (next48hRainMm >= 10) {
    agriculturalImplications.push('High rainfall exposure: Halt irrigation and clear field drainage bunds to avoid root waterlogging.');
  } else if (next48hRainMm === 0 && farm.soil.moisturePct < 52) {
    agriculturalImplications.push('Irrigation opportunity: Dry atmospheric conditions make scheduled furrow or drip irrigation critical.');
  } else {
    agriculturalImplications.push('Optimal photosynthetic window: Mild cloud cover and balanced soil hydration support steady vegetative development.');
  }

  if (currentHumidity >= 75) {
    agriculturalImplications.push('Fungal-favourable conditions: High relative humidity creates prolonged leaf wetness suitable for foliar blight or rust.');
  } else {
    agriculturalImplications.push('Dry canopy aeration: Low humidity suppresses airborne spore germination across plant foliage.');
  }

  if (currentTemp >= 32) {
    agriculturalImplications.push(`Heat stress risk: Midday temperatures (${currentTemp}°C) increase crop transpiration demand; schedule field work for morning.`);
  }

  // 3. Recommended Action with Why
  let recommendedAction = '';
  let why = '';

  if (next48hRainMm >= 10 && farm.soil.moisturePct >= 58) {
    recommendedAction = 'Postpone any planned irrigation and inspect perimeter drainage channels.';
    why = `Rainfall forecast is ${next48hRainMm}mm across the next 48h and soil moisture is already adequate (${farm.soil.moisturePct}%). Additional watering risks root suffocation and fertilizer leaching.`;
  } else if (farm.soil.moisturePct < 50 && next48hRainMm < 3) {
    recommendedAction = 'Execute light targeted irrigation in early morning or late afternoon.';
    why = `Current soil moisture is in deficit (${farm.soil.moisturePct}%) and rainfall forecast is negligible (${next48hRainMm}mm). Early application avoids solar evaporative losses.`;
  } else if (currentHumidity >= 75) {
    recommendedAction = 'Scout lower leaf canopy for early lesion symptoms; prepare preventive biological foliar spray.';
    why = `Relative humidity of ${currentHumidity}% and ambient temperature of ${currentTemp}°C create a microclimate ideal for foliar fungal pathogens.`;
  } else {
    recommendedAction = 'Maintain standard field operations; optimal weather window for manual weeding and mulching.';
    why = 'Atmospheric conditions and soil moisture equilibrium are stable with low immediate climate risk.';
  }

  return {
    weatherRisk,
    agriculturalImplications,
    recommendedAction,
    why,
  };
}

/**
 * SATELLITE INTELLIGENCE ENGINE
 * Analyzes: NDVI, vegetation condition, crop stress
 */
export function analyzeSatellite(farm: Farm): SatelliteIntelligence {
  const ndvi = farm.satellite.ndviCurrent;
  const stressString = (farm.satellite.cropStressLevel || '').toLowerCase();

  // 1. Vegetation Status Classification
  let vegetationStatus: VegetationStatusCategory;
  if (ndvi >= 0.70 && (stressString.includes('low') || !stressString.includes('alert'))) {
    vegetationStatus = 'Healthy';
  } else if (ndvi < 0.62 || stressString.includes('alert') || stressString.includes('water stress') || stressString.includes('moderate')) {
    vegetationStatus = 'Stressed';
  } else {
    vegetationStatus = 'Monitor';
  }

  // 2. Satellite Observation (Notice: explicitly stating NDVI alone does not diagnose cause)
  let satelliteObservation = '';
  if (vegetationStatus === 'Healthy') {
    satelliteObservation = `High canopy reflectance (NDVI ${ndvi}) indicates uniform chlorophyll absorption and dense vegetative cover across ${farm.farmerName}'s holding.`;
  } else if (vegetationStatus === 'Stressed') {
    satelliteObservation = `Sub-field spectral anomalies detected (NDVI ${ndvi}) with elevated localized stress. Note: Satellite NDVI indicates canopy vigor reduction but cannot diagnose the specific root cause alone.`;
  } else {
    satelliteObservation = `Moderate vegetative index (NDVI ${ndvi}) with minor parcel variance. Stand development is tracking within standard seasonal thresholds.`;
  }

  // 3. Recommended Field Check
  let recommendedFieldCheck = '';
  let why = '';

  if (vegetationStatus === 'Stressed') {
    recommendedFieldCheck = 'Inspect lower-performing field parcels directly for soil moisture deficit, localized compaction, or early sucking pests.';
    why = 'Multi-spectral satellite data detects early photosynthetic reduction before visual leaf necrosis is noticeable to the naked eye.';
  } else if (vegetationStatus === 'Monitor') {
    recommendedFieldCheck = 'Conduct a random transect walk across field boundaries to check crop collar aeration and weed density.';
    why = 'Verifies whether slight NDVI deviations correspond to uneven germination, shading, or soil texture boundaries.';
  } else {
    recommendedFieldCheck = 'Routine monitoring along irrigation bunds; no urgent localized field intervention indicated by satellite overpass.';
    why = 'Reflectance indices across all parcels confirm uniform photosynthetic vigor matching the crop stage.';
  }

  return {
    vegetationStatus,
    satelliteObservation,
    recommendedFieldCheck,
    why,
    ndvi,
    cropStress: farm.satellite.cropStressLevel,
  };
}

/**
 * FARM RISK ENGINE
 * Combines: Soil Condition + Weather Risk + Vegetation Stress + Disease Risk
 * Score: 0 - 100
 * Classification: 0-29 LOW, 30-59 MODERATE, 60-79 HIGH, 80-100 CRITICAL
 */
export function calculateFarmRisk(
  farm: Farm,
  soilIntel: SoilIntelligence,
  weatherIntel: WeatherIntelligence,
  satIntel: SatelliteIntelligence
): FarmRiskIntelligence {
  const drivers: string[] = [];

  // Soil penalty: 0 to 25 pts
  let soilPenalty = 0;
  if (soilIntel.soilStatus === 'High Concern') {
    soilPenalty = 24;
    drivers.push(`Soil health in critical range (${soilIntel.soilHealthScore}/100)`);
  } else if (soilIntel.soilStatus === 'Needs Attention') {
    soilPenalty = 18;
    drivers.push(`Soil condition needs attention (${soilIntel.soilHealthScore}/100)`);
  } else if (soilIntel.soilStatus === 'Monitor') {
    soilPenalty = 10;
  } else {
    soilPenalty = 4;
  }

  // Weather penalty: 0 to 25 pts
  let weatherPenalty = 0;
  if (weatherIntel.weatherRisk === 'High') {
    weatherPenalty = 25;
    drivers.push('High atmospheric weather risk (heavy precipitation or extreme heat)');
  } else if (weatherIntel.weatherRisk === 'Moderate') {
    weatherPenalty = 16;
    if (farm.currentHumidityPct >= 75) {
      drivers.push(`Elevated relative humidity (${farm.currentHumidityPct}%) favoring foliar moisture`);
    } else {
      drivers.push('Moderate weather exposure');
    }
  } else {
    weatherPenalty = 5;
  }

  // Vegetation stress penalty: 0 to 25 pts
  let vegetationPenalty = 0;
  if (satIntel.vegetationStatus === 'Stressed') {
    vegetationPenalty = 22;
    drivers.push(`Canopy vegetation under stress (NDVI ${satIntel.ndvi})`);
  } else if (satIntel.vegetationStatus === 'Monitor') {
    vegetationPenalty = 12;
    drivers.push(`Moderate canopy vigor requiring field monitoring (NDVI ${satIntel.ndvi})`);
  } else {
    vegetationPenalty = 4;
  }

  // Disease risk penalty: 0 to 25 pts
  let diseasePenalty = 0;
  if (farm.diseaseRisk === 'High') {
    diseasePenalty = 24;
    drivers.push(`High disease pressure alert (${farm.diseaseRiskDescription})`);
  } else if (farm.diseaseRisk === 'Elevated') {
    diseasePenalty = 18;
    drivers.push(`Elevated disease risk (${farm.diseaseRiskDescription})`);
  } else if (farm.diseaseRisk === 'Moderate') {
    diseasePenalty = 11;
    drivers.push(`Moderate disease surveillance (${farm.diseaseRiskDescription})`);
  } else {
    diseasePenalty = 4;
  }

  const rawRisk = soilPenalty + weatherPenalty + vegetationPenalty + diseasePenalty;
  const farmRiskScore = Math.min(100, Math.max(8, rawRisk));

  // Classification: 0–29 → LOW, 30–59 → MODERATE, 60–79 → HIGH, 80–100 → CRITICAL
  let classification: FarmRiskClassification;
  if (farmRiskScore >= 80) {
    classification = 'CRITICAL';
  } else if (farmRiskScore >= 60) {
    classification = 'HIGH';
  } else if (farmRiskScore >= 30) {
    classification = 'MODERATE';
  } else {
    classification = 'LOW';
  }

  // Ensure at least 2 drivers are displayed for clear transparency
  if (drivers.length === 0) {
    drivers.push('Nominal soil chemical equilibrium');
    drivers.push('Standard meteorological envelope');
  }

  const why = `Farm risk score is synthesized deterministically from Soil (${soilPenalty}/25), Weather (${weatherPenalty}/25), Satellite Canopy (${vegetationPenalty}/25), and Disease Pressure (${diseasePenalty}/25).`;

  return {
    farmRiskScore,
    classification,
    drivers,
    componentScores: {
      soilPenalty,
      weatherPenalty,
      vegetationPenalty,
      diseasePenalty,
    },
    why,
  };
}

/**
 * REGENERATIVE INTELLIGENCE ENGINE
 * Analyzes the 6 dimensions, identifies lowest performers, and generates top 3 actions with why.
 */
export function analyzeRegenerative(farm: Farm): RegenerativeIntelligence {
  const dims = farm.regenerativeDimensions;

  // Calculate overall score deterministically
  const dimensionList: WeakDimension[] = [
    { key: 'soilHealth', label: 'Soil Health', score: dims.soilHealth },
    { key: 'waterEfficiency', label: 'Water Efficiency', score: dims.waterEfficiency },
    { key: 'biodiversity', label: 'Biodiversity', score: dims.biodiversity },
    { key: 'inputEfficiency', label: 'Input Efficiency', score: dims.inputEfficiency },
    { key: 'climateResilience', label: 'Climate Resilience', score: dims.climateResilience },
    { key: 'carbonPractices', label: 'Carbon / Organic Matter Practices', score: dims.carbonPractices },
  ];

  const overallScore = Math.round(
    dimensionList.reduce((acc, d) => acc + d.score, 0) / dimensionList.length
  );

  // Identify lowest performing dimensions
  const sortedByScore = [...dimensionList].sort((a, b) => a.score - b.score);
  const lowestDimensions = sortedByScore.slice(0, 3);

  // Map each weak dimension to tailored regenerative actions with "why"
  const top3Actions: RegenerativeActionWithWhy[] = lowestDimensions.map((dim) => {
    switch (dim.key) {
      case 'waterEfficiency':
        return {
          title: 'Precision Micro-Catchment & Water-Scheduling Optimization',
          dimension: 'Water Efficiency',
          action: 'Deploy soil moisture tension tubes or basin tillage to align watering strictly with crop transpiration需求.',
          why: `Water efficiency score is at ${dim.score}/100. Optimizing irrigation intervals avoids perched water tables and saves up to 25% pumping energy.`,
          impactScore: '+8 pts Water Index',
          feasibility: 'Immediate',
        };
      case 'soilHealth':
        return {
          title: 'Microbial Soil Inoculation & Compost Tea Enhancement',
          dimension: 'Soil Health',
          action: 'Apply fermented beneficial microbial inoculants (Trichoderma / PSB) to activate native soil microbiology.',
          why: `Soil health pillar is currently at ${dim.score}/100. Active biological inoculation unlocks bound phosphorus in root zones.`,
          impactScore: '+7 pts Soil Health',
          feasibility: 'Immediate',
        };
      case 'biodiversity':
        return {
          title: 'Polyculture Strip Intercropping & Pollinator Hedgerows',
          dimension: 'Biodiversity',
          action: 'Sow flowering pulse border rows (marigold, mustard, or pigeonpea) along field edges to support beneficial predatory insects.',
          why: `Biodiversity index is at ${dim.score}/100. Biological diversity creates natural pest suppression barriers, reducing pesticide reliance.`,
          impactScore: '+9 pts Biodiversity',
          feasibility: 'Next Season',
        };
      case 'inputEfficiency':
        return {
          title: 'Targeted Biological Nutrient Fixation & Split Applications',
          dimension: 'Input Efficiency',
          action: 'Replace single blanket nitrogen applications with split bio-fortified organic teas and seed inoculation.',
          why: `Input efficiency score is at ${dim.score}/100. Reduces chemical fertilizer runoff losses and lowers cost per hectare.`,
          impactScore: '+6 pts Input Score',
          feasibility: 'Immediate',
        };
      case 'climateResilience':
        return {
          title: 'Contour Bund Reinforcement & Micro-Drainage Furrows',
          dimension: 'Climate Resilience',
          action: 'Establish cross-slope contour ridges and check-furrows to buffer against sudden deluge or unseasonal dry spells.',
          why: `Climate resilience score is at ${dim.score}/100. Micro-topography management protects topsoil from erosion during extreme storms.`,
          impactScore: '+8 pts Resilience',
          feasibility: 'Next Season',
        };
      case 'carbonPractices':
      default:
        return {
          title: 'In-Situ Stubble Retention & Biochar Integration',
          dimension: 'Carbon / Organic Matter',
          action: 'Retain 100% of harvest crop residue on the soil surface combined with composted farm biomass.',
          why: `Carbon practices score is at ${dim.score}/100. Continuous surface residue builds stable soil organic matter and protects soil microbiology.`,
          impactScore: '+9 pts Carbon Index',
          feasibility: 'Next Season',
        };
    }
  });

  return {
    dimensions: dims,
    overallScore,
    lowestDimensions,
    top3Actions,
  };
}

/**
 * TODAY'S FARM INTELLIGENCE ENGINE
 * Aggregates all analyses and selects ONE highest-priority action deterministically with explainable rationale.
 */
export function computeTodaysIntelligence(
  farm: Farm,
  soilIntel: SoilIntelligence,
  weatherIntel: WeatherIntelligence,
  satIntel: SatelliteIntelligence,
  riskIntel: FarmRiskIntelligence,
  regenIntel: RegenerativeIntelligence
): TodaysFarmIntelligence {
  const next48hRain = farm.weather7Days.slice(0, 2).reduce((s, d) => s + d.rainfallMm, 0);

  // Deterministic priority selection based on dominant risk hierarchy
  let priorityToday: PriorityTodayAdvisory;

  if (farm.diseaseRisk === 'High' || farm.diseaseRisk === 'Elevated') {
    priorityToday = {
      headline: `Active Disease Watch: ${farm.diseaseRiskDescription}`,
      actionableStep: `Inspect lower canopy for initial lesions; apply preventive botanical bio-shield before humid evening hours.`,
      urgency: 'Critical Window',
      why: `Disease risk is classified as ${farm.diseaseRisk} and ambient humidity is ${farm.currentHumidityPct}%. Early intervention stops spore multiplication before economic thresholds are breached.`,
      triggerSource: 'Disease',
    };
  } else if (next48hRain >= 12 && farm.soil.moisturePct >= 58) {
    priorityToday = {
      headline: 'Heavy Rainfall Expected: Defer Irrigation and Inspect Field Bunds',
      actionableStep: 'Keep irrigation pumps turned off today and clear drainage notch outlets at lowest field boundary.',
      urgency: 'Attention Required',
      why: `Rainfall forecast is ${next48hRain}mm in 48h and soil moisture is already adequate (${farm.soil.moisturePct}%). Adding water creates root waterlogging.`,
      triggerSource: 'Weather',
    };
  } else if (satIntel.vegetationStatus === 'Stressed') {
    priorityToday = {
      headline: 'Elevated Vegetation Stress: Conduct Field Parcel Ground-Truthing',
      actionableStep: 'Walk the lower-performing section of the field to inspect root zone moisture and check for localized pest clusters.',
      urgency: 'Attention Required',
      why: `Satellite canopy NDVI (${satIntel.ndvi}) indicates localized photosynthetic suppression. Visual confirmation is necessary before applying inputs.`,
      triggerSource: 'Vegetation',
    };
  } else if (soilIntel.soilStatus === 'Needs Attention' && farm.soil.moistureStatus === 'Deficit') {
    priorityToday = {
      headline: 'Moisture Deficit Window: Schedule Light Morning Furrow Run',
      actionableStep: 'Apply light irrigation to moisten top 15 cm of soil, then preserve moisture with straw or haulm mulching.',
      urgency: 'Attention Required',
      why: `Soil moisture is at ${farm.soil.moisturePct}% (Deficit) while temperatures reach ${farm.currentTempC}°C, increasing plant moisture stress.`,
      triggerSource: 'Soil',
    };
  } else {
    priorityToday = {
      headline: 'Nominal Growth Conditions: Execute Routine Field Maintenance & Weed Check',
      actionableStep: 'Maintain standing water at target stage depth; check pheromone traps and record canopy tiller counts.',
      urgency: 'Routine',
      why: `All 4 core indicators (Soil: ${soilIntel.soilHealthScore}, Weather Risk: ${weatherIntel.weatherRisk}, Canopy: ${satIntel.vegetationStatus}, Disease: ${farm.diseaseRisk}) are currently in safe thresholds.`,
      triggerSource: 'Balanced',
    };
  }

  return {
    farmRiskScore: riskIntel.farmRiskScore,
    farmRiskClass: riskIntel.classification,
    soilHealthScore: soilIntel.soilHealthScore,
    soilStatus: soilIntel.soilStatus,
    weatherRisk: weatherIntel.weatherRisk,
    vegetationStatus: satIntel.vegetationStatus,
    diseaseRisk: farm.diseaseRisk,
    regenerativeScore: regenIntel.overallScore,
    priorityToday,
  };
}

/**
 * FULL FARM INTELLIGENCE PIPELINE
 * Single point of truth for any farm holding.
 */
export function getFullFarmIntelligence(farm: Farm): FullFarmIntelligence {
  const soil = analyzeSoil(farm);
  const weather = analyzeWeather(farm);
  const satellite = analyzeSatellite(farm);
  const risk = calculateFarmRisk(farm, soil, weather, satellite);
  const regenerative = analyzeRegenerative(farm);
  const today = computeTodaysIntelligence(farm, soil, weather, satellite, risk, regenerative);

  return {
    farm,
    soil,
    weather,
    satellite,
    risk,
    regenerative,
    today,
  };
}

/**
 * REGIONAL INTELLIGENCE CALCULATOR
 * Aggregates intelligence across all 12 farms to identify macro risks, averages, and highest-risk zone.
 */
export function calculateRegionalMacroIntelligence(
  allFarms: Farm[],
  allIntelligences: FullFarmIntelligence[]
): RegionalMacroIntelligence {
  const total = allFarms.length;
  const totalAreaHectares = Math.round(allFarms.reduce((acc, f) => acc + f.farmAreaHectares, 0) * 10) / 10;
  const cropsRepresented = Array.from(new Set(allFarms.map((f) => f.primaryCrop)));

  const avgRisk = Math.round(
    allIntelligences.reduce((acc, curr) => acc + curr.risk.farmRiskScore, 0) / (total || 1)
  );
  const avgSoil = Math.round(
    allIntelligences.reduce((acc, curr) => acc + curr.soil.soilHealthScore, 0) / (total || 1)
  );
  const avgRegen = Math.round(
    allIntelligences.reduce((acc, curr) => acc + curr.regenerative.overallScore, 0) / (total || 1)
  );
  const avgNdvi =
    Math.round(
      (allIntelligences.reduce((acc, curr) => acc + curr.satellite.ndvi, 0) / (total || 1)) * 100
    ) / 100;

  const highRiskCount = allIntelligences.filter(
    (item) => item.risk.classification === 'HIGH' || item.risk.classification === 'CRITICAL'
  ).length;

  const stressedCount = allIntelligences.filter(
    (item) => item.satellite.vegetationStatus === 'Stressed' || item.farm.cropStressLevel !== 'Low'
  ).length;

  const elevatedDiseaseCount = allIntelligences.filter(
    (item) => item.farm.diseaseRisk === 'Elevated' || item.farm.diseaseRisk === 'High'
  ).length;

  // Group by zone to find zone summaries & highest risk zone
  const zoneIds: AgriculturalZoneId[] = [
    'zone-1-indo-gangetic',
    'zone-2-cerrado',
    'zone-3-semi-arid-highveld',
  ];

  const zoneNames: Record<AgriculturalZoneId, { name: string; region: string }> = {
    'zone-1-indo-gangetic': {
      name: 'Zone 1: Indo-Gangetic Basin',
      region: 'South Asia (India)',
    },
    'zone-2-cerrado': {
      name: 'Zone 2: Cerrado Savanna',
      region: 'South America (Brazil)',
    },
    'zone-3-semi-arid-highveld': {
      name: 'Zone 3: Semi-Arid & Nile Corridor',
      region: 'Africa & Near East (South Africa, Egypt, Ethiopia)',
    },
  };

  const zoneSummaries = zoneIds.map((zid) => {
    const items = allIntelligences.filter((item) => item.farm.zoneId === zid);
    const count = items.length;
    const meanRisk = Math.round(
      items.reduce((acc, curr) => acc + curr.risk.farmRiskScore, 0) / (count || 1)
    );
    const meanSoil = Math.round(
      items.reduce((acc, curr) => acc + curr.soil.soilHealthScore, 0) / (count || 1)
    );
    const meanRegen = Math.round(
      items.reduce((acc, curr) => acc + curr.regenerative.overallScore, 0) / (count || 1)
    );
    const meanNdvi =
      Math.round(
        (items.reduce((acc, curr) => acc + curr.satellite.ndvi, 0) / (count || 1)) * 100
      ) / 100;
    const diseaseRiskCount = items.filter(
      (item) => item.farm.diseaseRisk === 'Elevated' || item.farm.diseaseRisk === 'High'
    ).length;
    const stressedFarmCount = items.filter(
      (item) => item.satellite.vegetationStatus === 'Stressed' || item.farm.cropStressLevel !== 'Low'
    ).length;
    const primaryCrops = Array.from(new Set(items.map((i) => i.farm.primaryCrop)));

    return {
      id: zid,
      name: zoneNames[zid].name,
      region: zoneNames[zid].region,
      farmCount: count,
      primaryCrops,
      averageFarmRisk: meanRisk,
      averageSoilHealth: meanSoil,
      averageNdvi: meanNdvi,
      averageRegenScore: meanRegen,
      diseaseRiskCount,
      stressedFarmCount,
    };
  });

  // Identify highest risk zone
  let highestRiskZoneSummary = zoneSummaries[0];
  zoneSummaries.forEach((zs) => {
    if (zs.averageFarmRisk > highestRiskZoneSummary.averageFarmRisk) {
      highestRiskZoneSummary = zs;
    }
  });

  // Calculate deterministic emerging signals from actual values
  const riceFarms = allIntelligences.filter((i) => i.farm.primaryCrop.toLowerCase().includes('rice'));
  const riceAvgRisk =
    riceFarms.length > 0
      ? Math.round(riceFarms.reduce((acc, curr) => acc + curr.risk.farmRiskScore, 0) / riceFarms.length)
      : avgRisk;

  const lowestRegenZone = [...zoneSummaries].sort((a, b) => a.averageRegenScore - b.averageRegenScore)[0];
  const mostStressedZone = [...zoneSummaries].sort((a, b) => b.stressedFarmCount - a.stressedFarmCount)[0];
  const acidicCount = allFarms.filter((f) => f.soil.ph < 6.2).length;

  const emergingSignals: string[] = [
    `${mostStressedZone.stressedFarmCount} of ${mostStressedZone.farmCount} holdings in ${mostStressedZone.name} display elevated vegetation stress markers.`,
    `Rice holdings average a Farm Risk score of ${riceAvgRisk}/100 (${riceAvgRisk >= avgRisk ? 'higher than' : 'comparable to'} the network mean of ${avgRisk}/100).`,
    `${lowestRegenZone.name} displays the network's lowest mean regenerative score (${lowestRegenZone.averageRegenScore}/100), with soil carbon and water efficiency as primary bottlenecks.`,
    `${acidicCount} holdings in the network exhibit acidic soil reaction (pH < 6.2), correlating with restricted phosphorus availability.`
  ];

  const regionalPriorities: string[] = [
    `Prioritize immediate agronomic surveillance in ${highestRiskZoneSummary.name} due to peak multi-factorial risk (${highestRiskZoneSummary.averageFarmRisk}/100).`,
    `Deploy biological bio-fungicide and prophylactic scouting across the ${elevatedDiseaseCount} holdings with active foliar disease alerts before next rainfall.`,
    `Initiate targeted organic carbon enhancement and stubble retention protocols across all holdings registering soil health scores under 70.`
  ];

  return {
    totalFarms: total,
    totalAreaHectares,
    cropsRepresented,
    averageRiskScore: avgRisk,
    averageSoilScore: avgSoil,
    averageNdvi: avgNdvi,
    averageRegenScore: avgRegen,
    highRiskCount,
    stressedCount,
    elevatedDiseaseCount,
    highestRiskZone: {
      id: highestRiskZoneSummary.id,
      name: highestRiskZoneSummary.name,
      meanRiskScore: highestRiskZoneSummary.averageFarmRisk,
      primaryDriver:
        highestRiskZoneSummary.diseaseRiskCount > 0
          ? 'Foliar disease cluster & microclimate humidity'
          : 'Soil moisture deficit',
    },
    zoneSummaries,
    emergingSignals,
    regionalPriorities,
  };
}
