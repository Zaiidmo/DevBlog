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



function addSkill() {
    const skill = document.getElementById('newSkill').value;
    if (skill) {
        const container = document.getElementById('skillsContainer');
        const newDiv = document.createElement('div');
        newDiv.className = 'mb-2';
        newDiv.innerHTML = `
            <input type="text" name="skills[]" value="${skill}"
                   class="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500">
        `;
        container.appendChild(newDiv);
        document.getElementById('newSkill').value = '';
    }
}






function handleAvatarUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const previewImage = document.getElementById('previewImage');
        const confirmPopup = document.getElementById('confirmPopup');
        const avatarFileInput = document.getElementById('avatarFileInput');

    
        previewImage.src = URL.createObjectURL(file);
        

        confirmPopup.classList.remove('hidden');
        
        // Set the file in the hidden file input of the form
        avatarFileInput.files = event.target.files;

        // Cancel button hides the popup and clears the input
        document.getElementById('cancelButton').onclick = () => {
            confirmPopup.classList.add('hidden');
            event.target.value = '';  
        };
    }
}


document.getElementById('addSocialMedia').addEventListener('click', function() {
    const socialMediaList = document.getElementById('socialMediaList');
    const platforms = ['LinkedIn', 'GitHub', 'Twitter', 'YouTube', 'Portfolio'];
    
    const newItem = document.createElement('li');
    newItem.classList.add('flex', 'items-center', 'gap-2');
    
    // Create the select dropdown for platform
    const platformSelect = document.createElement('select');
    platformSelect.classList.add('w-1/3', 'p-2', 'border', 'rounded-md');
    platforms.forEach(platform => {
        const option = document.createElement('option');
        option.value = platform.toLowerCase();
        option.textContent = platform;
        platformSelect.appendChild(option);
    });
    
    // Create the input for the link
    const linkInput = document.createElement('input');
    linkInput.type = 'text';
    linkInput.placeholder = 'Enter link';
    linkInput.classList.add('w-2/3', 'p-2', 'border', 'rounded-md');
    
    // Change the name dynamically when the platform is selected
    platformSelect.addEventListener('change', function() {
        linkInput.name = `socialMedia[${platformSelect.value}]`; // Change the name of the input based on selected platform
    });
    
    // Set initial name when the item is first added
    linkInput.name = `socialMedia[${platformSelect.value}]`;
    
    // Create the remove button
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


document.getElementById('avatarForm').addEventListener('submit', function (e) {
    const fileInput = document.getElementById('avatarFileInput');
    const file = fileInput.files[0];

    if (!file) {
        e.preventDefault();  // Prevent form submission
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please select an image file!',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay'
        });
        return;
    }

    // Check the file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(file.type)) {
        e.preventDefault();  // Prevent form submission
        Swal.fire({
            icon: 'error',
            title: 'Invalid file type',
            text: 'Please upload a valid image file (JPEG or PNG).',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Okay'
        });
    }
});