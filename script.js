// Show/Hide Signup & Login
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
document.getElementById("show-login").addEventListener("click", () => {
    signupForm.style.display = "none";
    loginForm.style.display = "block";
});
document.getElementById("show-signup").addEventListener("click", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "block";
});

// Signup
document.getElementById("signup-btn").addEventListener("click", () => {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email]) {
        alert("User already exists. Please login.");
        return;
    }

    users[email] = { name, password };
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    showDashboard(name);
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[email] && users[email].password === password) {
        alert("Login successful!");
        showDashboard(users[email].name);
    } else {
        alert("Invalid email or password.");
    }
});

// Show Dashboard
function showDashboard(name) {
    document.getElementById("auth-section").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("user-name").textContent = name;
}

// Logout
document.getElementById("logout-btn").addEventListener("click", () => {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("auth-section").style.display = "flex";
    signupForm.style.display = "block";
    loginForm.style.display = "none";

    // Clear all input fields
    ["signup-name", "signup-email", "signup-password", "login-email", "login-password", "newsletter-email"].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = "";
    });
});

// Newsletter subscription
document.getElementById("newsletter-btn").addEventListener("click", () => {
    const email = document.getElementById("newsletter-email").value.trim();
    if (!email) {
        alert("Please enter your email to subscribe.");
        return;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    let subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
    if (subscribers.includes(email)) {
        alert("This email is already subscribed.");
        return;
    }

    subscribers.push(email);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
    alert("Thank you! You are subscribed to updates.");
    document.getElementById("newsletter-email").value = "";
});

// Simple email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
