/**
 * Engineering Decision Journal ("Behind the Build")
 * In-depth technical articles articulating real engineering decisions,
 * trade-offs, failures, and empirical results.
 */

export const DECISION_JOURNAL = [
  {
    id: "decision-clinivara-pii",
    title: "Why Clinical PII De-Identification Must Precede LLM Processing",
    project: "Clinivara",
    category: "Security & Healthcare Privacy",
    date: "February 2026",
    readingTime: "4 min read",
    summary: "Commercial LLM APIs cannot be treated as secure enclaves for raw clinical data. We engineered a local, multi-stage PII detection gate before any model inference.",
    problem: "When clinicians or patients ingest unstructured laboratory PDFs, raw documents contain high-risk identity markers (patient names, phone numbers, Aadhaar/national IDs, dates of birth, doctor signatures) juxtaposed directly beside sensitive clinical biomarkers (HbA1c, eGFR, oncology markers). Relying on the LLM itself to 'ignore' or 'anonymize' personal data via prompting is fundamentally unsafe: system prompts leak under adversarial injection, and transmitting raw PHI to third-party endpoints violates medical data protection principles.",
    initialApproach: "We initially experimented with a prompt-based instruction: 'Please summarize the following lab report without repeating the patient's name or contact details.'",
    failureMode: "In adversarial and edge-case evaluations, LLMs routinely leaked names in the final summary when complex doctor consultation notes contained ambiguous formatting. More critically, transmitting the raw text to the remote API already constitutes an irreversible privacy breach, regardless of what the model outputs.",
    engineeringDecision: "We decoupled identity sanitization entirely from model generation by architecting an upfront, zero-knowledge de-identification gate using Microsoft Presidio and spaCy NER locally. Before text reaches any model prompt, sensitive entities are recognized, tokenized (e.g. `[REDACTED_PATIENT_NAME_01]`), and replaced with cryptographically isolated surrogate tags. Only the de-identified clinical fact payload is forwarded.",
    results: "100% of names, contact numbers, and government IDs are intercepted prior to network egress. Even in the event of upstream prompt injection, zero identifying patient attributes exist in the context window to leak.",
    futureImprovements: "Implementing differential privacy noise injection for rare disease prevalence and training custom Indian medical NER models for handwritten regional clinical scripts."
  },
  {
    id: "decision-hybrid-retrieval",
    title: "Why Dense Embeddings Fail on Pharmacological Dosages without BM25",
    project: "Agentic Clinical RAG",
    category: "Information Retrieval & GenAI",
    date: "January 2026",
    readingTime: "5 min read",
    summary: "Dense semantic embeddings excel at conceptual paraphrasing but fail catastrophically on exact drug dosages and laboratory threshold cutoffs. Here is how we solved it with calibrated hybrid fusion.",
    problem: "In clinical decision support, the distinction between '5 mg' and '50 mg' or 'eGFR > 30' and 'eGFR < 30' is the difference between safe therapy and acute organ toxicity. Dense bi-encoder embedding models (such as `all-MiniLM-L6-v2` or general text embeddings) map these queries to nearly identical coordinates in vector space because the semantic context ('metformin dosing in kidney disease') is 99% identical.",
    initialApproach: "A standard dense vector retrieval architecture utilizing ChromaDB with cosine similarity search over chunked medical guidelines.",
    failureMode: "When querying 'Metformin dosage for eGFR 42', the dense retriever frequently retrieved chunks containing general diabetes management or eGFR thresholds for completely different drugs (like SGLT2 inhibitors), missing the specific 1000 mg dose reduction protocol because the lexical numbers were washed out in the dense projection.",
    engineeringDecision: "We implemented Weighted Linear Hybrid Fusion combining dense semantic embeddings with sparse Rank-BM25 keyword search: Score = α * Dense + (1 - α) * BM25_Norm. Dense embeddings capture clinical intent ('kidney dysfunction', 'renal threshold'), while BM25 enforces strict lexical exact-matching for critical tokens ('42', 'eGFR', '1000 mg', 'contraindication').",
    results: "In our benchmark evaluation across 32 clinical guideline retrieval tasks, hybrid fusion increased in-scope Top-5 retrieval hit rate from 68.75% (pure dense) to 100%, completely eliminating out-of-scope medication confusion.",
    futureImprovements: "Migrating from static linear fusion to dynamic Reciprocal Rank Fusion (RRF) with cross-encoder re-ranking using clinical domain models (e.g., BioClinicalBERT)."
  },
  {
    id: "decision-agentic-langgraph",
    title: "Why Stateful LangGraph Agents Beat Monolithic RAG Prompts",
    project: "Agentic Clinical RAG",
    category: "Agentic Systems & Software Engineering",
    date: "January 2026",
    readingTime: "5 min read",
    summary: "Single-turn LLM pipelines cannot reliably perform evidence gathering, contraindication cross-checking, and citation verification simultaneously. Decomposing into bounded agents enforces deterministic safety.",
    problem: "In clinical queries, a single LLM call is asked to: (1) interpret the user encounter note, (2) query a vector store, (3) filter irrelevant noise, (4) evaluate contraindications, (5) format recommendations, and (6) verify that every claim has a citation. Under token pressure, the model routinely prioritizes fluent generation over verification, hallucinating non-existent guidelines or overlooking contraindications.",
    initialApproach: "A single LangChain `ConversationalRetrievalChain` with an extensive system prompt instructing the model to act as doctor, researcher, and safety auditor simultaneously.",
    failureMode: "In 15% of complex scenarios with multiple comorbidities, the monolithic chain generated clinically sound-sounding advice while missing subtle black-box contraindications mentioned in retrieved document footnotes. Furthermore, citations were frequently attributed to the wrong chunk IDs.",
    engineeringDecision: "We refactored the pipeline into a stateful multi-agent state machine using LangGraph. We decomposed the workload into four bounded agents with discrete responsibilities: (1) Researcher Agent (gathers candidates), (2) Skeptic Agent (acts as an adversarial safety auditor, cross-referencing patient lab numbers against retrieved contraindications), (3) Scribe Agent (synthesizes strictly grounded text), and (4) Historian Agent (records session state). If the Skeptic raises an objection, the graph branches into a mandatory clarification or abstention state rather than generating an unsafe answer.",
    results: "Validated across 61 passing unit tests in `pytest`. The system achieved 100% citation existence precision and 93.75% abstention specificity on out-of-scope or contraindicated scenarios.",
    futureImprovements: "Implementing human-in-the-loop (HITL) interrupt checkpoints in LangGraph for high-risk clinical overrides."
  },
  {
    id: "decision-patient-leakage",
    title: "Preventing Data Leakage in Clinical ML: Why Patient-Level Splitting Matters",
    project: "SWYNEX Clinical ML",
    category: "Machine Learning & Clinical Data",
    date: "November 2025",
    readingTime: "4 min read",
    summary: "Random train/test splits on electronic health records cause catastrophic data leakage across repeat patient visits, yielding deceptively high metrics that collapse in production.",
    problem: "The UCI Diabetes 130-US Hospitals dataset comprises 101,763 hospital encounters spanning 10 years. However, these 101,763 encounters originate from only 71,515 unique patients: thousands of diabetic patients were admitted multiple times. Predicting 30-day readmission is notoriously difficult due to extreme class imbalance (~11% readmissions within 30 days).",
    initialApproach: "A standard `train_test_split(test_size=0.2, random_state=42)` applied directly to the preprocessed tabular encounter dataframe.",
    failureMode: "The initial baseline model achieved a suspiciously strong ROC-AUC of 0.81. Deep inspection revealed that repeat encounters for the exact same patient (sharing identical genetic, socio-demographic, and chronic morbidity patterns) were split across both training and test folds. The model was not learning generalizable readmission indicators; it was memorizing individual patient IDs.",
    engineeringDecision: "We implemented a strict, leakage-free `GroupKFold` / `GroupShuffleSplit` partitioning strategy grouped by `patient_nbr`. Every single encounter belonging to a specific patient was quarantined entirely to either the train or test set. We also engineered clinical aggregations mapping 900+ raw ICD-9 codes into 18 validated diagnostic categories and implemented missingness indicator flags for unrecorded lab tests.",
    results: "The true, leakage-free model yielded an honest ROC-AUC of 0.6435 (Recall 52.26%, Precision 16.48% under balanced class weights). While lower than the leaked baseline, it represents an authentic, scientifically defensible benchmark supported by 31 passing test assertions.",
    futureImprovements: "Calibrating probabilities using isotonic regression and evaluating survival analysis (Cox proportional hazards) for continuous readmission risk modeling."
  },
  {
    id: "decision-airflow-idempotency",
    title: "Idempotent Data Pipelines: Preventing State Corruption in Apache Airflow",
    project: "Airflow ETL Pipeline",
    category: "Data Engineering & Infrastructure",
    date: "December 2025",
    readingTime: "4 min read",
    summary: "Network retries and task restarts in distributed data pipelines inevitably cause duplicate writes without atomic UPSERT patterns. Here is our containerized architecture.",
    problem: "Real-time weather data extraction from external REST APIs (such as Open-Meteo) frequently experiences transient HTTP 504 timeouts, DNS drops, and rate limiting. In naive ETL architectures, restarting a failed DAG run causes duplicate inserts into PostgreSQL, distorting historical time-series analytics and violating data integrity.",
    initialApproach: "Standard sequential Airflow DAG tasks: `extract_task -> transform_task -> load_task`, with `load_task` executing standard `df.to_sql(if_exists='append')`.",
    failureMode: "During simulated network disconnections, Airflow's automatic task retry mechanism re-executed the load step, inserting duplicate records for identical timestamps and location coordinates.",
    engineeringDecision: "We containerized the entire architecture using Apache Airflow 3.x, Docker Compose, and PostgreSQL 15. We replaced raw append operations with an atomic SQL `INSERT ... ON CONFLICT (timestamp, location_id) DO UPDATE SET ...` (UPSERT) pattern. Furthermore, we designed each task as a stateless, idempotent Python callable under the Airflow TaskFlow API with explicit exponential backoff retries (`retries=3, retry_delay=timedelta(minutes=2)`).",
    results: "The pipeline can be re-run indefinitely across arbitrary historical execution intervals without ever generating duplicate rows or corrupting database consistency.",
    futureImprovements: "Adding automated Great Expectations data quality contracts and integrating dbt for modular downstream transformation models."
  }
];

