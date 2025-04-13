import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import HomePage from './pages/HomePage';
import StockDetailPage from './pages/StockDetailPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stock/:id" element={<StockDetailPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
