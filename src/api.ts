export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginResult {
  success: boolean;
  message?: string;
}

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<LoginResult> {
    // Симуляция API запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        // Проверка тестовых учетных данных
        const validCredentials = [
          { email: 'test@example.com', password: 'password123' },
          { email: 'demo@evilmartians.com', password: 'martians2025' }
        ];

        const isValid = validCredentials.some(
          cred => cred.email === credentials.email && cred.password === credentials.password
        );

        if (isValid) {
          resolve({
            success: true,
            message: 'Login successful'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }, 1000); // Симуляция задержки сети
    });
  }
}
