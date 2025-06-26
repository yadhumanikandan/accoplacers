const form = document.getElementById('registrationForm');
const status = document.getElementById('formStatus');
const scriptURL = 'https://script.google.com/macros/s/AKfycbx8eOPMpojXFqyRvcrED0zfu9qqCLKhXFkJQw5dhu-oVFGYU4FWOX-XSaNfvGUL8PpZ/exec'; // Replace with your deployed Apps Script Web App URL

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Submitting...';

    const formData = new FormData(form);
    const file = formData.get('resume');
    const reader = new FileReader();

    reader.onload = async function () {
        const base64String = reader.result.split(',')[1];

        const payload = new URLSearchParams();
        payload.append('name', formData.get('name'));
        payload.append('email', formData.get('email'));
        payload.append('phone', formData.get('phone'));
        payload.append('nationality', formData.get('nationality'));
        payload.append('location', formData.get('location'));
        payload.append('qualification', formData.get('qualification'));
        payload.append('experience', formData.get('experience'));
        payload.append('role', formData.get('role'));
        payload.append('resumeBase64', base64String);
        payload.append('resumeName', file.name);
        payload.append('resumeType', file.type);

        try {
        const response = await fetch(scriptURL, {
            method: 'POST',
            body: payload,
        });

        const result = await response.json();
        if (result.status === 'success') {
            status.textContent = 'Form submitted successfully!';
            form.reset();
        } else {
            status.textContent = 'Error: ' + result.message;
        }
        } catch (error) {
        status.textContent = 'Submission failed: ' + error.message;
        }
    };

    reader.readAsDataURL(file);
});
