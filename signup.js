document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('pass').value.trim();

  if (name && email && password) {
    localStorage.setItem('user', JSON.stringify({
      username: name,
      email: email,
      password: password
    }));

    alert('Account created successfully!');
    window.location.href = 'signin.html';
  } else {
    alert('Please fill all fields');
  }
});