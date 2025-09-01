// Signup/Login logic
let users = {}; // temporary storage

const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const dashboard = document.getElementById('dashboard');
const userNameSpan = document.getElementById('user-name');

document.getElementById('show-login').onclick = () => { signupForm.style.display='none'; loginForm.style.display='block'; }
document.getElementById('show-signup').onclick = () => { loginForm.style.display='none'; signupForm.style.display='block'; }

document.getElementById('signup-btn').onclick = () => {
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    if(!name || !email || !password){ alert("All fields are required."); return; }
    users[email] = {name, password};
    alert("Signup successful!");
    userNameSpan.textContent = name;
    signupForm.style.display='none';
    dashboard.style.display='block';
}

document.getElementById('login-btn').onclick = () => {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    if(users[email] && users[email].password === password){
        alert("Login successful!");
        userNameSpan.textContent = users[email].name;
        loginForm.style.display='none';
        dashboard.style.display='block';
    } else { alert("Invalid email or password."); }
}

// Logout
document.getElementById('logout-btn').onclick = () => {
    dashboard.style.display='none';
    signupForm.style.display='block';
}

// Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(tab => tab.style.display='none');
        document.getElementById(btn.dataset.tab).style.display='block';
    });
});

// Booking Form - WhatsApp
document.getElementById('bookingForm').onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const email = document.getElementById('studentEmail').value.trim();
    const type = document.getElementById('sessionType').value;
    const date = document.getElementById('sessionDate').value;
    if(!name || !email || !type || !date){ alert("Please fill all fields."); return; }
    const waMessage = `Hello Walter, I would like to book a ${type} session on ${date}. Name: ${name}, Email: ${email}`;
    const waURL = `https://wa.me/27761417827?text=${encodeURIComponent(waMessage)}`;
    window.open(waURL, '_blank');
}
