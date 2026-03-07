const API_PRODUCTS = "http://localhost:3000/products";
const API_CART = "http://localhost:3000/cart";

let cart = [];

// --- Load Products ---
async function loadProducts() {
  const res = await fetch(API_PRODUCTS);
  const products = await res.json();
  const productList = document.getElementById("productList");
  if (!productList) return;
  productList.innerHTML = "";
  
  products.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn" onclick='addToCart(${p.id})'>Add to Cart</button>
      </div>
    `;
  });
}

// --- Load Trending Products ---
async function loadTrendingProducts() {
  const res = await fetch(API_PRODUCTS);
  const products = await res.json();
  const trending = document.getElementById("trendingProducts");
  if (!trending) return;

  trending.innerHTML = "";
  products.slice(0, 4).forEach(p => {  // show first 4 as trending
    trending.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn" onclick='addToCart(${p.id})'>Add to Cart</button>
      </div>
    `;
  });
}

// --- Load Cart from Server ---
async function loadCart() {
  const res = await fetch(API_CART);
  cart = await res.json();
  const cartItems = document.getElementById("cartItems");
  if (!cartItems) return;
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="product-card cart-card">
        <img src="${item.image}" alt="${item.product_name}">
        <div class="cart-info">
          <h4>${item.product_name}</h4>
          <p>₹${item.price}</p>
          <div class="qty">
            <button onclick="updateQty(${item.id}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <p><strong>Total: ₹${item.price * item.quantity}</strong></p>
          <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  });

  const totalAmount = document.getElementById("totalAmount");
  if (totalAmount) totalAmount.innerText = "Grand Total: ₹" + total;
}

// --- Add to Cart ---
async function addToCart(productId) {
  const res = await fetch(API_PRODUCTS);
  const products = await res.json();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  await fetch(API_CART, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    })
  });
  alert("Added to cart!");
  loadCart();
}

// --- Update Quantity ---
async function updateQty(cartId, change) {
  const item = cart.find(c => c.id === cartId);
  if (!item) return;

  if (item.quantity + change <= 0) {
    await removeItem(cartId);
    return;
  }

  await fetch(API_CART, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: item.product_id,
      product_name: item.product_name,
      price: item.price,
      quantity: change,
      image: item.image
    })
  });

  loadCart();
}

// --- Remove Item ---
async function removeItem(cartId) {
  await fetch(`${API_CART}/${cartId}`, { method: "DELETE" });
  loadCart();
}

// --- Search ---
async function searchProducts() {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const res = await fetch(API_PRODUCTS);
  const products = await res.json();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search)
  );
  const productList = document.getElementById("productList");
  if (!productList) return;
  productList.innerHTML = "";
  filtered.forEach(p => {
    productList.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button class="btn" onclick='addToCart(${p.id})'>Add to Cart</button>
      </div>
    `;
  });
}

// --- Initial Load ---
loadProducts();
loadTrendingProducts();
loadCart();

// Run after page loads
document.addEventListener("DOMContentLoaded", function () {

    showUsername();

    // Signup
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const userExists = users.find(user => user.email === email);

            if (userExists) {
                document.getElementById("signupMessage").innerHTML = "User already exists!";
                document.getElementById("signupMessage").style.color = "red";
                return;
            }

            users.push({ name, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            document.getElementById("signupMessage").innerHTML =
                "Signup successful! Redirecting to login...";
            document.getElementById("signupMessage").style.color = "green";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            let users = JSON.parse(localStorage.getItem("users")) || [];

            const validUser = users.find(user =>
                user.email === email && user.password === password
            );

            if (validUser) {
                localStorage.setItem("user", validUser.name);
                alert("Login Successful!");
                window.location.href = "index.html";
            } else {
                document.getElementById("loginMessage").innerHTML =
                    "Invalid Email or Password!";
                document.getElementById("loginMessage").style.color = "red";
            }
        });
    }

});


// Show Username in Navbar
function showUsername() {
    const user = localStorage.getItem("user");
    const navBar = document.getElementById("navBar");

    if (user && navBar) {
        navBar.innerHTML = `
            <a href="index.html">Home</a>
            <a href="products.html">Products</a>
            <a href="cart.html">Cart</a>
            <span>Welcome, ${user}</span>
            <a href="#" onclick="logout()">Logout</a>
        `;
    }
}


// Logout
function logout() {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    window.location.href = "index.html";
}