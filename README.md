<div align="center">

# 🌐 MandirGo

### AI-Based Smart Temple & Pilgrimage Management Platform

**Real-Time Crowd Intelligence • Smart Darshan Booking • Intelligent Temple Operations**

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![YOLOv8](https://img.shields.io/badge/YOLOv8-Computer%20Vision-purple?style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

### Bridging Devotion with Smart Innovation

*Building safer, smarter, and seamless pilgrimage experiences through Artificial Intelligence.*

</div>

# 📖 Overview

MandirGo is an AI-Based Smart Temple & Pilgrimage Management Platform designed to modernize temple operations through Computer Vision, Machine Learning, and real-time analytics.

The platform empowers temple administrations to intelligently monitor crowd density, optimize visitor flow, automate darshan bookings, publish live announcements, and deliver a safer, smarter, and more connected pilgrimage experience.

By integrating Artificial Intelligence with modern software architecture, MandirGo enhances public safety, operational efficiency, and decision-making while preserving the spiritual essence of every pilgrimage.

---

# 🎯 Problem Statement

Every year, millions of devotees visit temples across India, creating operational challenges for temple administrations and safety concerns for visitors.

Traditional management systems often struggle with:

- Long waiting queues
- Overcrowding during peak hours
- Limited real-time crowd visibility
- Manual administrative processes
- Delayed communication with devotees
- Lack of predictive crowd planning

MandirGo addresses these challenges by combining Artificial Intelligence, Computer Vision, and intelligent analytics into a unified digital platform that enables data-driven temple management and a seamless pilgrimage experience.

---

# ⚡ Platform Features

## 🎥 AI Crowd Intelligence

- Real-time crowd detection and density analysis using CCTV
- Intelligent Computer Vision monitoring
- Continuous occupancy analytics

## 📡 Live Crowd Status

- Live crowd status updates for devotees
- Real-time congestion monitoring
- Better visit planning and reduced waiting time

## 📊 Intelligent Footfall Prediction

- Footfall prediction using Machine Learning
- Historical trend analysis
- Smart crowd forecasting for temple administrations

## 📅 Smart Darshan Booking

- Intelligent online darshan booking system
- Optimized visitor scheduling
- Reduced queue management challenges

## 📢 Event Updates & Notifications

- Festival announcements
- Live event notifications
- Instant communication with devotees

## 🚨 Emergency Alert System

- AI-assisted emergency alerts
- Intelligent fall detection
- Rapid response support for temple authorities

## 🖥️ Dedicated Admin Dashboard

- Live crowd monitoring
- Smart booking management
- Event administration
- Operational analytics and insights
- Centralized monitoring and control

---

# 🏗️ System Architecture

```text
                           Devotees

                                │

                                ▼

                    React + Parcel Frontend

                                │

                         REST API Calls

                                │

                                ▼

                     FastAPI Backend Server

                                │

          ┌─────────────────────┼─────────────────────┐

          ▼                                           ▼

  YOLOv8 Crowd Detection                 Supabase Database

          │                                           │

          └─────────────────────┬─────────────────────┘

                                ▼

                 Machine Learning Prediction Engine

                                │

                                ▼

         Smart Temple & Pilgrimage Management Platform

                                │

                                ▼

      Live Crowd Status • Smart Booking • Emergency Alerts
```
---
# 🛠️ Tech Stack

| Category | Technology |
| -------------------------- | ---------------------------- |
| Frontend | React + Parcel |
| Backend | FastAPI |
| Programming Language | Python + JavaScript |
| Artificial Intelligence | YOLOv8 |
| Machine Learning | Scikit-learn |
| Computer Vision | OpenCV + YOLOv8 |
| Database | Supabase |
| Authentication | Supabase Auth |
| API | REST API |
| Styling | CSS |
| Version Control | Git & GitHub |
| Deployment | Netlify |

---

# 📂 Project Structure

```text
MandirGo/

├── assets/
│   └── mandirgo-logo.jpeg
│
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   ├── models/
│   ├── videos/
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── legacy/
│   │   ├── App.jsx
│   │   └── index.jsx
│   │
│   ├── package.json
│   └── .gitignore
│
├── LICENSE
├── README.md
└── .gitignore
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/Tanyyy-27/MandirGo.git

cd MandirGo
```

---

# ⚙️ Backend Setup

Navigate to the backend directory

```bash
cd backend
```

Create a virtual environment

```bash
python -m venv venv
```

Activate the virtual environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install the required dependencies

```bash
pip install -r requirements.txt
```

Start the FastAPI server

```bash
uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

Backend will be available at

```
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

Navigate to the frontend directory

```bash
cd frontend
```

Install project dependencies

```bash
npm install
```

Start the development server

```bash
npm start
```

or

```bash
npm run dev
```

Create a production build

```bash
npm run build
```

The frontend will be available at

```
http://localhost:1234
```

(or the URL generated by Parcel)

---

# 🌐 Platform Highlights

### 🎥 Real-Time Crowd Intelligence

Monitor crowd density through CCTV feeds using AI-Based Computer Vision and receive instant occupancy insights.

### 📊 Predictive Footfall Analytics

Forecast visitor traffic using Machine Learning models to improve planning, volunteer allocation, and resource management.

### 📅 Smart Darshan Experience

Enable devotees to book darshan slots digitally, reducing waiting time and improving overall crowd distribution.

### 📢 Intelligent Communication

Deliver live announcements, event updates, and important notifications directly to devotees in real time.

### 🚨 Safety & Emergency Monitoring

Strengthen temple safety with emergency alerts and AI-assisted fall detection for faster response during high-footfall events.

### 🖥️ Centralized Administration

Manage crowd monitoring, bookings, announcements, events, and operational insights from a unified administration dashboard.

---
# 💡 Core Capabilities

### 🎥 AI-Based Crowd Intelligence

Monitor temple crowd density in real time through CCTV feeds using Computer Vision, enabling temple administrations to make faster, smarter, and data-driven decisions.

### 📊 Intelligent Footfall Prediction

Leverage Machine Learning models to forecast visitor trends, optimize resource allocation, improve volunteer management, and prepare for peak pilgrimage periods.

### 📅 Smart Darshan Management

Digitize the darshan process with an intelligent booking system that minimizes waiting time, optimizes visitor flow, and enhances the overall devotee experience.

### 📢 Real-Time Communication

Provide devotees with instant announcements, festival updates, event notifications, and important alerts through a unified digital platform.

### 🚨 Emergency Response System

Enhance temple safety through AI-assisted emergency alerts and fall detection, enabling rapid response during festivals and high-footfall situations.

### 🖥️ Centralized Admin Dashboard

Empower temple authorities with a comprehensive dashboard for crowd monitoring, booking management, event administration, operational insights, and real-time decision making.

---

# 🎯 Learning Outcomes

This project demonstrates practical experience in:

- Artificial Intelligence
- Machine Learning
- Computer Vision
- YOLOv8 Object Detection
- FastAPI Development
- React Application Development
- REST API Design
- Real-Time Analytics
- Smart Infrastructure Systems
- Scalable Software Engineering

---

# 📈 Future Roadmap

### 🤖 AI & Analytics

- Advanced crowd prediction models
- Predictive footfall intelligence
- AI-driven operational analytics
- Smart resource optimization

### 🌐 Smart Infrastructure

- Multi-temple management platform
- Volunteer management system
- Digital donations & seva integration
- Smart parking management

### 📱 Digital Experience

- Native Android & iOS applications
- AI-powered virtual assistant
- Personalized devotee notifications
- Live navigation and guidance

### 🔗 Intelligent Ecosystem

- IoT device integration
- Edge AI deployment
- Real-time monitoring dashboards
- Advanced emergency response automation

---

# 🤝 Contributing

Contributions, ideas, and improvements are always welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "feat: add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Founder

**Tanmay Yenpure**

### Founder & AI/ML Engineer

*Building AI-Based Smart Infrastructure for the Future of Pilgrimage Management.*

🌐 **Website**  
https://mandirgo.com

📷 **Instagram**  
https://www.instagram.com/mandirgo_official?igsh=MTRpeTB0NXZrMWo3dg==

🐙 **GitHub**  
https://github.com/Tanyyy-27

---

<div align="center">

## ⭐ Support the Project

If you found **MandirGo** valuable, consider giving this repository a **Star ⭐** and sharing it with the community.

### Empowering temples with AI-Based crowd intelligence and building the future of smarter pilgrimage experiences.

### Bridging Devotion with Smart Innovation.

**Engineered by Tanmay Yenpure**

</div>
