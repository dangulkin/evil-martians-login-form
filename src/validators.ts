export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      message: 'Email is required'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true
  };
}

export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim() === '') {
    return {
      isValid: false,
      message: 'Password is required'
    };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: 'Password must be at least 6 characters long'
    };
  }

  return {
    isValid: true
  };
}

export function isFormValid(email: string, password: string): boolean {
  const emailResult = validateEmail(email);
  const passwordResult = validatePassword(password);
  
  return emailResult.isValid && passwordResult.isValid;
}
