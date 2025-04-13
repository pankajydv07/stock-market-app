import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStockPrice } from '../redux/stockSlice';
import Loader from './Loader';

const StockCard = ({ company }) => {
  const dispatch = useDispatch();
  const price = useSelector(state => state.stocks.prices[company.id]);
  const loading = useSelector(state => state.stocks.loading.prices[company.id]);

  useEffect(() => {
    // Fetch price when component mounts
    dispatch(fetchStockPrice(company.id));
    
    // Set up interval to refresh price every 2 minutes
    const interval = setInterval(() => {
      dispatch(fetchStockPrice(company.id));
    }, 120000);
    
    return () => clearInterval(interval);
  }, [dispatch, company.id]);

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{company.name}</h5>
          <div className="my-3" style={{ height: '60px' }}>
            {loading ? (
              <Loader text="Fetching latest price..." />
            ) : (
              price && (
                <h3 className="text-center text-primary">Price : ₹{price}</h3>
              )
            )}
          </div>
          <Link to={`/stock/${company.id}`} className="btn btn-primary w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StockCard;
