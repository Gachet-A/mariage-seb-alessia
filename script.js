// Web3Forms access key: create one for alessia-sebastien@protonmail.com at https://web3forms.com
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
const CONTACT_EMAIL = "alessia-sebastien@protonmail.com";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ─── RSVP: conditional fields ─────────────────────────── */
const form = document.getElementById("rsvp");
const conds = [...form.querySelectorAll(".cond")];

function checkedValue(name) {
  const el = form.querySelector(`input[name="${CSS.escape(name)}"]:checked`);
  return el ? el.value : null;
}

function updateConditions() {
  // Resolve in document order so a hidden parent hides its dependants.
  for (const cond of conds) {
    const dep = cond.dataset.showIf;
    const values = cond.dataset.values.split("|");
    const depInput = form.querySelector(`input[name="${CSS.escape(dep)}"]`);
    const depVisible = !depInput.closest(".cond") || depInput.closest(".cond").classList.contains("is-shown");
    const show = depVisible && values.includes(checkedValue(dep));
    cond.classList.toggle("is-shown", show);
    cond.inert = !show;
    for (const input of cond.querySelectorAll("input, textarea")) input.disabled = !show;
  }
}
form.addEventListener("change", (e) => {
  if (e.target.type === "radio") {
    updateConditions();
    clearError(e.target.closest(".field"));
  }
});
updateConditions();

/* ─── RSVP: validation ─────────────────────────────────── */
function setError(field, msg) {
  field.classList.add("is-invalid");
  const err = field.querySelector(".err");
  if (err) { err.textContent = msg; err.hidden = false; }
  const control = field.querySelector("input:not([type=radio]), textarea");
  if (control) { control.setAttribute("aria-invalid", "true"); if (err?.id) control.setAttribute("aria-describedby", err.id); }
}
function clearError(field) {
  if (!field) return;
  field.classList.remove("is-invalid");
  const err = field.querySelector(".err");
  if (err) err.hidden = true;
  field.querySelector("[aria-invalid]")?.removeAttribute("aria-invalid");
}
form.addEventListener("input", (e) => {
  const field = e.target.closest(".field");
  if (field?.classList.contains("is-invalid") && e.target.checkValidity()) clearError(field);
});

function validate() {
  let first = null;
  for (const field of form.querySelectorAll(".field")) {
    if (field.closest(".cond:not(.is-shown)")) continue;
    clearError(field);
    const radios = field.querySelectorAll("input[type=radio]");
    if (radios.length) {
      if (radios[0].required && ![...radios].some((r) => r.checked)) {
        setError(field, "Merci de choisir une option.");
        first ??= radios[0];
      }
      continue;
    }
    const control = field.querySelector("input:not(.hp), textarea");
    if (!control || control.checkValidity()) continue;
    const msg = control.validity.valueMissing
      ? "Ce champ est requis."
      : "Cette adresse email ne semble pas valide.";
    setError(field, msg);
    first ??= control;
  }
  if (first) {
    first.closest(".field").scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
    first.focus({ preventScroll: true });
  }
  return !first;
}

/* ─── RSVP: submit ─────────────────────────────────────── */
const submitBtn = form.querySelector("button[type=submit]");
const submitLabel = submitBtn.querySelector(".label");
const status = form.querySelector(".form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "";
  status.classList.remove("is-error");
  if (!validate()) return;

  const data = new FormData(form);
  const name = data.get("Prénom et Nom");
  data.append("access_key", WEB3FORMS_ACCESS_KEY);
  data.append("subject", `Réponse mariage : ${name} (${data.get("Présence")})`);
  data.append("from_name", "Site du mariage Alessia & Sébastien");
  data.append("replyto", data.get("email"));

  submitBtn.setAttribute("aria-busy", "true");
  submitBtn.disabled = true;
  submitLabel.textContent = "Envoi…";

  try {
    if (WEB3FORMS_ACCESS_KEY.startsWith("YOUR_")) throw new Error("Web3Forms access key not configured in script.js");
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.success === false) throw new Error(json.message || res.statusText);
    showThanks();
  } catch (err) {
    console.error(err);
    status.classList.add("is-error");
    status.innerHTML = `L’envoi n’a pas fonctionné. Réessayez dans un instant, ou écrivez-nous à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.`;
  } finally {
    submitBtn.removeAttribute("aria-busy");
    submitBtn.disabled = false;
    submitLabel.textContent = "Soumettre";
  }
});

function showThanks() {
  const thanks = document.getElementById("merci");
  form.hidden = true;
  thanks.hidden = false;
  thanks.focus({ preventScroll: true });
  thanks.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "center" });
}

/* ─── FAQ: deep links open the right answer ────────────── */
function openFromHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (target?.tagName === "DETAILS") {
    target.open = true;
    document.querySelectorAll(".faq details.is-target").forEach((d) => d.classList.remove("is-target"));
    target.classList.add("is-target");
  }
}
window.addEventListener("hashchange", openFromHash);
openFromHash();

/* ─── House lights: running order lights up once, in order ─ */
if (!reduceMotion.matches && "IntersectionObserver" in window) {
  document.querySelectorAll(".cues").forEach((list) => {
    [...list.children].forEach((li, i) => li.style.setProperty("--i", i));
    list.classList.add("is-dark");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        list.classList.remove("is-dark");
        io.disconnect();
      },
      { threshold: 0.35 }
    );
    io.observe(list);
  });
}

/* ─── Masthead: mark the current section ───────────────── */
const navLinks = new Map(
  [...document.querySelectorAll(".nav a")].map((a) => [a.getAttribute("href").slice(1), a])
);
const sections = [...navLinks.keys()].map((id) => document.getElementById(id)).filter(Boolean);
const spy = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((a) => a.removeAttribute("aria-current"));
      navLinks.get(entry.target.id)?.setAttribute("aria-current", "true");
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));
