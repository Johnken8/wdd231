// Responsive Navigation Menu
document.addEventListener('DOMContentLoaded', () => {
    // Get elements
    const menuButton = document.getElementById('menu-button');
    const navList = document.getElementById('navigation');

    // Toggle menu function
    const toggleMenu = () => {
        navList.classList.toggle('open');
    }

    // Event listeners
    menuButton.addEventListener('click', toggleMenu);

    // Close menu when clicking anywhere else
    document.addEventListener('click', (event) => {
        if (!menuButton.contains(event.target) && !navList.contains(event.target)) {
            navList.classList.remove('open');
        }
    });

    // Handle window resize to ensure proper display
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 760) {
            navList.classList.remove('open'); // Reset menu state on larger screens
        }
    });

    // Add active class to current page
    const currentPath = window.location.pathname;
    const navLinks = navList.querySelectorAll('a');
    
    navLinks.forEach(link => {
        // For home page
        if (currentPath === '/' || currentPath.endsWith('index.html')) {
            if (link.getAttribute('href') === '#') {
                link.classList.add('active');
            }
        } 
        // For other pages
        else if (link.getAttribute('href').includes(currentPath)) {
            link.classList.add('active');
        }
    });
});