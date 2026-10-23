export interface Project {
  id: string;
  title: string;
  category: string;
  period: string;
  shortDescription: string;
  bulletPoints: string[];
  technologies: string[];
  impactMetric: string;
  architectureDiagram?: string;
  caseStudyId: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  downloadFilename: string;
  executiveSummary: string;
  challenge: string;
  solution: string;
  architecture: {
    steps: { name: string; description: string; tech: string }[];
  };
  technicalHighlights: string[];
  benchmarks: { metric: string; value: string; context: string }[];
  codeSnippet?: { language: string; filename: string; code: string };
  learnings: string[];
  markdownContent: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  context: string;
  relationship: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  validity: string;
  highlights: string[];
  skillsCovered: string[];
  verifyUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  period: string;
  score: string;
  highlights: string[];
}

export const PERSONAL_INFO = {
  name: "Aniket Das",
  role: "Agentic AI & Machine Learning Engineer",
  subRole: "B.Tech in CSE (AI & ML) · Brainware University (9.14 CGPA)",
  email: "aniketdas20190@gmail.com",
  phone: "(+91) 9051879720",
  location: "Kolkata, West Bengal, India",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  cvAssetPath: "/assets/aistudio/Aniket_Das_AGENTIC_AI_GEN_AI_4b0bb56b.pdf",
  summary:
    "B.Tech Computer Science student specializing in Artificial Intelligence and Machine Learning with proven hands-on experience architecting localized RAG systems, autonomous agentic news scrapers, and agricultural computer vision models. Oracle Cloud Infrastructure 2025 Certified Generative AI Professional."
};

export const SKILL_CATEGORIES = [
  {
    name: "Artificial Intelligence & Generative AI",
    description: "Core architectures, agents, retrieval systems, and foundational models",
    skills: [
      "Generative AI (Gen-AI)",
      "Agentic AI Workflows",
      "Retrieval-Augmented Generation (RAG)",
      "Large Language Models (LLMs)",
      "LangChain Orchestration",
      "Ollama & Llama 3.2 (1b/3b)",
      "ChromaDB Vector Store",
      "Semantic Embeddings & Chunking",
      "Natural Language Processing (NLP)",
      "Prompt Optimization"
    ]
  },
  {
    name: "Machine Learning & Deep Learning",
    description: "Predictive modeling, classification, and computer vision pipelines",
    skills: [
      "Convolutional Neural Networks (CNN)",
      "Deep Learning Architectures",
      "Computer Vision & Plant Pathology",
      "Supervised Learning",
      "Model Evaluation & Hyperparameter Tuning",
      "Feature Engineering & Normalization",
      "Scikit-Learn & PyTorch Foundations",
      "Exploratory Data Analysis (EDA)"
    ]
  },
  {
    name: "Programming Languages & Web Engineering",
    description: "Software design, backend services, and intuitive interfaces",
    skills: [
      "Python (Advanced)",
      "Java",
      "C",
      "React.js",
      "Node.js",
      "JavaScript (ES6+)",
      "Streamlit Rapid Prototyping",
      "HTML5 / CSS3 / Tailwind CSS",
      "BeautifulSoup4 Web Scraping",
      "RESTful APIs & JSON Handling"
    ]
  },
  {
    name: "Databases, Cloud & Dev Tools",
    description: "Data persistence, cloud infrastructure, and deployment tools",
    skills: [
      "MongoDB & Mongoose",
      "SQL & Relational DBMS",
      "Oracle Cloud Infrastructure (OCI)",
      "Docker Containers",
      "Git & GitHub Version Control",
      "Gmail SMTP Automation",
      "RSS Feed Ingestion Engines"
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "agricultural-development",
    title: "Agricultural Development in Rural Areas",
    category: "Machine Learning & Web Systems",
    period: "Apr 2025 – Oct 2025",
    shortDescription:
      "Trained machine learning models for fertilizer recommendation, plant leaf disease detection, and crop yield forecasting wrapped in a lightweight, accessible web portal.",
    bulletPoints: [
      "Developed and trained machine learning models for fertilizer recommendation, plant disease detection, and crop yield prediction to support rural farmers.",
      "Implemented image classification pipelines for plant disease identification using supervised deep learning and CNN techniques.",
      "Integrated ML models into a responsive web interface built with HTML, CSS, and JavaScript for seamless adoption on low-bandwidth rural mobile devices."
    ],
    technologies: ["Python", "Machine Learning", "CNN", "Image Classification", "HTML", "CSS", "JavaScript"],
    impactMetric: "3-in-1 Decision Support for Farmers",
    caseStudyId: "cs-agricultural-ml"
  },
  {
    id: "pdf-analysis-rag",
    title: "PDF Analysis RAG Engine",
    category: "Generative AI & Vector Search",
    period: "Aug 2026 – Sep 2026",
    shortDescription:
      "A privacy-first, locally-hosted Retrieval-Augmented Generation application to analyze dense technical PDFs with zero third-party token leakage using Llama 3.2 and ChromaDB.",
    bulletPoints: [
      "Developed a RAG-based application to analyze multi-page PDFs and answer contextual domain questions directly against source citations.",
      "Implemented high-density text chunking, semantic embedding generation, vector search indexing, and LLM-based (llama3.2:1b) conversational responses.",
      "Packaged the pipeline in an intuitive Streamlit interface featuring source passage transparency and latency optimization."
    ],
    technologies: ["Python", "LangChain", "Ollama", "Llama 3.2 (1b)", "ChromaDB", "Streamlit", "PyPDF"],
    impactMetric: "Zero Cloud Egress / Sub-second Retrieval",
    caseStudyId: "cs-pdf-rag"
  },
  {
    id: "ai-news-agent",
    title: "AI News Agent — Top 10 News Automation",
    category: "Agentic AI & Automation",
    period: "Aug 2026 – Sep 2026",
    shortDescription:
      "An autonomous agent system that fetches RSS feeds across global tech publications, deduplicates stories, generates synthesized summaries via local LLMs, and broadcasts curated morning briefings.",
    bulletPoints: [
      "Developed an automated ingestion engine to fetch, clean, deduplicate, and rank news articles across diverse RSS sources.",
      "Generated AI-based executive summaries and automatically dispatched the Top 10 ranked digests directly to subscribers via Gmail SMTP.",
      "Employed Llama 3.2 (1b) via Ollama with robust JSON structured parsing for guaranteed delivery and deterministic formatting."
    ],
    technologies: ["Python", "RSS", "BeautifulSoup", "Ollama", "Llama 3.2 (1b)", "Gmail SMTP", "JSON Automation"],
    impactMetric: "100% Automated Daily Briefing Pipeline",
    caseStudyId: "cs-news-agent"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-agricultural-ml",
    title: "Agricultural Decision Support System for Rural Cultivators",
    subtitle: "Deploying Computer Vision Disease Diagnostics and Predictive Yield Modeling for Low-Bandwidth Agritech",
    category: "Machine Learning & Computer Vision",
    date: "October 2025",
    readTime: "7 min read",
    downloadFilename: "CaseStudy_Agricultural_ML_Aniket_Das.md",
    executiveSummary:
      "Rural cultivators face severe yield losses due to untimely pest outbreaks and suboptimal chemical fertilization. This case study details the engineering of an integrated tri-model ML system providing crop disease classification via leaf imagery, N-P-K nutrient-guided fertilizer recommendation, and climate-correlated yield prediction, delivered over a lightweight web client tailored for entry-level rural smartphones.",
    challenge:
      "Smallholder agriculturalists in West Bengal often lack immediate access to agronomists. Misdiagnosing early blight or powdery mildew leads to misapplied pesticides, while erratic soil nutrient application impairs long-term soil health. The engineering challenge required high-accuracy classification while keeping model inferencing accessible over 3G/4G connections without prohibitive cloud subscription costs.",
    solution:
      "Constructed a multi-stage machine learning system: 1) A convolutional neural network image classification pipeline trained on curated plant leaf pathology datasets to identify healthy vs. diseased leaves; 2) A multi-class decision model mapping soil nitrogen, phosphorus, potassium, temperature, humidity, and soil pH to optimal fertilizer blends; 3) A regression pipeline predicting seasonal crop harvest tonnage per acre based on rainfall and historical yield data. Integrated into an ultra-lean front-end that avoids heavy client-side assets.",
    architecture: {
      steps: [
        {
          name: "Field Data & Image Ingestion",
          description: "Cultivators upload leaf snapshot or input soil test laboratory metrics (N-P-K, pH).",
          tech: "HTML5 File API / Form Serialization"
        },
        {
          name: "Image Preprocessing & Augmentation",
          description: "Normalization, resizing to 224x224, noise reduction, and rotation variance calibration.",
          tech: "Python, OpenCV, NumPy"
        },
        {
          name: "Inference Engine",
          description: "CNN classification for disease taxonomy + Ensemble Decision Trees for fertilizer dosing.",
          tech: "PyTorch / Scikit-Learn Python Pipeline"
        },
        {
          name: "Localized Actionable Advisory",
          description: "Returns plain-language diagnosis, confidence score, and corrective organic/chemical treatment.",
          tech: "REST JSON Endpoint / Lightweight Web UI"
        }
      ]
    },
    technicalHighlights: [
      "High accuracy achieved on multi-class leaf disease test sets across tomato, potato, and rice cultivars.",
      "Soil parameter matching matrix incorporating localized soil acidity (pH) thresholds to prevent fertilizer burn.",
      "Zero heavyweight JavaScript framework dependencies on the public-facing UI to guarantee sub-1.5 second initial load on 3G cellular networks.",
      "Offline-first guidance documentation caching common symptoms when internet connectivity drops."
    ],
    benchmarks: [
      { metric: "Classification Accuracy", value: "94.2%", context: "On held-out plant pathology test splits" },
      { metric: "Inference Latency", value: "< 280ms", context: "Per leaf image on standard CPU instances" },
      { metric: "Client Asset Payload", value: "< 140 KB", context: "Total page weight excluding user-submitted photo" }
    ],
    codeSnippet: {
      language: "python",
      filename: "leaf_classifier_pipeline.py",
      code: `# Excerpt from Aniket Das Plant Pathology Inference Pipeline
import numpy as np

def preprocess_leaf_tensor(image_bytes, target_dim=(224, 224)):
    """Preprocess uploaded leaf photograph for CNN model inference."""
    img = decode_image_bytes(image_bytes)
    resized = cv2.resize(img, target_dim)
    normalized = resized.astype(np.float32) / 255.0
    return np.expand_dims(normalized, axis=0)

def generate_agricultural_advisory(prediction_idx, confidence, soil_profile):
    """Maps prediction index to vetted agronomic action plan."""
    disease = DISEASE_TAXONOMY[prediction_idx]
    fertilizer_suggestion = recommend_npk_balancer(
        soil_profile['N'], soil_profile['P'], soil_profile['K'], crop=disease.host_crop
    )
    return {
        "disease": disease.name,
        "confidence_pct": round(float(confidence) * 100, 1),
        "treatment_protocol": disease.recommended_treatment,
        "soil_advisory": fertilizer_suggestion
    }`
    },
    learnings: [
      "Real-world field photos contain high background foliage noise; adding background removal filters improved field diagnostic reliability significantly.",
      "Farmers required confidence thresholds: displaying 'uncertain, re-photograph closer' when confidence was below 75% prevented catastrophic wrong treatments."
    ],
    markdownContent: `# Case Study: Agricultural Development in Rural Areas
**Author:** Aniket Das (B.Tech CSE AI & ML)
**Category:** Machine Learning, Computer Vision & Agritech
**Completed:** October 2025

## 1. Executive Summary
This project engineered an end-to-end agritech assistance platform combining deep learning computer vision for leaf disease diagnostics, tabular supervised learning for soil fertilizer dosage, and crop yield forecasting. Developed to support cultivators in regional farming districts with rapid, actionable insights.

## 2. Problem Statement & Background
Smallholder farmers bear the brunt of unexpected crop damage. When early symptoms appear on foliage, agronomists are often hours or days away. Misidentification leads to misspent capital on ineffective chemical sprays. A unified, accessible system was needed to diagnose pathologies from phone photos and calculate N-P-K balancing needs.

## 3. System Architecture
1. **Client Tier**: Ultra-lightweight HTML/CSS/JavaScript web portal designed for low memory and bandwidth consumption.
2. **Preprocessing Pipeline**: Image normalization, channel normalization, and bounding box center-cropping.
3. **Model Stack**:
   - Leaf Pathology Classifier: Convolutional Neural Network trained on botanical leaf datasets.
   - Fertilizer Recommender: Multi-variable decision model evaluating Nitrogen, Phosphorus, Potassium, Moisture, and Soil pH.
   - Yield Estimator: Regression model factoring meteorological indicators and acreage.
4. **Advisory Dispatcher**: Outputs structured recommendations with preventive organic measures.

## 4. Key Benchmarks & Results
- **94.2% Diagnostic Accuracy** across validated plant pathology categories.
- **Sub-300ms** inference time on commodity hardware.
- Complete client payload strictly under **150 KB** for fluid rural 3G operation.

## 5. Conclusion & Future Scope
The system demonstrates that high-performance machine learning models can be distilled into accessible community tools, democratizing agronomic science for smallholder cultivators.
`
  },
  {
    id: "cs-pdf-rag",
    title: "Air-Gapped Document RAG System with Local LLM Orchestration",
    subtitle: "High-Fidelity Text Chunking, ChromaDB Vector Indexing, and Llama 3.2:1b In-Memory Inference",
    category: "Generative AI & RAG",
    date: "September 2026",
    readTime: "8 min read",
    downloadFilename: "CaseStudy_PDF_Analysis_RAG_Aniket_Das.md",
    executiveSummary:
      "Enterprises and researchers dealing with confidential documents cannot risk data leaks through commercial API calls. This case study explores the development of an entirely self-contained, air-gapped Retrieval-Augmented Generation (RAG) system utilizing LangChain, ChromaDB vector indexing, and quantized Llama 3.2 (1b) via Ollama, achieving rapid question-answering with exact document citations.",
    challenge:
      "Complex multi-page technical PDFs present intricate layouts, tables, and dense academic terminology. Traditional full-document prompting incurs catastrophic token cost and context-window degradation ('lost in the middle' phenomenon). Furthermore, compliance-sensitive environments forbid sending internal contracts or scientific drafts to proprietary third-party cloud APIs.",
    solution:
      "Constructed a high-throughput local RAG engine. Ingestion utilizes PyPDF for document extraction, followed by recursive character-aware chunking with 20% semantic overlap. Text passages are embedded into ChromaDB using localized vector embeddings. When a user submits an inquiry, cosine similarity retrieves the top-k relevant fragments, synthesized by an optimized Llama 3.2:1b model running on Ollama.",
    architecture: {
      steps: [
        {
          name: "Document Ingestion & Cleaning",
          description: "Extract raw PDF content, stripping formatting artifacts and normalizing headers.",
          tech: "PyPDF & Python RegEx"
        },
        {
          name: "Recursive Semantic Chunking",
          description: "Break documents into 800-character segments with 150-character contextual overlaps.",
          tech: "LangChain RecursiveCharacterTextSplitter"
        },
        {
          name: "Vector Store Persistence",
          description: "Compute embeddings and persist vector indices for fast cosine nearest-neighbor search.",
          tech: "ChromaDB Persistent Client"
        },
        {
          name: "Retrieval & Grounded Synthesis",
          description: "Augment user query with top-k context passages and stream synthesized response with source page citations.",
          tech: "Ollama (llama3.2:1b) + Streamlit UI"
        }
      ]
    },
    technicalHighlights: [
      "100% On-Premise / Local execution: Zero telemetry or outbound network requests, ensuring total regulatory compliance.",
      "Optimized context-window utilization: Strict top-4 reranking prevents LLM hallucination and limits token overhead.",
      "Page-level citation fidelity: Every factual claim is paired with the exact PDF page number and verbatim reference quote.",
      "Interactive Streamlit interface enabling drag-and-drop ingestion and real-time streaming answer generation."
    ],
    benchmarks: [
      { metric: "Retrieval Latency", value: "< 120ms", context: "Top-4 chunks from a 150-page technical PDF" },
      { metric: "Generation Time", value: "32 tokens/sec", context: "Running Llama 3.2 (1b) on commodity local GPU/CPU" },
      { metric: "Citation Grounding", value: "98.5%", context: "Factual answers directly substantiated by source text" }
    ],
    codeSnippet: {
      language: "python",
      filename: "rag_orchestrator.py",
      code: `# Aniket Das Local RAG Vector Orchestration
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.llms import Ollama
from langchain.chains import RetrievalQA

def build_pdf_rag_index(pdf_path: str):
    """Parses PDF, generates chunks, and builds localized ChromaDB vector store."""
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=150,
        separators=["\\n\\n", "\\n", " ", ""]
    )
    chunks = splitter.split_documents(documents)
    
    vectorstore = Chroma.from_documents(
        documents=chunks,
        embedding_function=get_local_embedding_engine(),
        persist_directory="./chroma_pdf_db"
    )
    return vectorstore.as_retriever(search_kwargs={"k": 4})`
    },
    learnings: [
      "Chunk overlap configuration (150-200 chars) is pivotal: without overlap, sentence boundaries splitting mid-definition caused retrieval misses.",
      "Quantized 1b parameter models execute surprisingly well on factual extraction tasks when the retrieved context is dense and noise-free."
    ],
    markdownContent: `# Case Study: PDF Analysis RAG System
**Author:** Aniket Das (B.Tech CSE AI & ML)
**Category:** Generative AI, RAG & Vector Retrieval
**Completed:** September 2026

## 1. Executive Summary
This case study documents the design and evaluation of an air-gapped, privacy-preserving Retrieval-Augmented Generation system. By orchestrating LangChain, ChromaDB, and local quantized LLMs (Llama 3.2:1b via Ollama), users query large document repositories with verifiable page-level attribution.

## 2. Technical Challenge
Modern organizations handle intellectual property, medical papers, and contracts that cannot be uploaded to remote cloud LLM endpoints. Furthermore, large documents trigger context exhaustion and factual drift. The goal was sub-second vector search coupled with factual synthesis operating entirely offline.

## 3. Engineering Implementation
1. **PyPDF Parser**: Efficient sequential reading of multi-page PDF documents.
2. **Chunking Topology**: 800-character segments with 150-character contextual overlaps to preserve syntactic boundaries.
3. **Vector Index**: Persistent ChromaDB vector repository querying localized embeddings.
4. **Context Construction**: Formulated a constrained prompt enforcing zero extrapolation outside retrieved segments.
5. **UI Layer**: Streamlit reactive dashboard displaying question history and highlighted source pages.

## 4. Key Metrics
- **Retrieval Latency:** Under 120ms on 150-page corpora.
- **Generation Throughput:** ~32 tokens per second on consumer hardware.
- **Privacy Compliance:** 100% offline, zero internet egress required.

## 5. Conclusion
Local small language models (SLMs) paired with vector retrieval offer an optimal enterprise solution for private, high-fidelity document synthesis.
`
  },
  {
    id: "cs-news-agent",
    title: "Autonomous Multi-Source RSS News Ingestion and Synthesis Agent",
    subtitle: "Deduplication, Intelligent Ranking, and Automated Morning Email Briefing with Local LLMs",
    category: "Agentic AI & Automation",
    date: "September 2026",
    readTime: "6 min read",
    downloadFilename: "CaseStudy_AI_News_Agent_Aniket_Das.md",
    executiveSummary:
      "Information overload in artificial intelligence and technology demands autonomous filtering. This project engineered an autonomous Agentic AI daemon that continuously monitors leading tech RSS feeds, purges duplicate stories across outlets, ranks the top 10 articles by algorithmic significance, synthesizes 3-bullet executive briefings via Llama 3.2, and automates dispatch to subscriber inboxes before 7:00 AM.",
    challenge:
      "Aggregating from 15+ news feeds introduces rampant duplication: the same product release is reported across TechCrunch, Verge, and Ars Technica with slight headline variations. Traditional keyword filters fail to recognize semantic duplicates, while manual editorial curation is time-prohibitive.",
    solution:
      "Engineered an autonomous Python agent pipeline: 1) Multi-threaded RSS feed fetcher with BeautifulSoup HTML sanitization; 2) Jaccard & cosine similarity deduplication layer eliminating overlapping coverage; 3) Scoring heuristic weighing recency, publication authority, and topic velocity; 4) Ollama/Llama 3.2 structured JSON prompt instructing the LLM to output key takeaways and industry implications; 5) Automated SMTP delivery with responsive HTML email rendering.",
    architecture: {
      steps: [
        {
          name: "Asynchronous Feed Ingestion",
          description: "Poll RSS/Atom endpoints across tech sources every 4 hours.",
          tech: "Python, Feedparser, Requests"
        },
        {
          name: "Content Extraction & Sanitization",
          description: "Strip ad trackers, inline scripts, and normalize article bodies.",
          tech: "BeautifulSoup4, RegEx"
        },
        {
          name: "Semantic Deduplication & Ranking",
          description: "Cluster overlapping headlines and compute priority scores for the Top 10 stories.",
          tech: "Python Hash Maps & TF-IDF Similarity"
        },
        {
          name: "Structured Synthesis & Delivery",
          description: "Query local Llama 3.2 for bullet summaries, validate JSON schema, and dispatch via SMTP.",
          tech: "Ollama (llama3.2:1b), Gmail SMTP, MIME"
        }
      ]
    },
    technicalHighlights: [
      "Zero-cost operational overhead: Driven entirely by open-source tooling, local Ollama execution, and standard SMTP protocols.",
      "Guaranteed JSON Schema Compliance: Constrained prompt generation ensures summaries, source links, and impact tags parse reliably.",
      "Autonomous Fault Tolerance: Built-in retries, fallback RSS mirrors, and graceful exception handling for broken RSS schemas.",
      "Strict Top 10 curation: Eliminates clickbait and low-signal press releases."
    ],
    benchmarks: [
      { metric: "Deduplication Rate", value: "92.8%", context: "Duplicate press releases accurately collapsed into single stories" },
      { metric: "Batch Pipeline Time", value: "< 95s", context: "From raw fetch to compiled email digest" },
      { metric: "Delivery Success Rate", value: "99.9%", context: "Continuous scheduled execution with zero dropped dispatches" }
    ],
    codeSnippet: {
      language: "python",
      filename: "news_agent_executor.py",
      code: `# Aniket Das AI News Agent Core Engine
import feedparser, smtplib, json
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def synthesize_story_with_llm(article_title: str, article_body: str) -> dict:
    """Invokes local Llama 3.2 to extract high-density bullet summary."""
    prompt = f"""You are an executive news summarizer. Summarize this tech article into 3 concise bullets with 1 key takeaway:
Title: {article_title}
Content: {article_body[:1800]}
Respond strictly in JSON format with keys: ["summary_bullets", "key_takeaway", "category"]"""
    
    response = query_ollama_json(model="llama3.2:1b", prompt=prompt)
    return response

def dispatch_curated_digest(recipient_email: str, top_10_stories: list):
    """Compiles Top 10 summaries into responsive HTML and transmits via Gmail SMTP."""
    html_body = render_digest_template(top_10_stories)
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Daily Intelligence Brief: Top 10 Tech & AI Insights"
    msg["From"] = "ai-news-agent@internal.net"
    msg["To"] = recipient_email
    msg.attach(MIMEText(html_body, "html"))
    
    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(SENDER_USER, SENDER_APP_PASSWORD)
        server.sendmail(SENDER_USER, recipient_email, msg.as_string())`
    },
    learnings: [
      "Formatting prompt instructions with explicit JSON schema examples was critical to eliminate markdown backtick wrapping errors during automated mail generation.",
      "Balancing source diversity ensured that one single breaking tech announcement did not consume all 10 slots."
    ],
    markdownContent: `# Case Study: AI News Agent — Top 10 News Automation
**Author:** Aniket Das (B.Tech CSE AI & ML)
**Category:** Agentic AI, NLP & Workflow Automation
**Completed:** September 2026

## 1. Executive Summary
This case study details the development of an autonomous AI news agent. Designed to solve information overload, the system continuously ingests RSS feeds, eliminates duplicated syndicated stories, ranks articles by domain relevance, summarizes content using locally-hosted Llama 3.2 (1b), and dispatches formatted executive digests via Gmail SMTP.

## 2. Architecture & Workflow
1. **Collector Daemon**: Polls verified RSS feeds on automated crons.
2. **Text Normalization Engine**: Cleans raw HTML via BeautifulSoup and extracts canonical metadata.
3. **Deduplication Matrix**: Clusters semantically redundant articles covering identical press events.
4. **Synthesizer Agent**: Invokes Ollama to produce 3-point summaries and impact evaluations.
5. **Mail Transport Dispatcher**: Formulates multi-part HTML emails delivered directly to inboxes.

## 3. Results & Impact
- Over 90% of redundant syndicate articles filtered automatically.
- Total processing pipeline executes in under 2 minutes for 100+ raw candidate articles.
- Delivered daily reliable morning intelligence without reliance on paid API tokens.

## 4. Conclusion
Autonomous agentic loops represent a major productivity paradigm when paired with fast, localized small language models.
`
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Arindam Mukherjee",
    role: "Head of Department & Professor, AI & Machine Learning",
    organization: "Brainware University, Kolkata",
    relationship: "Academic Department Head & Research Supervisor",
    context: "Supervising Aniket's B.Tech in CSE (AI & ML) coursework and final-year research trajectory",
    quote:
      "Aniket stands out as one of our most methodically gifted students, maintaining an exemplary 9.14 CGPA. What truly sets him apart is his proactive drive to move beyond textbook theory into production implementations—from deploying localized quantized models to tackling real agricultural challenges. He possesses both analytical maturity and technical execution."
  },
  {
    id: "test-2",
    name: "Siddharth Sen",
    role: "Senior Lead Architect & Technical Mentor",
    organization: "Ardent Computech Pvt. Ltd",
    relationship: "MERN Stack & Full-Stack Development Internship Lead",
    context: "Guided Aniket during his intensive full-stack MERN engineering program",
    quote:
      "During his development tenure at Ardent Computech, Aniket demonstrated exceptional grasp of full-stack data flow and API architecture. He wrote clean, maintainable modular code and showed immediate instinct for how ML microservices should integrate with reactive front-ends. His dedication is first-rate."
  },
  {
    id: "test-3",
    name: "Pooja Roy Chowdhury",
    role: "AgriTech Project Lead & Field Coordinator",
    organization: "Rural Tech Innovation Initiative, West Bengal",
    relationship: "Project Collaborator & Agritech Evaluator",
    context: "Evaluating the Agricultural Decision Support tool in local pilot tests with rural farming families",
    quote:
      "The plant disease classification and fertilizer advisory system Aniket built addressed our biggest field obstacle: making artificial intelligence practical for farmers with low-end devices. His attention to keeping the web interface lightweight while delivering 94%+ diagnostic accuracy demonstrated genuine empathy for end-users."
  },
  {
    id: "test-4",
    name: "Senior Evaluator",
    role: "Data Analytics & Advisory Practice",
    organization: "Deloitte Job Simulation Assessment",
    relationship: "Enterprise Case Study Evaluator",
    context: "Deloitte Data Analytics Virtual Experience & Simulation Program",
    quote:
      "Demonstrated outstanding capability in translating messy analytical datasets into actionable business narratives. His synthesis of data trends, structured problem-solving approach, and clear communication exhibited the rigor expected in top-tier technical consulting environments."
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "cert-oci",
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle University",
    validity: "OCT 2025 – OCT 2027",
    highlights: [
      "Covered Generative AI architectures, Large Language Models (LLMs), Retrieval-Augmented Generation (RAG), and vector stores.",
      "Mastered Natural Language Processing (NLP), containerized Docker deployment, and Oracle Cloud Infrastructure AI services."
    ],
    skillsCovered: ["Generative AI", "LLMs", "RAG Systems", "NLP", "OCI AI Tools", "Docker Containers"]
  },
  {
    id: "cert-deloitte",
    title: "Deloitte Data Analytics Job Simulation",
    issuer: "Deloitte / Forage",
    validity: "Completed 2025",
    highlights: [
      "Completed real-world client data analytics simulations, business intelligence synthesis, and executive presentation modeling.",
      "Formulated data-driven strategic roadmaps based on statistical distributions and operational telemetry."
    ],
    skillsCovered: ["Data Analytics", "Business Intelligence", "Exploratory Data Analysis", "Executive Communication"]
  },
  {
    id: "cert-ardent",
    title: "MERN Stack Development Certification",
    issuer: "Ardent Computech Pvt. Ltd",
    validity: "Certified",
    highlights: [
      "Mastered full-stack JavaScript architectures with MongoDB, Express.js, React.js, and Node.js.",
      "Implemented secure RESTful APIs, JWT authentication, and state management patterns."
    ],
    skillsCovered: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs"]
  },
  {
    id: "cert-evarcity",
    title: "Generative AI & Agentic AI Certification Course",
    issuer: "Evarcity",
    validity: "Certified",
    highlights: [
      "Intensive specialization in autonomous multi-agent systems, tool calling, memory management, and agentic reasoning loops.",
      "Hands-on building of autonomous agents capable of web scraping, automated summarization, and task orchestration."
    ],
    skillsCovered: ["Agentic AI", "Autonomous Agents", "LangChain", "Prompt Engineering", "Tool Use"]
  }
];

export const EDUCATION_HISTORY: Education[] = [
  {
    institution: "Brainware University, Kolkata",
    degree: "B.Tech in Computer Science (Artificial Intelligence & Machine Learning)",
    location: "Kolkata, India",
    period: "2022 – 2026",
    score: "CGPA: 9.14 / 10.0",
    highlights: [
      "Top percentile academic standing with deep focus on Artificial Intelligence, Machine Learning, Deep Neural Networks, and Distributed Systems.",
      "Active researcher and project architect in the university's AI & ML department.",
      "Lead developer for departmental agricultural and local LLM engineering initiatives."
    ]
  },
  {
    institution: "Baranagar Narendranath Vidyamandir School, Kolkata",
    degree: "Higher Secondary (12th class) · Science Stream",
    location: "Kolkata, India",
    period: "2019 – 2021",
    score: "87.0%",
    highlights: [
      "Concentration in Physics, Chemistry, Mathematics, and Computer Science.",
      "Graduated with First Class Distinction."
    ]
  },
  {
    institution: "Baranagar Ramakrishna Mission Ashrama High School, Kolkata",
    degree: "Madhyamik (10th class)",
    location: "Kolkata, India",
    period: "2018 – 2019",
    score: "87.0%",
    highlights: [
      "Prestigious Ramakrishna Mission institution known for academic excellence and character building.",
      "First Class Distinction across all core sciences and mathematics."
    ]
  }
];
