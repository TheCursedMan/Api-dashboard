const express = require('express');
const path = require('path');
const { ScrapingSetIndex , ScrapingInvestor } = require('./scraper');

const app = express();
const port = process.env.PORT || 5500 ;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/data', async (req, res) => {
    try {
        console.log('Starting to scrape data...');
        const setIndexData = await ScrapingSetIndex();
        const investorGroup = await ScrapingInvestor();
        console.log('Scraping completed successfully.');

        res.json({
            setIndexData: setIndexData,
            investorGroup: investorGroup
        });
    } catch (error) {
        console.error('Failed to scrape data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
