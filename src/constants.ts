/**
 * Text messages for the login form
 * All user-facing text content is centralized here for easy localization
 */
export const MESSAGES = {
    // Field validation errors
    EMAIL_REQUIRED: 'Email is required',
    EMAIL_INVALID: 'Please enter a valid email address',
    PASSWORD_REQUIRED: 'Password is required',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
    
    // General errors
    INVALID_CREDENTIALS: 'Invalid email or password. Please check your credentials and try again.',
    NETWORK_ERROR: 'Network error. Please try again later.',
    UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
    
    // Status messages
    SIGNING_IN: 'Signing in, please wait',
    LOGIN_SUCCESSFUL: 'Login successful, redirecting',
    SUCCESS_MESSAGE: 'Successfully signed in! Redirecting...',
    
    // Accessibility messages
    FORM_ERRORS: 'Please fix the errors before submitting',
    PASSWORD_VISIBLE: 'Password is now visible',
    PASSWORD_HIDDEN: 'Password is now hidden',
    SHOW_PASSWORD: 'Show password',
    HIDE_PASSWORD: 'Hide password',
    BUTTON_INCOMPLETE: 'Sign in button - form is incomplete',
    BUTTON_READY: 'Sign in',
    
    // Mock API responses
    MOCK_CREDENTIALS_ERROR: 'Invalid email or password. Try test@example.com / password123 or demo@evilmartians.com / martians2025',
    
    // Demo alerts
    SOCIAL_LOGIN: 'Social login with {provider} clicked. In a real app, this would redirect to {provider} OAuth.',
    FORGOT_PASSWORD: 'Forgot password clicked. In a real app, this would open a password reset form.',
    SIGN_UP: 'Sign up clicked. In a real app, this would navigate to the registration page.',
    LOGIN_SUCCESS_DEMO: 'Login successful! In a real app, you would be redirected to the dashboard.'
  };
  
  /**
   * Configuration constants
   */
  export const CONFIG = {
    PASSWORD_MIN_LENGTH: 8,
    ERROR_AUTO_HIDE_TIMEOUT: 10000,
    REDIRECT_DELAY: 1500,
    NETWORK_DELAY: 2000,
    EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };
  
  /**
   * CSS selectors used throughout the application
   */
  export const SELECTORS = {
    FORM: '#loginForm',
    EMAIL_INPUT: '#email',
    PASSWORD_INPUT: '#password',
    PASSWORD_TOGGLE: '.password-toggle',
    SUBMIT_BTN: '.submit-btn',
    REMEMBER_CHECKBOX: '#remember',
    GENERAL_ERROR: '#general-error',
    SUCCESS_MESSAGE: '#success-message',
    ANNOUNCER: '#aria-announcer',
    SOCIAL_BTNS: '.social-btn',
    FORGOT_LINK: '.forgot-link',
    SIGNUP_LINK: '.signup-link a',
    EYE_OPEN: '.eye-open',
    EYE_CLOSED: '.eye-closed',
    SUBMIT_STATUS: '#submit-status'
  };
  