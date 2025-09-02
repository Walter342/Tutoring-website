// ===== USERS STORAGE =====
let users = {}; // temporary storage

// ===== DOM ELEMENTS =====
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const userNameSpan = document.getElementById('user-name');

// Auth toggles
document.getElementById('show-login').onclick = () => {
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
};

document.getElementById('show-signup').onclick = () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
};

// ===== SIGNUP =====
document.getElementById('signup-btn').onclick = () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if(!name || !email || !password){
        alert("All fields are required.");
        return;
    }

    // Save user
    users[email] = { name, password };

    // Clear signup fields
    document.getElementById('signup-name').value = "";
    document.getElementById('signup-email').value = "";
    document.getElementById('signup-password').value = "";

    alert("Signup successful! Please log in using your credentials.");

    // Switch to login
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
};

// ===== LOGIN =====
document.getElementById('login-btn').onclick = () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if(users[email] && users[email].password === password){
        alert("Login successful!");
        userNameSpan.textContent = users[email].name;

        // Clear login fields
        document.getElementById('login-email').value = "";
        document.getElementById('login-password').value = "";

        // Show dashboard
        loginForm.style.display = 'none';
        dashboard.style.display = 'block';
    } else {
        alert("Invalid email or password.");
    }
};

// ===== LOGOUT =====
document.getElementById('logout-btn').onclick = () => {
    dashboard.style.display = 'none';
    signupForm.style.display = 'block';
};

// ===== TABS =====
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(tab => tab.style.display = 'none');
        document.getElementById(btn.dataset.tab).style.display = 'block';
    });
});

// ===== BOOKING FORM - WHATSAPP =====
document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const type = document.getElementById('sessionType').value;
    const date = document.getElementById('sessionDate').value;

    if(!name || !email || !type || !date){
        alert("Please fill all fields.");
        return;
    }

    const waMessage = `Hello Walter, I would like to book a ${type} session on ${date}. Name: ${name}, Email: ${email}`;
    const waURL = `https://wa.me/27761417827?text=${encodeURIComponent(waMessage)}`;
    window.open(waURL, '_blank');

    // Clear booking form
    document.getElementById('studentName').value = "";
    document.getElementById('studentEmail').value = "";
    document.getElementById('sessionType').value = "";
    document.getElementById('sessionDate').value = "";
};
