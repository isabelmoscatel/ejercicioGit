const viewPassword = document.getElementById('togglePassword')
const passwordInput = document.getElementById('inputPassword')
const usernameInput = document.getElementById('usernameInput')
const loginBtn = document.getElementById('loginBtn')
const alertaPassword = document.getElementById('alertaPassword');
alertaPassword.style.display = "none";

viewPassword.addEventListener('click', () => {
  const actualType = passwordInput.getAttribute('type')
  if (actualType == 'password') {
    passwordInput.setAttribute('type', 'text')
  } else {
    passwordInput.setAttribute('type', 'password')
  }
})

const users = [
  {
    username: 'usuario1',
    password: 'usuario1'
  },
  {
    username: 'usuario2',
    password: 'usuario2'
  }
]

loginBtn.addEventListener('click', (event) => {
  event.preventDefault()

  const usernameValue = usernameInput.value
  const passwordValue = passwordInput.value

  const user = users.find((user) => user.username == usernameValue && user.password == passwordValue)

  if (user) {
    alert('Login successful')
    localStorage.setItem('isLogged', true)
    window.location.href = '../index.html';
    
    
  }
  else {
    usernameInput.value = ''
    passwordInput.value = ''
    alert('Wrong credentials')
    alertaPassword.style.display = "block";
  }
})

if (localStorage.getItem('isLogged')) {
  const form = document.getElementById('loginForm')
  form.innerHTML = `<button id="logout" class="btn">Logout</button>
        <a href="../index.html">
        <i class="bi bi-arrow-left"></i> Back
      </a>`

  const logoutBtn = document.getElementById('logout')
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('isLogged')
    window.location.href = '../index.html'
  })
}