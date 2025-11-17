# 🧠 Aly Abdelwahed Digital Twin
**AI in Production — Powered by AWS Bedrock, FastAPI, and Next.js**

![Deployment](https://img.shields.io/badge/Deployed-AWS%20CloudFront-blue)
![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-success)
![Infrastructure](https://img.shields.io/badge/IaC-Terraform-informational)
![Backend](https://img.shields.io/badge/API-FastAPI-green)
![Frontend](https://img.shields.io/badge/Frontend-Next.js-orange)

🌐 **Live Application:**  
👉 [https://d2asi4w9fjlw0u.cloudfront.net](https://d2asi4w9fjlw0u.cloudfront.net)

---

## 🚀 Overview

This project implements an **AI Digital Twin web application** that allows real-time conversational interaction with an AI model hosted on **AWS Bedrock**.  
It demonstrates a full production pipeline using:
- **FastAPI** backend (for AI chat processing)
- **Next.js** frontend (for an interactive UI)
- **AWS Bedrock Runtime** (for model inference)
- **Terraform** (for infrastructure automation)
- **GitHub Actions** (for CI/CD deployment)
- **AWS CloudFront** (for static distribution)

The application maintains conversation memory across sessions, stores it locally or on **Amazon S3**, and integrates contextual data (LinkedIn, summary, facts, and style) to simulate a personalized *Digital Twin* experience.

---

## 🧩 Architecture

```
+---------------------------+
|        Next.js UI         |
| (deployed via CloudFront) |
+------------+--------------+
             |
             ▼
+---------------------------+
|       FastAPI Server      |
|  - Handles /chat requests |
|  - Loads context memory   |
|  - Calls AWS Bedrock API  |
+------------+--------------+
             |
             ▼
+---------------------------+
|       AWS Bedrock         |
|  - Amazon Nova Models     |
|  - Conversational API     |
+---------------------------+
```

---

## 📁 Project Structure

```
.
├── server.py             # FastAPI backend using AWS Bedrock
├── resources.py          # Loads profile data (LinkedIn, summary, style, facts)
├── data/
│   ├── linkedin.pdf
│   ├── summary.txt
│   ├── style.txt
│   └── facts.json
├── app/
│   ├── layout.tsx        # Root layout with Geist fonts
│   ├── page.tsx          # Home page with Twin component
│   └── components/twin/  # React component rendering the AI Twin
├── .env                  # Environment variables (local)
├── terraform/            # Infrastructure configuration
└── .github/workflows/    # CI/CD pipeline for build + deploy
```

---

## ⚙️ Backend (FastAPI)

**File:** `server.py`

- Handles incoming chat requests (`/chat` endpoint)  
- Persists conversation state in:
  - Local `memory/` directory, or
  - AWS S3 (if `USE_S3=true`)
- Communicates with AWS Bedrock via `boto3`
- Provides `/health` and `/conversation/{session_id}` routes for diagnostics

### Key Environment Variables

| Variable | Description | Example |
|-----------|--------------|----------|
| `DEFAULT_AWS_REGION` | AWS region | `us-east-1` |
| `BEDROCK_MODEL_ID` | Model ID (Nova Micro/Lite/Pro) | `amazon.nova-lite-v1:0` |
| `USE_S3` | Whether to use S3 for memory | `true` or `false` |
| `S3_BUCKET` | S3 bucket name | `digital-twin-memory` |
| `CORS_ORIGINS` | Allowed CORS domains | `http://localhost:3000` |
| `MEMORY_DIR` | Local directory for memory | `../memory` |

### Example API Call
```bash
curl -X POST https://<api-endpoint>/chat   -H "Content-Type: application/json"   -d '{"message": "Hello!", "session_id": "test123"}'
```

---

## 🎨 Frontend (Next.js)

**Files:** `layout.tsx`, `page.tsx`, and `components/twin/`

- Built with **Next.js 14+ (App Router)**
- Uses **Tailwind CSS** for styling
- Displays a 3D interactive “Twin” component powered by React
- Hosted on **AWS CloudFront**

### UI Highlights
- Minimal, responsive layout
- Gradient background with soft shadows
- AI Twin interaction panel
- Footer showing “Week 2: Building Your Digital Twin”

---

## 🧠 AI Model Configuration

The backend communicates with **AWS Bedrock Runtime** through the `converse` API, which supports context-aware, multi-turn dialogue.

**Supported models:**
- `amazon.nova-micro-v1:0` — fast, cost-efficient
- `amazon.nova-lite-v1:0` — balanced (default)
- `amazon.nova-pro-v1:0` — most capable, higher cost

Adjust via `.env`:
```env
BEDROCK_MODEL_ID=amazon.nova-lite-v1:0
```

---

## ☁️ Infrastructure & Deployment

### **Terraform**
- Manages infrastructure provisioning (Lambda/API Gateway, S3, CloudFront)
- Defines IAM permissions for Bedrock and S3 access

### **GitHub Actions**
- Runs build, test, and deploy pipelines
- Automatically deploys backend and frontend on merge to `main`

---

## 🧾 Resources Loader (`resources.py`)

Loads personal and contextual data from the `data/` directory:

- **LinkedIn PDF** — professional background  
- **Summary.txt** — self-description  
- **Style.txt** — tone and communication style  
- **Facts.json** — structured key facts for AI personalization  

This enables the AI to emulate a realistic digital version of the user.

---

## 🧪 Local Development

### 1. Clone the repository
```bash
git clone https://github.com/<your-repo>.git
cd <your-repo>
```

### 2. Setup Python environment
```bash
pip install -r requirements.txt
```

### 3. Start FastAPI backend
```bash
uvicorn server:app --reload
```

### 4. Run Next.js frontend
```bash
npm install
npm run dev
```

### 5. Open in browser
```
http://localhost:3000
```

---

## 🔐 Security Notes

- All AWS credentials are managed via GitHub Secrets or environment variables.  
- Bedrock model access requires explicit IAM permissions (`bedrock:InvokeModel`, `bedrock:Converse`).  
- CORS restricted to trusted domains.  
- No user credentials or sensitive data are logged.
