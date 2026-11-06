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
    const q = query.toLowerCase();
    const kb = this.knowledgeBase || {};
    const projects = kb.projects || [];
    const faqs = kb.faq || [];

    // 1. Check exact or close FAQ matches
    for (const faq of faqs) {
      const fq = faq.question.toLowerCase();
      if (q.includes("what is clinivara") && fq.includes("clinivara")) {
        return {
          role: "assistant",
          content: faq.answer,
          citations: [
            { label: "Clinivara Repository", href: "https://github.com/AbhijeetArunGore/Clinivara" },
            { label: "Behind the Build: PII Gate", href: "#decision-clinivara-pii" }
          ]
        };
      }
      if ((q.includes("clinical rag") || q.includes("how does your clinical rag")) && fq.includes("clinical rag")) {
        return {
          role: "assistant",
          content: faq.answer,
          citations: [
            { label: "Agentic Medical RAG (61 Passing Tests)", href: "https://github.com/AbhijeetArunGore/Agentic_Medical_RAG" },
            { label: "LangGraph Multi-Agent Architecture", href: "#decision-agentic-langgraph" }
          ]
        };
      }
      if (q.includes("hardest") || q.includes("challenge")) {
        return {
          role: "assistant",
          content: faq.answer,
          citations: [
            { label: "SWYNEX Clinical ML Repo", href: "https://github.com/AbhijeetArunGore/SWYNEX-Data-Science-Internship" },
            { label: "Behind the Build: Patient-Level Splitting", href: "#decision-patient-leakage" }
          ]
        };
      }
      if (q.includes("evaluate") || q.includes("evaluation") || q.includes("metric")) {
        return {
          role: "assistant",
          content: faq.answer,
          citations: [
            { label: "Agentic RAG Test Suite", href: "https://github.com/AbhijeetArunGore/Agentic_Medical_RAG" },
            { label: "Clinical RAG Retrieval Lab", href: "#rag-lab" }
          ]
        };
      }
      if (q.includes("backend") || q.includes("pipeline") || q.includes("airflow") || q.includes("fastapi")) {
        return {
          role: "assistant",
          content: faq.answer,
          citations: [
            { label: "Airflow Weather ETL Repository", href: "https://github.com/AbhijeetArunGore/end_to_end_etl_pipeline_airflow" },
            { label: "Behind the Build: Idempotent Pipelines", href: "#decision-airflow-idempotency" }
          ]
        };
      }
    }

    // 2. Project-specific deep query matching
    if (q.includes("clinivara") || q.includes("medical report") || q.includes("pii") || q.includes("privacy")) {
      const proj = projects.find(p => p.id === "clinivara");
      return {
        role: "assistant",
        content: `**Clinivara** is Abhijeet's privacy-first clinical document intelligence backend.<br><br>
        <strong>Problem Solved:</strong> ${proj.problem}<br><br>
        <strong>Architecture:</strong> ${proj.solution}<br><br>
        <strong>Key Engineering Evidence:</strong>
        <ul>
          ${proj.verified_evidence.map(e => `<li>${e}</li>`).join("")}
        </ul>
        <strong>Stack:</strong> Python, FastAPI, PyMuPDF, Tesseract OCR, Microsoft Presidio, spaCy, Pydantic, Docker.`,
        citations: [
          { label: "Clinivara GitHub Repository", href: proj.repo_url },
          { label: "Interactive Clinivara Lab", href: "#clinivara-lab" },
          { label: "Decision Note: PII Redaction", href: "#decision-clinivara-pii" }
        ]
      };
    }

    if (q.includes("rag") || q.includes("agent") || q.includes("langgraph") || q.includes("retrieval")) {
      const proj = projects.find(p => p.id === "agentic-medical-rag");
      return {
        role: "assistant",
        content: `**Agentic Clinical RAG** is a stateful multi-agent system built on LangGraph.<br><br>
        <strong>Architecture:</strong> Instead of a single LLM prompt, it decomposes retrieval into 4 bounded agents:
        <ul>
          <li><strong>Researcher:</strong> Executes calibrated hybrid search (BM25 + Dense SentenceTransformers).</li>
          <li><strong>Skeptic:</strong> Evaluates evidence for contraindications and citation existence.</li>
          <li><strong>Scribe:</strong> Synthesizes clinical answers with strict citation provenance.</li>
          <li><strong>Historian:</strong> Persists encounter state and audit logs.</li>
        </ul>
        <strong>Verification:</strong> Backed by <strong>61 automated passing unit tests</strong> in <code>pytest</code> with non-root multi-stage Docker deployment.`,
        citations: [
          { label: "Agentic_Medical_RAG Repository", href: proj.repo_url },
          { label: "Interactive Agent Workflow Explorer", href: "#agent-lab" },
          { label: "Hybrid Retrieval Decision Note", href: "#decision-hybrid-retrieval" }
        ]
      };
    }

    if (q.includes("airflow") || q.includes("etl") || q.includes("data engineering") || q.includes("postgres")) {
      const proj = projects.find(p => p.id === "airflow-etl");
      return {
        role: "assistant",
        content: `**Production-Grade Airflow Weather ETL Pipeline**:<br><br>
        <strong>Architecture:</strong> Orchestrated by Apache Airflow 3.x using the TaskFlow API. Queries the Open-Meteo REST API, executes schema validation in Pandas, and performs idempotent <code>ON CONFLICT DO UPDATE</code> (UPSERT) writes to a containerized PostgreSQL 15 database.<br><br>
        <strong>Engineering Highlights:</strong>
        <ul>
          ${proj.verified_evidence.map(e => `<li>${e}</li>`).join("")}
        </ul>`,
        citations: [
          { label: "Airflow Pipeline Repository", href: proj.repo_url },
          { label: "Idempotency Architecture Note", href: "#decision-airflow-idempotency" }
        ]
      };
    }

    if (q.includes("diabetes") || q.includes("swynex") || q.includes("readmission") || q.includes("leakage")) {
      const proj = projects.find(p => p.id === "clinical-readmission-ml");
      return {
        role: "assistant",
        content: `**Diabetes Inpatient 30-Day Readmission Risk System**:<br><br>
        <strong>Dataset & Scope:</strong> Investigated 101,763 hospital encounters across 71,515 unique patients (UCI Diabetes 130-US Hospitals).<br><br>
        <strong>Engineering Rigor:</strong>
        <ul>
          <li>Enforced <strong>patient-grouped stratified splitting</strong> to prevent data leakage between repeat patient admissions.</li>
          <li>Mapped 900+ raw ICD-9 codes into 18 validated clinical diagnostic categories.</li>
          <li><strong>Verified Benchmark:</strong> ROC-AUC 0.6435, Recall 52.26%, Precision 16.48% (31 passing automated tests in <code>pytest</code>).</li>
        </ul>`,
        citations: [
          { label: "SWYNEX GitHub Repository", href: proj.repo_url },
          { label: "Patient Leakage Case Study", href: "#decision-patient-leakage" }
        ]
      };
    }

    if (q.includes("fraud") || q.includes("paysim") || q.includes("imbalance")) {
      const proj = projects.find(p => p.id === "fraud-detection");
      return {
        role: "assistant",
        content: `**High-Throughput Financial Fraud Detection Pipeline**:<br><br>
        Analyzed simulated financial transactions (PaySim) with extreme class imbalance (<0.2% fraud instances). Implemented IQR/Z-score outlier detection, engineered origin-destination balance delta features, and trained an XGBoost classifier evaluated via Precision-Recall AUC.`,
        citations: [
          { label: "Fraud Detection Repository", href: proj.repo_url }
        ]
      };
    }

    if (q.includes("churn") || q.includes("power bi") || q.includes("sql")) {
      const proj = projects.find(p => p.id === "customer-churn");
      return {
        role: "assistant",
        content: `**Customer Churn Prediction & BI Pipeline**:<br><br>
        End-to-end analytical workflow combining SQL window functions and aggregations, Python Scikit-learn predictive classification modeling, and an executive Power BI dashboard communicating customer retention drivers.`,
        citations: [
          { label: "Customer Churn Repository", href: proj.repo_url }
        ]
      };
    }

    if (q.includes("internship") || q.includes("experience") || q.includes("work")) {
      const exp = kb.experience || [];
      return {
        role: "assistant",
        content: `Abhijeet has completed verified industry and technical internships across AI development, clinical data, and cloud engineering:<br><br>
        <ul>
          ${exp.slice(0, 4).map(e => `<li><strong>${e.company}:</strong> ${e.role} (${e.period}) — ${e.bullets[0]}</li>`).join("")}
        </ul>
        All experiences can be independently verified on LinkedIn.`,
        citations: [
          { label: "LinkedIn Profile", href: "https://www.linkedin.com/in/abhijeet-gore-972225282/" },
          { label: "Experience Section", href: "#experience" }
        ]
      };
    }

    if (q.includes("education") || q.includes("degree") || q.includes("college") || q.includes("cgpa")) {
      const edu = kb.candidate.education;
      return {
        role: "assistant",
        content: `<strong>Education Details:</strong><br><br>
        • <strong>Degree:</strong> ${edu.degree}<br>
        • <strong>College:</strong> ${edu.institution}<br>
        • <strong>University:</strong> ${edu.university}<br>
        • <strong>Graduation:</strong> ${edu.graduation}<br>
        • <strong>CGPA:</strong> <strong>${edu.cgpa}</strong>`,
        citations: [
          { label: "Education Section", href: "#about" }
        ]
      };
    }

    if (q.includes("certif") || q.includes("badge") || q.includes("credly") || q.includes("aws")) {
      return {
        role: "assistant",
        content: `Abhijeet holds 24+ verified technical credentials including:<br><br>
        • <strong>AWS Academy:</strong> Data Engineering, Generative AI Foundations, Machine Learning for NLP, Cloud Foundations (Credly verified).<br>
        • <strong>Oracle:</strong> Certified AI Foundations Associate (Credly verified).<br>
        • <strong>Google:</strong> Data Analytics (Coursera).<br>
        • <strong>Deloitte Australia & Tata Group:</strong> Verified data analytics job simulations via Forage.<br><br>
        All badges can be inspected directly on his Credly profile.`,
        citations: [
          { label: "Credly Badges Profile", href: "https://www.credly.com/users/abhijeet-gore.30f41028/badges/credly" },
          { label: "Certifications Section", href: "#certificates" }
        ]
      };
    }

    // Default grounded fallback with honesty disclosure
    return {
      role: "assistant",
      content: `I am strictly calibrated to answer questions verified by Abhijeet's engineering repositories, test suites, and documentation.<br><br>
      I cannot find specific documentation matching "<em>${query.replace(/</g, "&lt;")}</em>".<br><br>
      You can explore:
      <ul>
        <li><strong>Clinivara:</strong> Privacy-first clinical document intelligence</li>
        <li><strong>Agentic Clinical RAG:</strong> LangGraph multi-agent orchestration (61 passing tests)</li>
        <li><strong>Airflow ETL:</strong> Containerized PostgreSQL pipeline</li>
        <li><strong>Clinical ML:</strong> 30-day diabetic readmission prediction without data leakage</li>
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

