// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', () => {
        const targetInput = document.getElementById(icon.getAttribute('data-target'));
        const isPassword = targetInput.type === 'password';

        targetInput.type = isPassword ? 'text' : 'password';

        const eyeOpen = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" class="size-4" style="width: 24px; height: 24px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7S3.732 16.057 2.458 12z" />
      </svg>`;

        const eyeClosed = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000" class="size-4" style="width: 24px; height: 24px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>`;

        icon.innerHTML = isPassword ? eyeClosed : eyeOpen;
    });
});

// Form submission handling
document.getElementById('submit').addEventListener('click', async(event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const retypePassword = document.getElementById('retype-password').value.trim();
    const category = document.getElementById('category').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const termsAccepted = document.getElementById('terms-checkbox').checked;

    // Form validation
    if (!name || !email || !password || !retypePassword || !category || !phone) {
        showCustomAlert('Please fill in all required fields.');
        return;
    }

    if (password !== retypePassword) {
        showCustomAlert('Passwords do not match. Please retype your password.');
        return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        showCustomAlert('Invalid email format. Please enter a valid email.');
        return;
    }

    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
        showCustomAlert('Invalid phone number. Please enter a valid phone number.');
        return;
    }

    if (!termsAccepted) {
        showCustomAlert('Please accept the terms and conditions to proceed.');
        return;
    }

    // API submission
    const apiUrl = 'https://own-estate.onrender.com/api/auth/login'; // Corrected URL
    const formData = {
        name,
        email,
        password,
        category,
        phone,
    };

    try {
        const response = await fetch("https://own-estate.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                    // Include Authorization header if needed
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            // Handle success
            showCustomAlert(`Thank you, ${name}! Your data was submitted successfully.`, () => {
                document.querySelector('form').reset();
                window.location.href = 'nextpage.html';
            });
        } else if (response.status === 401) {
            showCustomAlert('Unauthorized: Please check your credentials.');
        } else {
            showCustomAlert('Submission failed. Please try again later.');
        }
    } catch (error) {
        showCustomAlert('An error occurred. Please check your network connection.');
    }
});

// Custom alert function with inline CSS styles
function showCustomAlert(message, callback) {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    document.body.appendChild(overlay);

    const alertBox = document.createElement('div');
    alertBox.style.position = 'fixed';
    alertBox.style.top = '50%';
    alertBox.style.left = '50%';
    alertBox.style.transform = 'translate(-50%, -50%)';
    alertBox.style.backgroundColor = '#fff';
    alertBox.style.padding = '20px';
    alertBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    alertBox.style.borderRadius = '8px';
    alertBox.style.textAlign = 'center';
    alertBox.style.zIndex = '1001';
    alertBox.innerHTML = `
    <p style="margin-bottom: 15px;">${message}</p>
    <button class="ok-button" style="
      padding: 8px 16px; 
      background-color: green; 
      color: white; 
      border: none; 
      border-radius: 5px; 
      cursor: pointer;">
      OK
    </button>
  `;
    document.body.appendChild(alertBox);

    alertBox.querySelector('.ok-button').addEventListener('click', () => {
        alertBox.remove();
        overlay.remove();
        if (callback) callback();
    });
}