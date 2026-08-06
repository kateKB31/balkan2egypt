function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

function moneyEUR(n) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(n);
}

function waLink(message) {
  const num = window.DATA.whatsappNumber;
  const text = encodeURIComponent(message);
  return `https://wa.me/${num}?text=${text}`;
}

function renderCards(container, items, cardFn) {
  const el = qs(container);
  if (!el) return;
  el.innerHTML = items.map(cardFn).join("");
}

function setWAButtons() {
  qsa("[data-wa]").forEach(btn => {
    const msg = btn.getAttribute("data-wa") || "Hello!";
    btn.setAttribute("href", waLink(msg));
    btn.setAttribute("target", "_blank");
    btn.setAttribute("rel", "noopener");
  });
}

function setFloatingWhatsApp() {
  const btn = qs("#wa-float");
  if (!btn) return;
  btn.href = waLink("Hi! I want to ask about Egypt travel / rentals / property.");
  btn.target = "_blank";
  btn.rel = "noopener";
}

function setSocialLinks() {
  const socialLinks = window.DATA.socialLinks;
  if (!socialLinks || (!socialLinks.instagram && !socialLinks.facebook)) return;

  const icons = {
    instagram: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5"></rect>
        <circle cx="12" cy="12" r="4.25"></circle>
        <circle class="social-icon__dot" cx="17.4" cy="6.7" r="1"></circle>
      </svg>`,
    facebook: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.4 8.2V6.8c0-.7.5-.9 1-.9h2.4V2.2L14.5 2C11.2 2 9.8 4 9.8 6.5v1.7H7v4.1h2.8V22h4.6v-9.7h3.1l.5-4.1h-3.6Z"></path>
      </svg>`
  };

  const labels = { instagram: "Instagram", facebook: "Facebook" };
  const links = ["instagram", "facebook"]
    .filter(network => socialLinks[network])
    .map(network => `
      <a class="social-icon social-icon--${network}" href="${socialLinks[network]}"
        target="_blank" rel="noopener noreferrer" aria-label="Follow BALKAN2EGYPT on ${labels[network]}"
        title="${labels[network]}">
        ${icons[network]}
      </a>`)
    .join("");

  const socialBar = document.createElement("div");
  socialBar.className = "social-float";
  socialBar.setAttribute("aria-label", "Social media links");
  socialBar.innerHTML = links;
  document.body.appendChild(socialBar);
}

function initRentalsList() {
  renderCards("#rentalsGrid", window.DATA.rentals, (r) => `
    <a class="card" href="rental.html?id=${r.id}">
      <div class="card__img" style="background-image:url('${r.image}')"></div>
      <div class="card__body">
        <h3>${r.name}</h3>
        <p class="muted">${r.location} • ${r.type}</p>
        <div class="price">From <strong>${moneyEUR(r.pricePerNight)}</strong> / night</div>
      </div>
    </a>
  `);
}

function initRentalSingle() {
  const id = getParam("id");
  const r = window.DATA.rentals.find(x => x.id === id);
  if (!r) return;

  qs("#title").textContent = r.name;
  qs("#subtitle").textContent = `${r.location} • ${r.type}`;
  qs("#heroImg").style.backgroundImage = `url('${r.image}')`;
  qs("#desc").textContent = r.description;
  qs("#price").textContent = `From ${moneyEUR(r.pricePerNight)} / night`;
  qs("#amenities").innerHTML = r.amenities.map(a => `<li>${a}</li>`).join("");
  qs("#map").src = r.mapEmbed;

  qs("#bookWA").setAttribute("data-wa", `Hi! I want to book: ${r.name} in ${r.location}.`);
}

function initPropertiesList() {
  const list = window.DATA.properties;

  const apply = () => {
    const loc = qs("#fLoc").value;
    const type = qs("#fType").value;
    const status = qs("#fStatus").value;
    const nearBeach = qs("#fBeach").checked;
    const newProj = qs("#fNew").checked;

    const filtered = list.filter(p => {
      if (loc && p.location !== loc) return false;
      if (type && p.type !== type) return false;
      if (status && p.status !== status) return false;
      if (nearBeach && !p.nearBeach) return false;
      if (newProj && !p.isNewProject) return false;
      return true;
    });

    renderCards("#propertiesGrid", filtered, (p) => `
      <a class="card" href="property.html?id=${p.id}">
        <div class="card__img" style="background-image:url('${p.image}')"></div>
        <div class="card__body">
          <h3>${p.name}</h3>
          <p class="muted">${p.location} • ${p.type} • ${p.status}</p>
          <div class="price"><strong>${moneyEUR(p.price)}</strong></div>
        </div>
      </a>
    `);
  };

  const unique = (arr) => [...new Set(arr)];
  qs("#fLoc").innerHTML = `<option value="">All locations</option>` +
    unique(list.map(p => p.location)).map(x => `<option value="${x}">${x}</option>`).join("");
  qs("#fType").innerHTML = `<option value="">All types</option>` +
    unique(list.map(p => p.type)).map(x => `<option value="${x}">${x}</option>`).join("");
  qs("#fStatus").innerHTML = `<option value="">All statuses</option>` +
    unique(list.map(p => p.status)).map(x => `<option value="${x}">${x}</option>`).join("");

  ["#fLoc","#fType","#fStatus","#fBeach","#fNew"].forEach(sel => {
    qs(sel).addEventListener("change", apply);
  });

  apply();
}

function initPropertySingle() {
  const id = getParam("id");
  const p = window.DATA.properties.find(x => x.id === id);
  if (!p) return;

  qs("#title").textContent = p.name;
  qs("#subtitle").textContent = `${p.location} • ${p.type} • ${p.status}`;
  qs("#heroImg").style.backgroundImage = `url('${p.image}')`;
  qs("#desc").textContent = p.description;
  qs("#price").textContent = moneyEUR(p.price);

  qs("#facts").innerHTML = `
    <li><strong>Area:</strong> ${p.areaM2} m²</li>
    <li><strong>Rooms:</strong> ${p.rooms}</li>
    <li><strong>Floor:</strong> ${p.floor}</li>
    <li><strong>View:</strong> ${p.view}</li>
    <li><strong>Payment plan:</strong> ${p.paymentPlan}</li>
  `;

  qs("#pros").innerHTML = p.pros.map(x => `<li>${x}</li>`).join("");
  qs("#map").src = p.mapEmbed;

  qs("#buyWA").setAttribute("data-wa", `Hi! I want to buy property: ${p.name} in ${p.location}.`);
}

function initToursList() {
  renderCards("#toursGrid", window.DATA.tours, (t) => `
    <a class="card" href="tour.html?id=${t.id}">
      <div class="card__img" style="background-image:url('${t.image}')"></div>
      <div class="card__body">
        <h3>${t.name}</h3>
        <p class="muted">${t.location} • ${t.duration}</p>
        <div class="price">From <strong>${moneyEUR(t.price)}</strong></div>
      </div>
    </a>
  `);
}

function initTourSingle() {
  const id = getParam("id");
  const t = window.DATA.tours.find(x => x.id === id);
  if (!t) return;

  qs("#title").textContent = t.name;
  qs("#subtitle").textContent = `${t.location} • ${t.duration}`;
  qs("#heroImg").style.backgroundImage = `url('${t.image}')`;
  qs("#desc").textContent = t.description;
  qs("#price").textContent = moneyEUR(t.price);
  qs("#included").innerHTML = t.included.map(x => `<li>${x}</li>`).join("");
  qs("#map").src = t.mapEmbed;

  qs("#bookWA").setAttribute("data-wa", `Hi! I want to book tour: ${t.name}.`);
}

function initBlogList() {
  renderCards("#blogGrid", window.DATA.posts, (b) => `
    <a class="card" href="post.html?id=${b.id}">
      <div class="card__img" style="background-image:url('${b.image}')"></div>
      <div class="card__body">
        <h3>${b.title}</h3>
        <p class="muted">${b.category}</p>
        <p>${b.excerpt}</p>
      </div>
    </a>
  `);
}

function initPostSingle() {
  const id = getParam("id");
  const b = window.DATA.posts.find(x => x.id === id);
  if (!b) return;

  qs("#title").textContent = b.title;
  qs("#subtitle").textContent = b.category;
  qs("#heroImg").style.backgroundImage = `url('${b.image}')`;
  qs("#content").innerHTML = b.content;
}

function setMobileNav() {
  const nav = qs(".topbar .nav");
  const menu = qs(".topbar .menu");
  if (!nav || !menu) return;

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "nav__toggle";
  toggle.setAttribute("aria-label", "Toggle menu");
  toggle.setAttribute("aria-expanded", "false");
  toggle.innerHTML = "&#9776;"; // ☰
  nav.insertBefore(toggle, menu);

  const setOpen = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? "&#10005;" : "&#9776;"; // ✕ / ☰
  };

  toggle.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
  // Close after tapping a link
  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setMobileNav();
  setFloatingWhatsApp();
  setSocialLinks();
  setWAButtons();

  if (qs("#rentalsGrid")) initRentalsList();
  if (qs("#propertiesGrid")) initPropertiesList();
  if (qs("#toursGrid")) initToursList();
  if (qs("#blogGrid")) initBlogList();

  if (qs("body").classList.contains("rental-single")) initRentalSingle();
  if (qs("body").classList.contains("property-single")) initPropertySingle();
  if (qs("body").classList.contains("tour-single")) initTourSingle();
  if (qs("body").classList.contains("post-single")) initPostSingle();
});
