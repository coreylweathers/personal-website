document.addEventListener('DOMContentLoaded', function() {
    const menuToggleButton = document.getElementById('menu-toggle');
    const body = document.body;
    const closeIcon = '✕'; // Or use an icon font/SVG
    const openIcon = '☰'; // Or use an icon font/SVG

    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', function() {
            body.classList.toggle('sidebar-open');

            // Change button icon based on state
            if (body.classList.contains('sidebar-open')) {
                menuToggleButton.textContent = closeIcon;
            } else {
                menuToggleButton.textContent = openIcon;
            }
        });
    }
}); 