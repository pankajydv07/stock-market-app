import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStocks } from '../redux/stockSlice';
import StockCard from '../components/StockCard';
import Loader from '../components/Loader';

const HomePage = () => {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector(state => ({
    companies: state.stocks.companies,
    loading: state.stocks.loading.companies
  }));

  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Stock Market Dashboard</h1>
      
      {loading ? (
        <div className="text-center my-5">
          <Loader size="lg" text="Loading companies..." />
        </div>
      ) : (
        <div className="row">
          {companies.map(company => (
            <StockCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
