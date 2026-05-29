// Get current logged-in user and populate profile
function loadUserProfile() {
    let user = getCurrentUser();
    if (!user) {
        return;
    }

    // Update welcome message
    let welcomeHeading = document.querySelector('.profile-hero h2');
    if (welcomeHeading) {
        welcomeHeading.textContent = `Welcome, ${user.fullname}`;
    }

    // Populate Personal Information fields
    let inputs = document.querySelectorAll('.inventory-section table input');
    if (inputs.length >= 5) {
        inputs[0].value = user.fullname || '';
        inputs[1].value = user.email || '';
        inputs[2].value = user.phone || '';
        inputs[3].value = user.businessName || '';
        inputs[4].value = user.businessAddress || '';
    }

    // Load profile image
    loadProfileImage();
}

// Handle image upload
function setupImageUpload() {
    let uploadBtn = document.querySelectorAll('.profile-btns button')[1]; // Second button
    if (!uploadBtn) return;

    // Create hidden file input
    let fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    // Trigger file input on button click
    uploadBtn.addEventListener('click', function() {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function(e) {
        let file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            let reader = new FileReader();
            reader.onload = function(event) {
                let imageData = event.target.result;
                
                // Save to localStorage
                let username = localStorage.getItem('loggedInUser');
                let userDataString = localStorage.getItem(username);
                let userData = JSON.parse(userDataString);
                userData.profileImage = imageData;
                localStorage.setItem(username, JSON.stringify(userData));

                // Update display
                let profileImg = document.querySelector('.profile-image img');
                if (profileImg) {
                    profileImg.src = imageData;
                }

                // Show success message
                alert('✅ Profile image uploaded successfully!');
            };
            reader.readAsDataURL(file);
        } else {
            alert('❌ Please select a valid image file');
        }
        
        // Reset file input
        fileInput.value = '';
    });
}

// Load profile image from localStorage
function loadProfileImage() {
    let user = getCurrentUser();
    if (!user || !user.profileImage) return;

    let profileImg = document.querySelector('.profile-image img');
    if (profileImg) {
        profileImg.src = user.profileImage;
    }
}

// Handle profile updates
function setupProfileUpdate() {
    let inputs = document.querySelectorAll('.inventory-section table input');
    let editBtn = document.querySelectorAll('.profile-btns button')[0]; // First button
    
    if (!editBtn) return;

    editBtn.addEventListener('click', function() {
        // Check if already in edit mode
        if (editBtn.textContent.trim() === 'Save Changes') {
            saveProfileChanges(inputs);
            editBtn.textContent = 'Edit Profile';
            inputs.forEach(input => input.disabled = false);
        } else {
            // Enable editing
            editBtn.textContent = 'Save Changes';
            inputs.forEach(input => input.disabled = false);
            inputs[0].focus();
        }
    });
}

// Save profile changes
function saveProfileChanges(inputs) {
    if (inputs.length < 5) return;

    let username = localStorage.getItem('loggedInUser');
    let userDataString = localStorage.getItem(username);
    let userData = JSON.parse(userDataString);

    // Update user data
    userData.fullname = inputs[0].value || userData.fullname;
    userData.email = inputs[1].value || userData.email;
    userData.phone = inputs[2].value || userData.phone;
    userData.businessName = inputs[3].value || userData.businessName;
    userData.businessAddress = inputs[4].value || userData.businessAddress;

    // Save to localStorage
    localStorage.setItem(username, JSON.stringify(userData));

    // Update welcome message
    let welcomeHeading = document.querySelector('.profile-hero h2');
    if (welcomeHeading) {
        welcomeHeading.textContent = `Welcome, ${userData.fullname}`;
    }

    alert('✅ Profile updated successfully!');
}

// Initialize profile page on load
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    setupImageUpload();
    setupProfileUpdate();
});
