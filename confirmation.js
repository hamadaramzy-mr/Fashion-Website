const orderDetails = document.querySelector('.order-details');
const order = JSON.parse(localStorage.getItem('order'));

if (order) {
  fetch('./products.json')
    .then(res => res.json())
    .then(products => {
      let html = `<h2>Thank you, ${order.customer.name}!</h2>`;
      html += `<p>Your order will be shipped to: <strong>${order.customer.address}</strong></p>`;
      html += `<p>Payment Method: <strong>${order.customer.payment}</strong></p>`;
      html += `<h3>Order Summary:</h3><ul>`;

      order.carts.forEach(cart => {
        let product = products.find(p => p.id == cart.product_id);
        if (product) {
          html += `<li>${product.name} — Quantity: ${cart.quantity}</li>`;
        } else {
          html += `<li>Unknown Product (ID: ${cart.product_id}) — Quantity: ${cart.quantity}</li>`;
        }
      });
localStorage.setItem('orderConfirmed', 'true');
localStorage.removeItem('order');
document.querySelector('.home-btn').addEventListener('click', () => {
  localStorage.setItem('orderConfirmed', 'true');
  window.location.href = 'homepage.html'; 
});
      html += `</ul>`;
      orderDetails.innerHTML = html;

      localStorage.removeItem('order'); 
    });
} else {
  orderDetails.innerHTML = `<p>No order found.</p>`;
}