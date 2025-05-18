// General page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
    
    // Hamburger menu toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const primaryNav = document.getElementById('primary-nav');
    
    hamburgerBtn.addEventListener('click', function() {
        primaryNav.classList.toggle('open');
        hamburgerBtn.classList.toggle('open');
    });
    
    // Footer year and last modified
    document.getElementById('current-year').textContent = now.getFullYear();
    document.getElementById('last-modified').textContent = `Last Updated: ${document.lastModified}`;
});