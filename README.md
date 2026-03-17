# 🪐 UniVerse

> **Integrated Academic and Examination Management System**  

UniVerse is a comprehensive AI-powered campus platform designed to unify academic and examination management. It integrates attendance, seating, exams, events, clubs, and resource management with AI-driven analytics, real-time monitoring, and personalized dashboards for students, faculty, and administrators.

[![Status](https://img.shields.io/badge/status-production%20ready-green)]()
[![Modules](https://img.shields.io/badge/modules-20+-orange)]()
[![Tech Stack](https://img.shields.io/badge/tech-React%2CNode-blue)]()
[![PWA](https://img.shields.io/badge/PWA-ready-purple)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 🎯 Goals & Objectives

- Integrate academic and examination workflows into a **single smart platform**.  
- Enable **real-time tracking**, **automation**, and **data-driven decision making**.  
- Improve **efficiency**, **security**, **transparency**, and overall **campus experience**.  
- Reduce manual workload for students, faculty, and administrators.  
- Provide **AI-assisted study tools**, event management, and gamification.

---

## ✨ Core Features

### Academic & Exams
- **Smart Attendance Suite**: Predictive analytics, heatmaps, alerts, and GPA correlation.  
- **Exam & Hall Ticket Management**: QR-based hall tickets, anti-cheating measures, automated scheduling.  
- **Seating Allocation & Visualization**: Intelligent allocation, 3D hall maps, special needs support.  
- **AI Study & Personalization Tools**: Flashcards, quizzes, mind maps, personalized study plans.  

### Campus Management
- **Event & Club Management**: AI-assisted event planning, registration, gamification, virtual club rooms.  
- **Smart Calendar & Planner**: Merge timetable, exams, events, and notifications.  
- **Resource Monitoring**: Real-time library/lab occupancy, parking prediction, queue management.  
- **Emergency & Safety Systems**: Silent SOS, location alerts, AI image matching for lost items.

### Security & Communication
- Multi-role authentication (Student, Faculty, Admin, Club Coordinator, Invigilator)  
- Multi-factor authentication, face recognition, QR verification, geo-fencing, encrypted storage  
- Automated notifications: Twilio calls, SMS, email, and in-app alerts  
- Audit logs and anti-cheating monitoring  

### Advanced Tools
- **AI Avatar Assistant**: Campus guide, study companion, emotion-aware responses, AR mode.  
- **Alumni Network**: Profiles, mentoring, job board, AI resume builder.  
- **AR/VR Experiences**: Campus exploration, event walkthroughs, seat navigation.  
- **Campus Analytics Engine**: Attendance trends, event popularity, resource usage prediction.  
- **DevOps & PWA**: Offline mode, CI/CD deployment, scalable cloud architecture.  

---

## 🏗️ Technical Architecture

- **Frontend:** React.js, React Native, PWA, AR/VR, Notifications, AI avatars, TailwindCSS  
- **Backend:** Node.js, Express.js, REST APIs, WebSockets, Microservices, Rules Engine  
- **Database:** PostgreSQL, MongoDB, Firebase, Redis, Time-Series & Logs  
- **AI / ML:** NLP, Computer Vision, Recommendation, Predictive Analytics  
- **Security & Verification:** JWT, OAuth, SSO, MFA, Face Recognition, QR Codes, Geo-Fencing, Encryption, Audit Logs  
- **IoT / Edge:** Raspberry Pi, Sensors (library, labs, parking), CCTV integration, real-time monitoring  
- **Hosting & Infrastructure:** AWS, Azure, GCP, Firebase, CI/CD, Auto-Scaling, CDN, Edge support  
- **Communication:** Twilio, SMS, Email, Push Notifications, Alerts  

---

## 📂 Directory Structure

```bash
UniVerse/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── views/
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── database/
│   └── prisma/
│       ├── schema.prisma
│       ├── seed.js
│       └── seedAllData.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── guidelines/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── styles/
│   ├── .env
│   ├── package.json
│   └── vite.config.ts
└── README.md
## ⚙️ Installation & Setup

### Backend
```bash
cd backend
npm install
npm run dev

### Frontend
```bash
cd backend
npm install
npm run dev
