const stepperButton = document.getElementById("play-stepper");
const stepperItems = Array.from(document.querySelectorAll("#email-stepper span"));
const liveBuildings = document.getElementById("live-buildings");
const liveContacts = document.getElementById("live-contacts");
const leadCards = document.getElementById("lead-cards");

const filters = {
  dpe: document.getElementById("filter-dpe"),
  type: document.getElementById("filter-type"),
  surface: document.getElementById("filter-surface"),
  consumption: document.getElementById("filter-consumption"),
  tech: document.getElementById("filter-tech"),
  company: document.getElementById("filter-company"),
};

const leadTemplates = {
  tertiaire: [
    { name: "Tour Lumière", dpe: "E", match: 94, potential: "210 k€", contact: "DAF" },
    { name: "Immeuble Rive Ouest", dpe: "D", match: 88, potential: "148 k€", contact: "Directeur technique" },
    { name: "Campus Bordeaux", dpe: "F", match: 91, potential: "260 k€", contact: "Responsable patrimoine" },
  ],
  logistique: [
    { name: "Plateforme Nord", dpe: "C", match: 85, potential: "176 k€", contact: "Directeur site" },
    { name: "Hub Seine", dpe: "D", match: 82, potential: "119 k€", contact: "Responsable maintenance" },
    { name: "Entrepôt Atlas", dpe: "E", match: 89, potential: "205 k€", contact: "DG" },
  ],
  copro: [
    { name: "Résidence Horizon", dpe: "F", match: 96, potential: "132 k€", contact: "Syndic" },
    { name: "Copro Bellevue", dpe: "E", match: 90, potential: "98 k€", contact: "Conseil syndical" },
    { name: "Les Jardins", dpe: "D", match: 84, potential: "74 k€", contact: "Gestionnaire" },
  ],
  commerce: [
    { name: "Retail Central", dpe: "D", match: 86, potential: "160 k€", contact: "Direction site" },
    { name: "Galerie République", dpe: "E", match: 92, potential: "188 k€", contact: "Responsable travaux" },
    { name: "Centre Marché", dpe: "C", match: 79, potential: "91 k€", contact: "Asset manager" },
  ],
};

function renderLeads() {
  if (!liveBuildings || !liveContacts || !leadCards || !filters.type || !filters.surface || !filters.consumption || !filters.dpe || !filters.tech) {
    return;
  }

  const typeKey = filters.type.value;
  const surface = Number(filters.surface.value);
  const consumption = Number(filters.consumption.value);
  const dpe = Number(filters.dpe.value);
  const baseBuildings = Math.max(900, Math.round(4800 - surface / 2 + (dpe * 130) - consumption));
  const baseContacts = Math.max(600, Math.round(2787 - surface / 6 + dpe * 42 - consumption / 2));

  liveBuildings.textContent = `${baseBuildings.toLocaleString("fr-FR")} bâtiments`;
  liveContacts.textContent = `${baseContacts.toLocaleString("fr-FR")} contacts`;

  const cards = leadTemplates[typeKey].map((item, index) => {
    const badgeClass = index === 0 ? "badge-alert" : index === 1 ? "badge-good" : "badge-warn";
    return `
      <article class="lead-card">
        <div class="row">
          <strong>${item.name}</strong>
          <span class="badge ${badgeClass}">DPE ${item.dpe}</span>
        </div>
        <div class="row">
          <span class="match">${item.match}% Match</span>
          <span class="potential">${item.potential}</span>
        </div>
        <p>${item.contact} · ${filters.tech.value === "travaux" ? "travaux urgents" : filters.tech.value === "renovation" ? "rénovation" : "maintenance"}</p>
      </article>
    `;
  }).join("");

  leadCards.innerHTML = cards;
}

function runStepper() {
  if (!stepperItems.length) {
    return;
  }

  let index = 0;
  const timer = window.setInterval(() => {
    stepperItems.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === index));
    index += 1;
    if (index >= stepperItems.length) {
      window.clearInterval(timer);
      stepperItems.forEach((item, itemIndex) => item.classList.toggle("active", itemIndex === 3));
    }
  }, 380);
}

if (stepperButton && stepperItems.length) {
stepperButton?.addEventListener("click", () => {
  stepperItems.forEach((item) => item.classList.remove("active"));
  stepperItems[0].classList.add("active");
  runStepper();
});
}

Object.values(filters).forEach((input) => {
  input?.addEventListener("input", renderLeads);
  input?.addEventListener("change", renderLeads);
});

document.querySelectorAll(".faq details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq details").forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});

const revealItems = document.querySelectorAll(".reveal");
if (revealItems.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

renderLeads();

/* Signup form behavior */
const signupForm = document.getElementById("signup-form");
const signupSubmit = document.getElementById("signup-submit");
const rgpdCheckbox = document.getElementById("rgpd");
const inputs = signupForm ? Array.from(signupForm.querySelectorAll('input[id]')) : [];
const feedback = document.getElementById("signup-feedback");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function updateInputState(input) {
  const wrapper = input.closest('.input-group');
  if (!wrapper) return;
  const val = input.value.trim();
  input.classList.toggle('filled', val.length > 0);
  wrapper.classList.remove('valid','invalid');
  if (input.required) {
    if (!val) wrapper.classList.add('invalid');
    else if (input.type === 'email') wrapper.classList.toggle('valid', validateEmail(val));
    else wrapper.classList.add('valid');
  } else if (val) {
    wrapper.classList.add('valid');
  }
}

if (inputs.length) {
  inputs.forEach((inp) => {
    inp.addEventListener('input', () => updateInputState(inp));
    inp.addEventListener('blur', () => updateInputState(inp));
  });
}

function checkFormValidity() {
  if (!signupForm) return false;
  const required = Array.from(signupForm.querySelectorAll('[required]'));
  const allFilled = required.every((el) => el.value && el.value.trim().length > 0);
  const email = signupForm.querySelector('#email');
  const emailOk = email ? validateEmail(email.value.trim()) : true;
  return allFilled && emailOk && rgpdCheckbox && rgpdCheckbox.checked;
}

if (rgpdCheckbox) {
  rgpdCheckbox.addEventListener('change', () => {
    signupSubmit.disabled = !checkFormValidity();
  });
}

if (signupForm) {
  signupForm.addEventListener('input', () => {
    signupSubmit.disabled = !checkFormValidity();
  });

  // password toggle
  const pwdToggle = signupForm.querySelector('.password-toggle');
  if (pwdToggle) {
    pwdToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const pwd = signupForm.querySelector('#password');
      if (!pwd) return;
      if (pwd.type === 'password') { pwd.type = 'text'; pwdToggle.textContent = '🙈'; }
      else { pwd.type = 'password'; pwdToggle.textContent = '👁'; }
      pwd.focus();
    });
  }

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!checkFormValidity()) {
      feedback.textContent = 'Veuillez compléter correctement le formulaire et accepter la RGPD.';
      feedback.classList.remove('success');
      return;
    }

    // simulate submit
    signupSubmit.classList.add('loading');
    signupSubmit.disabled = true;
    feedback.textContent = 'Création du compte en cours...';
    feedback.classList.remove('success');

    setTimeout(() => {
      signupSubmit.classList.remove('loading');
      feedback.textContent = 'Compte créé — vérifiez votre boîte e‑mail pour activer votre accès.';
      feedback.classList.add('success');
      signupForm.reset();
      inputs.forEach((i) => updateInputState(i));
      signupSubmit.disabled = true;
    }, 1200);
  });
}