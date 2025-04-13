const { scrapeStockData, scrapeCurrentPrice } = require('../utils/scraper');

// List of companies
const companies = [
  { id: 'bajaj-finance', name: 'Bajaj Finance' },
  { id: 'reliance-industries', name: 'Reliance Industries' },
  { id: 'infosys', name: 'Infosys' },
  { id: 'tata-consultancy-services', name: 'Tata Consultancy Services (TCS)' },
  { id: 'hdfc-bank-ltd', name: 'HDFC Bank' },
  { id: 'icici-bank-ltd', name: 'ICICI Bank' },
  { id: 'larsen---toubro', name: 'Laurson & Toubro (L&T)' },
  { id: 'state-bank-of-india', name: 'State Bank of India(SBI)' },
  { id: 'hindustan-unilever', name: 'Hindustan Unilever' },
  { id: 'bharti-airtel', name: 'Bharti Airtel' }
];

// Cache for storing scraped data
const priceCache = new Map();

// Get all companies with current prices
exports.getAllStocks = async (req, res) => {
  try {
    // Return basic company info immediately
    res.json(companies);
    
    // Start background scraping for each company
    companies.forEach(async (company) => {
      try {
        const priceData = await scrapeCurrentPrice(company.id);
        priceCache.set(company.id, {
          price: priceData.currentPrice,
          timestamp: Date.now()
        });
      } catch (error) {
        console.error(`Failed to scrape price for ${company.id}: ${error.message}`);
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get current price for a specific company
exports.getStockPrice = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Check if we have a recent cache (less than 2 minutes old)
    const cached = priceCache.get(id);
    if (cached && Date.now() - cached.timestamp < 120000) {
      return res.json({ id, price: cached.price });
    }
    
    // If no recent cache, scrape new data
    const priceData = await scrapeCurrentPrice(id);
    
    // Update cache
    priceCache.set(id, {
      price: priceData.currentPrice,
      timestamp: Date.now()
    });
    
    res.json({ id, price: priceData.currentPrice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get detailed historical data for a specific company
exports.getStockDetails = async (req, res) => {
  const { id } = req.params;
  
  try {
    const stockData = await scrapeStockData(id);
    res.json(stockData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
