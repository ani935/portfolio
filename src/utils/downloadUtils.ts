import { CaseStudy } from '../data/portfolioData';

/**
 * Initiates browser file download using Blob URL
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string = 'text/markdown;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a single case study as a pristine Markdown file
 */
export function downloadCaseStudyMarkdown(caseStudy: CaseStudy) {
  triggerFileDownload(caseStudy.markdownContent, caseStudy.downloadFilename, 'text/markdown;charset=utf-8;');
}

/**
 * Downloads all case studies bundled into a single comprehensive Research & Engineering Whitepaper
 */
export function downloadAllCaseStudiesBundle(caseStudies: CaseStudy[]) {
  const bundleHeader = `# ANIKET DAS — ENGINEERING CASE STUDIES COMPENDIUM
**Author:** Aniket Das (B.Tech in Computer Science - AI & ML)
**Specialization:** Agentic AI, Generative AI, RAG Architectures & Computer Vision
**Contact:** aniketdas20190@gmail.com | (+91) 9051879720
**Academic Institution:** Brainware University, Kolkata (CGPA: 9.14/10.0)
**Compiled:** October 2026

================================================================================
TABLE OF CONTENTS:
${caseStudies.map((cs, i) => `${i + 1}. ${cs.title} (${cs.category})`).join('\n')}
================================================================================\n\n`;

  const fullContent = bundleHeader + caseStudies.map(cs => cs.markdownContent).join('\n\n' + '='.repeat(80) + '\n\n');
  triggerFileDownload(fullContent, 'Aniket_Das_Engineering_Case_Studies_Compendium.md', 'text/markdown;charset=utf-8;');
}

/**
 * Opens a clean printable document window or triggers printing for a case study
 */
export function printCaseStudy(caseStudy: CaseStudy) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${caseStudy.title} - Case Study by Aniket Das</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #111827;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
    }
    h1 { font-size: 24px; margin-bottom: 4px; color: #0f172a; }
    h2 { font-size: 18px; margin-top: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; color: #1e293b; }
    h3 { font-size: 15px; color: #334155; margin-top: 16px; }
    .meta { font-size: 13px; color: #64748b; margin-bottom: 24px; }
    .meta span { margin-right: 12px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 16px 0; }
    .metric-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 16px 0; }
    .metric-card { border: 1px solid #e2e8f0; padding: 12px; border-radius: 6px; text-align: center; }
    .metric-value { font-size: 20px; font-weight: bold; color: #2563eb; }
    .metric-label { font-size: 12px; color: #64748b; }
    pre { background: #0f172a; color: #e2e8f0; padding: 14px; border-radius: 6px; overflow-x: auto; font-size: 12px; font-family: monospace; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; font-size: 14px; }
    @media print {
      body { margin: 20px; max-width: 100%; }
      button { display: none; }
    }
  </style>
</head>
<body>
  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
    <div>
      <div style="font-size:12px; font-weight:600; text-transform:uppercase; letter-spacing:1px; color:#2563eb;">Engineering Case Study</div>
      <h1>${caseStudy.title}</h1>
      <p style="color:#475569; margin:4px 0 12px 0;">${caseStudy.subtitle}</p>
      <div class="meta">
        <span><strong>Author:</strong> Aniket Das</span>
        <span><strong>Category:</strong> ${caseStudy.category}</span>
        <span><strong>Published:</strong> ${caseStudy.date}</span>
        <span><strong>Read Time:</strong> ${caseStudy.readTime}</span>
      </div>
    </div>
  </div>

  <div class="box">
    <strong>Executive Summary:</strong>
    <p style="margin: 8px 0 0 0; font-size: 14px;">${caseStudy.executiveSummary}</p>
  </div>

  <h2>1. Problem Statement & Operational Challenge</h2>
  <p style="font-size: 14px;">${caseStudy.challenge}</p>

  <h2>2. Engineering Solution & System Architecture</h2>
  <p style="font-size: 14px;">${caseStudy.solution}</p>
  
  <h3>Pipeline Flow</h3>
  <ol>
    ${caseStudy.architecture.steps.map(s => `<li><strong>${s.name}</strong> (${s.tech}): ${s.description}</li>`).join('')}
  </ol>

  <h2>3. Key Verified Benchmarks</h2>
  <div class="metric-grid">
    ${caseStudy.benchmarks.map(b => `
      <div class="metric-card">
        <div class="metric-value">${b.value}</div>
        <div class="metric-label"><strong>${b.metric}</strong></div>
        <div style="font-size: 11px; color:#94a3b8; margin-top:4px;">${b.context}</div>
      </div>
    `).join('')}
  </div>

  <h2>4. Core Technical Highlights</h2>
  <ul>
    ${caseStudy.technicalHighlights.map(th => `<li>${th}</li>`).join('')}
  </ul>

  ${caseStudy.codeSnippet ? `
    <h2>5. Implementation Excerpt (${caseStudy.codeSnippet.filename})</h2>
    <pre><code>${escapeHtml(caseStudy.codeSnippet.code)}</code></pre>
  ` : ''}

  <h2>6. Key Takeaways & Future Research</h2>
  <ul>
    ${caseStudy.learnings.map(l => `<li>${l}</li>`).join('')}
  </ul>

  <div style="margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b; text-align: center;">
    Document certified by Aniket Das · Contact: aniketdas20190@gmail.com · Phone: (+91) 9051879720 · Brainware University (AI & ML)
  </div>

  <script>
    window.onload = function() {
      window.print();
    }
  </script>
</body>
</html>`;

  printWindow.document.open();
  printWindow.document.write(printHtml);
  printWindow.document.close();
}

function escapeHtml(string: string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
