const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const symptoms = [
  { id: "fever", name: "Fever", areas: ["head", "chest", "whole"] },
  { id: "headache", name: "Headache", areas: ["head"] },
  { id: "sore-throat", name: "Sore throat", areas: ["head"] },
  { id: "cough", name: "Cough", areas: ["chest"] },
  { id: "shortness-breath", name: "Shortness of breath", areas: ["chest"] },
  { id: "chest-pain", name: "Chest pain", areas: ["chest"] },
  { id: "nausea", name: "Nausea", areas: ["abdomen", "whole"] },
  { id: "abdominal-pain", name: "Abdominal pain", areas: ["abdomen"] },
  { id: "vomiting", name: "Vomiting", areas: ["abdomen", "whole"] },
  { id: "diarrhea", name: "Diarrhea", areas: ["abdomen"] },
  { id: "fatigue", name: "Fatigue", areas: ["whole"] },
  { id: "dizziness", name: "Dizziness", areas: ["head", "whole"] },
  { id: "rash", name: "Rash", areas: ["whole"] },
  { id: "back-pain", name: "Back pain", areas: ["back"] }
];

app.get("/api/symptoms", (req, res) => {
  const q = String(req.query.q || "").trim().toLowerCase();
  const area = String(req.query.area || "").trim().toLowerCase();

  let result = symptoms.filter(s =>
    (!q || s.name.toLowerCase().includes(q)) &&
    (!area || s.areas.includes(area))
  );

  res.json(result);
});

/*
  This endpoint is intentionally a non-diagnostic demo.
  It returns educational categories based on symptom overlap rather than
  claiming to diagnose a person.
*/
app.post("/api/check", (req, res) => {
  const selected = Array.isArray(req.body.symptoms) ? req.body.symptoms : [];
  const normalized = selected.map(String);

  const educationalMatches = [
    {
      name: "Common viral illness",
      symptoms: ["fever", "cough", "sore-throat", "fatigue", "headache"],
      note: "Several common viral illnesses can cause overlapping symptoms."
    },
    {
      name: "Digestive illness",
      symptoms: ["nausea", "vomiting", "diarrhea", "abdominal-pain", "fatigue"],
      note: "Digestive infections and other gastrointestinal problems can overlap with these symptoms."
    },
    {
      name: "Tension-type headache pattern",
      symptoms: ["headache", "fatigue", "dizziness"],
      note: "Headache symptoms have many possible causes and need context for proper evaluation."
    }
  ];

  const results = educationalMatches
    .map(item => ({
      ...item,
      score: item.symptoms.filter(x => normalized.includes(x)).length
    }))
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  res.json({
    disclaimer: "This demonstration is for education only and is not a medical diagnosis.",
    results
  });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Health Symptom Checker running at http://localhost:${PORT}`);
});