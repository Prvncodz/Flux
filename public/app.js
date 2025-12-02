/**
 * Main Application Module
 * Handles routing, navigation, and page initialization
 */

// Initialize app on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Setup navigation
    updateNavigation();
    
    // Setup initial page
    const hash = window.location.hash.slice(1) || 'home';
    navigateTo(hash);
    
    // Setup form handlers
    setupLoginForm();
    setupSignupForm();
    setupProfileForm();
    setupPasswordForm();
}

/**
 * Navigation Functions
 */

function navigateTo(page) {
    // Check if page requires authentication
    const protectedPages = ['dashboard', 'profile'];
    
    if (protectedPages.includes(page) && !isAuthenticated()) {
        page = 'login';
        showMessage('loginMessage', 'Please login to continue', 'error');
    }
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
        window.location.hash = page;
        
        // Update page-specific content
        if (page === 'dashboard') {
            updateDashboard();
        } else if (page === 'profile') {
            updateProfile();
        }
        
        // Update navigation
        updateNavigation();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

function updateNavigation() {
    const navLinks = document.getElementById('navLinks');
    
    if (isAuthenticated()) {
        // Show authenticated navigation
        navLinks.innerHTML = `
            <a href="#" class="nav-link" onclick="navigateTo('dashboard'); return false;">Dashboard</a>
            <a href="#" class="nav-link" onclick="navigateTo('profile'); return false;">Profile</a>
            <button class="btn btn-secondary" onclick="logout(); return false;">Logout</button>
        `;
    } else {
        // Show public navigation
        navLinks.innerHTML = `
            <a href="#" class="nav-link" onclick="navigateTo('home'); return false;">Home</a>
            <a href="#" class="nav-link" onclick="navigateTo('login'); return false;">Login</a>
            <button class="btn btn-primary" onclick="navigateTo('signup'); return false;">Sign Up</button>
        `;
    }
}

/**
 * Login Form Handler
 */

function setupLoginForm() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors('login');
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        let isValid = true;
        
        // Validate email
        if (!email) {
            showError('loginEmailError', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('loginEmailError', 'Invalid email format');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('loginPasswordError', 'Password is required');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Attempt login
        const result = login(email, password);
        
        if (result.success) {
            showMessage('loginMessage', result.message, 'success');
            setTimeout(() => {
                navigateTo('dashboard');
                form.reset();
            }, 1000);
        } else {
            showMessage('loginMessage', result.message, 'error');
        }
    });
}

/**
 * Signup Form Handler
 */

function setupSignupForm() {
    const form = document.getElementById('signupForm');
    const usernameInput = document.getElementById('signupUsername');
    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    
    if (!form) return;
    
    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const validation = validatePassword(password);
        
        // Update password strength indicator
        const strength = calculatePasswordStrength(password);
        const strengthBar = document.querySelector('.strength-bar');
        strengthBar.className = 'strength-bar ' + strength;
        
        // Update requirements checklist
        updateRequirement('req-length', validation.requirements.length);
        updateRequirement('req-uppercase', validation.requirements.uppercase);
        updateRequirement('req-lowercase', validation.requirements.lowercase);
        updateRequirement('req-number', validation.requirements.number);
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors('signup');
        
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        
        let isValid = true;
        
        // Validate username
        if (!username) {
            showError('signupUsernameError', 'Username is required');
            isValid = false;
        } else if (!validateUsername(username)) {
            showError('signupUsernameError', 'Username must be 3-20 alphanumeric characters');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError('signupEmailError', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('signupEmailError', 'Invalid email format');
            isValid = false;
        }
        
        // Validate password
        if (!password) {
            showError('signupPasswordError', 'Password is required');
            isValid = false;
        } else {
            const validation = validatePassword(password);
            if (!validation.isValid) {
                showError('signupPasswordError', 'Password does not meet requirements');
                isValid = false;
            }
        }
        
        // Validate confirm password
        if (!confirmPassword) {
            showError('signupConfirmPasswordError', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            showError('signupConfirmPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Attempt signup
        const result = signup(username, email, password);
        
        if (result.success) {
            showMessage('signupMessage', result.message, 'success');
            setTimeout(() => {
                navigateTo('dashboard');
                form.reset();
                // Reset password strength indicator
                document.querySelector('.strength-bar').className = 'strength-bar';
            }, 1000);
        } else {
            showMessage('signupMessage', result.message, 'error');
        }
    });
}

/**
 * Profile Form Handler
 */

function setupProfileForm() {
    const form = document.getElementById('profileForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors('profile');
        
        const username = document.getElementById('profileUsername').value.trim();
        const email = document.getElementById('profileEmail').value.trim();
        
        let isValid = true;
        
        // Validate username
        if (!username) {
            showError('profileUsernameError', 'Username is required');
            isValid = false;
        } else if (!validateUsername(username)) {
            showError('profileUsernameError', 'Username must be 3-20 alphanumeric characters');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError('profileEmailError', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('profileEmailError', 'Invalid email format');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Update profile
        const result = updateProfile(username, email);
        
        if (result.success) {
            showMessage('profileMessage', result.message, 'success');
            // Update dashboard username if visible
            const dashboardUsername = document.getElementById('dashboardUsername');
            if (dashboardUsername) {
                dashboardUsername.textContent = username;
            }
        } else {
            showMessage('profileMessage', result.message, 'error');
        }
    });
}

/**
 * Password Change Form Handler
 */

function setupPasswordForm() {
    const form = document.getElementById('passwordForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors('password');
        
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        let isValid = true;
        
        // Validate current password
        if (!currentPassword) {
            showError('currentPasswordError', 'Current password is required');
            isValid = false;
        }
        
        // Validate new password
        if (!newPassword) {
            showError('newPasswordError', 'New password is required');
            isValid = false;
        } else {
            const validation = validatePassword(newPassword);
            if (!validation.isValid) {
                showError('newPasswordError', 'Password does not meet requirements');
                isValid = false;
            }
        }
        
        // Validate confirm password
        if (!confirmNewPassword) {
            showError('confirmNewPasswordError', 'Please confirm your new password');
            isValid = false;
        } else if (newPassword !== confirmNewPassword) {
            showError('confirmNewPasswordError', 'Passwords do not match');
            isValid = false;
        }
        
        if (!isValid) return;
        
        // Change password
        const result = changePassword(currentPassword, newPassword);
        
        if (result.success) {
            showMessage('passwordMessage', result.message, 'success');
            form.reset();
        } else {
            showMessage('passwordMessage', result.message, 'error');
        }
    });
}

/**
 * Page Update Functions
 */

function updateDashboard() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('dashboardUsername').textContent = user.username;
    }
}

function updateProfile() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('profileUsername').value = user.username;
        document.getElementById('profileEmail').value = user.email;
    }
}

/**
 * Logout Function
 */

window.logout = function() {
    logout();
    navigateTo('home');
    updateNavigation();
}

/**
 * Utility Functions
 */

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        const input = element.previousElementSibling;
        if (input && input.classList.contains('form-input')) {
            input.classList.add('error');
        }
    }
}

function clearErrors(formType) {
    const errors = document.querySelectorAll(`#${formType}-page .form-error`);
    errors.forEach(error => {
        error.textContent = '';
    });
    
    const inputs = document.querySelectorAll(`#${formType}-page .form-input`);
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    const message = document.getElementById(`${formType}Message`);
    if (message) {
        message.className = 'form-message';
        message.textContent = '';
    }
}

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.className = `form-message ${type}`;
    }
}

function updateRequirement(elementId, isValid) {
    const element = document.getElementById(elementId);
    if (element) {
        if (isValid) {
            element.classList.add('valid');
        } else {
            element.classList.remove('valid');
        }
    }
}