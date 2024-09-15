// JavaScript to toggle the modal
const openContactFormButton = document.getElementById('openContactForm');
const closeContactFormButton = document.getElementById('closeContactForm');
const contactFormModal = document.getElementById('contactFormModal');
// console.log( openContactFormButton);
// console.log( closeContactFormButton);
// console.log( contactFormModal);
if (openContactFormButton) {

    openContactFormButton.addEventListener('click', () => {
        contactFormModal.classList.remove('hidden');
    });
}

if (closeContactFormButton) {
 
    closeContactFormButton.addEventListener('click', () => {
        contactFormModal.classList.add('hidden');
    });
}
document.getElementById('addSocialMedia').addEventListener('click', function() {
    const socialMediaList = document.getElementById('socialMediaList');
    const platforms = ['LinkedIn', 'GitHub', 'Twitter', 'YouTube', 'Portfolio'];
    
    const newItem = document.createElement('li');
    newItem.classList.add('flex', 'items-center', 'gap-2');
    
    const platformSelect = document.createElement('select');
    platformSelect.name = 'socialMedia[platform]';
    platformSelect.classList.add('w-1/3', 'p-2', 'border', 'rounded-md');
    platforms.forEach(platform => {
        const option = document.createElement('option');
        option.value = platform.toLowerCase();
        option.textContent = platform;
        platformSelect.appendChild(option);
    });
    
    const linkInput = document.createElement('input');
    linkInput.type = 'text';
    linkInput.name = 'socialMedia[link]';
    linkInput.placeholder = 'Enter link';
    linkInput.classList.add('w-2/3', 'p-2', 'border', 'rounded-md');
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '✘';
    removeBtn.classList.add('remove-btn', 'text-red-500');
    removeBtn.addEventListener('click', function() {
        socialMediaList.removeChild(newItem);
    });
    
    newItem.appendChild(platformSelect);
    newItem.appendChild(linkInput);
    newItem.appendChild(removeBtn);
    socialMediaList.appendChild(newItem);
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-btn')) {
        e.target.parentElement.remove();
    }
});