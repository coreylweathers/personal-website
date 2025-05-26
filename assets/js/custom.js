document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.header-title .logo, .header-title img');
    if (logo) {
        logo.setAttribute('title', 'Home');
        logo.style.cursor = 'pointer';
    }
}); 