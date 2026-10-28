# 🩺 Health Symptom Checker

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-black?style=flat-square&logo=express)](https://expressjs.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)](#)

A modern, fast, and responsive interactive web application designed to help users explore symptoms by anatomical body region, search common health indicators, and review educational health categories.

---

## ✨ Features

- 🗺️ **Interactive Anatomical Map**: Quickly filter symptoms by body area (Head, Chest, Abdomen, Back, Whole Body).
- 🔍 **Real-Time Live Search**: Instant search filtering as you type.
- 🏷️ **Multi-Symptom Selection**: Select multiple symptoms simultaneously with visual chips, active count, and removal controls.
- 📊 **Educational Overlap Engine**: Evaluates selected symptoms against broad educational categories and ranks relevant insights.
- 📱 **Fully Responsive Design**: Tailored layout with sticky navigation, accessible controls, and touch-friendly targets for desktop, tablet, and mobile.
- ⚠️ **Built-in Safety & Medical Disclaimers**: Prominently highlights safety precautions and urgent emergency guidance.

---

## 🏗️ Project Architecture

`
health-symptom-checker/
├── public/
│   ├── app.js          # Client-side state, API calls, and DOM interactions
│   ├── index.html      # Accessible semantic UI structure & layout
│   └── styles.css      # Modern vanilla CSS styling & responsive grid system
├── .gitignore          # Git exclusion rules
├── package.json        # Project metadata & Express 5 dependency
├── package-lock.json   # Deterministic dependency tree
├── README.md           # Documentation
└── server.js           # Express REST API & static file server
`

---

## 🛠️ Tech Stack

- **Backend**: [Node.js](https://nodejs.org/) with [Express 5](https://expressjs.com/)
- **Frontend**: Vanilla HTML5, Modern CSS3 (Grid & Flexbox), and Vanilla JavaScript (ES6+)
- **Architecture**: RESTful API endpoints with Single Page Application (SPA) client

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### Installation

1. Clone or download the repository:
   ``bash
   git clone https://github.com/blackzone12/health-symptom-checker.git
   cd health-symptom-checker
   ``

2. Install dependencies:
   ``bash
   npm install
   ``

3. Start the application:
   ``bash
   npm start
   ``
   Or start in watch mode for development:
   ``bash
   npm run dev
   ``

4. Open your browser and navigate to:
   ``
   http://localhost:3000
   ``

---

## 📡 API Reference

### 1. GET /api/symptoms
Returns a list of available symptoms, with optional filtering.

- **Query Parameters**:
  - q *(optional)*: Case-insensitive search query (e.g. ?q=cough).
  - rea *(optional)*: Anatomical area filter: head, chest, bdomen, ack, whole.

- **Example Response**:
  ``json
  [
    {
      "id": "cough",
      "name": "Cough",
      "areas": ["chest"]
    },
    {
      "id": "fever",
      "name": "Fever",
      "areas": ["head", "chest", "whole"]
    }
  ]
  ``

### 2. POST /api/check
Analyzes an array of symptom IDs and returns educational categories ranked by relevance score.

- **Request Body**:
  ``json
  {
    "symptoms": ["fever", "cough", "fatigue"]
  }
  ``

- **Example Response**:
  ``json
  {
    "disclaimer": "This demonstration is for education only and is not a medical diagnosis.",
    "results": [
      {
        "name": "Common viral illness",
        "symptoms": ["fever", "cough", "sore-throat", "fatigue", "headache"],
        "note": "Several common viral illnesses can cause overlapping symptoms.",
        "score": 3
      }
    ]
  }
  ``

---

## ⚠️ Medical Disclaimer

> **Important**: This application is strictly an educational tool and does **not** provide medical diagnoses, treatment advice, or clinical evaluations. If you or someone you know is experiencing severe, persistent, or emergency symptoms (such as chest pain, severe shortness of breath, or loss of consciousness), please contact emergency medical services immediately.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
