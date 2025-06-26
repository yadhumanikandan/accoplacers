const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');
const contactScriptURL = 'https://script.google.com/macros/s/AKfycbwYAfwo7ojFHDWGvXC-Sx2_eVN2AX5SxWVLNhInTi-8QlpkuG9XI4cGvCuNALCxksau/exec'; // <-- Replace this

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactStatus.textContent = 'Sending...';

    const formData = new FormData(contactForm);
    const payload = new URLSearchParams();
    payload.append('name', formData.get('contact-name'));
    payload.append('email', formData.get('contact-email'));
    payload.append('phone', formData.get('contact-phone'));
    payload.append('message', formData.get('contact-message'));

    try {
        const response = await fetch(contactScriptURL, {
            method: 'POST',
            body: payload,
        });

        const result = await response.json();
        if (result.status === 'success') {
            contactStatus.textContent = 'Message sent successfully!';
            contactForm.reset();
        } else {
            contactStatus.textContent = 'Error: ' + result.message;
        }
    } catch (error) {
        contactStatus.textContent = 'Failed to send: ' + error.message;
    }
});
