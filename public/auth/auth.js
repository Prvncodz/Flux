/**
 * Authentication and Validation Module
 * Handles user authentication, form validation, and session management
 */

// In-memory user database (simulating backend)
const users = [
    {
        username: 'demouser',
        email: 'demo@example.com',
        password: 'Demo123!'
    }
];

// Session management (in-memory only, no localStorage)
let currentSession = {
    isAuthenticated: false,
    user: null
};

/**
 * Validation Functions
 */

// Email validation
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Password validation (8+ chars, uppercase, lowercase, number)
function validatePassword(password) {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    return {
        isValid: minLength && hasUppercase && hasLowercase && hasNumber,
        requirements: {
            length: minLength,
            uppercase: hasUppercase,
            lowercase: hasLowercase,
            number: hasNumber
        }
    };
}

// Username validation (3-20 chars, alphanumeric)
function validateUsername(username) {
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
}

/**
 * Authentication Functions
 */

// Login user
function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentSession = {
            isAuthenticated: true,
            user: {
                username: user.username,
                email: user.email
            }
        };
        return { success: true, message: 'Login successful!' };
    }
    
    return { success: false, message: 'Invalid email or password' };
}

// Register new user
function signup(username, email, password) {
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Username already taken' };
    }
    
    // Create new user
    const newUser = { username, email, password };
    users.push(newUser);
    
    // Auto-login after signup
    currentSession = {
        isAuthenticated: true,
        user: {
            username: newUser.username,
            email: newUser.email
        }
    };
    
    return { success: true, message: 'Account created successfully!' };
}

// Logout user
function logout() {
    currentSession = {
        isAuthenticated: false,
        user: null
    };
}

// Check if user is authenticated
function isAuthenticated() {
    return currentSession.isAuthenticated;
}

// Get current user
function getCurrentUser() {
    return currentSession.user;
}

// Update user profile
function updateProfile(username, email) {
    if (!currentSession.isAuthenticated) {
        return { success: false, message: 'Not authenticated' };
    }
    
    // Check if email is taken by another user
    const existingUser = users.find(u => u.email === email && u.email !== currentSession.user.email);
    if (existingUser) {
        return { success: false, message: 'Email already in use' };
    }
    
    // Check if username is taken by another user
    const existingUsername = users.find(u => u.username === username && u.username !== currentSession.user.username);
    if (existingUsername) {
        return { success: false, message: 'Username already taken' };
    }
    
    // Update user in database
    const userIndex = users.findIndex(u => u.email === currentSession.user.email);
    if (userIndex !== -1) {
        users[userIndex].username = username;
        users[userIndex].email = email;
        
        // Update session
        currentSession.user = {
            username: username,
            email: email
        };
        
        return { success: true, message: 'Profile updated successfully!' };
    }
    
    return { success: false, message: 'User not found' };
}

// Change password
function changePassword(currentPassword, newPassword) {
    if (!currentSession.isAuthenticated) {
        return { success: false, message: 'Not authenticated' };
    }
    
    // Verify current password
    const user = users.find(u => u.email === currentSession.user.email);
    if (!user || user.password !== currentPassword) {
        return { success: false, message: 'Current password is incorrect' };
    }
    
    // Update password
    user.password = newPassword;
    
    return { success: true, message: 'Password changed successfully!' };
}