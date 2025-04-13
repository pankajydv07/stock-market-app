import React from 'react';
import Chart from 'react-apexcharts';

const CandlestickChart = ({ data }) => {
  // Format data for ApexCharts
  const seriesData = data.map(item => ({
    x: new Date(item.date).getTime(),
    y: [item.open, item.high, item.low, item.price] 
  }));

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      }
    },
    title: {
      text: 'Stock Price Movement',
      align: 'left'
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    }
  };

  const series = [{
    name: 'Stock Price',
    data: seriesData
  }];

  return (
    <div className="candlestick-chart">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={350}
      />
    </div>
  );
};

export default CandlestickChart;

