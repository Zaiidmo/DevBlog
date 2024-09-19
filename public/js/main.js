const mobileMenu = document.getElementById('mobile-menu-2');
const mobileMenuButton = document.getElementById('mobile-menu-button');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});