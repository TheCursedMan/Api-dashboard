const puppeteer = require('puppeteer');

async function ScrapingInvestor() {
    try {
        console.log('Launching browser for ScrapingInvestor...');
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        console.log('Navigating to Investor Group page...');
        await page.goto('https://www.set.or.th/th/market/statistics/investor-type', { waitUntil: 'networkidle2', timeout: 0 });

        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('div.table-group table tbody tr'));
            if (rows.length === 0) {
                throw new Error('No rows found in the table');
            }
            const result = rows.map(row => {
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
            return result;
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
        const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
        console.log('Navigating to SET Index page...');
        await page.goto('https://www.set.or.th/th/market/index/set/overview', { waitUntil: 'networkidle2', timeout: 0 });

        const data_price = await page.evaluate(() => {
            const element = document.querySelector('div.value.text-white.mb-0.me-2.lh-1.stock-info');
            if (!element) {
                throw new Error('data_price element not found');
            }
            return element.textContent.trim().replace(/[\s,]+/g, '');
        });

        const tick_changed = await page.evaluate(() => {
            const element = document.querySelector('h3.d-flex.mb-0.pb-2.theme-success span.me-1');
            if (!element) {
                throw new Error('tick_changed element not found');
            }
            return element.textContent;
        });

        const tick_percent_changed = await page.evaluate(() => {
            const element = document.querySelector('h3.d-flex.mb-0.pb-2.theme-success span:nth-child(2)');
            if (!element) {
                throw new Error('tick_percent_changed element not found');
            }
            return element.textContent;
        });

        const result = {
            data_price: data_price,
            tick_changed: tick_changed,
            tick_percent_changed: tick_percent_changed
        };

        await browser.close();
        console.log('ScrapingSetIndex result:', result);
        return result;
    } catch (error) {
        console.error('Error in ScrapingSetIndex:', error);
        throw error;
    }
}

module.exports = { ScrapingSetIndex, ScrapingInvestor };
