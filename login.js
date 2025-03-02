
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }
});

function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let validUser = users.find(user => user.email === email && user.password === password);

    if (!validUser) {
        alert("Invalid email or password try again or register if you don't have valid email");
        // window.location.href = "register.html"; 
        return;
    }

    
    localStorage.setItem("loggedInUser", JSON.stringify({ name: validUser.name, email: validUser.email }));
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    alert(`Login successful, welcome ${user.name}`);
    window.location.href = "index.html"; 
}
