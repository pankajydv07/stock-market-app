import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStockDetails } from '../redux/stockSlice';
import CandlestickChart from '../components/CandlestickChart';
import StockTable from '../components/StockTable';
import Loader from '../components/Loader';

const StockDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedStock, loading } = useSelector(state => ({
    selectedStock: state.stocks.selectedStock,
    loading: state.stocks.loading.details
  }));

  useEffect(() => {
    dispatch(fetchStockDetails(id));
    
    // Set up interval to refresh data every 2 minutes
    const interval = setInterval(() => {
      dispatch(fetchStockDetails(id));
    }, 120000);
    
    return () => clearInterval(interval);
  }, [dispatch, id]);

  return (
    <div className="container py-5">
      <div className="mb-4">
        <a href="/" className="btn btn-outline-primary mb-4">
          &larr; Back to Home
        </a>
      </div>
      
      {loading ? (
        <div className="text-center my-5">
          <Loader size="lg" text="Loading stock data..." />
        </div>
      ) : selectedStock ? (
        <>
          <div className="card mb-4 shadow">
            <div className="card-body">
              <h1 className="card-title">{selectedStock.name}</h1>
              <h3 className="text-primary">Current Price: ₹{selectedStock.currprice}</h3>
            </div>
          </div>
          
          <div className="card mb-4 shadow">
            <div className="card-body">
              <h4 className="card-title mb-4">Price Chart</h4>
              <CandlestickChart data={selectedStock.data} />
            </div>
          </div>
          
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title mb-4">Historical Data</h4>
              <StockTable data={selectedStock.data} />
            </div>
          </div>
        </>
      ) : (
        <div className="alert alert-warning">No data available for this stock.</div>
      )}
    </div>
  );
};

export default StockDetailPage;
