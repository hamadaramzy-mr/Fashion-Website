document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const password = document.getElementById('pass').value.trim();
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.username === name && user.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', user.username);

    alert('Login successful!');
    window.location.href = 'homepage.html';
  } else {
    alert('Invalid name or password');
  }
});