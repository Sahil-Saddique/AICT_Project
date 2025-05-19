function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');
  cartContainer.innerHTML = '';
  let total = 0;

  cartItems.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemHTML = `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h4>${item.name}</h4>
          <div class="quantity">
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <div>
          <strong>RS-${(item.price * item.quantity).toFixed(2)}</strong><br>
          <span class="remove-btn" onclick="removeItem(${index})">Remove</span>
        </div>
      </div>
    `;
    cartContainer.innerHTML += itemHTML;
  });

  totalContainer.textContent = `Total: RS-${total.toFixed(2)}`;
}

function changeQty(index, delta) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

loadCart();

// The JS Code For Cart-Sidebar

function toggleCart(show = true) {
  const sidebar = document.getElementById('sidebar-cart');
  sidebar.style.right = show ? '0' : '-400px';
  if (show) renderSidebarCart();
}

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === name);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  toggleCart(true);
}

function renderSidebarCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('sidebar-items');
  const totalDisplay = document.getElementById('sidebar-total');
  container.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <div>
        <strong>${item.name}</strong><br>
        Qty: ${item.quantity} — RS-${(item.price * item.quantity).toFixed(2)}
      </div>
    `;
  });

  totalDisplay.textContent = `Total: RS-${total.toFixed(2)}`;
}