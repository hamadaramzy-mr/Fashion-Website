window.addEventListener('DOMContentLoaded', () => {
  const messageDiv = document.getElementById('order-message');
  if (localStorage.getItem('orderConfirmed') === 'true') {
    messageDiv.innerText = '✅ Order Confirmed!';
    messageDiv.style.color = 'green';
    messageDiv.style.fontWeight = 'bold';
    localStorage.removeItem('orderConfirmed');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('login-btn');
  const userStatus = document.getElementById('user-status');

  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const username = localStorage.getItem('username');

  if (isLoggedIn === 'true' && username) {
    userStatus.innerText = `✅ Welcome, ${username}`;
    loginBtn.innerText = 'Logout';
    loginBtn.removeAttribute('href');
    loginBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('username');
      window.location.reload();
    });
  } else {
    userStatus.innerText = '❌ You are not logged in';
    loginBtn.innerText = 'Login';
    loginBtn.setAttribute('href', 'signin.html');
  }
});