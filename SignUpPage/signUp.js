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

function checkStrength(val) {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const colors = ['#e0c89a', '#e24b4a', '#ef9f27', '#b8860b', '#3b6d11'];
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

    for (let i = 1; i <= 4; i++) {
        document.getElementById('b' + i).style.background =
            i <= score ? colors[score] : '#e0c89a';
    }

    document.getElementById('strengthLabel').textContent =
        val.length ? labels[score] : '';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}

function handleSignup(e) {
    e.preventDefault();

    const first = document.getElementById('sFirst').value.trim();
    const last = document.getElementById('sLast').value.trim();
    const email = document.getElementById('sEmail').value.trim();
    const pass = document.getElementById('sPass').value;
    const conf = document.getElementById('sConf').value;
    const terms = document.getElementById('terms').checked;

    if (!first || !last || !email || !pass || !conf) {
        showToast('Please fill in all fields.');
        return;
    }

    if (pass !== conf) {
        showToast('Passwords do not match.');
        return;
    }

    if (pass.length < 8) {
        showToast('Password must be at least 8 characters.');
        return;
    }

    if (!terms) {
        showToast('Please accept the terms.');
        return;
    }

    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("users")) || [];
    } catch {
        users = [];
    }

    let exists = users.find(user => user.email === email);

    if (exists) {
        showToast('This email is already registered ');
        return;
    }

    let newUser = {
        firstname: first,
        lastname: last,
        username: first.toLowerCase() + Math.floor(Math.random() * 1000),
        email: email,
        password: pass,
        role: selectedRole
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("IsLoggedIn", "true");

    showToast('Account created successfully ');

    setTimeout(() => {
        window.location.href = "../LogInPage/index.html";
    }, 1000);
}