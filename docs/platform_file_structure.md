## FILE STRUCTURE FOR CURRENT APPLICATION

/trading-strategy-app
│
├── public/                 # Static assets and index.html
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── src/                    # Main source code directory
│   ├── components/         # Reusable React components
│   │   ├── common/         # Generic UI components (Button, Input, etc.)
│   │   ├── layout/         # Layout components (Sidebar, Header, Footer)
│   │   ├── strategy/       # Strategy-specific components
│   │   ├── dataviz/        # Data visualization components
│   │   └── tradingview/    # TradingView Widgets
│
│   ├── pages/              # Page-Feature-Level components
│   │   ├── Dashboard/
│   │   ├── StrategyBuilder/
│   │   ├── UserProfile/
│   │   ├── Authentication/
│   │   └── DataVisualization/
│
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useStrategy.ts
│   │   └── useFinancialData.ts
│
│   ├── services/           # API calls and external service integrations
│   │   ├── supabase.ts     # Supabase client configuration
│   │   ├── authService.ts
│   │   ├── strategyService.ts
│   │   └── financialDataService.ts
│
│   ├── utils/              # Utility functions and helpers
│   │   ├── calculations.ts     # Financial calculation helpers
│   │   ├── formatters.ts
│   │   └── validators.ts
│
│   ├── types/              # TypeScript type definitions
│   │   ├── strategy.ts
│   │   ├── user.ts
│   │   └── financialData.ts
│
│   ├── context/            # React context providers
│   │   ├── AuthContext.tsx
│   │   └── StrategyContext.tsx
│
│   ├── styles/             # Global styles and theme
│   │   ├── global.css
│   │   └── theme.ts
│
│   ├── routes/             # Routing configuration
│   │   └── index.tsx
│
│   ├── constants/          # Constant values and enums
│   │   ├── apiEndpoints.ts
│   │   └── strategyTypes.ts
│
│   └── App.tsx             # Main application component
│
├── tests/                  # Testing directory
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── scripts/                # Utility scripts
│   ├── deploy.sh
│   └── setup.js
│
├── config/                 # Configuration files
│   └── env.js
│
├── package.json
├── tsconfig.json
├── README.md
└── .env                    # Environment variables
