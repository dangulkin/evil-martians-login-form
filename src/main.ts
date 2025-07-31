import { MESSAGES, CONFIG, SELECTORS } from './constants';
import { validateEmail, validatePassword, isFormValid } from './validators';
import { AuthService } from './api';

// Types
interface ValidationResult {
  isValid: boolean;
  message?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginResult {
  success: boolean;
  message?: string;
}

/**
 * Login form component
 * Handles user authentication with validation and accessibility features
 */
class LoginForm {
  private form!: HTMLFormElement;
  private emailInput!: HTMLInputElement;
  private passwordInput!: HTMLInputElement;
  private passwordToggle!: HTMLButtonElement;
  private submitBtn!: HTMLButtonElement;
  private rememberCheckbox!: HTMLInputElement;
  private generalErrorEl!: HTMLElement | null;
  private successMessageEl!: HTMLElement | null;
  private announcer!: HTMLElement | null;

  constructor() {
    this.initializeElements();
    this.init();
  }

  // Initialize DOM element references
  private initializeElements(): void {
    this.form = document.querySelector(SELECTORS.FORM) as HTMLFormElement;
    this.emailInput = document.querySelector(SELECTORS.EMAIL_INPUT) as HTMLInputElement;
    this.passwordInput = document.querySelector(SELECTORS.PASSWORD_INPUT) as HTMLInputElement;
    this.passwordToggle = document.querySelector(SELECTORS.PASSWORD_TOGGLE) as HTMLButtonElement;
    this.submitBtn = document.querySelector(SELECTORS.SUBMIT_BTN) as HTMLButtonElement;
    this.rememberCheckbox = document.querySelector(SELECTORS.REMEMBER_CHECKBOX) as HTMLInputElement;
    this.generalErrorEl = document.querySelector(SELECTORS.GENERAL_ERROR);
    this.successMessageEl = document.querySelector(SELECTORS.SUCCESS_MESSAGE);
    this.announcer = document.querySelector(SELECTORS.ANNOUNCER);
  }

  // Initialize the form component
  private init(): void {
    this.bindEvents();
    this.setupAccessibility();
    this.updateButtonState();
  }

  // Bind all event listeners
  private bindEvents(): void {
    // Form submission
    this.form.addEventListener('submit', this.handleSubmit.bind(this));

    // Password toggle
    this.passwordToggle.addEventListener('click', this.togglePassword.bind(this));

    // Real-time validation
    this.emailInput.addEventListener('blur', () => this.handleFieldValidation('email'));
    this.passwordInput.addEventListener('blur', () => this.handleFieldValidation('password'));
    this.emailInput.addEventListener('input', () => this.handleFieldInput('email'));
    this.passwordInput.addEventListener('input', () => this.handleFieldInput('password'));

    // External links
    this.bindExternalLinks();

    // Keyboard navigation
    this.setupKeyboardNavigation();
  }

  // Bind external link events
  private bindExternalLinks(): void {
    document.querySelectorAll(SELECTORS.SOCIAL_BTNS).forEach(btn => {
      btn.addEventListener('click', this.handleSocialLogin.bind(this));
    });

    const forgotLink = document.querySelector(SELECTORS.FORGOT_LINK);
    forgotLink?.addEventListener('click', this.handleForgotPassword.bind(this));

    const signupLink = document.querySelector(SELECTORS.SIGNUP_LINK);
    signupLink?.addEventListener('click', this.handleSignUp.bind(this));
  }

  private handleFieldValidation(field: 'email' | 'password'): void {
    this.validateField(field);
    this.updateButtonState();
  }

  private handleFieldInput(field: 'email' | 'password'): void {
    this.clearError(field);
    this.updateButtonState();
  }

  // Setup accessibility features
  private setupAccessibility(): void {
    // Password toggle keyboard support
    this.passwordToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.togglePassword();
      }
    });
  }

  // Setup keyboard navigation for custom elements
  private setupKeyboardNavigation(): void {
    // Remember checkbox
    this.rememberCheckbox.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        this.rememberCheckbox.checked = !this.rememberCheckbox.checked;
      }
    });

    // Interactive elements
    document.querySelectorAll<HTMLElement>(`${SELECTORS.SOCIAL_BTNS}, ${SELECTORS.FORGOT_LINK}, ${SELECTORS.SIGNUP_LINK}`)
      .forEach(element => {
        element.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            element.click();
          }
        });
      });

  }

  // Update submit button state based on form validity
  private updateButtonState(): void {
    const email = this.emailInput.value.trim();
    const password = this.passwordInput.value;

    const formValid = isFormValid(email, password);

    this.submitBtn.disabled = !formValid;
    this.submitBtn.classList.toggle('disabled', !formValid);
    this.submitBtn.setAttribute('aria-label',
      formValid ? MESSAGES.BUTTON_READY : MESSAGES.BUTTON_INCOMPLETE
    );
  }

  // Handle form submission
  private async handleSubmit(e: Event): Promise<void> {
    e.preventDefault();

    this.clearAllErrors();

    // Validate all fields
    const emailValid = this.validateField('email');
    const passwordValid = this.validateField('password');

    if (!emailValid || !passwordValid) {
      this.announceError(MESSAGES.FORM_ERRORS);
      return;
    }

    await this.processLogin();
  }

  // Process login request
  private async processLogin(): Promise<void> {
    this.setLoadingState(true);
    this.announceStatus(MESSAGES.SIGNING_IN);

    try {
      const credentials: LoginCredentials = {
        email: this.emailInput.value.trim(),
        password: this.passwordInput.value,
        remember: this.rememberCheckbox.checked
      };

      const result: LoginResult = await AuthService.login(credentials);

      if (result.success) {
        this.handleLoginSuccess();
      } else {
        this.handleLoginError(result.message);
      }

    } catch (error) {
      this.handleLoginError(this.getErrorMessage(error as Error));
    } finally {
      this.setLoadingState(false);
    }
  }

  // Handle successful login
  private handleLoginSuccess(): void {
    this.showSuccess(MESSAGES.SUCCESS_MESSAGE);
    this.announceStatus(MESSAGES.LOGIN_SUCCESSFUL);

    setTimeout(() => {
      alert(MESSAGES.LOGIN_SUCCESS_DEMO);
    }, CONFIG.REDIRECT_DELAY);
  }

  // Handle login error
  private handleLoginError(message?: string): void {
    const errorMessage = message || MESSAGES.INVALID_CREDENTIALS;
    this.showGeneralError(errorMessage);
    this.announceError(`Login failed: ${errorMessage}`);
  }

  // Get appropriate error message based on error type
  private getErrorMessage(error: Error): string {
    if (error.message.includes('Invalid email or password')) {
      return MESSAGES.INVALID_CREDENTIALS;
    } else if (error.message.includes('network') || error.message.includes('fetch')) {
      return MESSAGES.NETWORK_ERROR;
    }
    return MESSAGES.UNEXPECTED_ERROR;
  }

  // Validate a specific field
  private validateField(field: 'email' | 'password'): boolean {
    const input = this[`${field}Input`] as HTMLInputElement;
    const value = input.value;
    const validator = field === 'email' ? validateEmail : validatePassword;
    const result: ValidationResult = validator(value);

    if (!result.isValid && result.message) {
      this.showError(field, result.message);
      return false;
    }

    return true;
  }

  // Show field-specific error
  private showError(field: string, message: string): void {
    const input = document.getElementById(field) as HTMLInputElement | null;
    const errorElement = document.getElementById(`${field}-error`) as HTMLElement | null;

    if (input && errorElement) {
      input.classList.add('error');
      input.setAttribute('aria-invalid', 'true');
      errorElement.textContent = `⚠ ${message}`;
      errorElement.style.display = 'flex';
    }
  }

  // Show general error message
  private showGeneralError(message: string): void {
    if (this.generalErrorEl) {
      this.generalErrorEl.textContent = `⚠ ${message}`;
      this.generalErrorEl.style.display = 'block';

      setTimeout(() => this.hideGeneralError(), CONFIG.ERROR_AUTO_HIDE_TIMEOUT);
    }
  }

  /**
   * Hide general error message
   */
  private hideGeneralError(): void {
    if (this.generalErrorEl) {
      this.generalErrorEl.style.display = 'none';
      this.generalErrorEl.textContent = '';
    }
  }

  // Show success message
  private showSuccess(message: string): void {
    if (this.successMessageEl) {
      this.successMessageEl.textContent = `✓ ${message}`;
      this.successMessageEl.style.display = 'block';
    }
  }

  // Hide success message
  private hideSuccess(): void {
    if (this.successMessageEl) {
      this.successMessageEl.style.display = 'none';
      this.successMessageEl.textContent = '';
    }
  }

  // Clear field-specific error
  private clearError(field: string): void {
    const input = document.getElementById(field) as HTMLInputElement | null;
    const errorElement = document.getElementById(`${field}-error`) as HTMLElement | null;

    if (input && errorElement) {
      input.classList.remove('error');
      input.setAttribute('aria-invalid', 'false');
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  }

  // Clear all error and success messages
  private clearAllErrors(): void {
    (['email', 'password'] as const).forEach(field => this.clearError(field));
    this.hideGeneralError();
    this.hideSuccess();
  }

  // Set form loading state
  private setLoadingState(isLoading: boolean): void {
    this.submitBtn.disabled = isLoading;
    this.submitBtn.classList.toggle('loading', isLoading);

    // Disable form inputs during loading
    this.form.querySelectorAll('input, button').forEach(input => {
      const element = input as HTMLInputElement | HTMLButtonElement;
      if (element !== this.submitBtn) {
        element.disabled = isLoading;
      }
    });

    if (!isLoading) {
      this.updateButtonState();
    }
  }

  // Toggle password visibility
  private togglePassword(): void {
    const isPassword = this.passwordInput.type === 'password';
    const eyeOpen = this.passwordToggle.querySelector(SELECTORS.EYE_OPEN) as HTMLElement;
    const eyeClosed = this.passwordToggle.querySelector(SELECTORS.EYE_CLOSED) as HTMLElement;

    this.passwordInput.type = isPassword ? 'text' : 'password';

    // Toggle icon visibility
    eyeClosed.style.display = isPassword ? 'none' : 'block';
    eyeOpen.style.display = isPassword ? 'block' : 'none';

    this.passwordToggle.setAttribute('aria-label',
      isPassword ? MESSAGES.HIDE_PASSWORD : MESSAGES.SHOW_PASSWORD
    );

    this.announceStatus(isPassword ? MESSAGES.PASSWORD_VISIBLE : MESSAGES.PASSWORD_HIDDEN);
  }

  // Handle social login click
  private handleSocialLogin(e: Event): void {
    e.preventDefault();
    const target = e.currentTarget as HTMLElement;
    const provider = target.textContent?.trim() || '';
    const message = MESSAGES.SOCIAL_LOGIN.replace(/{provider}/g, provider);
    alert(message);
  }

  // Handle forgot password click
  private handleForgotPassword(e: Event): void {
    e.preventDefault();
    alert(MESSAGES.FORGOT_PASSWORD);
  }

  // Handle sign up click
  private handleSignUp(e: Event): void {
    e.preventDefault();
    alert(MESSAGES.SIGN_UP);
  }

  // Announce status to screen readers
  private announceStatus(message: string): void {
    const statusElement = document.querySelector(SELECTORS.SUBMIT_STATUS) as HTMLElement | null;
    if (statusElement) {
      statusElement.textContent = message;
    }
  }

  // Announce error to screen readers
  private announceError(message: string): void {
    if (this.announcer) {
      this.announcer.textContent = message;
    }
  }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new LoginForm();
  console.log('Evil Martians Login Form initialized successfully!');
  console.log('Test credentials: test@example.com / password123 or demo@evilmartians.com / martians2025');
});
