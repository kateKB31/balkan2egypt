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

  if (!r) {
    qs("#subtitle").textContent = "Stay unavailable";
    qs("#title").textContent = "Apartment Not Found";
    qs("#tagline").textContent = "Check the link, or browse every stay we currently offer.";
    qs(".detail-layout").innerHTML = `
      <article class="detail-card detail-card--full">
        <p class="detail-card__eyebrow">Nothing to show</p>
        <h2>This Stay Is No Longer Listed</h2>
        <p class="detail-copy">Browse our current apartments and hotels, or message us for a personal recommendation.</p>
      </article>
    `;
    return;
  }

  document.title = `${r.name} — Balkan2Egypt`;
  qs("#title").textContent = r.name;
  qs("#subtitle").textContent = `${r.location} • ${r.type}`;
  qs("#heroImg").style.backgroundImage = `url('${r.image}')`;
  qs("#desc").textContent = r.description;
  qs("#price").innerHTML = `<strong>${moneyEUR(r.pricePerNight)}</strong><span>per night</span>`;
  qs("#amenities").innerHTML = r.amenities.map(a => `<li>${a}</li>`).join("");
  qs("#map").src = r.mapEmbed;

  qs("#bookWA").setAttribute("data-wa", `Hi! I want to book: ${r.name} in ${r.location}.`);
  // data-wa lands after the initial pass, so refresh the WhatsApp links.
  setWAButtons();
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
    <a class="guide-card" href="post.html?id=${b.id}">
      <div class="guide-card__image" style="background-image:url('${b.image}')"></div>
      <div class="guide-card__body">
        <p class="guide-card__category">${b.category}</p>
        <h3>${b.title}</h3>
        <p class="guide-card__excerpt">${b.excerpt}</p>
        <span class="guide-card__link">Read the story <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
      </div>
    </a>
  `);
}

function initPostSingle() {
  const id = getParam("id");
  const b = window.DATA.posts.find(x => x.id === id);
  if (!b) {
    qs("#subtitle").textContent = "Story unavailable";
    qs("#title").textContent = "Travel Story Not Found";
    qs("#tagline").textContent = "The link may be outdated. Browse the latest advice in our Travel Guide.";
    qs("#content").innerHTML = `<h2>This story is no longer available.</h2><p>Return to the Travel Guide for current local tips and inspiration.</p>`;
    return;
  }

  document.title = `${b.title} — Balkan2Egypt`;
  qs("#title").textContent = b.title;
  qs("#subtitle").textContent = b.category;
  qs("#heroImg").style.backgroundImage = `url('${b.image}')`;
  qs("#content").innerHTML = b.content;
}

function formatFacebookDate(value) {
  if (!value) return "Latest update";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Latest update";

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function createFacebookTimeline(pageUrl) {
  const wrapper = document.createElement("div");
  wrapper.className = "facebook-timeline";

  const intro = document.createElement("div");
  intro.className = "facebook-timeline__intro";

  const eyebrow = document.createElement("span");
  eyebrow.textContent = "Live from Facebook";

  const heading = document.createElement("h3");
  heading.textContent = "The latest Balkan2Egypt posts";

  const copy = document.createElement("p");
  copy.textContent = "Our newest travel moments, offers and local tips appear here automatically, straight from the Balkan2Egypt Facebook page.";

  const cta = document.createElement("a");
  cta.className = "facebook-timeline__cta";
  cta.href = pageUrl;
  cta.target = "_blank";
  cta.rel = "noopener noreferrer";
  cta.textContent = "Follow on Facebook";

  intro.append(eyebrow, heading, copy, cta);

  const frameShell = document.createElement("div");
  frameShell.className = "facebook-timeline__frame";

  const pluginUrl = new URL("https://www.facebook.com/plugins/page.php");
  pluginUrl.searchParams.set("href", pageUrl);
  pluginUrl.searchParams.set("tabs", "timeline");
  pluginUrl.searchParams.set("width", "500");
  pluginUrl.searchParams.set("height", "900");
  pluginUrl.searchParams.set("small_header", "false");
  pluginUrl.searchParams.set("adapt_container_width", "true");
  pluginUrl.searchParams.set("hide_cover", "false");
  pluginUrl.searchParams.set("show_facepile", "false");

  const iframe = document.createElement("iframe");
  iframe.title = "Latest posts from Balkan2Egypt on Facebook";
  iframe.src = pluginUrl.toString();
  iframe.width = "500";
  iframe.height = "900";
  iframe.loading = "lazy";
  iframe.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
  iframe.setAttribute("allowfullscreen", "true");

  const directLink = document.createElement("a");
  directLink.className = "facebook-timeline__link";
  directLink.href = pageUrl;
  directLink.target = "_blank";
  directLink.rel = "noopener noreferrer";
  directLink.textContent = "Open Balkan2Egypt on Facebook ↗";

  frameShell.append(iframe, directLink);
  wrapper.append(intro, frameShell);
  return wrapper;
}

function createFacebookPostCard(post, index) {
  const card = document.createElement("a");
  card.className = `discover-card${index === 0 ? " discover-card--featured" : ""}${post.imageUrl ? "" : " discover-card--text"}`;
  card.href = post.permalinkUrl;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  if (post.imageUrl) {
    const image = document.createElement("img");
    image.className = "discover-card__image";
    image.src = post.imageUrl;
    image.alt = "";
    image.loading = index < 2 ? "eager" : "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    // Facebook CDN links expire; drop the broken image rather than showing a torn card.
    image.addEventListener("error", () => {
      image.remove();
      card.classList.add("discover-card--text");
    }, { once: true });
    card.appendChild(image);
  }

  const shade = document.createElement("span");
  shade.className = "discover-card__shade";
  shade.setAttribute("aria-hidden", "true");

  const content = document.createElement("span");
  content.className = "discover-card__content";

  const meta = document.createElement("span");
  meta.className = "discover-card__meta";
  meta.textContent = formatFacebookDate(post.createdTime);

  if (post.mediaType === "video") {
    const badge = document.createElement("b");
    badge.className = "discover-card__badge";
    badge.textContent = "Video";
    meta.appendChild(badge);
  }

  const message = document.createElement("span");
  message.className = "discover-card__message";
  message.textContent = post.message;

  const action = document.createElement("span");
  action.className = "discover-card__action";
  action.innerHTML = "Read on Facebook <b aria-hidden=\"true\">↗</b>";

  content.append(meta, message, action);
  card.append(shade, content);
  return card;
}

function createDiscoverFooter(pageUrl) {
  const footer = document.createElement("div");
  footer.className = "discover-footer";

  const copy = document.createElement("p");
  copy.textContent = "These posts refresh automatically as we publish on Facebook.";

  const link = document.createElement("a");
  link.href = pageUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "See all posts on Facebook ↗";

  footer.append(copy, link);
  return footer;
}

async function initFacebookPosts() {
  const feed = qs("#facebookPosts");
  if (!feed) return;

  const defaultPageUrl = window.DATA.socialLinks.facebook;

  const showTimeline = (pageUrl) => {
    feed.replaceChildren(createFacebookTimeline(pageUrl));
    feed.setAttribute("aria-busy", "false");
  };

  try {
    const response = await fetch("/api/facebook-posts", {
      headers: { accept: "application/json" }
    });
    const payload = await response.json();
    const pageUrl = payload.pageUrl || defaultPageUrl;
    const posts = Array.isArray(payload.posts)
      ? [...payload.posts].sort((left, right) => {
          return Date.parse(right.createdTime || "") - Date.parse(left.createdTime || "");
        })
      : [];

    // Without post data of our own, the official page embed is the only way to
    // still show real posts, so it stands in for every non-success case.
    if (!response.ok || payload.error || !payload.configured || !posts.length) {
      showTimeline(pageUrl);
      return;
    }

    feed.replaceChildren();
    feed.setAttribute("aria-busy", "false");

    posts.forEach((post, index) => {
      feed.appendChild(createFacebookPostCard(post, index));
    });
    feed.appendChild(createDiscoverFooter(pageUrl));
  } catch {
    showTimeline(defaultPageUrl);
  }
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
  if (qs("#facebookPosts")) initFacebookPosts();

  if (qs("body").classList.contains("rental-single")) initRentalSingle();
  if (qs("body").classList.contains("property-single")) initPropertySingle();
  if (qs("body").classList.contains("tour-single")) initTourSingle();
  if (qs("body").classList.contains("post-single")) initPostSingle();
});
