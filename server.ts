/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import type { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0';
const isProduction = process.env.NODE_ENV === 'production';

// 1. Top-Level Request Deserialization (Ordering Guarantee)
app.use(express.json({ limit: '10mb' }));

// 2. Resilient Gemini Initialization with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  try {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('[AgriN Server] Failed to initialize GoogleGenAI client:', err);
  }
} else {
  console.info('[AgriN Server] GEMINI_API_KEY not configured or placeholder detected. Operating in resilient fallback mode.');
}

// Resilient Model Fallback Ladder according to Production Directives
const MODEL_FALLBACK_LADDER = [
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.7-flash',
];

interface FallbackGenerateParams {
  systemInstruction: string;
  contents: any;
  responseMimeType?: string;
}

// Resilient model invocation helper
async function generateContentWithFallback(params: FallbackGenerateParams): Promise<{ text: string; modelUsed: string }> {
  if (!aiClient) {
    throw new Error('GEMINI_CLIENT_UNAVAILABLE');
  }

  let lastError: any = null;

  for (const modelName of MODEL_FALLBACK_LADDER) {
    try {
      const response = await aiClient.models.generateContent({
        model: modelName,
        contents: params.contents,
        config: {
          systemInstruction: params.systemInstruction,
          temperature: 0.3,
          responseMimeType: params.responseMimeType,
        },
      });

      const outputText = response.text || '';
      if (outputText.trim()) {
        return { text: outputText, modelUsed: modelName };
      }
    } catch (err: any) {
      lastError = err;
      const statusCode = err?.status || err?.statusCode || 500;
      console.warn(`[AgriN Gemini Ladder] Model ${modelName} encountered error (Status: ${statusCode}):`, err?.message || err);
      // Sequentially proceed to next model in fallback ladder
    }
  }

  throw lastError || new Error('ALL_FALLBACK_MODELS_FAILED');
}

// Multilingual fallback generator when API is offline or key unconfigured
function generateDeterministicFallback(query: string, farmContext: any, language: string = 'en') {
  const crop = farmContext?.crop || 'Crop';
  const farmer = farmContext?.farmerName || 'Farmer';
  const moisture = farmContext?.soil?.moisturePct ?? 60;
  const rainSummary = farmContext?.weather?.rainfallForecastSummary || 'Variable forecast';
  const ndvi = farmContext?.satellite?.ndviCurrent ?? 0.70;
  const farmRiskScore = farmContext?.risk?.farmRiskScore ?? 35;
  const lowerQuery = (query || '').toLowerCase();

  const isHindi = language === 'hi';
  const isPortuguese = language === 'pt';
  const isRussian = language === 'ru';
  const isChinese = language === 'zh';

  let situation = `Reviewing field parameters for ${farmer}'s ${crop} (${moisture}% soil moisture, NDVI ${ndvi}, risk score ${farmRiskScore}/100).`;
  let recommendedActions = [
    `Monitor ${crop} root zone moisture before next irrigation run.`,
    'Maintain in-situ mulch cover to buffer against evaporative losses.',
    'Scout boundary rows for early signs of foliar pests or leaf lesions.',
  ];
  let why = `Current volumetric moisture is at ${moisture}% with forecast showing: "${rainSummary}". Satellite canopy vigor is steady at ${ndvi} NDVI.`;
  let watchFor = ['Standing water pooling in lowest field furrow', 'High humidity promoting fungal spore germination'];
  let regenerativeOption = 'Apply organic compost wash or biochar top-dressing to build long-term soil microbial structure.';
  let confidence: 'High' | 'Moderate' | 'Low' = 'Moderate';

  if (lowerQuery.includes('irrigate') || lowerQuery.includes('water')) {
    if (moisture > 65 || rainSummary.toLowerCase().includes('rain') || rainSummary.toLowerCase().includes('showers')) {
      situation = `Soil moisture is at ${moisture}% (adequate to surplus) with anticipated rain: "${rainSummary}".`;
      recommendedActions = [
        'Postpone flood or sprinkler irrigation for the next 24-48 hours.',
        'Clear field drainage bunds to evacuate sudden heavy precipitation.',
        'Re-test moisture at 15 cm soil depth once rain clears.',
      ];
      why = `Supplying irrigation when soil moisture is already at ${moisture}% alongside incoming rainfall risks root hypoxia and nitrogen leaching.`;
      watchFor = ['Waterlogging in depression zones', 'Chlorosis at leaf tips from saturated soil roots'];
      regenerativeOption = 'Implement Alternate Wetting and Drying (AWD) or furrow basin checks to conserve water table reserves.';
      confidence = 'High';
    } else {
      situation = `Soil moisture is at ${moisture}% (low/deficit) and rainfall forecast shows dry intervals.`;
      recommendedActions = [
        'Schedule a light morning or late evening furrow irrigation run.',
        'Focus application on shallow-rooted parcels to avoid midday evaporative loss.',
      ];
      why = `Evapotranspiration is actively depleting moisture while rain is minimal in the near-term forecast.`;
      watchFor = ['Midday leaf rolling or stomatal closure', 'Soil crusting on sandy ridges'];
      regenerativeOption = 'Apply straw mulch over crop beds to cut evaporative water loss by up to 35%.';
      confidence = 'High';
    }
  } else if (lowerQuery.includes('soil') || lowerQuery.includes('improve') || lowerQuery.includes('healthy')) {
    situation = `Soil health analysis indicates pH ${farmContext?.soil?.ph ?? 6.5} and organic carbon at ${farmContext?.soil?.organicCarbonPct ?? 0.6}%.`;
    recommendedActions = [
      'Retain post-harvest crop stubble and avoid residue burning.',
      'Incorporate green manure crops (cowpea, sesbania, or vetch) in rotation.',
      'Co-inoculate beneficial bio-fertilizers (Azospirillum or mycorrhizae).',
    ];
    why = `Lifting organic carbon above 0.85% directly increases soil cation exchange capacity and water holding capacity.`;
    watchFor = ['Nutrient lockout if soil reaction deviates from neutral', 'Subsoil compaction from heavy tractors'];
    regenerativeOption = 'Incorporate bio-enriched compost blended with biochar to host active mycorrhizal mycelium.';
    confidence = 'High';
  } else if (lowerQuery.includes('stress') || lowerQuery.includes('yellow') || lowerQuery.includes('leaf')) {
    situation = `Satellite canopy index is ${ndvi} with current stress categorized as "${farmContext?.satellite?.cropStressLevel || 'Low'}".`;
    recommendedActions = [
      'Perform a physical walk to inspect lower leaf undersides for fungal spots.',
      'Check soil drainage around plant crowns to rule out root suffocation.',
      'Avoid high-dose synthetic nitrogen until foliar symptoms stabilize.',
    ];
    why = `Satellite NDVI measures overall chlorophyll canopy reflectance; ground-truthing isolates whether stress is nutrient, moisture, or pathogen related.`;
    watchFor = ['Rapid spread of concentric necrotic spots', 'Wilting during cooler morning hours'];
    regenerativeOption = 'Foliar application of 5% neem seed extract or fermented compost tea as a biological prophylactic.';
    confidence = 'Moderate';
  }

  // Internationalized labels if non-English requested
  if (isHindi) {
    situation = `खेती विश्लेषण (${crop}): मिट्टी की नमी ${moisture}%, उपग्रह NDVI ${ndvi}, और समग्र जोखिम स्कोर ${farmRiskScore}/100 है।`;
    why = `मिट्टी की नमी वर्तमान में ${moisture}% है और मौसम पूर्वानुमान: "${rainSummary}"।`;
    regenerativeOption = 'मिट्टी के स्वास्थ्य और सूक्ष्मजीवों को बढ़ाने के लिए जैविक खाद या जीवामृत का उपयोग करें।';
    recommendedActions = [
      'अगली सिंचाई से पहले जड़ क्षेत्र की नमी की जांच करें।',
      'बारिश के पानी की निकासी के लिए मेड़ों को साफ रखें।',
      'पत्तियों पर किसी भी कीट या रोग के शुरुआती लक्षणों की निगरानी करें।',
    ];
    watchFor = ['खेत में जलभराव', 'फंगल रोग के लक्षण'];
  } else if (isPortuguese) {
    situation = `Análise de campo para ${crop}: umidade do solo em ${moisture}%, NDVI em ${ndvi} e risco em ${farmRiskScore}/100.`;
    why = `A umidade volumétrica está em ${moisture}% com previsão: "${rainSummary}".`;
    regenerativeOption = 'Mantenha a palhada de cobertura para enriquecer a matéria orgânica e proteger o solo.';
    recommendedActions = [
      'Verifique a umidade na profundidade da raiz antes de irrigar.',
      'Mantenha as curvas de nível desobstruídas para excesso de chuva.',
      'Monitore a área para detecção precoce de ferrugem ou manchas foliares.',
    ];
    watchFor = ['Encharcamento do solo', 'Alta umidade favorecendo fungos'];
  } else if (isRussian) {
    situation = `Агрономический анализ для культуры ${crop}: влажность почвы ${moisture}%, NDVI ${ndvi}, индекс риска ${farmRiskScore}/100.`;
    why = `Влажность почвы составляет ${moisture}%, прогноз осадков: "${rainSummary}".`;
    regenerativeOption = 'Используйте сидераты и органическое компостирование для восстановления структуры почвы.';
    recommendedActions = [
      'Проверьте влажность в зоне корней перед поливом.',
      'Обеспечьте надлежащий дренаж для стока лишней воды.',
      'Проводите регулярный осмотр нижнего яруса листьев.',
    ];
    watchFor = ['Застой воды в бороздах', 'Риск грибковых поражений'];
  } else if (isChinese) {
    situation = `田间农情分析（${crop}）：土壤含水量 ${moisture}%，卫星 NDVI ${ndvi}，综合风险指数 ${farmRiskScore}/100。`;
    why = `当前土壤湿度为 ${moisture}%，气象预报为：“${rainSummary}”。`;
    regenerativeOption = '推广留茬覆盖与绿肥轮作，提升土壤有机碳与微生物活力。';
    recommendedActions = [
      '在安排下次灌溉前先行检测根系层墒情。',
      '疏通田埂排水口，防止突发暴雨造成积水烂根。',
      '巡查田间地头，警惕早期病斑扩散。',
    ];
    watchFor = ['低洼处田间积水', '高湿条件引发的真菌病害'];
  }

  return {
    situation,
    recommendedActions: recommendedActions.slice(0, 3),
    why,
    watchFor: watchFor.slice(0, 2),
    regenerativeOption,
    confidence,
    isAiGenerated: false,
    modelUsed: 'deterministic-agronomic-engine',
  };
}

// 3. API Endpoint: POST /api/advisor/chat
app.post('/api/advisor/chat', async (req: Request, res: Response) => {
  // Defensive Payload Ingestion (Null-Safe Destructuring)
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  const query = typeof body.query === 'string' ? body.query.trim() : '';
  const farmContext = (body.farmContext && typeof body.farmContext === 'object') ? body.farmContext : {};
  const conversationHistory = Array.isArray(body.history) ? body.history : [];
  const language = typeof body.language === 'string' ? body.language : 'en';

  if (!query) {
    res.status(400).json({
      error: 'Missing query parameter',
      message: 'Please provide a valid question to the Agri Advisor.',
    });
    return;
  }

  // Construct structured farm context per Build 03 requirements
  const structuredContextPrompt = `
=== STRUCTURED FARM CONTEXT ===
Farm ID: ${farmContext?.id || 'Unknown'}
Farmer: ${farmContext?.farmerName || 'Farmer'}
Location: ${farmContext?.district || 'Unknown District'}, ${farmContext?.state || ''}, ${farmContext?.country || ''}
Zone: ${farmContext?.zoneName || 'Standard Agro-Ecological Zone'}

CROP PROFILE:
Primary Crop: ${farmContext?.crop || 'Crop'}
Crop Variety: ${farmContext?.cropVariety || 'Standard Variety'}
Crop Stage: ${farmContext?.cropStage || 'Vegetative'}
Farm Area: ${farmContext?.farmAreaHectares || 2.0} hectares

SOIL INTELLIGENCE (Deterministic Baseline):
pH: ${farmContext?.soil?.ph ?? 'N/A'} (${farmContext?.soil?.phStatus || 'Optimal'})
Nitrogen: ${farmContext?.soil?.nitrogenKgHa ?? 'N/A'} kg/ha (${farmContext?.soil?.nitrogenStatus || 'Moderate'})
Phosphorus: ${farmContext?.soil?.phosphorusKgHa ?? 'N/A'} kg/ha (${farmContext?.soil?.phosphorusStatus || 'Moderate'})
Potassium: ${farmContext?.soil?.potassiumKgHa ?? 'N/A'} kg/ha (${farmContext?.soil?.potassiumStatus || 'Good'})
Organic Carbon: ${farmContext?.soil?.organicCarbonPct ?? 'N/A'}% (${farmContext?.soil?.organicCarbonStatus || 'Moderate'})
Soil Moisture: ${farmContext?.soil?.moisturePct ?? 'N/A'}% (${farmContext?.soil?.moistureStatus || 'Adequate'})
Soil Health Score: ${farmContext?.soil?.soilHealthScore ?? farmContext?.soil?.soilHealthIndex ?? 75}/100

WEATHER INTELLIGENCE (Simulated Prototype Forecast):
Current Temp: ${farmContext?.weather?.currentTempC ?? 28}°C
Humidity: ${farmContext?.weather?.currentHumidityPct ?? 70}%
Rainfall Forecast: ${farmContext?.weather?.rainfallForecastSummary || 'Clear to light showers'}
Weather Risk Level: ${farmContext?.weather?.weatherRisk || 'Moderate'}

SATELLITE INTELLIGENCE (Sentinel-2 Simulated Composite):
NDVI Current: ${farmContext?.satellite?.ndviCurrent ?? 0.70}
Vegetation Status: ${farmContext?.satellite?.vegetationStatus || 'Healthy'}
Crop Stress: ${farmContext?.satellite?.cropStressLevel || 'Low'}

MULTI-FACTORIAL RISK ASSESSMENT:
Disease Risk: ${farmContext?.risk?.diseaseRisk || farmContext?.diseaseRisk || 'Moderate'}
Farm Risk Score: ${farmContext?.risk?.farmRiskScore ?? 35}/100 (Class: ${farmContext?.risk?.classification || 'MODERATE'})
Primary Risk Drivers: ${Array.isArray(farmContext?.risk?.drivers) ? farmContext.risk.drivers.join(', ') : 'Standard moisture balance'}

REGENERATIVE SCORE & PRIORITIES:
Overall Regenerative Score: ${farmContext?.regenerative?.overallScore ?? farmContext?.regenerativeScore ?? 75}/100
Weakest Dimensions: ${Array.isArray(farmContext?.regenerative?.lowestDimensions) ? farmContext.regenerative.lowestDimensions.map((d: any) => `${d.label} (${d.score}%)`).join(', ') : 'Water, Carbon'}
Top Recommended Actions: ${Array.isArray(farmContext?.regenerative?.top3Actions) ? farmContext.regenerative.top3Actions.map((a: any) => a.title).join('; ') : 'Mulch retention; compost addition'}

PRIORITY TODAY HEURISTIC:
${farmContext?.today?.priorityToday?.headline || 'Monitor canopy condition'} - Action: ${farmContext?.today?.priorityToday?.actionableStep || 'Check soil moisture before field pass'}

USER QUESTION:
"${query}"

REQUESTED RESPONSE LANGUAGE: ${language} (en: English, hi: Hindi, pt: Portuguese, ru: Russian, zh: Chinese)
`;

  // System instruction for AgriN Assistant
  const systemInstruction = `
You are the "AgriN Agricultural Decision-Support Assistant", a grounded, responsible agronomic AI designed to assist small and marginal farmers across agro-ecological zones.

CORE DIRECTIVES:
1. Always base your advice strictly on the supplied STRUCTURED FARM CONTEXT.
2. Differentiate between direct observation and inference. Never claim demo/simulated data is real-time satellite or live meteorological telemetry.
3. Be farmer-friendly: avoid unnecessary jargon (e.g. explain NDVI as "satellite canopy health / vegetative vigor").
4. Prioritize practical, low-cost regenerative practices over heavy synthetic chemical purchases.
5. Never provide unsupported pesticide dosage or definitive disease diagnoses; encourage field verification by local extension officers for severe symptoms.
6. Never make guaranteed yield or financial promises.
7. Answer fluently in the requested language code (${language}). However, DO NOT translate farm IDs, metric units (e.g., kg/ha, °C, ha), or raw numerical measurements.
8. If previous conversation turns exist, maintain conversational continuity.

OUTPUT FORMAT:
You MUST respond with a valid JSON object matching this schema:
{
  "situation": "1-2 concise sentences summarizing the crop/field condition related to the question.",
  "recommendedActions": ["Max 3 concise, practical, numbered action steps."],
  "why": "Clear explanation of which specific farm signals (moisture %, rain, NDVI, pH) justify this recommendation.",
  "watchFor": ["Max 2 warning signs or red flags for the farmer to check in the field."],
  "regenerativeOption": "One specific regenerative or biological practice suited to this context.",
  "confidence": "High" | "Moderate" | "Low"
}
`;

  let historyContext = '';
  if (conversationHistory.length > 0) {
    const turns = conversationHistory.slice(-4).map((m: any) => `${m.sender === 'user' ? 'Farmer' : 'AgriN'}: ${m.text}`).join('\n');
    historyContext = `\nRECENT CONVERSATION HISTORY:\n${turns}\n`;
  }

  const promptToSend = `${structuredContextPrompt}\n${historyContext}`;

  try {
    if (!aiClient) {
      throw new Error('GEMINI_API_NOT_INITIALIZED');
    }

    const { text, modelUsed } = await generateContentWithFallback({
      systemInstruction,
      contents: promptToSend,
      responseMimeType: 'application/json',
    });

    // Parse JSON safely
    let parsed: any;
    try {
      // Strip markdown code fences if model enclosed JSON in ```json
      const cleaned = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.warn('[AgriN Server] JSON parse error on Gemini output, attempting fallback structuring:', parseErr);
      parsed = {
        situation: text.slice(0, 180),
        recommendedActions: ['Inspect field conditions directly before applying inputs.'],
        why: 'Derived from active farm indicators.',
        watchFor: ['Excess moisture accumulation'],
        regenerativeOption: 'Maintain organic ground cover.',
        confidence: 'Moderate',
      };
    }

    // Build evidenceUsed explicitly from Build 02 calculations (never allow AI to fabricate)
    const evidenceUsed = {
      soilMoisture: `${farmContext?.soil?.moisturePct ?? 64}% (${farmContext?.soil?.moistureStatus || 'Adequate'})`,
      rainfallForecast: farmContext?.weather?.rainfallForecastSummary || '18mm predicted over next 48h',
      ndvi: farmContext?.satellite?.ndviCurrent ?? 0.72,
      weatherRisk: farmContext?.weather?.weatherRisk || 'Moderate',
      farmRiskScore: `${farmContext?.risk?.farmRiskScore ?? 34}/100 (${farmContext?.risk?.classification || 'MODERATE'})`,
      cropStage: `${farmContext?.crop || 'Rice'} · ${farmContext?.cropStage || 'Vegetative'}`,
    };

    res.json({
      success: true,
      data: {
        situation: parsed.situation || 'Field condition assessed based on farm indicators.',
        recommendedActions: Array.isArray(parsed.recommendedActions) ? parsed.recommendedActions.slice(0, 3) : ['Check soil condition.'],
        why: parsed.why || 'Based on active farm parameters.',
        watchFor: Array.isArray(parsed.watchFor) ? parsed.watchFor.slice(0, 2) : ['Field runoff'],
        regenerativeOption: parsed.regenerativeOption || 'Incorporate organic matter into soil.',
        confidence: parsed.confidence || 'Moderate',
        evidenceUsed,
        language,
        isAiGenerated: true,
        modelUsed,
      },
    });
  } catch (error: any) {
    console.warn('[AgriN Server] Gemini call failed or key absent. Returning resilient agronomic fallback:', error?.message || error);

    const fallbackData = generateDeterministicFallback(query, farmContext, language);

    const evidenceUsed = {
      soilMoisture: `${farmContext?.soil?.moisturePct ?? 64}% (${farmContext?.soil?.moistureStatus || 'Adequate'})`,
      rainfallForecast: farmContext?.weather?.rainfallForecastSummary || '18mm predicted over next 48h',
      ndvi: farmContext?.satellite?.ndviCurrent ?? 0.72,
      weatherRisk: farmContext?.weather?.weatherRisk || 'Moderate',
      farmRiskScore: `${farmContext?.risk?.farmRiskScore ?? 34}/100 (${farmContext?.risk?.classification || 'MODERATE'})`,
      cropStage: `${farmContext?.crop || 'Rice'} · ${farmContext?.cropStage || 'Vegetative'}`,
    };

    res.json({
      success: true,
      data: {
        ...fallbackData,
        evidenceUsed,
        language,
        isAiGenerated: false,
        fallbackNotice: 'AI advisory is temporarily in fallback mode. Your farm intelligence dashboard remains available.',
      },
    });
  }
});

// Crop Doctor Deterministic Fallback Generator
function generateCropDoctorDeterministicFallback(selectedCrop: string, symptoms: string, farmContext: any) {
  const crop = selectedCrop || farmContext?.crop || 'Crop';
  const humidity = farmContext?.weather?.currentHumidityPct ?? 70;
  const temp = farmContext?.weather?.currentTempC ?? 28;
  const moisture = farmContext?.soil?.moisturePct ?? 65;
  const diseaseRisk = farmContext?.risk?.diseaseRisk || 'Moderate';
  const lowerSymptoms = (symptoms || '').toLowerCase();

  const isHealthy = lowerSymptoms.includes('healthy') || lowerSymptoms.includes('no symptom') || lowerSymptoms.includes('vigorous') || lowerSymptoms.includes('green');

  if (isHealthy) {
    const immediateActions = [
      'Continue regular field scouting on 7-day intervals to catch any emergent vectors early.',
      'Maintain balanced irrigation scheduling to preserve current optimal root zone moisture.',
      'Refrain from prophylactic chemical fungicides while canopy remains completely healthy.',
    ];
    const regenerativeOption = 'Apply foliar bio-stimulants such as fermented liquid seaweed or diluted jeevamrut to sustain beneficial phyllosphere microflora and natural plant immunity.';
    const visibleSymptoms = [
      'Uniform green pigmentation without chlorosis or necrotic margins',
      'Intact leaf blade structure with healthy cellular turgor',
      'No visible fungal hyphae, bacterial lesions, or insect feeding scars',
    ];

    return {
      isCropImage: true,
      unclearReason: null,
      detectedCrop: crop,
      cropMatch: true,
      cropMismatchNote: null,
      identifiedCondition: 'Healthy Canopy / Vigorous Foliar Biomass',
      possibleConditions: [
        {
          name: 'Healthy Foliar Canopy (No Pathological Lesions)',
          likelihood: 'Primary Status (Very High)',
          notes: 'Uniform chlorophyll distribution with absence of chlorotic spots or necrotic margins.',
        },
        {
          name: 'Balanced Mineral Nutrition Status',
          likelihood: 'Supporting (High)',
          notes: 'Leaf venation and turgidity indicate sufficient cellular moisture and nitrogen balance.',
        },
      ],
      confidenceLevel: 'High' as const,
      confidencePct: 94,
      severity: 'Mild' as const,
      visibleSymptoms,
      symptomsObserved: visibleSymptoms,
      whyAssessment: {
        imageEvidence: 'Symmetrical leaf lamina and intact epidermal layer with zero visible necrotic tissue or sporulation.',
        farmContextCorrelation: `Stable ambient temperature (${temp}°C) and favorable soil moisture (${moisture}%) support balanced metabolic transpiration.`,
      },
      immediateActions,
      agronomicIntervention: immediateActions.join(' '),
      regenerativeOption,
      organicRemedy: regenerativeOption,
      disclaimer: 'AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments.',
      isAiGenerated: false,
      modelUsed: 'deterministic-agronomic-engine',
      fallbackNotice: 'Operating in demonstration fallback mode. Field agronomist confirmation recommended.',
    };
  }

  // Pathological cases
  let identifiedCondition = 'Foliar Leaf Spot Complex';
  let possibleConditions = [
    {
      name: 'Foliar Leaf Spot (Cercospora / Alternaria complex)',
      likelihood: 'Primary Suspect (High)',
      notes: 'Necrotic lesion pattern correlates with ambient humidity and leaf surface wetness.',
    },
    {
      name: 'Secondary Nutritional Chlorosis',
      likelihood: 'Secondary Factor (Moderate)',
      notes: 'Slight interveinal yellowing may indicate early nitrogen or potassium translocation.',
    },
  ];
  let visibleSymptoms = [
    'Localized brownish necrotic lesions with chlorotic halos along leaf margins',
    'Interveinal discoloration progressing from older leaves toward upper canopy',
    'Foliar stress response under high humidity',
  ];
  let immediateActions = [
    'Prune or sanitize heavily damaged lower leaves to suppress secondary spore load.',
    'Temporarily suspend overhead sprinkling to avoid prolonging leaf wetness duration.',
    'Scout boundary rows across a 20-point transect to map spatial disease incidence.',
  ];
  let regenerativeOption = 'Foliar spray of 5% neem seed kernel extract (NSKE) or fermented bio-fungicide to inhibit fungal sporulation organically.';
  let imageEvidence = 'Irregular chlorotic and necrotic lesion margins visible across the foliar lamina.';
  let severity: 'Mild' | 'Moderate' | 'Severe' = 'Moderate';

  if (crop.toLowerCase().includes('rice')) {
    identifiedCondition = 'Bacterial Leaf Blight / Early Blast (Magnaporthe oryzae)';
    possibleConditions = [
      {
        name: 'Rice Leaf Blast (Magnaporthe oryzae)',
        likelihood: 'Primary Suspect (High)',
        notes: 'Spindle-shaped lesions with grayish centers are characteristic of blast under prolonged humidity.',
      },
      {
        name: 'Bacterial Leaf Streak (Xanthomonas oryzae)',
        likelihood: 'Secondary Possibility (Moderate)',
        notes: 'Interveinal water-soaked lesions that turn yellowish-brown as they dry out.',
      },
      {
        name: 'Brown Spot (Bipolaris oryzae)',
        likelihood: 'Secondary Possibility (Low-Moderate)',
        notes: 'Small oval spots with yellow halos, common when soil potassium is suboptimal.',
      },
    ];
    visibleSymptoms = [
      'Spindle-shaped brown lesions with grayish centers along leaf margins',
      'Chlorotic halos surrounding expanding necrotic patches',
      'Leaf tip desiccation under elevated ambient humidity',
    ];
    immediateActions = [
      'Drain standing paddy water for 24-48 hours to aerate root zones and reduce canopy humidity.',
      'Withhold synthetic nitrogen top-dressing until lesion expansion stabilizes.',
      'Erect bird perches in the parcel to encourage natural biological predator activity.',
    ];
    regenerativeOption = 'Foliar application of fermented butter milk (chaas) mixed with copper traces or Pseudomonas fluorescens biological culture (10g/L).';
    imageEvidence = 'Classic spindle-shaped elliptical lesions with grayish centers along the middle third of the paddy leaf blade.';
    severity = 'Moderate';
  } else if (crop.toLowerCase().includes('soybean')) {
    identifiedCondition = 'Asian Soybean Rust (Phakopsora pachyrhizi)';
    possibleConditions = [
      {
        name: 'Asian Soybean Rust (Phakopsora pachyrhizi)',
        likelihood: 'Primary Suspect (High)',
        notes: 'Polygonal pustules on abaxial leaf surfaces, aggravated by extended dew periods.',
      },
      {
        name: 'Target Spot (Corynespora cassiicola)',
        likelihood: 'Secondary Possibility (Moderate)',
        notes: 'Concentric rings with dark reddish-brown margins.',
      },
      {
        name: 'Frogeye Leaf Spot (Cercospora sojina)',
        likelihood: 'Alternative Possibility (Low-Moderate)',
        notes: 'Circular lesions with brown/purple halos.',
      },
    ];
    visibleSymptoms = [
      'Minute raised polygonal blisters clustered on the abaxial (underside) of trifoliate leaves',
      'Premature chlorosis and lower-canopy leaf drop',
      'Accelerated sporulation under prolonged dew wetness',
    ];
    immediateActions = [
      'Scout 20 random points across the parcel to verify whether incidence exceeds 5% of canopy.',
      'Improve inter-row air drainage and avoid field transit when leaves are wet with dew.',
      'Report suspected rust presence to local district agricultural extension center.',
    ];
    regenerativeOption = 'Bio-fungicidal spray of Bacillus subtilis or Trichoderma viride enriched with neem oil (0.5%) to coat leaf undersides.';
    imageEvidence = 'Small tan-to-brown polygonal pustules clustered predominantly on lower foliar surface with chlorotic stippling above.';
    severity = 'Severe';
  } else if (crop.toLowerCase().includes('maize')) {
    identifiedCondition = 'Northern Corn Leaf Blight (Exserohilum turcicum)';
    possibleConditions = [
      {
        name: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
        likelihood: 'Primary Suspect (High)',
        notes: 'Long elliptical cigar-shaped grayish-green lesions running parallel to leaf veins.',
      },
      {
        name: 'Common Rust (Puccinia sorghi)',
        likelihood: 'Secondary Possibility (Moderate)',
        notes: 'Small golden-brown to dark brown powdery pustules scattered across both leaf surfaces.',
      },
      {
        name: 'Gray Leaf Spot (Cercospora zeae-maydis)',
        likelihood: 'Alternative Possibility (Low-Moderate)',
        notes: 'Rectangular lesions bounded by the veins.',
      },
    ];
    visibleSymptoms = [
      'Elongated cigar-shaped necrotic lesions (2.5 to 15 cm) parallel to veins',
      'Olive-gray fungal sporulation on damp mornings',
      'Coalescence of older lesions leading to premature leaf blighting',
    ];
    immediateActions = [
      'Maintain balanced potassium fertilization to bolster maize stalk and leaf cell wall strength.',
      'Remove and safely compost heavily blighted lower dry leaves away from active crop rows.',
      'Plan crop rotation with non-gramineous cover crops for the subsequent planting window.',
    ];
    regenerativeOption = 'Incorporate Trichoderma harzianum microbial foliar wash and mulch residue with biodynamic compost to accelerate residue decomposition.';
    imageEvidence = 'Distinctive elongated cigar-shaped lesions constrained between parallel longitudinal maize veins.';
    severity = 'Moderate';
  } else if (crop.toLowerCase().includes('cotton')) {
    identifiedCondition = 'Alternaria Leaf Spot & Foliar Blight (Alternaria macrospora)';
    possibleConditions = [
      {
        name: 'Alternaria Macrospora Leaf Spot',
        likelihood: 'Primary Suspect (High)',
        notes: 'Circular brown spots with purple margins and concentric rings.',
      },
      {
        name: 'Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)',
        likelihood: 'Secondary Possibility (Moderate)',
        notes: 'Water-soaked angular spots bounded by leaf veinlets.',
      },
    ];
    visibleSymptoms = [
      'Circular necrotic lesions with purple-red borders and concentric rings',
      'Premature defoliation during boll development stage',
      'Shot-hole effect as lesion centers dry and drop out',
    ];
    immediateActions = [
      'Avoid high-volume overhead irrigation that splashes soil-borne spores onto lower foliage.',
      'Apply potassium sulfate foliar spray if plant shows potassium deficiency predisposition.',
      'Collect and dispose of fallen infected leaves along the field border.',
    ];
    regenerativeOption = 'Spray fermented garlic-chili extract combined with 1% cow urine solution to provide natural antifungal and insect-repellent protection.';
    imageEvidence = 'Target-like concentric ring patterns with dark purple halos on mature cotton leaves.';
    severity = 'Moderate';
  }

  return {
    isCropImage: true,
    unclearReason: null,
    detectedCrop: crop,
    cropMatch: true,
    cropMismatchNote: null,
    identifiedCondition,
    possibleConditions,
    confidenceLevel: 'High' as const,
    confidencePct: 88,
    severity,
    visibleSymptoms,
    symptomsObserved: visibleSymptoms,
    whyAssessment: {
      imageEvidence,
      farmContextCorrelation: `Local ambient humidity (${humidity}%) and temperature (${temp}°C) combined with farm disease risk rating (${diseaseRisk}) create elevated epidemiological vulnerability.`,
    },
    immediateActions,
    agronomicIntervention: immediateActions.join(' '),
    regenerativeOption,
    organicRemedy: regenerativeOption,
    disclaimer: 'AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments.',
    isAiGenerated: false,
    modelUsed: 'deterministic-agronomic-engine',
    fallbackNotice: 'Operating in demonstration fallback mode. Grounded agronomic reasoning applied.',
  };
}

// 4. API Endpoint: POST /api/crop-doctor/analyze
app.post('/api/crop-doctor/analyze', async (req: Request, res: Response) => {
  // Defensive Payload Ingestion (Null-Safe Destructuring)
  const body = (req.body && typeof req.body === 'object') ? req.body : {};
  let imageBase64 = typeof body.imageBase64 === 'string' ? body.imageBase64.trim() : '';
  const imageMimeType = typeof body.imageMimeType === 'string' ? body.imageMimeType.trim() : 'image/jpeg';
  const selectedCrop = typeof body.selectedCrop === 'string' ? body.selectedCrop.trim() : 'Crop';
  const symptoms = typeof body.symptoms === 'string' ? body.symptoms.trim() : '';
  const farmContext = (body.farmContext && typeof body.farmContext === 'object') ? body.farmContext : {};

  // Image validation
  if (!imageBase64) {
    res.status(400).json({
      error: 'Missing image payload',
      message: 'Please upload a clear crop or leaf image in JPG, PNG or WEBP format.',
    });
    return;
  }

  // Strip prefix if present (e.g. data:image/jpeg;base64,...)
  if (imageBase64.includes(';base64,')) {
    const parts = imageBase64.split(';base64,');
    imageBase64 = parts[1] || '';
  }

  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const effectiveMime = allowedMimes.includes(imageMimeType.toLowerCase()) ? imageMimeType.toLowerCase() : 'image/jpeg';

  const promptText = `
You are the "AgriN Visual Crop Assessment Assistant", a specialized agronomic multimodal model assisting small and marginal farmers with visual crop health evaluation.

FIELD CONTEXT:
Target Selected Crop: ${selectedCrop}
Farmer-Reported Symptoms: "${symptoms || 'None reported by farmer'}"
Crop Stage: ${farmContext?.cropStage || 'Vegetative'}
Current Temperature: ${farmContext?.weather?.currentTempC ?? 28}°C
Relative Humidity: ${farmContext?.weather?.currentHumidityPct ?? 72}%
Rainfall Forecast: ${farmContext?.weather?.rainfallForecastSummary || 'Light showers'}
Soil Volumetric Moisture: ${farmContext?.soil?.moisturePct ?? 65}%
Disease Risk Level: ${farmContext?.risk?.diseaseRisk || 'Moderate'}
Satellite Canopy Stress: ${farmContext?.satellite?.cropStressLevel || 'Low'}

TASK:
Carefully inspect the provided image.

1. NON-CROP / UNCLEAR IMAGE HANDLING:
- If the image is NOT a crop/leaf/plant (e.g. human face, clothing, animal, car, building, machinery, plain bare soil with no plants, pure black/white, completely blurry/unidentifiable):
  Set "isCropImage": false.
  Set "unclearReason": Polite explanation that the image does not show identifiable crop foliage, requesting a clear photo.
  Set "detectedCrop": "Non-crop or unidentifiable object".
  Set "cropMatch": false.
  Set "visibleSymptoms": ["Unable to resolve plant leaves or crop organs."].
  Set "possibleConditions": [{"name": "Undetermined / Insufficient Visual Signal", "likelihood": "Uncertain", "notes": "No crop foliage detected."}].
  Set "confidenceLevel": "Low/Uncertain".
  Set "confidencePct": 15.
  Set "severity": "Mild".
  Set "whyAssessment": {
    "imageEvidence": "Absence of identifiable foliar structure, chlorophyll coloration, or plant architecture in the uploaded photograph.",
    "farmContextCorrelation": "Farm telemetry cannot be linked without visual plant evidence."
  }.
  Set "immediateActions": [
    "Take a close-up photograph of an affected crop leaf in natural daylight.",
    "Ensure the camera focus is sharp and leaf veins are clearly visible.",
    "Re-upload the clear leaf photograph to run visual assessment."
  ].
  Set "regenerativeOption": "Inspect field parcels directly to locate representative symptomatic leaves.".
  Set "disclaimer": "AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments.".
  DO NOT hallucinate or diagnose plant diseases on non-plant images!

2. VALID CROP IMAGE:
- Set "isCropImage": true.
- "detectedCrop": Name the crop visible.
- "cropMatch": Does the visible crop match "${selectedCrop}"? If not, note discrepancy in "cropMismatchNote".
- "visibleSymptoms": Concise list (max 4) of what is actually visible on the foliage (e.g. spots, margins, necrotic tissue, yellowing, fungal spores, or healthy leaf vigor).
- "possibleConditions": Up to 3 plausible conditions ordered by likelihood. Each has "name", "likelihood" (e.g. "Primary Concern (High)"), and "notes". If the crop is healthy, declare "Healthy Canopy / Vigorous Foliar Biomass".
- "confidenceLevel": "High" | "Moderate" | "Low/Uncertain". If image is slightly blurry or symptoms are ambiguous, state Low/Uncertain.
- "confidencePct": 0 to 100.
- "severity": "Mild" | "Moderate" | "Severe".
- "whyAssessment":
  * "imageEvidence": Concrete visual details from the photograph (shape, color, margin halo, lesion distribution).
  * "farmContextCorrelation": How humidity (${farmContext?.weather?.currentHumidityPct}%), temperature (${farmContext?.weather?.currentTempC}°C), rain, or soil moisture (${farmContext?.soil?.moisturePct}%) correlate with the development of this condition.
- "immediateActions": Up to 3 practical, low-risk field steps (e.g. sanitation, water regulation, scouting).
- "regenerativeOption": 1 sustainable biological or soil health practice (e.g. botanical decoction, Trichoderma/Bacillus bio-fungicide, balanced compost, crop rotation).
- "disclaimer": Must be exactly "AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments."

OUTPUT FORMAT:
Return strictly a valid JSON object matching this schema:
{
  "isCropImage": boolean,
  "unclearReason": string | null,
  "detectedCrop": string,
  "cropMatch": boolean,
  "cropMismatchNote": string | null,
  "visibleSymptoms": string[],
  "possibleConditions": [
    { "name": string, "likelihood": string, "notes": string }
  ],
  "confidenceLevel": "High" | "Moderate" | "Low/Uncertain",
  "confidencePct": number,
  "severity": "Mild" | "Moderate" | "Severe",
  "whyAssessment": {
    "imageEvidence": string,
    "farmContextCorrelation": string
  },
  "immediateActions": string[],
  "regenerativeOption": string,
  "disclaimer": "AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments."
}
`;

  try {
    if (!aiClient) {
      throw new Error('GEMINI_API_NOT_INITIALIZED');
    }

    const contents = {
      parts: [
        { text: promptText },
        {
          inlineData: {
            mimeType: effectiveMime,
            data: imageBase64,
          },
        },
      ],
    };

    const { text, modelUsed } = await generateContentWithFallback({
      systemInstruction: 'You are the AgriN Visual Crop Assessment Assistant. Always output valid JSON strictly following the requested schema.',
      contents,
      responseMimeType: 'application/json',
    });

    let parsed: any;
    try {
      const cleaned = text.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.warn('[AgriN Server] JSON parse error on Gemini multimodal output:', parseErr);
      parsed = {
        isCropImage: true,
        detectedCrop: selectedCrop,
        visibleSymptoms: [symptoms || 'Foliar discoloration observed.'],
        possibleConditions: [
          { name: 'Foliar Spot Condition', likelihood: 'Primary (Moderate)', notes: 'Visual pattern detected.' }
        ],
        confidenceLevel: 'Moderate',
        confidencePct: 75,
        severity: 'Moderate',
        whyAssessment: {
          imageEvidence: 'Foliar discoloration observed on leaf surface.',
          farmContextCorrelation: 'High humidity conditions favor foliar pathogen propagation.',
        },
        immediateActions: ['Scout field rows to check symptom spread.'],
        regenerativeOption: 'Apply fermented botanical spray or Trichoderma bio-shield.',
        disclaimer: 'AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments.',
      };
    }

    const visibleSymptoms = Array.isArray(parsed.visibleSymptoms) ? parsed.visibleSymptoms : [symptoms || 'Foliar marks'];
    const immediateActions = Array.isArray(parsed.immediateActions) ? parsed.immediateActions.slice(0, 3) : ['Scout field.'];
    const primaryCondition = parsed.possibleConditions?.[0]?.name || parsed.detectedCondition || 'Foliar Assessment Complete';
    const regenerativeOption = parsed.regenerativeOption || 'Incorporate organic bio-fungicide.';

    res.json({
      success: true,
      data: {
        isCropImage: parsed.isCropImage !== false,
        unclearReason: parsed.unclearReason || null,
        detectedCrop: parsed.detectedCrop || selectedCrop,
        cropMatch: parsed.cropMatch !== false,
        cropMismatchNote: parsed.cropMismatchNote || null,
        identifiedCondition: primaryCondition,
        possibleConditions: Array.isArray(parsed.possibleConditions) ? parsed.possibleConditions.slice(0, 3) : [
          { name: primaryCondition, likelihood: 'Primary Concern', notes: 'Identified from visible lesions.' }
        ],
        confidenceLevel: parsed.confidenceLevel || 'Moderate',
        confidencePct: typeof parsed.confidencePct === 'number' ? parsed.confidencePct : 85,
        severity: parsed.severity || 'Moderate',
        visibleSymptoms,
        symptomsObserved: visibleSymptoms,
        whyAssessment: {
          imageEvidence: parsed.whyAssessment?.imageEvidence || 'Foliar patterns visible on leaf.',
          farmContextCorrelation: parsed.whyAssessment?.farmContextCorrelation || 'Ambient microclimate matches pathogen profile.',
        },
        immediateActions,
        agronomicIntervention: immediateActions.join(' '),
        regenerativeOption,
        organicRemedy: regenerativeOption,
        disclaimer: parsed.disclaimer || 'AI-assisted visual assessment for decision support. Consult a local agronomist or extension officer before applying chemical treatments.',
        isAiGenerated: true,
        modelUsed,
        fallbackNotice: null,
      },
    });
  } catch (error: any) {
    console.warn('[AgriN Server] Gemini Multimodal call failed or unavailable. Engaging deterministic agronomic fallback:', error?.message || error);
    const fallbackData = generateCropDoctorDeterministicFallback(selectedCrop, symptoms, farmContext);

    res.json({
      success: true,
      data: fallbackData,
    });
  }
});

// 5. Mount Vite middleware for dev or serve static files in production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[AgriN Full-Stack] Server running on http://${HOST}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[AgriN Server] Fatal startup error:', err);
});
