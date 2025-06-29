# 🏦 Loan Management Dashboard

A comprehensive loan management system with role-based access control, built with Next.js, TypeScript, and Tailwind CSS. This application demonstrates enterprise-level authentication flows and permission-based UI rendering for financial services.

## 🚀 Live Demo

**[View Live Application](https://main.d2xllg7npfc9nl.amplifyapp.com/)**

## 📋 Table of Contents

- [Features](#features)
- [Demo Accounts](#demo-accounts)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication System](#authentication-system)
- [Role-Based Access Control](#role-based-access-control)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 🔐 Authentication & Authorization

- **Mock Authentication System** with persistent sessions
- **Role-Based Access Control (RBAC)** with Admin and Broker roles
- **Session Management** with localStorage persistence
- **Secure Logout** functionality
- **Form Validation** with real-time error handling

### 📊 Dashboard Functionality

- **3-Column Responsive Layout** (Pipeline, Details, Broker Overview)
- **Interactive Borrower Pipeline** with tabbed navigation
- **AI-Powered Risk Assessment** with expandable explanations
- **Loan Management Actions** (Request Documents, Send to Valuer, Approve)
- **Real-time Status Updates** with loading states
- **Comprehensive Loan Summary** with risk signals

### 🎨 User Experience

- **Responsive Design** - Mobile-first approach
- **Accessibility Compliant** - WCAG guidelines followed
- **Loading States** - Smooth user interactions
- **Error Handling** - Comprehensive error management
- **Clean UI** - Professional financial services design

## 🔑 Demo Accounts

| Role       | Username        | Password      | Access Level                       |
| ---------- | --------------- | ------------- | ---------------------------------- |
| **Admin**  | \`admin\`       | \`admin123\`  | Full access to all features        |
| **Broker** | \`broker\`      | \`broker123\` | Limited access, no approval rights |
| **Admin**  | \`admin.user\`  | \`password\`  | Full access to all features        |
| **Broker** | \`broker.user\` | \`password\`  | Limited access, no approval rights |

### Role Permissions

#### 👑 Admin Users Can:

- ✅ Send loans to valuers
- ✅ Approve loans
- ✅ Escalate to credit committee
- ✅ Access admin panel
- ✅ View all broker information
- ✅ Manage system settings

#### 👤 Broker Users Can:

- ✅ Request documents
- ✅ View borrower pipeline
- ✅ Access personal overview
- ✅ Contact support
- ❌ Cannot approve loans
- ❌ Cannot escalate to committee

## 🛠 Technology Stack

### Frontend Framework

- **React 18** - Modern functional components with hooks
- **Next.js 14** - App Router with server-side rendering
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **ShadCN UI** - High-quality component library
- **Lucide React** - Beautiful icon library
- **Responsive Design** - Mobile-first approach

### State Management

- **Zustand** - Lightweight state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### Testing

- **Jest** - Unit testing framework
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd loan-dashboard
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Quick Start Guide

1. **Login** using one of the demo accounts above
2. **Explore the Pipeline** - Click on different borrowers in the left panel
3. **Test Role Permissions** - Try logging in as both Admin and Broker
4. **Interact with Features** - Click buttons to see mock API responses
5. **Test Responsive Design** - Resize your browser window

## 📁 Project Structure

\`\`\`
loan-dashboard/
├── app/
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Main dashboard page
├── components/
│ ├── ui/ # ShadCN UI components
│ ├── admin-panel.tsx # Admin-only features
│ ├── auth-wrapper.tsx # Authentication wrapper
│ ├── borrower-detail.tsx # Borrower information panel
│ ├── borrower-pipeline.tsx # Left sidebar pipeline
│ ├── broker-overview.tsx # Right sidebar broker info
│ ├── layout.tsx # Dashboard layout
│ ├── login-form.tsx # Authentication form
│ └── role-guard.tsx # RBAC component
├── lib/
│ ├── api.ts # Mock API service
│ ├── auth.ts # Authentication service
│ ├── store.ts # Zustand state management
│ └── utils.ts # Utility functions
├── **tests**/
│ ├── auth.test.tsx # Authentication tests
│ ├── auth-e2e.test.tsx # End-to-end tests
│ └── dashboard.test.tsx # Dashboard component tests
└── README.md
\`\`\`

## 🔐 Authentication System

### Mock Authentication Flow

1. **Login Process**

   - User enters credentials
   - System validates against mock user database
   - JWT-like session stored in localStorage
   - User redirected to dashboard

2. **Session Management**

   - Automatic session restoration on page reload
   - Persistent login state across browser sessions
   - Secure logout with session cleanup

3. **Security Features**
   - Password visibility toggle
   - Form validation and error handling
   - Brute force protection simulation
   - Session timeout (configurable)

### Authentication API

\`\`\`typescript
// Login
const response = await authService.login({
username: 'admin',
password: 'admin123'
});

// Logout
await authService.logout();

// Get current user
const user = authService.getCurrentUser();

// Role checking
const isAdmin = authService.isAdmin(user);
const isBroker = authService.isBroker(user);
\`\`\`

## 🛡 Role-Based Access Control

### RoleGuard Component

Protect components and features based on user roles:

\`\`\`tsx
// Admin only content
<RoleGuard adminOnly>
<AdminPanel />
</RoleGuard>

// Broker only content
<RoleGuard brokerOnly>
<BrokerTools />
</RoleGuard>

// Specific role requirement
<RoleGuard requiredRole="Admin">
<SensitiveData />
</RoleGuard>

// Custom fallback
<RoleGuard adminOnly fallback={<AccessDenied />}>
<ProtectedContent />
</RoleGuard>
\`\`\`

### Permission Matrix

| Feature               | Admin | Broker |
| --------------------- | ----- | ------ |
| View Pipeline         | ✅    | ✅     |
| Request Documents     | ✅    | ✅     |
| Send to Valuer        | ✅    | ❌     |
| Approve Loans         | ✅    | ❌     |
| Escalate to Committee | ✅    | ❌     |
| Admin Panel           | ✅    | ❌     |
| User Management       | ✅    | ❌     |

## 📡 API Documentation

### Mock API Endpoints

All API calls are mocked with realistic delays and responses:

\`\`\`typescript
// Borrower Management
GET /api/borrowers/pipeline // Get borrower pipeline
GET /api/borrowers/{id} // Get borrower details
POST /api/borrowers/{id}/approve // Approve loan
POST /api/borrowers/{id}/escalate // Escalate to committee

// Document Management
POST /api/borrowers/{id}/request-documents // Request documents
POST /api/borrowers/{id}/send-valuer // Send to valuer

// Broker Information
GET /api/broker/{id} // Get broker info
GET /api/onboarding/workflow // Get workflow steps
\`\`\`

### Response Examples

\`\`\`json
// Borrower Detail Response
{
"id": "1",
"name": "Sarah Dunn",
"email": "sarah.dunn@example.com",
"phone": "(355)123-4557",
"loan_amount": 300000,
"status": "In Review",
"employment": "At Tech Company",
"credit_score": 720,
"ai_flags": [
"Income Inconsistent with Bank statements",
"High Debt-to-Income Ratio detected"
]
}
\`\`\`

## 🧪 Testing

### Running Tests

\`\`\`bash

# Run all tests

npm test

# Run tests in watch mode

npm run test:watch

# Run tests with coverage

npm run test:coverage

# Run E2E tests

npm run test:e2e
\`\`\`

### Test Coverage

- **Unit Tests** - Authentication service, role guards, form validation
- **Integration Tests** - Component interactions, state management
- **E2E Tests** - Complete user workflows, role-based access
- **Accessibility Tests** - WCAG compliance, keyboard navigation

### Test Examples

\`\`\`typescript
// Authentication test
it('should authenticate valid admin credentials', async () => {
const result = await authService.login({
username: 'admin',
password: 'admin123'
});

expect(result.success).toBe(true);
expect(result.user?.role).toBe('Admin');
});

// Role guard test
it('should hide admin features from broker users', () => {
useAppStore.getState().setUser(brokerUser);

render(
<RoleGuard adminOnly>
<AdminPanel />
</RoleGuard>
);

expect(screen.queryByText('Admin Panel')).not.toBeInTheDocument();
});
\`\`\`

## 🚀 Deployment

### Build for Production

\`\`\`bash

# Create production build

npm run build

# Start production server

npm start
\`\`\`

### Environment Variables

\`\`\`env

# Optional environment variables

NEXT_PUBLIC_APP_NAME=DemoApp
NEXT_PUBLIC_API_URL=https://api.example.com
\`\`\`

### Deployment Platforms

- **Vercel** - Recommended for Next.js applications
- **Netlify** - Static site deployment
- **AWS Amplify** - Full-stack deployment (current deployment)
- **Docker** - Containerized deployment

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch** (\`git checkout -b feature/amazing-feature\`)
3. **Make your changes** following the coding standards
4. **Add tests** for new functionality
5. **Run the test suite** (\`npm test\`)
6. **Commit your changes** (\`git commit -m 'Add amazing feature'\`)
7. **Push to the branch** (\`git push origin feature/amazing-feature\`)
8. **Open a Pull Request**

### Coding Standards

- **TypeScript** - Strict type checking enabled
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Conventional Commits** - Commit message format
- **Component Documentation** - JSDoc comments for complex components

### Adding New Features

1. **Authentication Features** - Update \`lib/auth.ts\`
2. **New Roles** - Modify \`lib/store.ts\` and role guards
3. **UI Components** - Follow ShadCN UI patterns
4. **API Endpoints** - Add to \`lib/api.ts\`
5. **Tests** - Include unit and integration tests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShadCN UI** - Beautiful component library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide** - Icon library
- **Zustand** - State management
- **Next.js Team** - Amazing React framework

## 📞 Support

For questions, issues, or contributions:

- **Live Demo**: [https://main.d2xllg7npfc9nl.amplifyapp.com/](https://main.d2xllg7npfc9nl.amplifyapp.com/)
- **Issues**: Create an issue in the repository
- **Discussions**: Use GitHub Discussions for questions

---
