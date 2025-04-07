# Project 87 - StratsPro

## Overview
StratsPro is a modern, data-driven trading strategy platform built with React and TypeScript. The application enables users to create, manage, and analyze trading strategies across multiple markets, providing comprehensive tools for performance tracking and strategy optimization.

## Technical Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript
- **Build System**: Vite 6.2.5
- **Styling**: Tailwind CSS 3.4.17 with PostCSS and Autoprefixer
- **State Management**: Zustand 4.5.2
- **Animation**: Framer Motion 11.18.2
- **Routing**: React Router DOM 6.22.3
- **UI Components**: Radix UI and Shadcn UI
- **Class Utilities**: Class Variance Authority 0.7.1

### Backend
- **Database**: Supabase 2.39.7
- **Authentication**: /auth-helpers-react 0.3.1
- **Data Processing**: Server-side calculations

## Architecture

### Core Components
1. **Strategy Management**
   - Strategy creation and editing
   - Public/private strategy visibility
   - Performance metrics tracking

2. **Trade Management**
   - Multi-action trade support
   - Atomic updates
   - Server-side calculations

3. **Data Visualization**
   - Interactive charts
   - Performance metrics display
   - Market data visualization

### File Structure
```
/trading-strategy-app
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Feature-level components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API integrations
│   ├── utils/              # Helper functions
│   ├── types/              # TypeScript definitions
│   └── context/            # React context providers
└── public/                 # Static assets
```

## Key Features

### User Management
- Email/password authentication
- Profile management
- Permission-based access control

### Strategy Features
- Multi-market support
- Category-based organization
- Timeframe-specific analysis
- Performance metrics tracking

### Trade Features
- Multi-action trade support
- Atomic updates
- Server-side calculations
- Real-time performance tracking

## Development Standards

### Code Quality
- TypeScript ES2020 for application code
- TypeScript ES2022 for Node.js
- ESLint 9.9.1 for code linting
- TypeScript 5.5.3 for type checking

### Performance
- Server-side calculations for data integrity
- Atomic updates for data consistency
- Optimized data fetching and caching

### Security
- Supabase authentication
- Role-based access control
- Protected API endpoints
