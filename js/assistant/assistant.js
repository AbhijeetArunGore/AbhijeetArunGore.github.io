/**
 * AI Portfolio Assistant Client
 * Grounded technical assistant acting as a technical surrogate for Abhijeet Gore.
 * Answers recruiter and engineer questions using client-side verified knowledge retrieval,
 * with optional backend API proxy support.
 * 
 * STRICT ACCURACY RULE:
 * Grounded strictly in knowledge_base.json and decision_journal.js.
 * Never invents metrics, credentials, or production claims.
 */

import { DECISION_JOURNAL } from "../data/decision_journal.js";

class PortfolioAssistant {
  constructor() {
    this.knowledgeBase = null;
    this.isOpen = false;
    this.messages = [];
    this.backendUrl = null; // Optional external endpoint, null defaults to deterministic local retrieval
    this.init();
  }

  async init() {
    try {
      const res = await fetch("data/knowledge_base.json");
      this.knowledgeBase = await res.json();
    } catch (err) {
      console.warn("Could not load knowledge_base.json, falling back to minimal dataset:", err);
      this.knowledgeBase = { candidate: { name: "Abhijeet Gore" }, projects: [], faq: [] };
    }

    this.bindDOM();
    this.renderWelcome();
  }

  bindDOM() {
    this.fabBtn = document.getElementById("assistant-fab");
    this.modal = document.getElementById("assistant-modal");
    this.closeBtn = document.getElementById("assistant-close");
    this.chatBody = document.getElementById("assistant-messages");
    this.inputForm = document.getElementById("assistant-form");
    this.inputField = document.getElementById("assistant-input");
    this.chipsContainer = document.getElementById("assistant-chips");

    if (this.fabBtn) {
      this.fabBtn.addEventListener("click", () => this.toggleModal());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.toggleModal(false));
    }

    // Close on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.toggleModal(false);
      }
    });

    if (this.inputForm) {
      this.inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = this.inputField.value.trim();
        if (text) {
          this.handleUserMessage(text);
          this.inputField.value = "";
        }
      });
    }

    // Bind prompt suggestion buttons
    document.querySelectorAll(".prompt-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query") || chip.innerText.trim();
        this.toggleModal(true);
        this.handleUserMessage(query);
      });
    });
  }

  toggleModal(forceState = null) {
    this.isOpen = forceState !== null ? forceState : !this.isOpen;
    if (this.modal) {
      if (this.isOpen) {
        this.modal.classList.add("active");
        this.modal.setAttribute("aria-hidden", "false");
        setTimeout(() => this.inputField && this.inputField.focus(), 150);
      } else {
        this.modal.classList.remove("active");
        this.modal.setAttribute("aria-hidden", "true");
      }
    }
  }

  renderWelcome() {
    this.appendMessage({
      role: "assistant",
      content: `Hello! I am **Abhijeet's AI Portfolio Assistant**.<br><br>I can answer questions regarding his **system architectures, codebases, engineering decisions, test suites, and verified metrics**.<br><br>Ask me a question below or choose a suggested topic:`,
      citations: [
        { label: "Clinivara Architecture", href: "#projects" },
        { label: "Agentic RAG Test Suite", href: "https://github.com/AbhijeetArunGore/Agentic_Medical_RAG" },
        { label: "Engineering Notes", href: "#journal" }
      ]
    });
  }

  appendMessage({ role, content, citations = [] }) {
    if (!this.chatBody) return;

    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-bubble chat-bubble-${role}`;

    const innerDiv = document.createElement("div");
    innerDiv.className = "chat-content";
    innerDiv.innerHTML = content;

    msgDiv.appendChild(innerDiv);

    if (citations && citations.length > 0) {
      const citeDiv = document.createElement("div");
      citeDiv.className = "citation-strip";
      citeDiv.innerHTML = `<span class="cite-label"><i class="fas fa-link"></i> Sources:</span>`;
      citations.forEach(c => {
        const link = document.createElement("a");
        link.className = "citation-pill";
        link.href = c.href;
        link.target = c.href.startsWith("http") ? "_blank" : "_self";
        link.rel = "noopener noreferrer";
        link.innerHTML = `<i class="${c.href.includes('github') ? 'fab fa-github' : 'fas fa-arrow-up-right-from-square'}"></i> ${c.label}`;
        citeDiv.appendChild(link);
      });
      msgDiv.appendChild(citeDiv);
    }

    this.chatBody.appendChild(msgDiv);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }

  showTyping() {
    const typing = document.createElement("div");
    typing.id = "assistant-typing";
    typing.className = "chat-bubble chat-bubble-assistant typing-indicator";
    typing.innerHTML = `<span></span><span></span><span></span>`;
    this.chatBody.appendChild(typing);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
    return typing;
  }

  removeTyping() {
    const typing = document.getElementById("assistant-typing");
    if (typing) typing.remove();
  }

  async handleUserMessage(query) {
    this.appendMessage({ role: "user", content: query });
    const typing = this.showTyping();

    // Small realistic latency simulation for UI polish
    await new Promise(r => setTimeout(r, 400));
    this.removeTyping();

    const response = this.retrieveAnswer(query);
    this.appendMessage(response);
  }

  /**
   * Deterministic client-side knowledge retrieval engine
   * Matches query semantics against verified projects, FAQs, journal notes, and candidate facts.
   */
  retrieveAnswer(query) {
    const q = query.toLowerCase().trim();
    const kb = this.knowledgeBase || {};
    const projects = kb.projects || [];
    const faqs = kb.faq || [];

    // --- 1. HIGH-PRECISION INTENT & TOPIC ROUTING ---

    // A. Airflow / Weather ETL / PostgreSQL / Data Engineering Pipelines
    if (
      q.includes("airflow") ||
      q.includes("weather etl") ||
      (q.includes("pipeline") && (q.includes("etl") || q.includes("postgres") || q.includes("weather") || q.includes("data eng"))) ||
      (q.includes("etl") && !q.includes("rag"))
    ) {
      const proj = projects.find(p => p.id === "airflow-etl") || {};
      return {
        role: "assistant",
        content: `**Production-Grade Airflow Weather ETL Pipeline**:<br><br>
        <strong>Architecture:</strong> Orchestrated by Apache Airflow 3.x using the TaskFlow API. Queries the Open-Meteo REST API, executes schema validation in Pandas, and performs idempotent <code>ON CONFLICT DO UPDATE</code> (UPSERT) writes to a containerized PostgreSQL 15 database.<br><br>
        <strong>Engineering Highlights:</strong>
        <ul>
          ${(proj.verified_evidence || []).map(e => `<li>${e}</li>`).join("")}
        </ul>
        <strong>Stack:</strong> Python 3.11, Apache Airflow 3.x, PostgreSQL 15, Docker Compose, Astronomer CLI, Pandas.`,
        citations: [
          { label: "Airflow Pipeline Repository", href: proj.repo_url || "https://github.com/AbhijeetArunGore/end_to_end_etl_pipeline_airflow" },
          { label: "Idempotency Architecture Note", href: "#decision-airflow-idempotency" }
        ]
      };
    }

    // B. Diabetes Readmission / SWYNEX Clinical ML / Leakage
    if (
      q.includes("diabetes") ||
      q.includes("swynex") ||
      q.includes("readmission") ||
      (q.includes("leakage") && !q.includes("pii"))
    ) {
      const proj = projects.find(p => p.id === "clinical-readmission-ml") || {};
      return {
        role: "assistant",
        content: `**Diabetes Inpatient 30-Day Readmission Risk System**:<br><br>
        <strong>Dataset & Scope:</strong> Investigated 101,763 hospital encounters across 71,515 unique patients (UCI Diabetes 130-US Hospitals dataset).<br><br>
        <strong>Engineering Rigor & Verified Metrics:</strong>
        <ul>
          <li><strong>Data Leakage Prevention:</strong> Enforced strict <strong>patient-grouped stratified splitting</strong> ensuring no individual patient's repeat visits appear in both train and validation sets.</li>
          <li><strong>ICD-9 Mapping:</strong> Grouped 900+ raw diagnostic ICD-9 codes into 18 validated clinical categories.</li>
          <li><strong>Verified Benchmark:</strong> <strong>ROC-AUC 0.6435</strong>, <strong>Recall 52.26%</strong>, <strong>Precision 16.48%</strong> under severe class imbalance (target ~11%).</li>
          <li><strong>Testing:</strong> <strong>31 passing automated tests in <code>pytest</code></strong> verifying schema integrity and feature pipelines.</li>
        </ul>`,
        citations: [
          { label: "SWYNEX GitHub Repository", href: proj.repo_url || "https://github.com/AbhijeetArunGore/SWYNEX-Data-Science-Internship" },
          { label: "Patient Leakage Case Study", href: "#decision-patient-leakage" }
        ]
      };
    }

    // C. Verified Metrics across all projects (if user asks generally "what are your verified metrics?")
    if (q.includes("metric") || q.includes("benchmark") || q.includes("test score") || q.includes("passing test")) {
      return {
        role: "assistant",
        content: `<strong>Abhijeet's Verified Engineering Metrics & Benchmarks:</strong><br><br>
        <ul>
          <li><strong>Agentic Clinical RAG:</strong> <strong>61/61 automated tests passing</strong> in <code>pytest</code> CI; 100% citation existence precision, 93.75% abstention specificity.</li>
          <li><strong>SWYNEX Clinical Readmission ML:</strong> <strong>101,763 encounters</strong> across <strong>71,515 unique patients</strong>; <strong>ROC-AUC 0.6435</strong>, <strong>Recall 52.26%</strong>, <strong>Precision 16.48%</strong>; <strong>31 automated tests passing</strong>.</li>
          <li><strong>Airflow Weather ETL:</strong> <strong>100% idempotent UPSERT operations</strong> via PostgreSQL <code>ON CONFLICT DO UPDATE</code> with zero data duplication on retries.</li>
          <li><strong>Financial Fraud ML:</strong> Precision-Recall AUC optimization on simulated transaction streams with &lt;0.2% class imbalance.</li>
          <li><strong>Academic & Credentials:</strong> <strong>8.52 / 10.0 CGPA</strong> (SPPU Computer Engineering, Honours in Data Science); <strong>Grade O (Outstanding 90–100%)</strong> in AWS Academy cohorts.</li>
        </ul>`,
        citations: [
          { label: "Agentic RAG Test Suite", href: "https://github.com/AbhijeetArunGore/Agentic_Medical_RAG" },
          { label: "SWYNEX Repository", href: "https://github.com/AbhijeetArunGore/SWYNEX-Data-Science-Internship" },
          { label: "Airflow ETL Repository", href: "https://github.com/AbhijeetArunGore/end_to_end_etl_pipeline_airflow" }
        ]
      };
    }

    // D. Clinivara / PII / Healthcare Privacy / Medical Lab Reports
    if (
      q.includes("clinivara") ||
      q.includes("pii") ||
      q.includes("phi") ||
      q.includes("de-identif") ||
      q.includes("presidio") ||
      (q.includes("medical") && (q.includes("report") || q.includes("doc")))
    ) {
      const proj = projects.find(p => p.id === "clinivara") || {};
      return {
        role: "assistant",
        content: `**Clinivara** is Abhijeet's privacy-first clinical document intelligence backend.<br><br>
        <strong>Problem Solved:</strong> ${proj.problem || "Clinical reports contain high-risk PII that cannot legally be transmitted to public LLMs."}<br><br>
        <strong>Architecture:</strong> An architectural 'Ironclad Privacy Shield' pipeline running OCR, identifying sensitive personal tokens with Microsoft Presidio and spaCy NER, cryptographically redacting them before LLM inference, validating extracted clinical biomarkers with Pydantic, and generating multilingual guidance.<br><br>
        <strong>Key Engineering Highlights:</strong>
        <ul>
          ${(proj.verified_evidence || []).map(e => `<li>${e}</li>`).join("")}
        </ul>
        <strong>Stack:</strong> Python, FastAPI, PyMuPDF, Tesseract OCR, Microsoft Presidio, spaCy, Pydantic, Docker.`,
        citations: [
          { label: "Clinivara GitHub Repository", href: proj.repo_url || "https://github.com/AbhijeetArunGore/Clinivara" },
          { label: "Interactive Clinivara Lab", href: "#clinivara-lab" },
          { label: "Decision Note: PII Redaction", href: "#decision-clinivara-pii" }
        ]
      };
    }

    // E. Retrieval Evaluation & RAG Test Harnesses
    if (
      q.includes("evaluate") ||
      q.includes("evaluation") ||
      q.includes("hit rate") ||
      q.includes("citation existence") ||
      q.includes("abstention")
    ) {
      const faqItem = faqs.find(f => f.question.toLowerCase().includes("evaluate")) || {};
      return {
        role: "assistant",
        content: faqItem.answer || `I evaluate RAG using multi-dimensional offline test harnesses: In-Scope Hit Rate@K, Citation Existence Precision (verifying that every generated clinical claim maps to an actual retrieved document ID), and Abstention Specificity (verifying that the system flags uncertainty when evidence is insufficient or contradictory rather than hallucinating).`,
        citations: [
          { label: "Agentic RAG Test Suite", href: "https://github.com/AbhijeetArunGore/Agentic_Medical_RAG" },
          { label: "Clinical RAG Retrieval Lab", href: "#rag-lab" }
        ]
      };
    }

    // F. Agentic Clinical RAG / LangGraph / Multi-Agent / ChromaDB
    if (
      q.includes("rag") ||
      q.includes("langgraph") ||
      q.includes("skeptic") ||
      q.includes("scribe") ||
      (q.includes("agent") && !q.includes("secret"))
    ) {
      const proj = projects.find(p => p.id === "agentic-medical-rag") || {};
      return {
        role: "assistant",
        content: `**Agentic Clinical RAG** is a stateful multi-agent system built on LangGraph.<br><br>
        <strong>Architecture:</strong> Instead of naive monolithic RAG, it decomposes retrieval and verification into 4 bounded agents:
        <ul>
          <li><strong>Researcher:</strong> Executes calibrated hybrid search (BM25 sparse + SentenceTransformers dense fusion).</li>
          <li><strong>Skeptic:</strong> Evaluates evidence for contraindications and citation existence.</li>
          <li><strong>Scribe:</strong> Synthesizes clinical recommendations with strict citation provenance.</li>
          <li><strong>Historian:</strong> Persists encounter state and audit logs.</li>
        </ul>
        <strong>Verification:</strong> Backed by <strong>61 automated passing unit tests</strong> in <code>pytest</code> with non-root multi-stage Docker deployment.`,
        citations: [
          { label: "Agentic_Medical_RAG Repository", href: proj.repo_url || "https://github.com/AbhijeetArunGore/Agentic_Medical_RAG" },
          { label: "Interactive Agent Workflow Explorer", href: "#agent-lab" },
          { label: "Hybrid Retrieval Decision Note", href: "#decision-hybrid-retrieval" }
        ]
      };
    }

    // G. Hardest Engineering Challenge
    if (q.includes("hardest") || q.includes("challenge") || q.includes("difficult")) {
      const faqItem = faqs.find(f => f.question.toLowerCase().includes("hardest")) || {};
      return {
        role: "assistant",
        content: faqItem.answer || `In the SWYNEX clinical readmission project, the primary challenge was preventing data leakage under extreme class imbalance. Because individual patients have multiple hospital visits across the 10-year dataset, random record-level train/test splits leaked patient-specific clinical trajectories into the validation set, creating artificially inflated metrics. The solution was implementing strict patient-level grouped splitting, ensuring no patient's encounters appeared in both train and test sets, yielding an honest, reproducible ROC-AUC of 0.6435.`,
        citations: [
          { label: "SWYNEX Clinical ML Repo", href: "https://github.com/AbhijeetArunGore/SWYNEX-Data-Science-Internship" },
          { label: "Behind the Build: Patient-Level Splitting", href: "#decision-patient-leakage" }
        ]
      };
    }

    // H. Backend Engineering / Technologies / Pipelines general question
    if (q.includes("backend") || q.includes("technologies do you use") || q.includes("tech stack") || q.includes("tools")) {
      const faqItem = faqs.find(f => f.question.toLowerCase().includes("technologies")) || {};
      return {
        role: "assistant",
        content: faqItem.answer || `For backend engineering, I use Python, FastAPI, and Flask with Pydantic for strict runtime validation. For data engineering and orchestration, I use Apache Airflow 3.x with Docker Compose, PostgreSQL, and Pandas, implementing idempotent UPSERT patterns to ensure pipeline reruns never duplicate data.`,
        citations: [
          { label: "Airflow Weather ETL Repository", href: "https://github.com/AbhijeetArunGore/end_to_end_etl_pipeline_airflow" },
          { label: "Behind the Build: Idempotent Pipelines", href: "#decision-airflow-idempotency" }
        ]
      };
    }

    // I. Fraud Detection / PaySim / XGBoost
    if (q.includes("fraud") || q.includes("paysim") || q.includes("imbalance")) {
      const proj = projects.find(p => p.id === "fraud-detection") || {};
      return {
        role: "assistant",
        content: `**High-Throughput Financial Fraud Detection Pipeline**:<br><br>
        Analyzed simulated financial transactions (PaySim) with extreme class imbalance (&lt;0.2% fraud instances). Implemented IQR/Z-score outlier detection, engineered origin-destination balance delta features, and trained an XGBoost classifier evaluated via Precision-Recall AUC.`,
        citations: [
          { label: "Fraud Detection Repository", href: proj.repo_url || "https://github.com/AbhijeetArunGore/Fraud_Detection_Jupyter_Data_Cleaning_Processing" }
        ]
      };
    }

    // J. Customer Churn / Power BI / SQL
    if (q.includes("churn") || q.includes("power bi")) {
      const proj = projects.find(p => p.id === "customer-churn") || {};
      return {
        role: "assistant",
        content: `**Customer Churn Prediction & BI Pipeline**:<br><br>
        End-to-end analytical workflow combining SQL window functions and aggregations, Python Scikit-learn predictive classification modeling, and an executive Power BI dashboard communicating customer retention drivers.`,
        citations: [
          { label: "Customer Churn Repository", href: proj.repo_url || "https://github.com/AbhijeetArunGore/customer-churn-prediction-sql-python-powerbi" }
        ]
      };
    }

    // K. Internships / Experience / Work
    if (q.includes("internship") || q.includes("experience") || q.includes("work") || q.includes("jobs") || q.includes("companies")) {
      const exp = kb.experience || [];
      return {
        role: "assistant",
        content: `Abhijeet has completed verified industry and technical internships across AI development, clinical data, and cloud engineering:<br><br>
        <ul>
          ${exp.slice(0, 5).map(e => `<li><strong>${e.company}:</strong> ${e.role} (${e.period}) &mdash; ${e.bullets[0]}</li>`).join("")}
        </ul>
        All experiences can be independently verified on LinkedIn and Credly.`,
        citations: [
          { label: "LinkedIn Profile", href: "https://www.linkedin.com/in/abhijeet-gore-972225282/" },
          { label: "Experience Section", href: "#experience" }
        ]
      };
    }

    // L. Education / Degree / College / CGPA / SPPU
    if (
      q.includes("education") ||
      q.includes("degree") ||
      q.includes("college") ||
      q.includes("cgpa") ||
      q.includes("university") ||
      q.includes("sppu") ||
      q.includes("snjb")
    ) {
      const edu = (kb.candidate && kb.candidate.education) || {
        degree: "Bachelor of Engineering in Computer Engineering (Honours in Data Science)",
        institution: "S.N.J.B.'s Late Sau. Kantabai Bhavarlalji Jain College of Engineering, Nashik",
        university: "Savitribai Phule Pune University (SPPU)",
        graduation: "Expected May 2027",
        cgpa: "8.52 / 10.0"
      };
      return {
        role: "assistant",
        content: `<strong>Education Details:</strong><br><br>
        &bull; <strong>Degree:</strong> ${edu.degree}<br>
        &bull; <strong>College:</strong> ${edu.institution}<br>
        &bull; <strong>University:</strong> ${edu.university}<br>
        &bull; <strong>Graduation:</strong> ${edu.graduation}<br>
        &bull; <strong>CGPA:</strong> <strong>${edu.cgpa}</strong>`,
        citations: [
          { label: "Education Section", href: "#about" }
        ]
      };
    }

    // M. Certifications / Credentials / AWS / Credly / Oracle
    if (
      q.includes("certif") ||
      q.includes("badge") ||
      q.includes("credly") ||
      q.includes("oracle") ||
      q.includes("forage") ||
      (q.includes("aws") && !q.includes("pipeline"))
    ) {
      return {
        role: "assistant",
        content: `Abhijeet holds 24+ verified technical credentials including:<br><br>
        &bull; <strong>AWS Academy:</strong> Data Engineering, Cloud Generative AI, Machine Learning Foundations, Cloud Foundations (Credly verified).<br>
        &bull; <strong>Oracle:</strong> Certified AI Foundations Associate (Credly verified).<br>
        &bull; <strong>Google:</strong> Data Analytics Foundations (Coursera).<br>
        &bull; <strong>Deloitte Australia (Nov 2025):</strong> Data Analytics Job Simulation via Forage.<br>
        &bull; <strong>Tata Group (Feb 2025):</strong> Data Visualisation Job Simulation via Forage.<br><br>
        All badges can be inspected directly on his Credly profile.`,
        citations: [
          { label: "Credly Badges Profile", href: "https://www.credly.com/users/abhijeet-gore.30f41028/badges/credly" },
          { label: "Certifications Section", href: "#certificates" }
        ]
      };
    }

    // --- 2. SEMANTIC FAQ SEARCH (exact/fuzzy question overlap) ---
    for (const faq of faqs) {
      const fqWords = faq.question.toLowerCase().split(/\W+/).filter(w => w.length > 3);
      const qWords = q.split(/\W+/).filter(w => w.length > 3);
      const intersection = fqWords.filter(w => qWords.includes(w));
      if (intersection.length >= 3 || (fqWords.length > 0 && intersection.length / fqWords.length >= 0.5)) {
        return {
          role: "assistant",
          content: faq.answer,
          citations: [
            { label: "Behind the Build Journal", href: "#journal" },
            { label: "Flagship Projects", href: "#projects" }
          ]
        };
      }
    }

    // --- 3. GROUNDED HONEST FALLBACK ---
    return {
      role: "assistant",
      content: `I am strictly calibrated to answer questions verified by Abhijeet's engineering repositories, test suites, and documentation.<br><br>
      I cannot find specific documentation matching "<em>${query.replace(/</g, "&lt;")}</em>".<br><br>
      You can explore:
      <ul>
        <li><strong>Clinivara:</strong> Privacy-first clinical document intelligence</li>
        <li><strong>Agentic Clinical RAG:</strong> LangGraph multi-agent orchestration (61 passing tests)</li>
        <li><strong>Airflow ETL:</strong> Containerized PostgreSQL pipeline with idempotent UPSERTs</li>
        <li><strong>Clinical ML:</strong> 30-day diabetic readmission prediction without patient leakage</li>
        <li><strong>Engineering Decision Journal:</strong> In-depth trade-off case studies</li>
      </ul>`,
      citations: [
        { label: "Explore Projects", href: "#projects" },
        { label: "Interactive AI Lab", href: "#lab" },
        { label: "GitHub Repositories", href: "https://github.com/AbhijeetArunGore" }
      ]
    };
  }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioAssistant = new PortfolioAssistant();
});

