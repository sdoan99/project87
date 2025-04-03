# Money Printer - Business Logic Documentation

## Overview

Money Printer is a trading strategy platform that allows users to create, share, and track trading strategies across multiple markets. The application provides tools for tracking trade performance, visualizing market data, and analyzing strategy effectiveness.

## Core Entities

### Users
- **Authentication**: Email/password-based authentication using Supabase Auth
- **Profile Management**: Users can create and manage their profiles with social media links
- **Permissions**: Users can only modify their own strategies and trades

### Strategies
- **Creation**: Users can create trading strategies with metadata (name, description, markets, timeframes, categories)
- **Visibility**: Strategies can be public or private
- **Metrics**: Each strategy tracks performance metrics (win rate, profit factor, total P/L, etc.)

### Trades
- **Structure**: Trades are organized by strategy and contain multiple actions (buy/sell)
- **Lifecycle**: Trades can be Open, Won, Lost, or Even
- **Aggregation**: Individual trade actions are aggregated into summary records for display

## Data Flow

### Strategy Creation Flow
1. User navigates to `/create`
2. User fills out strategy form with name, description, markets, categories, and timeframes
3. On submission, data is stored in `strategy_profile` table
4. User is redirected to the performance page of newly created strategy after creation of strategy

### Trade Management Flow
1. User navigates to a strategy performance page (`/performance/:strategyName`)
2. User can add new trades via the "Add Trade" button
3. Trade data is submitted through the `NewTrade` component feature
4. On submission:
   - Individual trade actions are stored in `bet_data` table
   - The web application must generate one UUID and update/insert into public.bet_data.bet_id for all trades in a single NewTrade form submission
   - Aggregated trade data is calculated and stored in `bet_data_metrics`
   - TradeTable component refreshes to display the updated data from `bet_data_metrics`
   - Each individual trade or action has a unique id `gen_random_uuid()`created from database server
   - NOTE: Calculations are done in the database server side

### Trade Editing Flow
1. User clicks on a trade row in TradeTable
2. System fetches detailed trade data from `bet_data` table
3. NewTrade form is populated with existing trade data with same bet_id
4. User can add individual trade actions through NewTrade form with 'Add Action' button
5. User can edit individual trade actions through NewTrade form by changing populated data
6. User can delete individual trade actions through NewTrade form with 'x' button
7. On update:
   - Updated records are updated/inserted into `bet_data` table .
   - New data is appended if records are added through NewTrade form.
   - The web application must generate one UUID and update/insert into public.bet_data.bet_id for all trades in a single NewTrade form submission.
   - Same `bet_id` is preserved to maintain data relationships.
   - Each individual trade has a unique id `gen_random_uuid()`created from database server.

### Trade Deletion Flow
1. User selects a trade and clicks "Delete Trade"
2. System removes all records with matching `bet_id` from both tables
3. TradeTable refreshes to reflect the changes

## Database Schema Relationships

### User-Related Tables
- `user_profiles`: Core user information (username, email)
- `user_details`: Extended user information (social media, personal details)

### Strategy-Related Tables
- `strategy_profile`: Strategy metadata (name, description, categories)
- `strategy_metrics`: Performance metrics for strategies

### Trade-Related Tables
- `bet_data`: Raw trade action data (individual buys/sells)
- `bet_data_metrics`: Aggregated trade data for display

## Key Business Rules

### Data Integrity Rules
1. All trades within the same NewTrade form share the same `bet_id`
2. Trade calculations are performed on the server side to ensure consistency
3. TradeTable displays records from table `bet_data_metrics`
4. When updating trades, altered records are updated atomically
## Component Responsibilities

### TradeTable.tsx
- Lists all trades associated with the strategy
- Retrieves trade data from `bet_data_metrics`
- Sends selected stock symbols to Chart.tsx
- Triggers edit mode (NewTrade/EditTrade popup form) when user selects row
### NewTrade.tsx
- Handles creating, updating, and deleting trade data
- Processes multiple trade actions into aggregated records
- Manages data synchronization between `bet_data` and `bet_data_metrics`

