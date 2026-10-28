const state = {
  selected: new Map(),
  area: ""
};

const symptomsEl = document.querySelector("#symptoms");
const selectedEl = document.querySelector("#selectedSymptoms");
const countEl = document.querySelector("#selectedCount");
const searchEl = document.querySelector("#search");
const checkBtn = document.querySelector("#checkBtn");
const resultsSection = document.querySelector("#resultsSection");
const resultsEl = document.querySelector("#results");

async function loadSymptoms() {
  const params = new URLSearchParams();
  if (searchEl.value.trim()) params.set("q", searchEl.value.trim());
  if (state.area) params.set("area", state.area);

  const res = await fetch("/api/symptoms?" + params.toString());
  const symptoms = await res.json();
  renderSymptoms(symptoms);
}

function renderSymptoms(symptoms) {
  symptomsEl.innerHTML = "";

  if (!symptoms.length) {
    symptomsEl.innerHTML = '<div class="empty">No matching symptoms found.</div>';
    return;
  }

  symptoms.forEach(symptom => {
    const selected = state.selected.has(symptom.id);
    const button = document.createElement("button");
    button.className = "symptom" + (selected ? " selected" : "");
    button.innerHTML = `<span>${symptom.name}</span><span class="check">${selected ? "\u2713" : ""}</span>`;
    button.addEventListener("click", () => toggleSymptom(symptom));
    symptomsEl.appendChild(button);
  });
}

function toggleSymptom(symptom) {
  if (state.selected.has(symptom.id)) state.selected.delete(symptom.id);
  else state.selected.set(symptom.id, symptom);

  renderSelection();
  loadSymptoms();
}

function renderSelection() {
  countEl.textContent = state.selected.size;
  checkBtn.disabled = state.selected.size === 0;

  if (!state.selected.size) {
    selectedEl.innerHTML = '<span class="empty">No symptoms selected yet.</span>';
    return;
  }

  selectedEl.innerHTML = "";
  for (const symptom of state.selected.values()) {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = symptom.name;
    selectedEl.appendChild(chip);
  }
}

document.querySelectorAll(".body-part").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".body-part").forEach(x => x.classList.remove("selected"));
    btn.classList.add("selected");
    state.area = btn.dataset.area;
    loadSymptoms();
  });
});

searchEl.addEventListener("input", loadSymptoms);

document.querySelector("#clearArea").addEventListener("click", () => {
  state.area = "";
  document.querySelectorAll(".body-part").forEach(x => x.classList.remove("selected"));
  loadSymptoms();
});

async function checkSymptoms() {
  const res = await fetch("/api/check", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ symptoms: [...state.selected.keys()] })
  });

  const data = await res.json();

  resultsEl.innerHTML = "";

  if (!data.results.length) {
    resultsEl.innerHTML = `<div class="result-card"><h3>No educational category matched</h3><p>That does not mean nothing is wrong. Symptoms can have many causes, and a clinician can evaluate the complete picture.</p></div>`;
  } else {
    data.results.forEach(item => {
      const card = document.createElement("article");
      card.className = "result-card";
      card.innerHTML = `<h3>${item.name}</h3><p>${item.note}</p>`;
      resultsEl.appendChild(card);
    });
  }

  const disclaimer = document.createElement("div");
  disclaimer.className = "disclaimer";
  disclaimer.textContent = data.disclaimer;
  resultsEl.appendChild(disclaimer);

  resultsSection.classList.remove("hidden");
  resultsSection.scrollIntoView({behavior:"smooth", block:"start"});
}

checkBtn.addEventListener("click", checkSymptoms);

function reset() {
  state.selected.clear();
  state.area = "";
  searchEl.value = "";
  document.querySelectorAll(".body-part").forEach(x => x.classList.remove("selected"));
  resultsSection.classList.add("hidden");
  renderSelection();
  loadSymptoms();
  window.scrollTo({top:0, behavior:"smooth"});
}

document.querySelector("#resetTop").addEventListener("click", reset);
document.querySelector("#resetResults").addEventListener("click", reset);

renderSelection();
loadSymptoms();
