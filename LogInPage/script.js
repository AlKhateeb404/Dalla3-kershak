let selectedRole = 'user';

function pickRole(role) {
    selectedRole = role;
    document.getElementById('roleUser').classList.toggle('active', role === 'user');
    document.getElementById('roleAdmin').classList.toggle('active', role === 'admin');
}

function togglePass(id, btn) {
    const input = document.getElementById(id);
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.style.color = isText ? '#b8a080' : '#b8860b';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const pass = document.getElementById('loginPass').value;

    if (!email || !pass) {
        showToast('Please fill in all fields.');
        return;
    }

    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("users")) || [];
    } catch {
        users = [];
    }

    let foundUser = users.find(user =>
        (user.email === email || user.username === email) &&
        user.password === pass
    );

    if (foundUser) {
        showToast('Login successful ');

        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        localStorage.setItem("IsLoggedIn", "true");

        setTimeout(() => {
            window.location.href = "../HomePage/Home.html";
        }, 1000);

    } else {
        showToast('Wrong email or password ');
    }
}

