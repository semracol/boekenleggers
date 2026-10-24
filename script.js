const productCards = [...document.querySelectorAll(".product-card")];
const products = Object.fromEntries(
  productCards.map((card) => {
    const button = card.querySelector("[data-add-product]");
    return [
      button.dataset.addProduct,
      {
        id: button.dataset.addProduct,
        name: card.dataset.name,
        priceCents: Math.round(Number(card.dataset.price) * 100),
        image: card.querySelector("img").getAttribute("src"),
        alt: card.querySelector("img").alt,
      },
    ];
  }),
);

const CART_KEY = "boekenleggers-cart-v1";
const FREE_SHIPPING_QUANTITY = 5;
const ITEM_PRICE_CENTS = 450;
const SHIPPING_PRICE_CENTS = 250;
const cart = readCart();

const cartCount = document.getElementById("cartCount");
const cartPanel = document.getElementById("cartPanel");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const cartQuantity = document.getElementById("cartQuantity");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");
const shippingProgressText = document.getElementById("shippingProgressText");
const shippingProgress = document.querySelector(".shipping-progress");
const shippingProgressBar = document.getElementById("shippingProgressBar");
const termsAccepted = document.getElementById("termsAccepted");
const checkoutButton = document.getElementById("checkoutButton");
const cartTrigger = document.querySelector(".cart-pill");

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return {};
    return Object.fromEntries(
      Object.entries(saved).filter(
        ([id, quantity]) =>
          Object.hasOwn(products, id) &&
          Number.isInteger(quantity) &&
          quantity > 0 &&
          quantity <= 99,
      ),
    );
  } catch (error) {
    console.warn("The saved shopping cart could not be read.", error);
    return {};
  }
}

function persistCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("The shopping cart could not be saved locally.", error);
  }
}

function formatMoney(cents) {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

function getQuantity() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}

function addProduct(id, quantity = 1) {
  if (!products[id]) return;
  cart[id] = Math.min(99, (cart[id] || 0) + quantity);
  persistCart();
  renderCart();
  animateCart();
}

function renderCart() {
  const quantity = getQuantity();
  const subtotalCents = quantity * ITEM_PRICE_CENTS;
  const shippingCents =
    quantity === 0 || quantity >= FREE_SHIPPING_QUANTITY
      ? 0
      : SHIPPING_PRICE_CENTS;
  const totalCents = subtotalCents + shippingCents;

  cartCount.textContent = String(quantity);
  cartCount.setAttribute("aria-label", `${quantity} boekenleggers in winkelmandje`);
  cartItems.replaceChildren();

  for (const [id, itemQuantity] of Object.entries(cart)) {
    const product = products[id];
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.image}" alt="${product.alt}" width="64" height="80" />
      <div class="cart-item-main">
        <h3>${product.name}</h3>
        <p>${formatMoney(product.priceCents)} per stuk</p>
        <div class="quantity-control" aria-label="Aantal ${product.name}">
          <button type="button" data-cart-action="decrease" data-product-id="${id}" aria-label="Een ${product.name} minder">−</button>
          <span>${itemQuantity}</span>
          <button type="button" data-cart-action="increase" data-product-id="${id}" aria-label="Een ${product.name} meer">+</button>
        </div>
      </div>
      <button class="remove-item" type="button" data-cart-action="remove" data-product-id="${id}">Verwijderen</button>
    `;
    cartItems.append(row);
  }

  if (quantity === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "cart-empty";
    emptyMessage.textContent = "Je winkelmandje is nog leeg.";
    cartItems.append(emptyMessage);
  }

  cartQuantity.textContent = String(quantity);
  cartSubtotal.textContent = formatMoney(subtotalCents);
  cartShipping.textContent =
    quantity === 0
      ? "—"
      : quantity >= FREE_SHIPPING_QUANTITY
        ? "Gratis"
        : formatMoney(SHIPPING_PRICE_CENTS);
  cartTotal.textContent = formatMoney(totalCents);

  const remaining = Math.max(0, FREE_SHIPPING_QUANTITY - quantity);
  shippingProgressText.textContent =
    quantity >= FREE_SHIPPING_QUANTITY
      ? "Je verzending is gratis!"
      : `Nog ${remaining} ${remaining === 1 ? "stuk" : "stuks"} voor gratis verzending!`;
  shippingProgress.setAttribute("aria-valuenow", String(Math.min(quantity, FREE_SHIPPING_QUANTITY)));
  shippingProgressBar.style.width = `${Math.min(quantity / FREE_SHIPPING_QUANTITY, 1) * 100}%`;
}

function openCart() {
  cartPanel.hidden = false;
  cartBackdrop.hidden = false;
  cartTrigger.setAttribute("aria-expanded", "true");
  document.body.classList.add("cart-open");
  cartPanel.querySelector("[data-close-cart]").focus();
}

function closeCart() {
  cartPanel.hidden = true;
  cartBackdrop.hidden = true;
  cartTrigger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("cart-open");
  cartTrigger.focus();
}

document.querySelectorAll("[data-add-product]").forEach((button) => {
  button.addEventListener("click", () => {
    addProduct(button.dataset.addProduct);
    button.classList.add("is-added");
    button.textContent = "Toegevoegd ✓";
    window.setTimeout(() => {
      button.classList.remove("is-added");
      button.textContent = "In winkelmand";
    }, 900);
  });
});

document.querySelector("[data-add-giftbox]").addEventListener("click", () => {
  const existingQuantity = Object.values(cart).reduce((sum, value) => sum + value, 0);
  if (existingQuantity + 5 > 99) {
    window.alert("Je winkelmandje kan maximaal 99 boekenleggers bevatten.");
    return;
  }
  addProduct(Object.keys(products)[0], 5);
  openCart();
});

cartTrigger.addEventListener("click", openCart);
cartPanel.querySelector("[data-close-cart]").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-cart-action]");
  if (!button) return;
  const { productId, cartAction } = button.dataset;
  if (cartAction === "remove") {
    delete cart[productId];
  } else if (cartAction === "decrease") {
    cart[productId] -= 1;
    if (cart[productId] <= 0) delete cart[productId];
  } else if (cartAction === "increase") {
    cart[productId] = Math.min(99, cart[productId] + 1);
  }
  persistCart();
  renderCart();
});

termsAccepted.addEventListener("change", () => {
  checkoutButton.disabled = !termsAccepted.checked;
});

checkoutButton.addEventListener("click", () => {
  if (!termsAccepted.checked) return;
  window.alert("Dit is een demo. Online betalen en bestellen is nog niet beschikbaar.");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !cartPanel.hidden) closeCart();
});

renderCart();

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.documentElement.classList.add("js");

function setupRevealAnimations() {
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
  );
  document
    .querySelectorAll(".section-heading, .product-card, .gift-layout, .info-grid .panel, .faq details")
    .forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      observer.observe(element);
    });
}

function animateHeroTitle() {
  if (reducedMotion.matches) return;
  const title = document.getElementById("heroTitle");
  const words = title.textContent.trim().split(/\s+/);
  const accessibleText = document.createElement("span");
  accessibleText.className = "sr-only";
  accessibleText.textContent = words.join(" ");
  const animatedWords = document.createElement("span");
  animatedWords.setAttribute("aria-hidden", "true");
  animatedWords.className = "hero-title-words";
  words.forEach((word, index) => {
    const wordElement = document.createElement("span");
    wordElement.className = "hero-title-word";
    wordElement.style.setProperty("--word-delay", `${index * 100}ms`);
    wordElement.textContent = word;
    animatedWords.append(wordElement, document.createTextNode(" "));
  });
  title.replaceChildren(accessibleText, animatedWords);
}

function animateCart() {
  const icon = cartTrigger.querySelector(".cart-icon");
  icon.classList.remove("is-bouncing");
  void icon.offsetWidth;
  icon.classList.add("is-bouncing");
  icon.addEventListener("animationend", () => icon.classList.remove("is-bouncing"), {
    once: true,
  });
}

function addHeartBurst(button) {
  if (reducedMotion.matches) return;
  const symbols = ["♥", "✦", "♥", "✧", "♥", "✦"];
  symbols.forEach((symbol, index) => {
    const heart = document.createElement("span");
    heart.className = "heart-burst";
    heart.setAttribute("aria-hidden", "true");
    heart.textContent = symbol;
    heart.style.setProperty("--burst-index", String(index));
    button.append(heart);
    window.setTimeout(() => heart.remove(), 900);
  });
}

document.querySelectorAll("[data-add-product], [data-add-giftbox]").forEach((button) => {
  button.addEventListener("click", () => addHeartBurst(button));
});

if (!reducedMotion.matches) {
  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.setProperty("--tilt-x", `${y * -5}deg`);
      card.style.setProperty("--tilt-y", `${x * 6}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });

  const scene = document.querySelector(".product-scene");
  scene.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const bounds = scene.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
    scene.style.setProperty("--parallax-x", `${offsetX * 10}px`);
    scene.style.setProperty("--parallax-y", `${offsetY * 8}px`);
  });
  scene.addEventListener("pointerleave", () => {
    scene.style.removeProperty("--parallax-x");
    scene.style.removeProperty("--parallax-y");
  });
}

window.addEventListener(
  "scroll",
  () => document.querySelector(".topbar").classList.toggle("is-compact", window.scrollY > 24),
  { passive: true },
);

setupRevealAnimations();
animateHeroTitle();
