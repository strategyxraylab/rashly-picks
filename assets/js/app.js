const products = [
  {name:"Wireless Audio Headphones",category:"Electronics",description:"Explore wireless audio options for music, calls and everyday listening.",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"},
  {name:"Modern Smart Watch",category:"Electronics",description:"Discover wearable technology and useful everyday features.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"},
  {name:"Everyday Sneakers",category:"Fashion",description:"Explore comfortable footwear and versatile everyday styles.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"},
  {name:"Classic Fashion Bag",category:"Fashion",description:"Discover bags and accessories for different occasions.",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700"},
  {name:"Skincare Essentials",category:"Beauty",description:"Explore skincare products and personal-care essentials.",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700"},
  {name:"Beauty Collection",category:"Beauty",description:"Discover beauty tools, cosmetics and makeup inspiration.",image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700"},
  {name:"Modern Home Decor",category:"Home",description:"Explore decorative ideas and practical home accessories.",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700"},
  {name:"Kitchen Essentials",category:"Home",description:"Discover useful products for everyday kitchen routines.",image:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=700"},
  {name:"Travel Accessories",category:"Lifestyle",description:"Explore useful accessories for trips and daily adventures.",image:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=700"},
  {name:"Everyday Backpack",category:"Lifestyle",description:"Discover practical bags for work, school and travel.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"}
];

const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const empty = document.getElementById("emptyState");
let activeCategory = "All";

function renderProducts() {
  const query = search.value.toLowerCase().trim();
  const filtered = products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(query) ||
     p.category.toLowerCase().includes(query) ||
     p.description.toLowerCase().includes(query))
  );

  grid.innerHTML = filtered.map((p, index) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <button class="product-button" data-index="${products.indexOf(p)}">Explore this pick ↗</button>
      </div>
    </article>
  `).join("");

  empty.hidden = filtered.length !== 0;

  document.querySelectorAll(".product-button").forEach(button => {
    button.addEventListener("click", () => openProduct(products[Number(button.dataset.index)]));
  });
}

function setCategory(category) {
  activeCategory = category;

  document.querySelectorAll("[data-category]").forEach(button => {
    button.classList.toggle("active", button.dataset.category === category);
  });

  renderProducts();
}

document.querySelectorAll(".category-card, .filter").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
    document.getElementById("products").scrollIntoView({behavior:"smooth"});
  });
});

search.addEventListener("input", renderProducts);

const modal = document.getElementById("productModal");

function openProduct(product) {
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalDone").addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if(event.target === modal) closeModal();
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navigation").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => document.getElementById("navigation").classList.remove("open"));
});

document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("newsletterMessage").textContent =
    "Thank you for your interest! Newsletter subscriptions will be enabled in a future update.";
  document.getElementById("newsletterEmail").value = "";
});

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts();
