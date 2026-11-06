# Abhijeet Gore — Applied AI Engineering Lab

[![Production Website](https://img.shields.io/badge/Production-abhijeetgore.me-009688?style=flat&logo=googlechrome&logoColor=white)](https://abhijeetgore.me/)
[![GitHub](https://img.shields.io/badge/GitHub-AbhijeetArunGore-181717?style=flat&logo=github)](https://github.com/AbhijeetArunGore)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abhijeet%20Gore-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/abhijeet-gore-972225282/)
[![Credly](https://img.shields.io/badge/Credly-Verified%20Badges-FF6F00?style=flat&logo=credly)](https://www.credly.com/users/abhijeet-gore.30f41028/badges/credly)

This repository contains the source code for my canonical personal engineering portfolio and interactive demonstration lab: [https://abhijeetgore.me/](https://abhijeetgore.me/).

It is designed as an **Applied AI Engineering Lab** rather than a static personal profile, demonstrating end-to-end capabilities across clinical document intelligence, multi-agent RAG orchestration, data engineering pipelines, and reproducible machine learning evaluation.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND PRESENTATION TIER                      │
│                  (GitHub Pages: https://abhijeetgore.me/)              │
│                                                                        │
│   ┌─────────────────────┐   ┌──────────────────────────────────────┐   │
│   │ Project Showcase    │   │ Interactive AI Engineering Lab       │   │
│   │ • Clinivara         │   │ • Lab 1: Clinical RAG Retrieval      │   │
│   │ • Agentic RAG       │   │ • Lab 2: Clinivara PII Redaction     │   │
│   │ • Airflow Weather   │   │ • Lab 3: LangGraph Agent Explorer    │   │
│   │ • Readmission ML    │   │                                      │   │
│   └─────────────────────┘   └──────────────────────────────────────┘   │
│   ┌─────────────────────┐   ┌──────────────────────────────────────┐   │
│   │ Engineering Journal │   │ AI Portfolio Assistant               │   │
│   │ • 5 Deep Decisions  │   │ • Deterministic Local Retrieval      │   │
│   │ • Empirical Proof   │   │ • Grounded in Curated Knowledge Base │   │
│   └─────────────────────┘   └──────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Key Features

### 1. Flagship Engineering Projects
- **[Clinivara](https://github.com/AbhijeetArunGore/Clinivara):** Privacy-first clinical document intelligence backend. Features OCR (PyMuPDF / Tesseract), an upfront PII/PHI de-identification boundary (Microsoft Presidio + spaCy NER), Pydantic clinical range validation, and multilingual explanations in English, Hindi, and Marathi.
- **[Agentic Clinical RAG](https://github.com/AbhijeetArunGore/Agentic_Medical_RAG):** Stateful multi-agent clinical decision support system built on LangGraph (Researcher, Skeptic, Scribe, Historian). Evaluated with 61 automated passing tests in `pytest`. Features calibrated hybrid fusion (SentenceTransformers + Rank-BM25).
- **[Airflow Weather ETL Pipeline](https://github.com/AbhijeetArunGore/end_to_end_etl_pipeline_airflow):** Production-grade containerized ETL pipeline orchestrated by Apache Airflow 3.x with PostgreSQL 15 and Docker Compose. Enforces idempotent `ON CONFLICT DO UPDATE` (UPSERT) writes.
- **[SWYNEX Inpatient Readmission ML](https://github.com/AbhijeetArunGore/SWYNEX-Data-Science-Internship):** Leakage-free clinical machine learning prototype on the UCI Diabetes 130-US Hospitals dataset (101,763 encounters, 71,515 patients). Features patient-grouped cross-validation, ICD-9 categorization, and 31 passing unit tests.

### 2. Interactive AI Engineering Lab
- **Clinical RAG Retrieval Lab:** Real-time client-side experimentation with chunk sizes (32–160 tokens), overlap (0–32 tokens), Top-K selection, and fusion modes (Dense vs. Sparse BM25 vs. Weighted Hybrid).
- **Clinivara Pipeline Walkthrough:** Step-by-step interactive inspection of raw document ingestion, OCR extraction, PII token classification, de-identification, schema validation gates, and multilingual synthesis.
- **Agentic RAG LangGraph Explorer:** Visual state machine stepping through state dictionary payloads, agent reasoning, and safety transition rules.

### 3. Engineering Decision Journal ("Behind the Build")
In-depth technical articles explaining the trade-offs, initial failures, and empirical results behind critical system decisions:
1. *Why Clinical PII De-Identification Must Precede LLM Processing*
2. *Why Dense Embeddings Fail on Pharmacological Dosages without BM25*
3. *Why Stateful LangGraph Agents Beat Monolithic RAG Prompts*
4. *Preventing Data Leakage in Clinical ML: Why Patient-Level Splitting Matters*
5. *Idempotent Data Pipelines: Preventing State Corruption in Apache Airflow*

### 4. AI Portfolio Assistant
A technical surrogate client grounded in `data/knowledge_base.json`. Answers technical interview questions, provides references to GitHub codebases, and disclaims missing information with zero hallucination.

---

## 🔒 Security & Privacy Posture
- **Zero Secrets in Git:** No API keys or tokens are stored in frontend code or repository history.
- **100% Synthetic Data:** All interactive demonstrations utilize strictly synthetic clinical notes. No real protected health information (PHI) is ever processed or displayed.
- **Decoupled Architecture:** Static frontend hosted on GitHub Pages; any external inference proxy operates independently.

---

## 🛠️ Tech Stack
- **Frontend:** Semantic HTML5, Vanilla ES6+ JavaScript modules, Responsive CSS3.
- **Typography:** Inter, JetBrains Mono.
- **Icons:** FontAwesome 6.5.
- **Hosting:** GitHub Pages with custom domain `abhijeetgore.me`.

---

## 📄 License
MIT License. &copy; 2026 Abhijeet Gore.
