# Account Management System

A modern, responsive React application for user account management with secure authentication features.

## Usage

1. **Register**: Create a new account by providing username, email, and password
2. **Login**: Access your account using registered email and password
3. **View Account**: See your account details
4. **Edit Account**: Update your account information
5. **Logout**: Securely end your session

## Features

- **User Registration**: Create new accounts with username, email, and secure password
- **User Authentication**: Secure login system with password validation
- **Account Management**: View and edit account details
- **Password Security**: Strong password requirements including:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Local Storage**: Secure data persistence using browser's local storage

## Tech Stack

- **React**: Frontend library for building user interfaces
- **React Router**: For navigation and routing
- **Reactstrap**: Bootstrap-based UI components
- **Feather Icons**: Beautiful, consistent icons
- **Local Storage API**: For data persistence

## Project Structure

```
src/
├── components/
│   ├── AccountPage.jsx      # User account dashboard
│   ├── EditAccountPage.jsx  # Account editing interface
│   ├── LoginPage.jsx        # User login interface
│   └── RegistrationPage.jsx # New user registration
├── utils/
│   └── localStorageUtils.js # Local storage management
└── style.css               # Custom styles
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Security Features

- Password strength validation
- Secure password storage
- Session management
- Protected routes
- Input validation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.