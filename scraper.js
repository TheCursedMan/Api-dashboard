const puppeteer = require('puppeteer');

async function ScrapingInvestor() {
    try {
        console.log('Launching browser for ScrapingInvestor...');
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome-stable',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        console.log('Navigating to Investor Group page...');
        await page.goto('https://www.set.or.th/th/market/statistics/investor-type', { waitUntil: 'networkidle2', timeout: 0 });

        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('div.table-group table tbody tr'));
            return rows.map(row => {
                const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.textContent.trim());
                return {
                    investor: cells[0],
                    buy: cells[1],
                    buyPercentage: cells[2],
                    sell: cells[3],
                    sellPercentage: cells[4],
                    net: cells[5],
                    buyYTD: cells[6],
                    buyPercentageYTD: cells[7],
                    sellYTD: cells[8],
                    sellPercentageYTD: cells[9],
                    netYTD: cells[10]
                };
            });
        });

        await browser.close();
        console.log('ScrapingInvestor result:', data);
        return data;
    } catch (error) {
        console.error('Error in ScrapingInvestor:', error);
        throw error;
    }
}

async function ScrapingSetIndex() { 
    try {
        console.log('Launching browser for ScrapingSetIndex...');
        const browser = await puppeteer.launch({
            executablePath: '/usr/bin/google-chrome-stable',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        console.log('Navigating to SET Index page...');
        await page.goto('https://www.set.or.th/th/market/index/set/overview', { waitUntil: 'networkidle2', timeout: 0 });

        const data_price = await page.evaluate(() => {
            const element = document.querySelector('div.value.text-white.mb-0.me-2.lh-1.stock-info');
            return element ? element.textContent.trim().replace(/[\s,]+/g, '') : null;
        });

        const tick_changed = await page.evaluate(() => {
            const element = document.querySelector('h3.d-flex.mb-0.pb-2.theme-success span.me-1');
            return element ? element.textContent : null;
        });

        const tick_percent_changed = await page.evaluate(() => {
            const element = document.querySelector('h3.d-flex.mb-0.pb-2.theme-success span:nth-child(2)');
            return element ? element.textContent : null;
        });

        const result = {
            data_price,
            tick_changed,
            tick_percent_changed
        };

        await browser.close();
        console.log('ScrapingSetIndex result:', result);
        return result;
    } catch (error) {
        console.error('Error in ScrapingSetIndex:', error);
        throw error;
    }
}

// Example usage (uncomment to run)
// ScrapingInvestor();
// ScrapingSetIndex();

module.exports = { ScrapingSetIndex, ScrapingInvestor };
