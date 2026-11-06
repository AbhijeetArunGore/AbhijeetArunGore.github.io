/**
 * Interactive AI Engineering Lab Controller
 * Controls:
 * 1. Clinical RAG Retrieval Lab (interactive chunking, BM25, dense similarity, hybrid fusion)
 * 2. Clinivara Document Intelligence Walkthrough (OCR, PII redaction, schema validation, multilingual)
 * 3. Agentic Clinical RAG LangGraph Explorer (state transitions, agent reasoning, state dict inspector)
 */

import {
  SYNTHETIC_CORPUS,
  executeRAGSearch,
  SYNTHETIC_CLINICAL_REPORT,
  AGENTIC_RAG_TRACE
} from "./synthetic_clinical.js";

import { DECISION_JOURNAL } from "../data/decision_journal.js";

class LabController {
  constructor() {
    this.initRAGLab();
    this.initClinivaraLab();
    this.initAgentGraphLab();
    this.initJournalViewer();
  }

  // ==========================================
  // 1. CLINICAL RAG RETRIEVAL LAB
  // ==========================================
  initRAGLab() {
    this.ragQueryInput = document.getElementById("rag-query-input");
    this.ragChunkSize = document.getElementById("rag-chunk-size");
    this.ragOverlap = document.getElementById("rag-overlap");
    this.ragTopK = document.getElementById("rag-topk");
    this.ragMode = document.getElementById("rag-mode");
    this.ragRunBtn = document.getElementById("rag-run-btn");
    this.ragResultsContainer = document.getElementById("rag-results-container");

    this.valChunkSize = document.getElementById("val-chunk-size");
    this.valOverlap = document.getElementById("val-overlap");
    this.valTopK = document.getElementById("val-topk");

    // Sliders value display binding
    if (this.ragChunkSize && this.valChunkSize) {
      this.ragChunkSize.addEventListener("input", (e) => {
        this.valChunkSize.innerText = e.target.value + " tokens";
        this.runRAGSearch();
      });
    }

    if (this.ragOverlap && this.valOverlap) {
      this.ragOverlap.addEventListener("input", (e) => {
        this.valOverlap.innerText = e.target.value + " tokens";
        this.runRAGSearch();
      });
    }

    if (this.ragTopK && this.valTopK) {
      this.ragTopK.addEventListener("input", (e) => {
        this.valTopK.innerText = e.target.value;
        this.runRAGSearch();
      });
    }

    if (this.ragMode) {
      this.ragMode.addEventListener("change", () => this.runRAGSearch());
    }

    if (this.ragRunBtn) {
      this.ragRunBtn.addEventListener("click", () => this.runRAGSearch());
    }

    // Preset query buttons
    document.querySelectorAll(".rag-preset-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (this.ragQueryInput) {
          this.ragQueryInput.value = btn.getAttribute("data-query");
          this.runRAGSearch();
        }
      });
    });

    // Run initial search
    this.runRAGSearch();
  }

  runRAGSearch() {
    if (!this.ragQueryInput || !this.ragResultsContainer) return;

    const query = this.ragQueryInput.value.trim() || "metformin kidney dosage";
    const chunkSize = parseInt(this.ragChunkSize?.value || "64", 10);
    const chunkOverlap = parseInt(this.ragOverlap?.value || "16", 10);
    const topK = parseInt(this.ragTopK?.value || "3", 10);
    const mode = this.ragMode?.value || "hybrid";

    const searchOutput = executeRAGSearch(query, {
      chunkSize,
      chunkOverlap,
      topK,
      mode,
      alpha: 0.6
    });

    this.renderRAGResults(searchOutput, query, mode);
  }

  renderRAGResults(output, query, mode) {
    if (!this.ragResultsContainer) return;

    const queryTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);

    let html = `
      <div class="rag-stats-bar">
        <span><i class="fas fa-layer-group"></i> Total Corpus Slices: <strong>${output.totalChunks} chunks</strong></span>
        <span><i class="fas fa-filter"></i> Top-K: <strong>${output.topKResults.length}</strong></span>
        <span><i class="fas fa-bolt"></i> Mode: <strong>${mode.toUpperCase()}</strong></span>
      </div>
      <div class="rag-cards-grid">
    `;

    output.topKResults.forEach((res, idx) => {
      let highlightedText = res.chunk.text;

      // Highlight lexical matches
      queryTokens.forEach(t => {
        const regex = new RegExp(`(${t})`, "gi");
        highlightedText = highlightedText.replace(regex, `<mark class="rag-mark">$1</mark>`);
      });

      const scorePercent = Math.round(res.finalScore * 100);
      const isTopHit = idx === 0;

      html += `
        <div class="rag-card ${isTopHit ? 'rag-card-top' : ''}">
          <div class="rag-card-header">
            <div class="rag-card-title-group">
              <span class="rag-rank-badge">#${idx + 1}</span>
              <span class="rag-doc-id">${res.chunk.id}</span>
              <span class="rag-category-pill">${res.chunk.category}</span>
            </div>
            <div class="rag-score-box">
              <span class="rag-score-label">Score</span>
              <span class="rag-score-val">${res.finalScore.toFixed(3)}</span>
            </div>
          </div>
          <h4 class="rag-doc-title">${res.chunk.docTitle}</h4>
          <p class="rag-snippet">${highlightedText}</p>
          <div class="rag-score-meters">
            <div class="score-row">
              <span>Dense Vector Similarity:</span>
              <div class="score-track"><div class="score-fill dense-fill" style="width: ${Math.round(res.denseScore * 100)}%"></div></div>
              <span class="score-num">${res.denseScore}</span>
            </div>
            <div class="score-row">
              <span>BM25 Keyword Match:</span>
              <div class="score-track"><div class="score-fill bm25-fill" style="width: ${Math.round(res.bm25Norm * 100)}%"></div></div>
              <span class="score-num">${res.bm25Score}</span>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    this.ragResultsContainer.innerHTML = html;
  }

  // ==========================================
  // 2. CLINIVARA PIPELINE DEMO
  // ==========================================
  initClinivaraLab() {
    this.clinivaraSteps = document.querySelectorAll(".pipeline-step-btn");
    this.clinivaraDisplay = document.getElementById("clinivara-stage-display");
    this.currentClinivaraStep = 1;

    this.clinivaraSteps.forEach(btn => {
      btn.addEventListener("click", () => {
        const step = parseInt(btn.getAttribute("data-step"), 10);
        this.setClinivaraStep(step);
      });
    });

    this.setClinivaraStep(1);
  }

  setClinivaraStep(step) {
    this.currentClinivaraStep = step;
    this.clinivaraSteps.forEach(b => {
      const bStep = parseInt(b.getAttribute("data-step"), 10);
      b.classList.toggle("active", bStep === step);
      b.classList.toggle("completed", bStep < step);
    });

    this.renderClinivaraStage(step);
  }

  renderClinivaraStage(step) {
    if (!this.clinivaraDisplay) return;

    const data = SYNTHETIC_CLINICAL_REPORT;

    if (step === 1) {
      // Document Ingestion
      this.clinivaraDisplay.innerHTML = `
        <div class="stage-view stage-ingestion">
          <div class="stage-badge"><i class="fas fa-file-pdf"></i> Step 1: Synthetic Document Ingestion</div>
          <p class="stage-desc">Unstructured clinical PDF or scan is submitted to Clinivara via an encrypted asynchronous endpoint. Raw document metadata is parsed.</p>
          <div class="metadata-grid">
            <div class="meta-box"><span class="lbl">Sample ID:</span> <strong>${data.metadata.sampleId}</strong></div>
            <div class="meta-box"><span class="lbl">Facility:</span> <strong>${data.metadata.facility}</strong></div>
            <div class="meta-box"><span class="lbl">Test Category:</span> <strong>${data.metadata.type}</strong></div>
          </div>
          <div class="code-terminal">
            <div class="terminal-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span> Document Stream Buffer</div>
            <pre><code>${data.rawText.substring(0, 480)}... [Document Continues]</code></pre>
          </div>
        </div>
      `;
    } else if (step === 2) {
      // Text Extraction & OCR
      this.clinivaraDisplay.innerHTML = `
        <div class="stage-view stage-ocr">
          <div class="stage-badge"><i class="fas fa-magnifying-glass"></i> Step 2: OCR & Layout Normalization</div>
          <p class="stage-desc">PyMuPDF extracts vector text layers, while fallback Tesseract OCR processes embedded tables and low-contrast doctor signature sections.</p>
          <div class="code-terminal">
            <div class="terminal-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span> Normalized OCR Text Stream</div>
            <pre><code>${data.rawText}</code></pre>
          </div>
        </div>
      `;
    } else if (step === 3) {
      // PII Entity Detection
      let highlighted = data.rawText;
      data.piiEntities.forEach(pii => {
        highlighted = highlighted.replace(
          pii.text,
          `<span class="pii-tag pii-detected" title="${pii.entity}"><i class="fas fa-triangle-exclamation"></i> ${pii.text} <span class="pii-entity-type">${pii.entity}</span></span>`
        );
      });

      this.clinivaraDisplay.innerHTML = `
        <div class="stage-view stage-pii">
          <div class="stage-badge"><i class="fas fa-shield-halved"></i> Step 3: PII Entity Detection (Presidio + spaCy)</div>
          <p class="stage-desc">Sensitive personal identity vectors are localized via specialized Named Entity Recognition before any LLM inference occurs.</p>
          <div class="pii-legend">
            <span class="legend-chip"><i class="fas fa-circle text-danger"></i> Patient Names</span>
            <span class="legend-chip"><i class="fas fa-circle text-warning"></i> Phone Numbers</span>
            <span class="legend-chip"><i class="fas fa-circle text-info"></i> Government ID (Aadhaar)</span>
            <span class="legend-chip"><i class="fas fa-circle text-purple"></i> Clinician Signatures</span>
          </div>
          <div class="code-terminal">
            <div class="terminal-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span> Token Classification Layer</div>
            <div class="ocr-highlight-box">${highlighted}</div>
          </div>
        </div>
      `;
    } else if (step === 4) {
      // De-identification
      let redacted = data.rawText;
      data.piiEntities.forEach(pii => {
        redacted = redacted.replace(
          pii.text,
          `<span class="pii-tag pii-redacted"><i class="fas fa-lock"></i> ${pii.mask}</span>`
        );
      });

      this.clinivaraDisplay.innerHTML = `
        <div class="stage-view stage-redacted">
          <div class="stage-badge"><i class="fas fa-user-shield"></i> Step 4: De-Identification & Cryptographic Tokenization</div>
          <p class="stage-desc">Personal identity markers are replaced with isolated tokens. Clinical facts (HbA1c, eGFR) remain completely intact for downstream reasoning.</p>
          <div class="code-terminal">
            <div class="terminal-bar"><span class="dot r"></span><span class="dot y"></span><span class="dot g"></span> Sanitized LLM Ingestion Buffer</div>
            <div class="ocr-highlight-box">${redacted}</div>
          </div>
        </div>
      `;
    } else if (step === 5) {
      // Schema Validation Gates
      let gatesHtml = data.validationGates.map(g => `
        <div class="gate-card gate-${g.status.toLowerCase()}">
          <div class="gate-icon"><i class="fas fa-check-circle"></i></div>
          <div class="gate-info">
            <div class="gate-rule">${g.rule} <span class="gate-status-pill">${g.status}</span></div>
            <div class="gate-detail">${g.detail}</div>
          </div>
        </div>
      `).join("");

      this.clinivaraDisplay.innerHTML = `
        <div class="stage-view stage-validation">
          <div class="stage-badge"><i class="fas fa-clipboard-check"></i> Step 5: Pydantic Schema & Clinical Range Gates</div>
          <p class="stage-desc">Strict programmatic assertions guarantee extracted data types, physiological plausibility, and zero residual PII.</p>
          <div class="gates-container">${gatesHtml}</div>
        </div>
      `;
    } else if (step === 6) {
      // Structured Multilingual Summary
      this.clinivaraDisplay.innerHTML = `
        <div class="stage-view stage-output">
          <div class="stage-badge"><i class="fas fa-language"></i> Step 6: Structured Entity Extraction & Multilingual Guidance</div>
          <p class="stage-desc">Parsed biomarkers and patient-friendly interpretations in English, Hindi, and Marathi, completely decoupled from patient identity.</p>
          
          <div class="biomarkers-table-wrapper">
            <table class="biomarkers-table">
              <thead>
                <tr>
                  <th>Biomarker</th>
                  <th>Observed Value</th>
                  <th>Reference</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${data.extractedClinicalEntities.map(e => `
                  <tr>
                    <td><strong>${e.name}</strong></td>
                    <td>${e.value} ${e.unit}</td>
                    <td>${e.normalRange}</td>
                    <td><span class="badge-status badge-${e.severity}">${e.status}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>

          <div class="multilingual-tabs">
            <div class="tab-buttons">
              <button class="lang-tab-btn active" data-lang="en"><i class="fas fa-globe"></i> English</button>
              <button class="lang-tab-btn" data-lang="hi">हिंदी (Hindi)</button>
              <button class="lang-tab-btn" data-lang="mr">मराठी (Marathi)</button>
            </div>
            <div class="tab-content" id="lang-summary-text">
              ${data.multilingualSummaries.en}
            </div>
          </div>
        </div>
      `;

      // Multilingual tab listeners
      document.querySelectorAll(".lang-tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".lang-tab-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const lang = btn.getAttribute("data-lang");
          const target = document.getElementById("lang-summary-text");
          if (target && data.multilingualSummaries[lang]) {
            target.innerText = data.multilingualSummaries[lang];
          }
        });
      });
    }
  }

  // ==========================================
  // 3. AGENTIC CLINICAL RAG WORKFLOW EXPLORER
  // ==========================================
  initAgentGraphLab() {
    this.graphSteps = document.querySelectorAll(".graph-node-pill");
    this.graphDisplay = document.getElementById("graph-node-display");
    this.activeGraphStep = 1;

    this.graphSteps.forEach(pill => {
      pill.addEventListener("click", () => {
        const step = parseInt(pill.getAttribute("data-step"), 10);
        this.setGraphStep(step);
      });
    });

    const prevBtn = document.getElementById("graph-prev-btn");
    const nextBtn = document.getElementById("graph-next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (this.activeGraphStep > 1) {
          this.setGraphStep(this.activeGraphStep - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (this.activeGraphStep < AGENTIC_RAG_TRACE.workflowGraph.length) {
          this.setGraphStep(this.activeGraphStep + 1);
        }
      });
    }

    this.setGraphStep(1);
  }

  setGraphStep(step) {
    this.activeGraphStep = step;
    const maxSteps = AGENTIC_RAG_TRACE.workflowGraph.length;

    this.graphSteps.forEach(pill => {
      const pStep = parseInt(pill.getAttribute("data-step"), 10);
      pill.classList.toggle("active", pStep === step);
      pill.classList.toggle("visited", pStep < step);
    });

    const stepData = AGENTIC_RAG_TRACE.workflowGraph.find(g => g.step === step);
    if (stepData && this.graphDisplay) {
      this.renderGraphStep(stepData);
    }

    // Toggle button disabled states
    const prevBtn = document.getElementById("graph-prev-btn");
    const nextBtn = document.getElementById("graph-next-btn");
    if (prevBtn) prevBtn.disabled = (step === 1);
    if (nextBtn) nextBtn.disabled = (step === maxSteps);
  }

  renderGraphStep(data) {
    this.graphDisplay.innerHTML = `
      <div class="agent-step-view">
        <div class="agent-step-header">
          <div class="agent-icon-box"><i class="fas ${data.icon}"></i></div>
          <div class="agent-title-info">
            <span class="agent-step-counter">Node ${data.step} of 5</span>
            <h3>${data.agentName}</h3>
            <p class="agent-role-summary">${data.role}</p>
          </div>
        </div>

        <div class="agent-reasoning-panel">
          <h4><i class="fas fa-brain"></i> Agent Execution Reasoning</h4>
          <p>${data.agentReasoning}</p>
        </div>

        <div class="state-json-split">
          <div class="json-column">
            <h5><i class="fas fa-arrow-down-long"></i> Input State Payload</h5>
            <pre><code>${JSON.stringify(data.inputState, null, 2)}</code></pre>
          </div>
          <div class="json-column">
            <h5><i class="fas fa-arrow-up-long"></i> State Transition Output</h5>
            <pre><code>${JSON.stringify(data.outputState, null, 2)}</code></pre>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // 4. ENGINEERING DECISION JOURNAL VIEWER
  // ==========================================
  initJournalViewer() {
    this.journalList = document.getElementById("journal-articles-list");
    this.journalModal = document.getElementById("journal-modal");
    this.journalModalBody = document.getElementById("journal-modal-body");
    this.journalClose = document.getElementById("journal-modal-close");

    if (this.journalClose && this.journalModal) {
      this.journalClose.addEventListener("click", () => {
        this.journalModal.classList.remove("active");
      });
    }

    this.renderJournalArticles();
  }

  renderJournalArticles() {
    if (!this.journalList) return;

    this.journalList.innerHTML = DECISION_JOURNAL.map(art => `
      <article class="journal-card" id="${art.id}">
        <div class="journal-meta">
          <span class="journal-category">${art.category}</span>
          <span class="journal-time"><i class="far fa-clock"></i> ${art.readingTime}</span>
        </div>
        <h3 class="journal-title">${art.title}</h3>
        <p class="journal-summary">${art.summary}</p>
        <div class="journal-footer">
          <span class="journal-project"><i class="fas fa-code-branch"></i> ${art.project}</span>
          <button class="btn-read-note" data-id="${art.id}">Read Full Analysis &rarr;</button>
        </div>
      </article>
    `).join("");

    document.querySelectorAll(".btn-read-note").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const art = DECISION_JOURNAL.find(a => a.id === id);
        if (art) this.openJournalArticle(art);
      });
    });
  }

  openJournalArticle(art) {
    if (!this.journalModal || !this.journalModalBody) return;

    this.journalModalBody.innerHTML = `
      <div class="journal-full-article">
        <span class="article-project-badge"><i class="fas fa-code-branch"></i> Project: ${art.project} | ${art.category}</span>
        <h2 class="article-headline">${art.title}</h2>
        <div class="article-dateline">Documented: ${art.date} • ${art.readingTime}</div>
        
        <div class="article-section">
          <h4>1. Problem Formulation & System Constraints</h4>
          <p>${art.problem}</p>
        </div>

        <div class="article-section">
          <h4>2. Initial Naive Approach</h4>
          <p>${art.initialApproach}</p>
        </div>

        <div class="article-section callout-failure">
          <h4><i class="fas fa-triangle-exclamation"></i> 3. Failure Mode & Empirical Vulnerabilities</h4>
          <p>${art.failureMode}</p>
        </div>

        <div class="article-section callout-decision">
          <h4><i class="fas fa-gears"></i> 4. Architectural Decision & Implementation</h4>
          <p>${art.engineeringDecision}</p>
        </div>

        <div class="article-section">
          <h4>5. Empirical Results & Verified Metrics</h4>
          <p>${art.results}</p>
        </div>

        <div class="article-section">
          <h4>6. Technical Limitations & Next Iterations</h4>
          <p>${art.futureImprovements}</p>
        </div>
      </div>
    `;

    this.journalModal.classList.add("active");
  }
}

// Instantiate on DOM load
document.addEventListener("DOMContentLoaded", () => {
  window.labController = new LabController();
});

