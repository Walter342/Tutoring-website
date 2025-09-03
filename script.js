// ===== USERS STORAGE =====
let users = {}; // temporary storage

// ===== DOM ELEMENTS =====
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const resetForm = document.getElementById('reset-form');
const dashboard = document.getElementById('dashboard');
const userNameSpan = document.getElementById('user-name');

// ===== AUTH TOGGLES =====
document.getElementById('show-login').onclick = () => {
    signupForm.style.display = 'none';
    resetForm.style.display = 'none';
    loginForm.style.display = 'block';
};

document.getElementById('show-signup').onclick = () => {
    loginForm.style.display = 'none';
    resetForm.style.display = 'none';
    signupForm.style.display = 'block';
};

document.getElementById('forgot-password').onclick = () => {
    loginForm.style.display = 'none';
    signupForm.style.display = 'none';
    resetForm.style.display = 'block';
};

document.getElementById('back-to-login').onclick = () => {
    resetForm.style.display = 'none';
    loginForm.style.display = 'block';
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

    if(users[email]){
        alert("Email already registered. Please login.");
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

// ===== RESET PASSWORD =====
document.getElementById('reset-btn').onclick = () => {
    const email = document.getElementById('reset-email').value.trim();
    const newPassword = document.getElementById('new-password').value.trim();

    if(!email || !newPassword){
        alert("All fields are required.");
        return;
    }

    if(users[email]){
        users[email].password = newPassword;
        alert("Password reset successful! Please login.");
        resetForm.style.display = 'none';
        loginForm.style.display = 'block';
        document.getElementById('reset-email').value = "";
        document.getElementById('new-password').value = "";
    } else {
        alert("Email not found. Please sign up.");
    }
};

// ===== LOGOUT =====
document.getElementById('logout-btn').onclick = () => {
    dashboard.style.display = 'none';
    loginForm.style.display = 'block';
};

// ===== BOOKING FORM =====
const bookingForm = document.getElementById('booking-form');
bookingForm.onsubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name').value.trim();
    const email = document.getElementById('booking-email').value.trim();
    const date = document.getElementById('booking-date').value;
    const moduleSelect = document.getElementById('booking-module');
    const moduleName = moduleSelect ? moduleSelect.value : "";

    if(!name || !email || !date || !moduleName){
        alert("Please fill all fields.");
        return;
    }

    const waMessage = `Hello Walter, I would like to book a session for "${moduleName}" on ${date}. Name: ${name}, Email: ${email}`;
    const waURL = `https://wa.me/27761417827?text=${encodeURIComponent(waMessage)}`;
    window.open(waURL, '_blank');

    // Clear booking form
    document.getElementById('booking-name').value = "";
    document.getElementById('booking-email').value = "";
    document.getElementById('booking-date').value = "";
    moduleSelect.value = "";
};

// ===== NEWSLETTER SUBSCRIBE =====
document.getElementById('newsletter-btn').onclick = () => {
    const email = document.getElementById('newsletter-email').value.trim();
    if(!email){
        alert("Please enter your email.");
        return;
    }
    alert(`Thank you for subscribing with ${email}!`);
    document.getElementById('newsletter-email').value = "";
};
