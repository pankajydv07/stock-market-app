import React from 'react';

const StockTable = ({ data }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Price</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
            <th>Change %</th>
          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>₹{item.price}</td>
              <td>₹{item.open}</td>
              <td>₹{item.high}</td>
              <td>₹{item.low}</td>
              <td>{item.volume}</td>
              <td>{item.changePercent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;

