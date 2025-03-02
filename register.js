// // function registerUser(event) {
// //     event.preventDefault();

// //     let name = document.getElementById("user").value.trim();
// //     let email = document.getElementById("email").value.trim();
// //     let password = document.getElementById("password").value.trim();

// //     if (!name || !email || !password) {
// //         alert("All fields are required!");
// //         return;
// //     }

// //     let users = JSON.parse(localStorage.getItem("users")) || [];

// //     // Check if email already exists
// //     if (users.some(user => user.email === email)) {
// //         alert("Email already registered. Please use a different email.");
// //         return;
// //     }

// //     // Add new user
// //     users.push({ name, email, password });
// //     localStorage.setItem("users", JSON.stringify(users));

// //     alert("Registration successful! Redirecting to login...");
// //     window.location.href = "login.html";
// // }


// function registerUser(event) {
//     event.preventDefault();

//     // Get form values
//     let name = document.getElementById("user").value.trim();
//     let email = document.getElementById("email").value.trim();
//     let password = document.getElementById("password").value.trim();
//     let genderOptions = document.getElementsByName("gender");
//     let country = document.getElementById("countries").value;

//     // Get error message elements
//     let nameError = document.getElementById("nameError");
//     let emailError = document.getElementById("emailError");
//     let passwordError = document.getElementById("passwordError");
//     let genderError = document.getElementById("genderError");
//     let countryError = document.getElementById("countryError");

//     // Email regex pattern
//     let emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

//     // Reset errors
//     nameError.style.display = "none";
//     emailError.style.display = "none";
//     passwordError.style.display = "none";
//     genderError.style.display = "none";
//     countryError.style.display = "none";

//     let isValid = true;

//     // Validate Name
//     if (!name) {
//         nameError.style.display = "block";
//         isValid = false;
//     }

//     // Validate Email
//     if (!emailRegex.test(email)) {
//         emailError.style.display = "block";
//         isValid = false;
//     }

//     // Validate Password
//     if (!password) {
//         passwordError.style.display = "block";
//         isValid = false;
//     }

//     // Validate Gender
//     let selectedGender = Array.from(genderOptions).some(option => option.checked);
//     if (!selectedGender) {
//         genderError.style.display = "block";
//         isValid = false;
//     }

//     // Validate Country
//     if (country === "") {
//         countryError.style.display = "block";
//         isValid = false;
//     }

//     // Stop submission if there are errors
//     if (!isValid) return;

//     // Get existing users from local storage
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     // Check if email already exists
//     if (users.some(user => user.email === email)) {
//         alert("Email already registered. Please use a different email.");
//         return;
//     }

//     // Add new user to local storage
//     users.push({ name, email, password });
//     localStorage.setItem("users", JSON.stringify(users));

//     alert("Registration successful! Redirecting to login...");
//     window.location.href = "login.html";
// }


function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById("user").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let genderOptions = document.getElementsByName("gender");
    let country = document.getElementById("countries").value;

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let genderError = document.getElementById("genderError");
    let countryError = document.getElementById("countryError");

    let emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    // Hide all previous errors
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    genderError.style.display = "none";
    countryError.style.display = "none";

    let isValid = true;


    if (!name) { nameError.style.display = "block"; isValid = false; }
    if (!emailRegex.test(email)) { emailError.style.display = "block"; isValid = false; }
    if (!password) { passwordError.style.display = "block"; isValid = false; }
    if (!Array.from(genderOptions).some(option => option.checked)) { genderError.style.display = "block"; isValid = false; }
    if (country === "") { countryError.style.display = "block"; isValid = false; }

    if (!isValid) return;

    let users = JSON.parse(localStorage.getItem("users")) || [];

   
    if (users.some(user => user.email === email)) {
        alert("Email already registered. Please use a different email.");
        return;
    }

   
    let newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

   
    localStorage.setItem("loggedInUser", JSON.stringify({ name, email }));

    alert("Registration successful! log in now");
    window.location.href = "login.html"; 
}
