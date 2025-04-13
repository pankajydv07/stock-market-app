# Stock Market App

A full-stack application for tracking and visualizing real-time stock market data from Indian companies.

## Overview

This application provides a dashboard to monitor stock prices of major Indian companies. It features real-time price updates, historical data visualization with candlestick charts, and detailed stock information.

## Features

- **Real-time Stock Price Updates**: Prices refresh automatically every 2 minutes
- **Interactive Candlestick Charts**: Visualize historical price data
- **Responsive Design**: Works on desktop and mobile devices
- **Caching System**: Optimizes performance by reducing redundant requests
- **Detailed Stock Information**: View comprehensive data for individual stocks

## Tech Stack

### Frontend
- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Navigation
- **ApexCharts**: Interactive stock charts
- **Axios**: API requests
- **Bootstrap**: Styling and responsive design

### Backend
- **Node.js**: Runtime environment
- **Express**: Web server framework
- **Puppeteer**: Web scraping and automation
- **Cheerio**: HTML parsing
- **Caching System**: Using JavaScript Map for temporary storage

## Architecture

### Backend Architecture
- RESTful API design
- Web scraping with data caching mechanism
- Three main endpoints:
  - GET /api/stocks - List all available stocks
  - GET /api/stocks/:id/price - Get current price for a specific stock
  - GET /api/stocks/:id - Get detailed historical data for a specific stock

### Frontend Architecture
- React component-based structure
- Redux for centralized state management
- AsyncThunk for handling asynchronous operations
- Responsive UI with Bootstrap

## Project Structure

```
stock-market-app/
├── client/                # Frontend React application
│   ├── public/            # Public assets
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── pages/         # Application pages
│       └── redux/         # Redux state management
├── server/                # Backend Node.js application
│   ├── controllers/       # Request handlers
│   ├── routes/            # API route definitions
│   └── utils/             # Helper utilities
```

## Installation

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)

### Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/pankajydv07/stock-market-app.git
   cd stock-market-app
   ```

2. Install dependencies for both frontend and backend:
   ```
   npm run install-all
   ```

3. Start the development servers:
   ```
   npm start
   ```
   This will start both the backend server (on port 5000) and the frontend development server (on port 3000).

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Browse the list of available stocks on the homepage
3. Click on a stock card to view detailed information and historical charts
4. Data refreshes automatically every 2 minutes

## Key Components

### Frontend Components
- **StockCard**: Displays individual stock information on the homepage
- **CandlestickChart**: Renders interactive price charts
- **StockTable**: Displays historical price data in tabular format
- **StockDetailPage**: Comprehensive view of a single stock

### Backend Components
- **stockController**: Handles stock data requests and caching
- **scraper**: Extracts stock data from financial websites
- **stockRoutes**: Defines API endpoints

## Data Flow

1. User visits the homepage
2. Frontend makes API request to backend
3. Backend checks cache for requested data
4. If data is not cached or stale, backend scrapes new data
5. Data is returned to frontend and displayed to user
6. Frontend automatically refreshes data at regular intervals

## Future Enhancements

- Add user authentication and personalized watchlists
- Implement price alerts and notifications
- Add more technical indicators and analysis tools
- Expand to international markets
- Add portfolio tracking functionality

## License

MIT

## Author

Pankaj Yadav