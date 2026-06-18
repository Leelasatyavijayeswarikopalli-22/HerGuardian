# 🛡️ HerGuardian
### *Empowering Every Journey*

> AI-powered Women Safety & Smart Navigation Platform

![Hackathon](https://img.shields.io/badge/Hackathon-AWAAZ%2005-blue)
![Build For Good](https://img.shields.io/badge/Build%20For-Good-green)
![Status](https://img.shields.io/badge/Status-Prototype-orange)
![License](https://img.shields.io/badge/License-MIT-purple)

---

## 📌 Problem Statement

Women across India frequently avoid late-night jobs, educational opportunities, and social events due to safety concerns while traveling.

Current navigation systems optimize for **speed**, not **safety**.

### Key Challenges

* ❌ No safety-aware route planning
* ❌ SOS systems require phone access
* ❌ No real-time incident intelligence
* ❌ Lack of AI-driven safety prediction

### Statistics

* **86%** of women feel unsafe traveling after dark
* Average emergency phone unlock time: **7 seconds**
* Existing navigation apps with AI safety awareness: **0**

---

# 💡 Solution

HerGuardian is an AI-powered safety navigation platform designed to help women travel more safely using:

* 🧠 AI Route Risk Analysis
* 📍 Real-time Safe Route Navigation
* 🚨 Voice-Triggered SOS
* 📊 Live Safety Dashboard
* 🛡️ Community Incident Reporting
* 🔔 Real-time Alerts & Zone Warnings

The platform proactively identifies safer routes instead of reacting after incidents occur.

---

# ✨ Features

## 🗺️ Safe Route Navigation

AI selects the optimal route balancing:

* travel speed
* lighting conditions
* crowd density
* incident history
* time-based safety scoring

---

## 📊 Safety Dashboard

Provides:

* Real-time risk heatmaps
* Zone safety levels
* Travel safety insights
* Dynamic safety score updates

---

## 🚨 Incident Reporting

Users can:

* Report unsafe incidents instantly
* Alert nearby users
* Improve community safety intelligence

AI validates and propagates warnings in real time.

---

## 🎙️ Secret Voice-Triggered SOS *(Signature Feature)*

Say a predefined secret phrase and HerGuardian will:

1. Detect the voice command
2. Trigger emergency protocol
3. Alert emergency contacts
4. Share live location instantly

✅ No screen interaction
✅ No app opening
✅ No unlock delay

---

# ⚙️ How It Works

```text
User sets destination
        ↓
AI analyzes all possible routes
        ↓
Safety scoring engine evaluates:
- crowd data
- crime history
- lighting
- time of day
        ↓
Safest route is selected
        ↓
Continuous monitoring & live alerts
```

---

# 🧠 AI Architecture

## Route Risk Analysis

ML models score route segments using:

* crowd data
* incident reports
* crime history
* lighting conditions
* time-based risk

---

## Incident Pattern Learning

The system learns from:

* community-reported incidents
* travel patterns
* unsafe zone frequency

This dynamically updates safety ratings.

---

## Safety Score Engine

Generates a:

* 0–100 composite safety score
* refreshed every 60 seconds

---

## Voice NLP Detection

Gemini-powered speech recognition detects:

* emergency keywords
* custom SOS phrases
* distress signals

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS v4
* React Leaflet
* Leaflet Routing Machine
* MapTiler

---

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring JPA
* Hibernate
* Maven
* REST APIs

---

## Database

* Oracle Database XE
* Oracle JDBC Driver

---

## AI / ML

* Python FastAPI
* Scikit-learn
* Pandas
* NumPy
* Gemini API

---

## Maps & Authentication

* MapTiler Geocoding API
* Routing API
* JWT Tokens
* BCrypt Password Hashing

---

# 🔄 System Flow

```text
User
  ↓
React Frontend
  ↓
Spring Boot Backend
  ↓
AI Engine (FastAPI)
  ↓
Oracle Database
  ↓
Safety Response + Route Recommendation
```

---

# 🚀 Future Enhancements

* 📱 Mobile Application
* 📡 Wearable Device Integration
* 🚔 Police/Emergency Service Integration
* 🌐 Offline Emergency Mode
* 🤖 Advanced Predictive AI Models
* 🧭 Multi-language Voice SOS
* 📈 Crowd Density Prediction

---

# 👥 Team

## Team Vigil (`team_92a493d4`)

### Members

* **Leela Satya Vijayeswari Kopalli** — Team Lead
* **Ajnabh Koushik Baruah** — Member

---

# 🏆 Hackathon

Built for:

### **BUILD FOR GOOD | NATIONAL HACKATHON | AWAAZ 05**

---

# 📷 Screenshots

*Add project screenshots here*

```md
![Home Screen](assets/home.png)
![Navigation Dashboard](assets/dashboard.png)
![SOS Feature](assets/sos.png)
```

---

# 🧪 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/herguardian.git
cd herguardian
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Backend Setup

```bash
cd backend
mvn spring-boot:run
```

---

## AI Service Setup

```bash
cd ai-service
pip install -r requirements.txt
uvicorn app:app --reload
```

---

# 🔐 Environment Variables

Create a `.env` file:

```env
MAPTILER_API_KEY=your_key
JWT_SECRET=your_secret
GEMINI_API_KEY=your_key
DB_URL=your_database_url
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# ❤️ Vision

> “Safety should never limit opportunity.”

HerGuardian aims to empower women with intelligent, proactive, and accessible safety technology for every journey.
