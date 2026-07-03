const checkoutCart = document.querySelector('.checkout-cart');
const checkoutTotal = document.querySelector('.checkout-total');
let carts = JSON.parse(localStorage.getItem('cart')) || [];
let listProducts = [];
fetch('./products.json')
  .then(res => res.json())
  .then(data => {
    listProducts = data;
    renderCheckout();
  });

function renderCheckout() {
  checkoutCart.innerHTML = '';
  let totalPrice = 0;

  carts.forEach(cart => {
    let product = listProducts.find(p => p.id == cart.product_id);
    if (product) {
      let item = document.createElement('div');
      item.classList.add('checkout-item');
      item.innerHTML = `
        <span>${product.name} (x${cart.quantity})</span>
        <span>$${(product.price * cart.quantity).toFixed(2)}</span>
      `;
      checkoutCart.appendChild(item);
      totalPrice += product.price * cart.quantity;
    }
  });

  checkoutTotal.innerHTML = `<h2>Total: $${totalPrice.toFixed(2)}</h2>`;
}
document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const customer = {
    name: formData.get('name'),
    address: formData.get('address'),
    payment: formData.get('payment')
  };

  localStorage.setItem('order', JSON.stringify({ carts, customer }));
  localStorage.removeItem('cart');
  window.location.href = 'confirmation.html'; 
});