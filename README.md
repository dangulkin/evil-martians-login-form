# Evil Martians Login Form - Frontend Developer Test Assignment

A polished login form implementation created as part of the application process for a Frontend Engineer position at Evil Martians.

## 🚀 Live Demo

[View Live Demo](https://dangulkin.github.io/evil-martians-login-form/)

## 🎯 Test Credentials

```
Email: test@example.com
Password: password123

Email: demo@evilmartians.com  
Password: martians2025
```

## 📋 Requirements

- **Node.js**: 20.12.0+ (required for Vite 7.x)
- **npm**: Latest version recommended

## 🚀 Quick Start

1. **Clone the repository**
   ```
   git clone https://github.com/your-username/evil-martians-login-form.git
   cd evil-martians-login-form
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start development server**
   ```
   npm run dev
   ```
   This will start Vite dev server with hot reload at `http://localhost:3000`

4. **Build for production**
   ```
   npm run build
   ```

5. **Preview production build**
   ```
   npm run preview
   ```

## 📋 Project Overview

This project demonstrates a complete login form implementation focusing on:
- **User Experience**: Intuitive design with real-time validation feedback
- **Accessibility**: WCAG compliant with screen reader support and keyboard navigation
- **Code Quality**: Modular architecture with clean, maintainable code
- **Performance**: Optimized loading and responsive design

## 🛠 Tech Stack

- **Frontend**: TypeScript, HTML5, CSS3
- **Build Tool**: Vite 7.x
- **Development**: Hot Module Replacement, TypeScript compilation
- **Architecture**: ES6 Modules with TypeScript interfaces
- **Styling**: Custom CSS with CSS Flexbox
- **Accessibility**: Native ARIA attributes and semantic HTML
- **Deployment**: GitHub Pages

## ✨ Features

### Core Functionality
- ✅ Email/password authentication with validation
- ✅ Real-time form validation with visual feedback
- ✅ Password visibility toggle
- ✅ "Remember me" functionality
- ✅ Loading states and error handling
- ✅ Mock API integration with network simulation

### User Experience
- ✅ Responsive design for all device sizes
- ✅ Smooth animations and transitions  
- ✅ Clear error messaging and success feedback
- ✅ Submit button disabled until form is valid
- ✅ Social login placeholders (Google, Facebook)

### Accessibility (WCAG 2.1 AA)
- ✅ Screen reader support with ARIA labels
- ✅ Keyboard navigation for all interactive elements
- ✅ High contrast mode support
- ✅ Focus management and visual indicators
- ✅ Semantic HTML structure

### Technical Excellence
- ✅ Modular ES6+ architecture
- ✅ No external UI libraries (vanilla JS/CSS)
- ✅ Progressive enhancement
- ✅ Browser password manager integration
- ✅ Comprehensive error handling

## 📁 Project Structure

```
evil-martians-login-form/
├── index.html # Main HTML structure (in root)
├── src/
│ ├── main.ts # Main login form component (TypeScript)
│ ├── constants.ts # Text constants and configuration
│ ├── validators.ts # Form validation utilities with interfaces
│ ├── api.ts # Mock authentication service with types
│ ├── styles.css # Complete styling and responsive design
│ └── images/ # Static assets
├── vite.config.js # Vite configuration
├── tsconfig.json # TypeScript configuration
├── package.json # Dependencies and scripts
└── README.md # This file
```

## 🏗 Architecture Decisions

### Modern TypeScript Stack
- **Vite Build Tool**: Fast development with HMR and optimized production builds
- **TypeScript**: Type safety and enhanced developer experience
- **ES6 Modules**: Clean import/export structure with path aliases
- **Interface-Driven**: Strongly typed data contracts

## 🔧 Customization

### Styling
Modify `styles.css` CSS custom properties:
```css
:root {
  --primary-color: #your-color;
  --error-color: #your-error-color;
  --success-color: #your-success-color;
}
```

### Text Content
Update `constants.ts` for different languages or messaging:
```javascript
export const MESSAGES = {
  EMAIL_REQUIRED: 'Your custom message',
  // ... other messages
};
```

### Validation Rules
Adjust validation in `validators.ts`:
```javascript
export const CONFIG = {
  PASSWORD_MIN_LENGTH: 12, // Increase requirement
  // ... other config
};
```

## 🔒 Security Considerations

- Password visibility toggle for UX (production would need additional security)
- CSRF token placeholder (would be implemented server-side)
- Input sanitization ready for backend integration
- Secure password transmission considerations documented

## 👨💻 About the Developer

This project was created by Denis Guliaikin as part of the application process for Evil Martians' Frontend Engineer position. 

## 📞 Contact

- **Email**: d.gulyaikin@gmail.com
- **GitHub**: [@dangulkin](https://github.com/dangulkin)
- **LinkedIn**: [dangulkin](https://linkedin.com/in/dangulkin)

*Built with ❤️ for Evil Martians Frontend Engineer application*
