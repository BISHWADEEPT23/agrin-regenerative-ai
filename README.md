# AgriN — Regenerative Agricultural Intelligence Network

**Local Intelligence. Regenerative Farming. Shared Resilience.**

AgriN is a digital agriculture intelligence network prototype designed to empower small and marginal farmers with hyper-local, actionable agronomic intelligence. Inspired by the BRICS agricultural cooperation theme, AgriN demonstrates how farm data, soil-health indicators, meteorological forecasts, and satellite-derived vegetation indicators can be synthesized into regenerative farming roadmaps and cross-border knowledge exchange.

---

## Architectural Blueprint (Builds 01–06)

1. **Deterministic Intelligence Layer (`src/services/intelligenceEngine.ts`)**:
   - **Farm Context Engine**: Exposes a unified data context for the active farm, powering Soil, Weather, Satellite, Risk, and Regenerative reasoning.
   - **Soil Intelligence**: Quantitative chemical scoring (0–100), categorization (Healthy, Monitor, Needs Attention, High Concern), max 3 observations, and 3 recommended soil actions with "Why?" rationales.
   - **Weather Intelligence**: Automated risk calculation (Low, Moderate, High), agricultural implications (heat stress, irrigation window, fungal risk), and actionable field recommendations.
   - **Satellite Intelligence**: NDVI canopy classification (Healthy, Monitor, Stressed) with field check protocols and explicit notice that NDVI alone does not diagnose specific etiology.
   - **Farm Risk Engine**: Multi-factorial deterministic synthesis (Soil + Weather + Canopy Stress + Disease Pressure = 0–100 Farm Risk Score) classified into LOW (0–29), MODERATE (30–59), HIGH (60–79), and CRITICAL (80–100) with primary risk drivers.
   - **Regenerative Intelligence**: Automated identification of the 3 weakest dimensions among the 6 pillars, generating tailored recommendations with impact estimates.
   - **Today's Farm Intelligence**: Prominent executive summary on Overview with calculated Priority Today advisory and interactive "Why?" explainability.

2. **Gemini Agri Advisor (`server.ts` & `src/components/views/AgriAdvisorView.tsx`)**:
   - **Grounded AI Workflow**: Farmer Question + Farm Context + Soil/Weather/Satellite Intelligence + Risk Index + Regenerative Score $\rightarrow$ Server-Side Gemini API Proxy $\rightarrow$ Localized Agronomic Advisory.
   - **Zero Client API Key Leakage**: All `@google/genai` calls execute through server-side proxy route (`POST /api/advisor/chat`) with `User-Agent: aistudio-build`.
   - **Resilient Fallback Ladder**: Automated sequential fallback ladder (`gemini-3.6-flash` $\rightarrow$ `gemini-3.1-flash-lite` $\rightarrow$ `gemini-flash-latest` $\rightarrow$ `gemini-3.7-flash` $\rightarrow$ deterministic rule matrix) ensuring zero downtime.
   - **Structured Response Format**: Returns Situation, Recommended Actions (max 3), "Why" rationale, "Watch For" warning signs, Regenerative Option, and Confidence.
   - **Auditable Evidence Used Panel**: Compact expandable view exposing verified deterministic telemetry (Soil moisture, rainfall forecast, NDVI, weather risk, farm risk score) directly from Build 02.
   - **Multilingual Support**: Real-time language switching across English, Hindi (हिंदी), Portuguese (Português), Russian (Русский), and Chinese (中文).

3. **Gemini Multimodal Crop Doctor (`server.ts` & `src/components/views/CropDoctorView.tsx`)**:
   - **Multimodal Visual Analysis**: Accepts leaf/foliage photographs (JPG, PNG, WebP) along with active farm microclimate telemetry.
   - **Safety & Non-Crop Guardrails**: Automatically identifies non-crop/blurry uploads, restrains from fabricating disease diagnoses, flags `Low/Uncertain` confidence, and prompts for an in-focus leaf photo.
   - **Diagnostic Assessment Card**: Outputs Detected Crop (with mismatch notes), Visible Symptoms, Possible Conditions (max 3 ranked by likelihood), Confidence, Segmented "Why?" (Image Evidence + Farm Context Correlation), Immediate Next Actions, and Sustainable Regenerative Options.
   - **Verified Presets**: 4 built-in benchmark specimen cases (Rice Blast, Soybean Rust, Maize Blight, Healthy Crop Reference).

4. **Regional Risk Intelligence (`src/components/views/RegionalIntelligenceView.tsx`)**:
   - **Macro Telemetry**: Computes total acreage (56.4 ha), 8 represented crops, network averages for Soil Health, NDVI, Farm Risk, and Regenerative Score across all 12 holdings.
   - **Zone Intelligence**: Identifies the **Highest-Risk Zone** with one-click filtering.
   - **Agricultural Risk Table**: Sortable and filterable by Zone, Crop, and Risk Level with direct holding context inspection.
   - **Emerging Signals & Priorities**: Deterministically generated regional alerts and decision-support priorities.

5. **AgriN Exchange (`src/components/views/ExchangeView.tsx`)**:
   - **Digital Public Infrastructure (DPI)**: Open standards, modular architecture, and local data sovereignty (algorithms and schemas travel; raw farmer identities remain sovereign).
   - **5 Country Packages**: Synthetic models from Brazil (*Embrapa Soja*), Russia (*Vavilov Institute*), India (*ICAR*), China (*CAAS*), and South Africa (*ARC*).
   - **Simulate Import Sandbox**: Validates data contracts and enforces the mandatory **LOCAL VALIDATION REQUIRED** principle.

---

## Agentic Threat Modeling & Security Principles

| Threat Zone | Identified Attack Vector | Countermeasure Implemented |
| :--- | :--- | :--- |
| **Input Surfaces** | Malicious MIME spoofing or oversized base64 payload uploads via Crop Doctor | Strict client & server-side whitelist (`image/jpeg`, `image/jpg`, `image/png`, `image/webp`), 10MB payload ceiling in Express, and defensive base64 stripping before passing to GenAI SDK. |
| **Planning & Reasoning** | Prompt injection via crafted farmer queries attempting to bypass safety disclaimers | Farm context and farmer queries are strictly isolated as plain data strings within a constrained prompt template; temperature set low (`0.2`); schema strictly enforced via `responseMimeType: 'application/json'`. |
| **Tool Execution** | Dynamic model execution failure, HTTP 429/503 exhaustion, or unconfigured API keys | Resilient 4-tier model fallback ladder (`gemini-3.6-flash` $\rightarrow$ `gemini-3.1-flash-lite` $\rightarrow$ `gemini-flash-latest` $\rightarrow$ `gemini-3.7-flash`) with automatic failover to a deterministic agronomic fallback engine. |
| **Memory & State** | Cross-border data leakage or sovereign data exfiltration | Architectural data isolation enforces that algorithms and metadata schemas travel, while sovereign farm-level records, farmer identities, and raw coordinates never leave the local environment. |
| **Inter-System Communication** | Leakage of server-side `GEMINI_API_KEY` to client bundles | Gemini SDK instantiated exclusively on the Node.js Express backend (`server.ts`); client interacts solely via proxy endpoints (`/api/advisor/chat` and `/api/crop-doctor/analyze`). |

---

## Cloud Run & Production Deployment Guide

Follow these steps to configure, secure, and deploy AgriN to Google Cloud Run with secret management and secure Firestore rules.

### 1. Environment & Prerequisites

Ensure the `gcloud` CLI is installed and authenticated:

```bash
# Set your target project ID, region, and service name
export PROJECT_ID="YOUR_PROJECT_ID"
export REGION="us-central1"
export SERVICE_NAME="agrin-platform"

gcloud config set project $PROJECT_ID

# Enable required Google Cloud APIs
gcloud services enable \
  run.googleapis.com \
  secretmanager.googleapis.com \
  firestore.googleapis.com \
  cloudbuild.googleapis.com
```

### 2. Secret Management Setup

Store `GEMINI_API_KEY` securely in Google Cloud Secret Manager and grant access to the Cloud Run runtime service account:

```bash
# Create and populate the secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Retrieve your project number
export PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format="value(projectNumber)")

# Grant the default Cloud Run service account access to read the secret
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 3. Database Security Configuration (Firestore Rules)

Deploy secure, owner-bound security rules to isolate user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Deploy the rules file via the Firebase CLI:

```bash
firebase deploy --only firestore:rules
```

### 4. Cloud Run Deployment Flow

Deploy the full-stack container application to Cloud Run:

```bash
# Deploy from source using Cloud Build and Cloud Run
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region $REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-secrets="GEMINI_API_KEY=GEMINI_API_KEY:latest"
```

### 5. Required Campaign Labeling

Apply the mandatory challenge label to register the service for automated verification:

```bash
gcloud run services update $SERVICE_NAME \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region=$REGION
```

---

## Local Development & Build Verification

```bash
# Install dependencies
npm install

# Run full-stack dev server
npm run dev

# Run TypeScript lint verification
npm run lint

# Compile production bundle
npm run build
```

---

## Prototype Integrity & Data Transparency

* **Synthetic Demonstration Data**: All meteorological, soil chemical, and satellite vegetation metrics are deterministic prototype records designed for smallholder demonstration.
* **Non-Affiliation**: AgriN Exchange is a conceptual demonstration of multilateral interoperability and is not connected to live government production servers.
* **Local Validation Principle**: Models shared across agro-ecological zones require ground-truthed local calibration prior to operational deployment.
