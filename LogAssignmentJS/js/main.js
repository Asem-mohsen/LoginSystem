// Move the placeholder to up on focus
let inputLabels = document.querySelectorAll('.form-group label');
let inputs      =  document.querySelectorAll('.form-group input');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click' , function(e){
        inputLabels[i].classList.add('active');
    })
}

document.addEventListener('DOMContentLoaded', function() {
// Validation
    
    let form          = document.getElementById('registerForm');
    let logForm          = document.getElementById('loginForm');
    // Form Inputs
    let nameInput     = document.getElementById('Name');
    let emailInput    = document.getElementById('Email');
    let passwordInput = document.getElementById('Password');
    // Errors
    let emailError    = document.getElementById('emailError');
    let passwordError = document.getElementById('passwordError');
    let generalError  = document.getElementById('generalError');
    // Logout
    let logout        = document.getElementById('Logout');

    // Register
    if(form){
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous error messages
            emailError.style.display = 'none';
            passwordError.style.display = 'none';

            // Validate
            let name     = nameInput.value.trim();
            let email    = emailInput.value.trim();
            let password = passwordInput.value.trim();
            let isValid  = true;

            // validation
            let registeredEmail = localStorage.getItem('userEmail');
            if (registeredEmail === email) {
                emailError.textContent = 'This email is already registered';
                emailError.style.display = 'block';
                isValid = false;
            }
            
            if (!validateEmail(email)) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.style.display = 'block';
                isValid = false;
            }
            if (password.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters long.';
                passwordError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPassword', password);
                localStorage.setItem('userName', name);
                window.location.href = 'index.html';
            }
        });
    }

    // Login
    if(logForm){
        logForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate email and password
            let email    = emailInput.value.trim();
            let password = passwordInput.value.trim();
            let isValid  = true;

            // Check if user is registered
            let registeredEmail    = localStorage.getItem('userEmail');
            let registeredPassword = localStorage.getItem('userPassword');

            if(password !== registeredPassword || email !== registeredEmail){
                generalError.textContent = "The user doesnot exist please signup first";
                generalError.style.display = 'block';
                isValid = false;
            }

            if (email !== registeredEmail){
                emailError.textContent = 'Email does not match our records.';
                emailError.style.display = 'block';
                isValid = false;
            }

            if (password !== registeredPassword) {
                passwordError.textContent = 'Password does not match our records.';
                passwordError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                window.location.href = 'home.html';
            }
        })
    }

    // Logout Function 
    if(logout){
        logout.addEventListener('click' , function(e){
            e.preventDefault();
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userPassword');
            localStorage.removeItem('Name');

            window.location.href = 'index.html';
            generalError.textContent = 'You are logged out successfully';
            generalError.style.display = 'block';
        });
    }

    // Email validation
    function validateEmail(email) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
})