/**
 * Synthetic Clinical Corpus and Interactive Simulation Engines
 * Used for:
 * 1. Clinical RAG Retrieval Lab
 * 2. Clinivara Document Intelligence Walkthrough
 * 3. Agentic Clinical RAG LangGraph Explorer
 * 
 * DISCLAIMER: All data contained herein is 100% synthetic and generated
 * for computer science and engineering demonstration purposes only.
 * Not for medical diagnostic use or real patient care.
 */

export const SYNTHETIC_CORPUS = [
  {
    id: "CLIN-01",
    title: "Metformin Renal Thresholds & Lactic Acidosis Guidelines",
    category: "Pharmacology & Endocrinology",
    content: "Metformin is the first-line oral hypoglycemic agent for type 2 diabetes mellitus. However, metformin is primarily cleared by the kidneys via tubular secretion. When estimated glomerular filtration rate (eGFR) falls below 45 mL/min/1.73m2, the risk of metformin-associated lactic acidosis (MALA) escalates significantly. Clinical recommendations dictate: if eGFR is between 30 and 44 mL/min/1.73m2, reduce maximum daily dosage to 1000 mg (or 500 mg twice daily), monitor renal panels quarterly, and withhold therapy prior to iodinated contrast procedures. Metformin is strictly contraindicated if eGFR drops below 30 mL/min/1.73m2 due to high mortality rates associated with severe metabolic acidosis.",
    keywords: ["metformin", "egfr", "kidney", "renal", "lactic", "acidosis", "diabetes", "dose", "contraindication"]
  },
  {
    id: "CLIN-02",
    title: "Pediatric Acute Asthma Exacerbation Management",
    category: "Pediatric Pulmonology",
    content: "Initial clinical assessment of acute pediatric asthma exacerbation requires evaluating work of breathing, accessory muscle use, oxygen saturation, and peak expiratory flow. Mild-to-moderate episodes should be managed immediately with inhaled short-acting beta-2 agonists (albuterol 4-8 puffs via metered-dose inhaler with spacer every 20 minutes for 3 doses) combined with oral corticosteroids (prednisolone 1-2 mg/kg, max 50 mg). In severe exacerbations refractory to beta-agonists, add inhaled ipratropium bromide (0.25-0.5 mg) and consider intravenous magnesium sulfate (50 mg/kg over 20 minutes). High-flow supplemental oxygen must target SpO2 levels between 94% and 98%.",
    keywords: ["asthma", "pediatric", "albuterol", "steroid", "ipratropium", "wheezing", "exacerbation", "magnesium"]
  },
  {
    id: "CLIN-03",
    title: "Atrial Fibrillation Stroke Prophylaxis & DOAC Dosing",
    category: "Cardiology & Hematology",
    content: "In non-valvular atrial fibrillation (AFib), oral anticoagulation reduces systemic thromboembolism and ischemic stroke risk. The CHA2DS2-VASc score stratifies annual stroke risk. Male patients with score >= 2 and female patients with score >= 3 warrant direct oral anticoagulants (DOACs: apixaban, rivaroxaban, dabigatran, or edoxaban) in preference to warfarin. Standard apixaban dosing is 5 mg twice daily. Dose reduction to 2.5 mg twice daily is mandatory if the patient meets at least two of three criteria: age >= 80 years, body weight <= 60 kg, or serum creatinine >= 1.5 mg/dL. Renal function must be routinely audited via Cockcroft-Gault creatinine clearance calculation.",
    keywords: ["atrial", "fibrillation", "anticoagulation", "apixaban", "stroke", "doac", "cha2ds2", "creatinine"]
  },
  {
    id: "CLIN-04",
    title: "Diabetic Ketoacidosis (DKA) Intravenous Fluid & Insulin Protocol",
    category: "Emergency & Critical Care",
    content: "Diabetic Ketoacidosis is characterized by the diagnostic triad of hyperglycemia (glucose > 250 mg/dL), metabolic acidosis (arterial pH < 7.30 or serum bicarbonate < 18 mEq/L), and positive serum/urine ketones. Fluid resuscitation takes priority: infuse isotonic 0.9% NaCl at 1000-1500 mL/hr during the first hour. Before initiating intravenous regular insulin infusion (0.1 units/kg/hr), serum potassium must be confirmed above 3.3 mEq/L to prevent fatal arrhythmias and cardiac arrest. If potassium is below 3.3 mEq/L, withhold insulin and infuse potassium chloride until levels exceed 3.5 mEq/L. Target blood glucose drop of 50-75 mg/dL per hour.",
    keywords: ["dka", "insulin", "potassium", "ketones", "hyperglycemia", "acidosis", "fluids", "saline"]
  },
  {
    id: "CLIN-05",
    title: "Surviving Sepsis Campaign: 1-Hour Bundle Recommendations",
    category: "Infectious Disease & Critical Care",
    content: "The Hour-1 Sepsis Bundle requires urgent initiation upon identifying septic shock or sepsis-induced hypoperfusion (mean arterial pressure < 65 mmHg or serum lactate > 2 mmol/L). Five mandatory interventions: (1) measure blood lactate levels immediately and remeasure within 2-4 hours if initial level > 2 mmol/L; (2) obtain blood cultures prior to administering broad-spectrum antimicrobials; (3) infuse empiric broad-spectrum antibiotics within 60 minutes; (4) rapidly administer 30 mL/kg balanced crystalloids for hypotension or lactate >= 4 mmol/L; (5) apply vasopressors (norepinephrine first-line) during or after fluid resuscitation to sustain MAP >= 65 mmHg.",
    keywords: ["sepsis", "shock", "lactate", "bundle", "norepinephrine", "crystalloids", "antibiotics", "cultures"]
  },
  {
    id: "CLIN-06",
    title: "ACE-Inhibitor Induced Angioedema & Bradykinin Pathways",
    category: "Emergency Pharmacology",
    content: "Angiotensin-converting enzyme (ACE) inhibitors (such as enalapril, lisinopril, ramipril) inhibit the breakdown of both angiotensin I and bradykinin. Elevated bradykinin levels can precipitate non-histaminergic angioedema involving the tongue, lips, soft palate, and larynx. Unlike allergic histamine-mediated urticaria, ACE-inhibitor angioedema does not typically feature pruritus or cutaneous hives and is often unresponsive to antihistamines and epinephrine. Immediate management prioritizes securing the airway through early endotracheal intubation or surgical cricothyroidotomy if airway compromise progresses. ACE inhibitors must be permanently discontinued and recorded as a severe drug allergy.",
    keywords: ["ace", "angioedema", "bradykinin", "lisinopril", "airway", "intubation", "swelling", "allergy"]
  },
  {
    id: "CLIN-07",
    title: "Community-Acquired Pneumonia (CAP) Severity Scoring (CURB-65)",
    category: "Pulmonology & Internal Medicine",
    content: "The CURB-65 score stratifies 30-day mortality risk in patients with community-acquired pneumonia to guide outpatient versus inpatient hospitalization. One point each for: Confusion (abbreviated mental test <= 8), Urea > 7 mmol/L (BUN > 19 mg/dL), Respiratory rate >= 30 breaths/min, Blood pressure (systolic < 90 mmHg or diastolic <= 60 mmHg), and Age >= 65 years. Score 0-1: low risk (mortality < 3%), outpatient management appropriate. Score 2: moderate risk (mortality ~9%), short inpatient stay or close hospital outpatient surveillance. Score 3-5: high risk (mortality 15-40%), immediate inpatient admission required, with score 4-5 evaluated for Intensive Care Unit (ICU) level monitoring.",
    keywords: ["pneumonia", "curb65", "urea", "respiratory", "confusion", "mortality", "inpatient", "outpatient"]
  },
  {
    id: "CLIN-08",
    title: "Acute Pancreatitis Early Enteral Feeding and Fluid Strategy",
    category: "Gastroenterology",
    content: "Early management of acute pancreatitis focuses on aggressive goal-directed crystalloid hydration (Lactated Ringer's solution preferred over normal saline) administered at 5-10 mL/kg/hr during the initial 12-24 hours. Serial assessment of hematocrit, BUN, and urine output (target > 0.5 mL/kg/hr) monitors fluid responsiveness. Contrary to historical 'nil per os' practice, early oral solid or liquid feeding is indicated as soon as abdominal pain subsides and ileus resolves. In severe necrotizing pancreatitis, enteral tube nutrition (nasojejunal or nasogastric) is superior to total parenteral nutrition (TPN) in preventing infectious complications and multi-organ failure.",
    keywords: ["pancreatitis", "hydration", "lactated", "ringers", "enteral", "nutrition", "amylase", "lipase"]
  },
  {
    id: "CLIN-09",
    title: "Statin-Associated Muscle Symptoms (SAMS) & Statin Rechallenge",
    category: "Preventive Cardiology & Lipidology",
    content: "Statin-associated muscle symptoms (SAMS) include myalgia, muscle weakness, cramps, and in rare severe scenarios, rhabdomyolysis accompanied by marked creatine kinase (CK) elevation (> 10x upper limit of normal) and myoglobinuria. If mild bilateral proximal myalgia arises without CK elevation, temporarily discontinue the statin for 2-4 weeks until symptoms resolve completely. Confirm causality by rechallenge with the same statin at a lower dose or switch to a pharmacokinetically distinct agent (e.g., hydrophilic rosuvastatin or pravastatin versus lipophilic atorvastatin). Non-statin alternatives like ezetimibe and PCSK9 inhibitors provide secondary LDL reduction if statin intolerance persists.",
    keywords: ["statin", "myalgia", "sams", "cholesterol", "atorvastatin", "rosuvastatin", "creatine", "kinase"]
  },
  {
    id: "CLIN-10",
    title: "Chronic Kidney Disease Anemia: ESA Initiation & Iron Saturation",
    category: "Nephrology",
    content: "In non-dialysis chronic kidney disease (CKD) stages 3 to 5, anemia of CKD develops due to declining endogenous erythropoietin synthesis and disordered iron homeostasis. Before initiating Erythropoiesis-Stimulating Agents (ESAs: epoetin alfa, darbepoetin alfa), iron deficiency must be corrected. Target transferrin saturation (TSAT) > 20% and serum ferritin > 100 ng/mL prior to ESA administration. KDIGO guidelines advise initiating ESAs only when hemoglobin falls below 10.0 g/dL. Dosing must not target normal hemoglobin levels (> 11.5 g/dL) due to documented excess cardiovascular morbidity, ischemic stroke risk, and venous thromboembolic events.",
    keywords: ["ckd", "kidney", "anemia", "esa", "erythropoietin", "ferritin", "hemoglobin", "iron"]
  }
];

// Pre-tokenized inverted vocabulary for client-side BM25
const BM25_K1 = 1.2;
const BM25_B = 0.75;

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(t => t.length > 2);
}

// Generate chunk slices from text
export function createChunks(doc, chunkSizeTokens, overlapTokens) {
  const words = doc.content.split(/\s+/);
  const chunks = [];
  let start = 0;
  let chunkIdx = 0;

  while (start < words.length) {
    const end = Math.min(start + chunkSizeTokens, words.length);
    const chunkWords = words.slice(start, end);
    chunks.push({
      id: `${doc.id}-C${chunkIdx + 1}`,
      docId: doc.id,
      docTitle: doc.title,
      category: doc.category,
      text: chunkWords.join(" "),
      tokenCount: chunkWords.length,
      startOffset: start,
      endOffset: end
    });
    chunkIdx++;
    if (end >= words.length) break;
    start += Math.max(1, chunkSizeTokens - overlapTokens);
  }
  return chunks;
}

// Client-side BM25 scoring
export function scoreBM25(queryTokens, chunk, allChunks) {
  const chunkTokens = tokenize(chunk.text);
  const docLen = chunkTokens.length;
  const avgDocLen = allChunks.reduce((acc, c) => acc + tokenize(c.text).length, 0) / (allChunks.length || 1);

  // Term frequencies
  const tf = {};
  chunkTokens.forEach(t => { tf[t] = (tf[t] || 0) + 1; });

  let score = 0;
  const totalChunks = allChunks.length;

  queryTokens.forEach(qToken => {
    if (!tf[qToken]) return;
    // Count docs containing token
    const docCount = allChunks.filter(c => tokenize(c.text).includes(qToken)).length;
    const idf = Math.log(1 + (totalChunks - docCount + 0.5) / (docCount + 0.5));
    const termFreq = tf[qToken];
    const numerator = termFreq * (BM25_K1 + 1);
    const denominator = termFreq + BM25_K1 * (1 - BM25_B + BM25_B * (docLen / avgDocLen));
    score += idf * (numerator / denominator);
  });

  return Math.max(0, score);
}

// Lightweight Dense Semantic Simulator (simulates bi-encoder cosine similarity on clinical semantic topics)
export function scoreSemanticDense(query, chunk) {
  const qLower = query.toLowerCase();
  const cLower = chunk.text.toLowerCase();
  const docLower = chunk.docTitle.toLowerCase();

  // Concept vectors matching clinical topic clusters
  const conceptClusters = [
    { name: "renal_metformin", terms: ["metformin", "egfr", "kidney", "renal", "creatinine", "acidosis", "filtration"], docId: "CLIN-01" },
    { name: "pediatric_asthma", terms: ["asthma", "child", "pediatric", "albuterol", "wheezing", "inhaler", "steroid"], docId: "CLIN-02" },
    { name: "afib_anticoagulation", terms: ["afib", "atrial", "fibrillation", "apixaban", "stroke", "anticoagulant", "doac"], docId: "CLIN-03" },
    { name: "dka_insulin", terms: ["dka", "ketoacidosis", "insulin", "potassium", "glucose", "ketones"], docId: "CLIN-04" },
    { name: "sepsis_lactate", terms: ["sepsis", "septic", "shock", "lactate", "bundle", "hypotension", "infection"], docId: "CLIN-05" },
    { name: "ace_angioedema", terms: ["ace", "angioedema", "swelling", "bradykinin", "lisinopril", "intubation", "airway"], docId: "CLIN-06" },
    { name: "pneumonia_curb", terms: ["pneumonia", "curb", "lung", "respiratory", "infiltrate", "cough", "fever"], docId: "CLIN-07" },
    { name: "pancreatitis", terms: ["pancreatitis", "amylase", "lipase", "abdominal", "pancreas", "hydration"], docId: "CLIN-08" },
    { name: "statin_myopathy", terms: ["statin", "muscle", "myalgia", "atorvastatin", "cholesterol", "rhabdomyolysis"], docId: "CLIN-09" },
    { name: "ckd_anemia", terms: ["anemia", "erythropoietin", "esa", "ferritin", "hemoglobin", "iron", "dialysis"], docId: "CLIN-10" }
  ];

  let denseScore = 0.05; // baseline noise floor

  conceptClusters.forEach(cluster => {
    const qMatches = cluster.terms.filter(t => qLower.includes(t)).length;
    if (qMatches > 0) {
      if (chunk.docId === cluster.docId) {
        denseScore += 0.45 * Math.min(1.0, qMatches / 2);
        // Boost for specific clinical terms occurring in the chunk
        const cMatches = cluster.terms.filter(t => cLower.includes(t)).length;
        denseScore += 0.35 * Math.min(1.0, cMatches / 3);
      } else {
        // Semantic cross-concept leakage (simulating cosine vector overlap in general embedding spaces)
        if (["CLIN-01", "CLIN-03", "CLIN-10"].includes(chunk.docId) && ["CLIN-01", "CLIN-03", "CLIN-10"].includes(cluster.docId)) {
          denseScore += 0.15; // shared renal / nephrology semantic subspace
        }
      }
    }
  });

  return Math.min(0.98, denseScore);
}

// Master search executor for the RAG lab
export function executeRAGSearch(query, { chunkSize = 64, chunkOverlap = 16, topK = 3, mode = "hybrid", alpha = 0.6 }) {
  const queryTokens = tokenize(query);
  let allChunks = [];

  SYNTHETIC_CORPUS.forEach(doc => {
    const docChunks = createChunks(doc, chunkSize, chunkOverlap);
    allChunks = allChunks.concat(docChunks);
  });

  // Calculate scores
  const results = allChunks.map(chunk => {
    const bm25 = scoreBM25(queryTokens, chunk, allChunks);
    const dense = scoreSemanticDense(query, chunk);
    
    // Normalize BM25 approximately into [0, 1] for linear fusion
    const bm25Norm = 1 / (1 + Math.exp(-bm25 + 2));

    let finalScore = 0;
    if (mode === "bm25") {
      finalScore = bm25Norm;
    } else if (mode === "dense") {
      finalScore = dense;
    } else {
      // Hybrid weighted linear combination
      finalScore = (alpha * dense) + ((1 - alpha) * bm25Norm);
    }

    return {
      chunk,
      bm25Score: Number(bm25.toFixed(3)),
      bm25Norm: Number(bm25Norm.toFixed(3)),
      denseScore: Number(dense.toFixed(3)),
      finalScore: Number(finalScore.toFixed(3))
    };
  });

  // Sort descending by finalScore
  results.sort((a, b) => b.finalScore - a.finalScore);

  return {
    totalChunks: allChunks.length,
    topKResults: results.slice(0, topK),
    allRanked: results
  };
}

// ==========================================
// 2. CLINIVARA PIPELINE DEMO DATA & LOGIC
// ==========================================

export const SYNTHETIC_CLINICAL_REPORT = {
  metadata: {
    sampleId: "SYNTH-LAB-2026-881",
    facility: "Lifecare Multispeciality Hospital, Pune",
    type: "Comprehensive Metabolic & Lipid Diagnostic Panel"
  },
  rawText: `LIFECARE MULTISPECIALITY HOSPITAL & RESEARCH CENTRE
Survey No. 44/2, Senapati Bapat Road, Pune - 411016
CLINICAL BIOCHEMISTRY DEPARTMENT - CONFIDENTIAL LAB REPORT

Patient Name: Rajesh Mahadev Gore
Age/Gender: 52 Years / Male
Mobile: +91 94239-81204
Aadhaar ID: 7841-2394-8812
Referring Physician: Dr. Vikram Joshi, MD (Internal Medicine)
Collection Date: 14-Oct-2026  07:30 AM
Reporting Date: 14-Oct-2026  02:15 PM

INVESTIGATION RESULTS:
Test Name                       Observed Value    Reference Range      Units
Fasting Plasma Glucose (FPG)    168               70 - 99              mg/dL (HIGH)
Glycated Hemoglobin (HbA1c)     8.6               < 5.7                % (POOR CONTROL)
Estimated Average Glucose (eAG) 200               -                    mg/dL
Serum Creatinine                1.8               0.7 - 1.2            mg/dL (ELEVATED)
eGFR (CKD-EPI equation)         42                > 90                 mL/min/1.73m2 (STAGE 3B CKD)
Blood Urea Nitrogen (BUN)       32                7 - 20               mg/dL (ELEVATED)
Serum Total Cholesterol         242               < 200                mg/dL (ELEVATED)
Triglycerides                   218               < 150                mg/dL (BORDERLINE HIGH)
HDL Cholesterol                 38                > 40                 mg/dL (LOW)
LDL Cholesterol (calculated)    160               < 100                mg/dL (HIGH)

CLINICAL IMPRESSION:
Consistent with uncontrolled Type 2 Diabetes Mellitus with Stage 3b Chronic Kidney Disease and combined dyslipidemia.
Recommendation: Immediate physician consultation for glycemic management adjustment and renal preservation.`,

  piiEntities: [
    { entity: "PATIENT_NAME", text: "Rajesh Mahadev Gore", start: 204, end: 224, mask: "[REDACTED_PATIENT_NAME]" },
    { entity: "PHONE_NUMBER", text: "+91 94239-81204", start: 256, end: 271, mask: "[REDACTED_PHONE_NUMBER]" },
    { entity: "GOVERNMENT_ID", text: "7841-2394-8812", start: 284, end: 298, mask: "[REDACTED_AADHAAR_ID]" },
    { entity: "DOCTOR_NAME", text: "Dr. Vikram Joshi, MD", start: 320, end: 340, mask: "[REDACTED_PHYSICIAN]" }
  ],

  extractedClinicalEntities: [
    { name: "Fasting Plasma Glucose", value: 168, unit: "mg/dL", status: "HIGH", severity: "warning", normalRange: "70 - 99" },
    { name: "HbA1c", value: 8.6, unit: "%", status: "POOR CONTROL", severity: "danger", normalRange: "< 5.7" },
    { name: "Serum Creatinine", value: 1.8, unit: "mg/dL", status: "ELEVATED", severity: "warning", normalRange: "0.7 - 1.2" },
    { name: "eGFR", value: 42, unit: "mL/min/1.73m2", status: "STAGE 3B CKD", severity: "danger", normalRange: "> 90" },
    { name: "Total Cholesterol", value: 242, unit: "mg/dL", status: "ELEVATED", severity: "warning", normalRange: "< 200" },
    { name: "LDL Cholesterol", value: 160, unit: "mg/dL", status: "HIGH", severity: "danger", normalRange: "< 100" }
  ],

  validationGates: [
    { rule: "Pydantic Schema Check", status: "PASSED", detail: "All 10 biomarker types and units verified against ontology." },
    { rule: "Biological Range Plausibility", status: "PASSED", detail: "Values within physiologically possible limits (e.g. HbA1c 8.6% within [3.0, 20.0%])." },
    { rule: "eGFR vs Creatinine Inversion Check", status: "PASSED", detail: "Creatinine elevation (1.8) appropriately inversely correlates with reduced eGFR (42)." },
    { rule: "PII Sanitization Pre-Gate", status: "PASSED", detail: "Zero occurrences of names, phone numbers, or national IDs in LLM payload buffer." }
  ],

  multilingualSummaries: {
    en: "Summary: The report indicates elevated blood sugar (HbA1c 8.6%) and reduced kidney filtration function (eGFR 42 mL/min). Clinical guidelines recommend adjusting medication dosages (specifically evaluating metformin contraindications) and consulting a physician for renal protection and cholesterol management.",
    hi: "रिपोर्ट सारांश: इस रिपोर्ट से पता चलता है कि रक्त शर्करा (HbA1c 8.6%) अनियंत्रित है और गुर्दे की कार्यक्षमता (eGFR 42 mL/min) कम हो गई है। दिशानिर्देश दवाओं की खुराक समायोजित करने और गुर्दे की सुरक्षा के लिए तुरंत डॉक्टर से परामर्श करने की सलाह देते हैं।",
    mr: "अहवाल सारांश: रक्तातील साखरेचे प्रमाण (HbA1c 8.6%) वाढलेले असून मूत्रपिंडाची गाळण क्षमता (eGFR 42 mL/min) कमी झाल्याचे दिसून येते. औषधांच्या डोसमध्ये योग्य बदल करण्यासाठी आणि किडनीच्या संरक्षणासाठी डॉक्टरांचा त्वरित सल्ला घ्यावा."
  }
};

// ==========================================
// 3. AGENTIC MEDICAL RAG LANGGRAPH TRACE
// ==========================================

export const AGENTIC_RAG_TRACE = {
  query: "Patient with eGFR 42 mL/min and HbA1c 8.6% — recommend Metformin dosage adjustment and evaluate contraindications.",
  workflowGraph: [
    {
      step: 1,
      nodeId: "entry_point",
      agentName: "Encounter Gateway",
      icon: "fa-door-open",
      role: "Receives clinical query, validates schema, and initializes multi-agent state dictionary.",
      inputState: {
        query: "Patient with eGFR 42 mL/min and HbA1c 8.6%...",
        session_id: "langgraph-audit-session-984",
        retrieved_documents: [],
        safety_status: "PENDING",
        skeptic_objections: [],
        final_answer: null
      },
      agentReasoning: "Validating clinical query length and sanitizing prompt boundary tokens. Passing initialized state to Researcher Agent.",
      outputState: {
        state: "INITIALIZED",
        next_node: "researcher"
      }
    },
    {
      step: 2,
      nodeId: "researcher",
      agentName: "Researcher Agent",
      icon: "fa-search",
      role: "Executes calibrated hybrid search (BM25 + Dense SentenceTransformers) against clinical vector index.",
      inputState: {
        active_query: "Metformin dosage adjustment eGFR 42 renal threshold lactic acidosis"
      },
      agentReasoning: "Expanded query with clinical synonyms ('renal threshold', 'lactic acidosis'). Executed hybrid fusion search against ChromaDB index. Retrieved CLIN-01 with confidence 0.942.",
      outputState: {
        retrieved_documents: [
          {
            doc_id: "CLIN-01",
            title: "Metformin Renal Thresholds & Lactic Acidosis Guidelines",
            relevance_score: 0.942,
            snippet: "if eGFR is between 30 and 44 mL/min/1.73m2, reduce maximum daily dosage to 1000 mg..."
          }
        ],
        next_node: "skeptic"
      }
    },
    {
      step: 3,
      nodeId: "skeptic",
      agentName: "Skeptic Agent (Safety Gate)",
      icon: "fa-shield-halved",
      role: "Audits retrieved documents for contraindications, black-box warnings, and out-of-scope retrieval leakage.",
      inputState: {
        candidate_docs: ["CLIN-01"],
        patient_biomarkers: { eGFR: 42, HbA1c: 8.6 }
      },
      agentReasoning: "Auditing CLIN-01: Patient eGFR of 42 mL/min falls into the 30-44 mL/min risk band. Safety flag raised: Full metformin dose (2000mg) is contraindicated due to lactic acidosis risk. Required action: Enforce 1000mg ceiling and mandate renal monitoring.",
      outputState: {
        safety_status: "CAUTION_REQUIRED",
        skeptic_objections: [
          "Patient eGFR 42 mL/min requires dose ceiling <= 1000 mg/day",
          "Mandatory withhold prior to iodinated contrast procedures"
        ],
        next_node: "scribe"
      }
    },
    {
      step: 4,
      nodeId: "scribe",
      agentName: "Scribe Agent",
      icon: "fa-pen-to-square",
      role: "Synthesizes final answer with strict evidence grounding and structured citation provenance.",
      inputState: {
        verified_evidence: ["CLIN-01"],
        safety_constraints: ["eGFR <= 44 requires max dose 1000mg/day"]
      },
      agentReasoning: "Composing structured clinical response. Every clinical claim mapped to citation [CLIN-01]. Formulated explicit caution regarding lactic acidosis.",
      outputState: {
        final_answer: "For a patient with eGFR 42 mL/min/1.73m2, metformin therapy must be adjusted: reduce maximum daily dose to 1000 mg (e.g., 500 mg twice daily) [CLIN-01]. Therapy is contraindicated if eGFR drops below 30 mL/min [CLIN-01]. Renal function and serum creatinine must be monitored quarterly.",
        citations: [{ id: "CLIN-01", title: "Metformin Renal Thresholds & Lactic Acidosis Guidelines" }],
        next_node: "historian"
      }
    },
    {
      step: 5,
      nodeId: "historian",
      agentName: "Historian Agent",
      icon: "fa-clock-rotate-left",
      role: "Maintains encounter history, serializes execution state, and appends audit log for compliance.",
      inputState: {
        execution_trace_ready: true
      },
      agentReasoning: "Logged state transition history. Verified that 0 ungrounded claims entered final synthesis. Stored audit payload in session store.",
      outputState: {
        session_persisted: true,
        audit_status: "VERIFIED_GROUNDED",
        tests_passed: "61/61 automated tests passing in repo CI"
      }
    }
  ]
};

