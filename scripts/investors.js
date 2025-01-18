document.addEventListener("DOMContentLoaded", function() {
    const passwordField = document.getElementById("password");
    const togglePassword = document.querySelector(".password-toggle-icon .eye-open");

    const passwordField2 = document.getElementById("confirm-password");
    const togglePassword2 = document.querySelectorAll(".password-toggle-icon svg")[1]; // second eye icon for confirm password

    // Password field toggle
    if (togglePassword && passwordField) {
        togglePassword.addEventListener("click", function() {
            if (passwordField.type === "password") {
                passwordField.type = "text";
                togglePassword.style.display = "none"; // hide open eye icon
                togglePassword.nextElementSibling.style.display = "inline-block"; // show closed eye icon
            } else {
                passwordField.type = "password";
                togglePassword.style.display = "inline-block"; // show open eye icon
                togglePassword.nextElementSibling.style.display = "none"; // hide closed eye icon
            }
        });
    }

    // Confirm password field toggle
    if (togglePassword2 && passwordField2) {
        togglePassword2.addEventListener("click", function() {
            if (passwordField2.type === "password") {
                passwordField2.type = "text";
                togglePassword2.style.display = "none"; // hide open eye icon
                togglePassword2.nextElementSibling.style.display = "inline-block"; // show closed eye icon
            } else {
                passwordField2.type = "password";
                togglePassword2.style.display = "inline-block"; // show open eye icon
                togglePassword2.nextElementSibling.style.display = "none"; // hide closed eye icon
            }
        });
    }

    // Form submission logic
    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting and page refreshing

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;
        const termsAccepted = document.getElementById("terms").checked;

        // Basic form validation (you can add more if needed)
        if (!termsAccepted) {
            alert("You must agree to the terms and conditions!");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Sending the data to the server (e.g., using fetch)
        fetch("https://your-api-endpoint.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Signup successful!");
                    window.location.href = "/dashboard"; // Redirect to the dashboard or another page
                } else {
                    alert("Signup failed: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("An error occurred while processing your request.");
            });
    });
});