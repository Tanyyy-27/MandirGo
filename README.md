<div align="center">

<h1>
<img src="./assets/mandirgo-logo.jpeg" alt="MandirGo" width="55"/>
&nbsp;&nbsp;MandirGo
</h1>

### AI-Powered Smart Temple & Pilgrimage Management Platform

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

---

# 📖 Overview

MandirGo is an AI-powered Smart Temple & Pilgrimage Management Platform designed to modernize temple operations through Computer Vision, Machine Learning, and real-time analytics.

The platform enables temple administrations to intelligently monitor crowd density, optimize visitor flow, provide live updates, automate darshan bookings, and improve overall pilgrimage management through a unified digital ecosystem.

By combining Artificial Intelligence with modern full-stack technologies, MandirGo enhances public safety, operational efficiency, and devotee experience while preserving the spiritual essence of every pilgrimage.

---

# 🎯 Problem Statement

Millions of devotees visit temples every year, especially during festivals and special occasions. Traditional crowd management systems often struggle with increasing visitor volumes, resulting in long queues, overcrowding, communication gaps, and limited operational visibility.

MandirGo addresses these challenges by leveraging Artificial Intelligence, Computer Vision, and intelligent analytics to create a safer, more organized, and technology-driven pilgrimage experience.

---

# ✨ Features

## 🎥 AI Crowd Intelligence

- Real-time crowd detection and density analysis using CCTV
- Intelligent crowd monitoring powered by Computer Vision
- Continuous occupancy tracking and analytics

## 📊 Live Crowd Status

- Live crowd status updates for devotees
- Real-time congestion monitoring
- Better visit planning and reduced waiting time

## 🤖 Footfall Prediction

- Footfall prediction using Machine Learning
- Historical trend analysis
- Smart crowd forecasting for temple administrations

## 📅 Smart Darshan Booking

- Intelligent online darshan booking system
- Optimized visitor scheduling
- Reduced queue management challenges

## 📢 Event Updates & Notifications

- Instant temple announcements
- Festival and event notifications
- Real-time communication with devotees

## 🚨 Emergency Alert System

- Emergency alert generation
- AI-powered fall detection
- Rapid response support for temple authorities

## 🖥️ Admin Dashboard

- Dedicated administration panel
- Live crowd monitoring
- Booking management
- Event management
- Operational analytics and insights

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

 YOLOv8 Crowd Detection                  Supabase Database

        │                                           │

        └─────────────────────┬─────────────────────┘

                              ▼

                Machine Learning Prediction Engine

                              │

                              ▼

             Smart Temple & Pilgrimage Management

                              │

                              ▼

     Live Crowd Status • Smart Booking • Emergency Alerts
```

---
# 🛠️ Tech Stack

| Category | Technology |
| ---------------- | ---------------- |
| Frontend | React.js + Parcel |
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
│   ├── models/
│   ├── videos/
│   ├── server.py
│   ├── requirements.txt
│   ├── README.md
│   └── .gitignore
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
│   ├── package-lock.json
│   └── .gitignore
│
├── LICENSE
├── README.md
└── .gitignore
```

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/Tanyyy-27/MandirGo.git
```

```bash
cd MandirGo
```

---

# ⚙️ Backend Setup

Navigate to backend

```bash
cd backend
```

Create virtual environment

```bash
python -m venv venv
```

Activate environment

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run FastAPI server

```bash
uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

Backend will be available at

```
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

Navigate to frontend

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start development server

```bash
npm start
```

or

```bash
npm run dev
```

Create production build

```bash
npm run build
```

Frontend will be available at

```
http://localhost:1234
```

(or the URL generated by Parcel)

---

# 🌐 Platform Highlights

### 🧠 AI-Powered Crowd Analytics

Monitor and analyze temple crowd density in real time using Computer Vision and Machine Learning.

### 📈 Predictive Footfall Intelligence

Forecast crowd volume and visitor trends to improve planning and resource allocation.

### 📱 Smart Pilgrimage Experience

Enable devotees to check live crowd status, book darshan slots, and receive important notifications.

### 🏛️ Intelligent Temple Administration

Empower temple authorities with centralized monitoring, booking management, operational insights, and emergency response tools.

---
<div align="center">

<h1>
<img src="./assets/mandirgo-logo.jpeg" alt="MandirGo Logo" width="55"/>
&nbsp;&nbsp;MandirGo
</h1>

### AI-Powered Smart Temple & Pilgrimage Management Platform

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

---

# 📖 Overview

MandirGo is an AI-powered Smart Temple & Pilgrimage Management Platform designed to modernize temple operations through Computer Vision, Machine Learning, and real-time analytics.

The platform enables temple administrations to intelligently monitor crowd density, optimize visitor flow, provide live updates, automate darshan bookings, and improve overall pilgrimage management through a unified digital ecosystem.

By combining Artificial Intelligence with modern full-stack technologies, MandirGo enhances public safety, operational efficiency, and devotee experience while preserving the spiritual essence of every pilgrimage.

---

# 🎯 Problem Statement

Millions of devotees visit temples every year, especially during festivals and special occasions.

Traditional crowd management systems often result in:

- Long waiting queues
- Overcrowding and safety risks
- Lack of real-time visibility
- Manual administrative workflows
- Communication gaps
- Limited operational insights

MandirGo addresses these challenges through AI-powered crowd intelligence, intelligent automation, and data-driven decision making.

---

# ✨ Platform Features

## 🎥 AI Crowd Intelligence

- Real-time crowd detection and density analysis using CCTV
- Intelligent Computer Vision monitoring
- Continuous occupancy analytics

## 📡 Live Crowd Status

- Live crowd status updates for devotees
- Real-time congestion monitoring
- Better visit planning

## 📊 Footfall Prediction

- Footfall prediction using Machine Learning
- Historical trend analysis
- Smart crowd forecasting

## 📅 Smart Darshan Booking

- Intelligent online darshan booking system
- Optimized visitor scheduling
- Reduced waiting time

## 📢 Event Updates & Notifications

- Festival announcements
- Event notifications
- Important temple updates

## 🚨 Emergency Alert System

- AI-assisted emergency alerts
- Fall detection system
- Rapid response support

## 🖥️ Dedicated Admin Dashboard

- Live crowd monitoring
- Booking management
- Event management
- Operational analytics
- Centralized administration

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

         ┌─────────────────┼─────────────────┐

         ▼                                   ▼

YOLOv8 Crowd Detection              Supabase Database

         │                                   │

         └─────────────────┬─────────────────┘

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
| ---------------- | ---------------- |
| Frontend | React + Parcel |
| Backend | FastAPI |
| Language | Python + JavaScript |
| AI | YOLOv8 |
| Machine Learning | Scikit-learn |
| Computer Vision | OpenCV + YOLOv8 |
| Database | Supabase |
| Authentication | Supabase Auth |
| API | REST |
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
│   ├── models/
│   ├── videos/
│   ├── server.py
│   ├── requirements.txt
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

## Clone Repository

```bash
git clone https://github.com/Tanyyy-27/MandirGo.git
cd MandirGo
```

---

# ⚙️ Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

Backend

```
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

```bash
cd frontend

npm install

npm start

# Production
npm run build
```

---

# 🚀 Core Capabilities

### 🎥 AI-Powered Crowd Intelligence

Monitor temple crowd density in real time using Computer Vision and CCTV analytics.

### 📊 Intelligent Footfall Prediction

Predict visitor trends using Machine Learning for better planning and resource allocation.

### 📅 Smart Darshan Management

Digitize and optimize the pilgrimage journey with intelligent booking.

### 📢 Live Communication System

Deliver instant announcements, event updates, and notifications.

### 🚨 Emergency Response

Improve public safety through AI-assisted emergency alerts and fall detection.

### 🖥️ Centralized Admin Dashboard

Manage crowd monitoring, bookings, events, and operational insights from one place.

---

# 🎯 Learning Outcomes

This project demonstrates practical experience in:

- Artificial Intelligence
- Machine Learning
- Computer Vision
- YOLOv8 Object Detection
- FastAPI Development
- React Development
- REST API Design
- Real-Time Analytics
- Smart Infrastructure Systems
- Scalable Software Engineering

---

# 📈 Future Roadmap

### 🤖 AI & Analytics

- AI-powered crowd prediction
- Advanced footfall forecasting
- Predictive safety analytics
- Intelligent resource planning

### 🌐 Smart Infrastructure

- Multi-location management
- Volunteer coordination
- Smart parking integration
- IoT device connectivity

### 📱 Digital Experience

- Native mobile applications
- AI assistant
- Personalized notifications
- Live navigation

---

# 🤝 Contributing

Contributions, ideas, and improvements are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "feat: add new feature"
```

4. Push changes

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

*Building AI-powered Smart Infrastructure for the Future of Pilgrimage Management.*

🌐 **Website**  
https://mandirgo.com

💼 **LinkedIn**  
https://linkedin.com/in/your-linkedin-profile

🐙 **GitHub**  
https://github.com/Tanyyy-27

---

<div align="center">

## ⭐ Support the Project

If you found **MandirGo** valuable, consider giving this repository a **Star ⭐**.

### Empowering temples with AI-driven crowd intelligence and building the future of smarter pilgrimage experiences.

### **Bridging Devotion with Smart Innovation.**

Made with ❤️ by **Tanmay Yenpure**

</div>
