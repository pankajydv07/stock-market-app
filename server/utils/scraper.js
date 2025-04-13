const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

// Function to scrape stock data
exports.scrapeStockData = async (stockId) => {
  // Bright Data API configuration
  const options = {
    method: 'POST',
    headers: {
      Authorization: "Bearer acf92ffe9e662740061596a46a8b58f49b5d9f22e509b534f122f0705148d301",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zone: 'stockscrape',
      url: `https://in.investing.com/equities/${stockId}-historical-data`,
      format: 'raw',
      method: 'GET',
      country: 'IN'
    })
  };

  try {
    // Fetch data from Bright Data API
    const response = await fetch('https://api.brightdata.com/request', options);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    
    const htmlContent = await response.text();

    // Launch Puppeteer to handle dynamic content
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Load the HTML content into Puppeteer
    await page.setContent(htmlContent);
    
    // Wait for the table selector to ensure dynamic content is loaded
    try {
      await page.waitForSelector('.freeze-column-w-1', { timeout: 60000 });
    } catch (error) {
      console.error('Error: Table selector not found within the timeout period.');
      await browser.close();
      throw new Error('Failed to load stock data table');
    }

    // Extract the final page content after Puppeteer processes dynamic elements
    const finalContent = await page.content();
    const $ = cheerio.load(finalContent);
    
    // Extract company name and current price
    const companyName = $("h1.mb-2\\.5.inline.text-left.text-xl.font-bold.leading-7.text-\\[\\#232526\\]").text().trim();
    const currentPrice = $("div.text-5xl\\/9.font-bold.text-\\[\\#232526\\][data-test='instrument-price-last']").text().trim();
    
    // Parse table rows using Cheerio
    const rows = $('table tbody tr');
    const data = [];
    let validCount = 0;
    
    rows.each((index, row) => {
      if (validCount >= 21) return false; // Stop after 21 valid entries
      
      const cells = $(row).find('td');
      const date = $(cells.eq(0)).text().trim();
      const price = parseFloat($(cells.eq(1)).text().trim().replace(/,/g, ''));
      const open = parseFloat($(cells.eq(2)).text().trim().replace(/,/g, ''));
      const high = parseFloat($(cells.eq(3)).text().trim().replace(/,/g, ''));
      const low = parseFloat($(cells.eq(4)).text().trim().replace(/,/g, ''));
      const volume = $(cells.eq(5)).text().trim();
      const changePercent = $(cells.eq(6)).text().trim();
      
      // Skip if any numeric field is NaN (invalid data)
      if (isNaN(low) || isNaN(high) || isNaN(open) || isNaN(price)) return;
      
      data.push({
        date,
        price,
        open,
        high,
        low,
        volume,
        changePercent
      });
      
      validCount++;
    });
    
    // Prepare structured output
    const output = {
      name: companyName,
      currprice: currentPrice,
      data
    };
    
    await browser.close();
    return output;
  } catch (error) {
    console.error(`Error occurred while scraping ${stockId}: ${error.message}`);
    throw error;
  }
};

// Function to scrape only current price (for faster home page loading)
exports.scrapeCurrentPrice = async (stockId) => {
  const options = {
    method: 'POST',
    headers: {
      Authorization: "Bearer acf92ffe9e662740061596a46a8b58f49b5d9f22e509b534f122f0705148d301",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      zone: 'stockscrape',
      url: `https://in.investing.com/equities/${stockId}`,
      format: 'raw',
      method: 'GET',
      country: 'IN'
    })
  };

  try {
    const response = await fetch('https://api.brightdata.com/request', options);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    
    const htmlContent = await response.text();
    const $ = cheerio.load(htmlContent);
    
    const currentPrice = $("div.text-5xl\\/9.font-bold.text-\\[\\#232526\\][data-test='instrument-price-last']").text().trim();
    
    return { id: stockId, currentPrice };
  } catch (error) {
    console.error(`Error occurred while scraping current price for ${stockId}: ${error.message}`);
    throw error;
  }
};
