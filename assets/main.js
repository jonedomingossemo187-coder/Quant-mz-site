/* =========================================================
   CONFIGURAÇÃO — edite aqui para atualizar o site inteiro
   ========================================================= */
const SITE = {
  whatsappNumber: "258856371603", // formato internacional sem "+" nem espaços
  callNumber: "85 637 1603",
};

const PRODUCTS = [
  {
    id: "robo-deriv",
    tag: "Trading automático",
    name: "Robô de Operação Deriv",
    desc: "Robô que executa operações na Deriv seguindo regras definidas, com gestão de stake e stop configuráveis. Entrega e configuração feitas por WhatsApp após confirmação.",
    price: "1.500 MT",
    priceNote: "pagamento único",
    icon: "chart",
  },
  {
    id: "chaves-api-ia",
    tag: "Acesso a IA",
    name: "Chaves de API de IA",
    desc: "Planos de acesso à API de Inteligência Artificial para usar nos seus próprios projetos e bots — sem precisar de conta própria na provedora.",
    price: "Desde 300 MT",
    priceNote: "por plano",
    icon: "key",
  },
  {
    id: "ebook-maps-whatsapp",
    tag: "E-book",
    name: "Google Maps + WhatsApp",
    desc: "Guia prático de como ganhar dinheiro otimizando fichas do Google Maps de negócios locais e prospectando clientes pelo WhatsApp.",
    price: "100 MT",
    priceNote: "download após pagamento",
    icon: "book",
  },
  {
    id: "ebook-bolo-no-pote",
    tag: "E-book",
    name: "Bolo no Pote",
    desc: "Receita completa de bolo no pote e guia de vendas: como preparar, embalar e vender como produto próprio.",
    price: "100 MT",
    priceNote: "download após pagamento",
    icon: "book",
  },
  {
    id: "otimizacao-google-maps",
    tag: "Serviço",
    name: "Otimização de Ficha no Google Maps",
    desc: "Serviço feito para o seu negócio: atualização e otimização da ficha no Google Maps (Google Business Profile) para aparecer melhor nas pesquisas locais.",
    price: "Sob consulta",
    priceNote: "conforme o negócio",
    icon: "pin",
  },
];

const ICONS = {
  chart: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 50V32M22 50V18M36 50V38M50 50V10" stroke="#C9A24B" stroke-width="4" stroke-linecap="round"/><path d="M8 30l14-13 14 9 14-22" stroke="#6E9C7D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  key: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="24" r="12" stroke="#C9A24B" stroke-width="4"/><path d="M31 33l24 24M46 48l7-7M52 54l7-7" stroke="#6E9C7D" stroke-width="4" stroke-linecap="round"/></svg>`,
  book: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 12c8-4 16-4 22 2v38c-6-6-14-6-22-2V12z" stroke="#C9A24B" stroke-width="4" stroke-linejoin="round"/><path d="M54 12c-8-4-16-4-22 2v38c6-6 14-6 22-2V12z" stroke="#6E9C7D" stroke-width="4" stroke-linejoin="round"/></svg>`,
  pin: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 58S14 39 14 25a18 18 0 0136 0c0 14-18 33-18 33z" stroke="#C9A24B" stroke-width="4" stroke-linejoin="round"/><circle cx="32" cy="25" r="7" stroke="#6E9C7D" stroke-width="4"/></svg>`,
};

function waLink(productName) {
  const msg = encodeURIComponent(
    `Olá! Tenho interesse em "${productName}". Pode dar-me mais informações?`
  );
  return `https://wa.me/${SITE.whatsappNumber}?text=${msg}`;
}

function renderProductCard(p) {
  return `
    <article class="product-card" id="${p.id}">
      <div class="product-figure">${ICONS[p.icon]}</div>
      <span class="product-tag">${p.tag}</span>
      <h3>${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <div class="product-price">${p.price} <small>${p.priceNote}</small></div>
      <a class="btn btn-primary btn-block" href="${waLink(p.name)}" target="_blank" rel="noopener">Falar no WhatsApp</a>
    </article>`;
}

function renderProducts(targetSelector, limit) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  const list = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;
  el.innerHTML = list.map(renderProductCard).join("");
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
}

function setupWaFloat() {
  const el = document.querySelector(".wa-float");
  if (!el) return;
  el.href = waLink("os vossos produtos");
}

function setupGenericWaButtons() {
  document.querySelectorAll("[data-wa]").forEach((btn) => {
    btn.href = waLink(btn.dataset.wa || "os vossos produtos");
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("#name").value.trim();
    const message = form.querySelector("#message").value.trim();
    const text = encodeURIComponent(`Olá, sou ${name}. ${message}`);
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${text}`, "_blank");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupWaFloat();
  setupGenericWaButtons();
  setupContactForm();
  renderProducts("#featured-products", 3);
  renderProducts("#all-products");

  const callEl = document.querySelectorAll(".js-call-number");
  callEl.forEach((el) => (el.textContent = SITE.callNumber));
});
