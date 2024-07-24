
function updatePrices_gold() {
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    // };

    fetch("https://apigoldprice99.huasengheng.com/api/Values")
        .then(response => response.text())  // Get the response as text
        .then(result => {
            const jsonResult = JSON.parse(result); // Parse the text as JSON
            console.log(jsonResult)

            const dateupdate = jsonResult.TimeUpdate
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'Asia/Bangkok'
              };
              
              // Parse the Thai date-time string
              const thaiDate = new Date(Date.parse(dateupdate));
              
              // Format the date-time string
              const formatter = new Intl.DateTimeFormat('th-TH', options);
              const formattedDateTime = formatter.format(thaiDate);
              
            var dateupdated = document.getElementById('dateupdated')
            dateupdated.innerHTML = formattedDateTime + ' น.'

            const sellprice = jsonResult.Sell
            var sellprice_box = document.getElementById('Sellprices')
            sellprice_box.innerHTML = sellprice

            const buyprice = jsonResult.Buy
            var buyprice_box = document.getElementById('Buyprices')
            buyprice_box.innerHTML = buyprice
            
            // const price = jsonResult.price;  // Extract the price parameter
            // console.log('Price:', price);  // Log the price

            // // Update all elements with the class "price-box"
            // var priceBoxes = document.getElementsByClassName('');
            // for (var i = 0; i < priceBoxes.length; i++) {
            //     priceBoxes[i].innerHTML = price.toString();
            // }
        })
        .catch(error => console.log('error', error));
}
function updatePrices_oil(){
    fetch("https://api.chnwt.dev/thai-oil-api/latest")
        .then(response => response.text())  // Get the response as text
        .then(result => {
            const jsonResult = JSON.parse(result); // Parse the text as JSON
            const alloil = jsonResult.response.stations.ptt
            console.log(alloil)

            const gasoline95_price = alloil.gasoline_95.price
            const gasohol95_price = alloil.gasohol_95.price
            const gasohol91_price = alloil.gasohol_91.price
            const gasohole20_price = alloil.gasohol_e20.price
            const gasohole85_price = alloil.gasohol_e85.price
            const diesel_price = alloil.premium_diesel.price

            var gasoline95_price_box = document.getElementById('gasoline95_price_box')
            var gasohol95_price_box = document.getElementById('gasohol95_price_box')
            var gasohol91_price_box = document.getElementById('gasohol91_price_box')
            var gasohole20_price_box = document.getElementById('gasohole20_price_box')
            var gasohole85_price_box = document.getElementById('gasohole85_price_box')
            var diesel_price_box = document.getElementById('diesel_price_box')

            gasoline95_price_box.innerHTML = gasoline95_price
            gasohol95_price_box.innerHTML = gasohol95_price
            gasohol91_price_box.innerHTML = gasohol91_price
            gasohole20_price_box.innerHTML = gasohole20_price
            gasohole85_price_box.innerHTML = gasohole85_price
            diesel_price_box.innerHTML = diesel_price

        })
        .catch(error => console.log('error', error));
}

function updateLotteryNumber(){
    fetch("https://lotto.api.rayriffy.com/latest")
        .then(response => response.text())  // Get the response as text
        .then(result => {
            const jsonResult = JSON.parse(result); // Parse the text as JSON
            const allwin_prizes = jsonResult.response.prizes
            allwin_prizes.forEach(element => {
                if(element.id == 'prizeFirst'){
                    const firstprize_box = document.getElementById('firstprize_box')
                    firstprize_box.innerHTML = element.number
                }
            });

            const allwin_runningNumbers = jsonResult.response.runningNumbers
            allwin_runningNumbers.forEach(element => {
                if(element.id == 'runningNumberFrontThree'){
                    const frontthree_box_1 = document.getElementById('frontthree_box_1')
                    const frontthree_box_2 = document.getElementById('frontthree_box_2')
                    frontthree_box_1.innerHTML = element.number[0]
                    frontthree_box_2.innerHTML = element.number[1]
                }
                else if(element.id == 'runningNumberBackThree'){
                    const backthree_box_1 = document.getElementById('backthree_box_1')
                    const backthree_box_2 = document.getElementById('backthree_box_2')
                    backthree_box_1.innerHTML = element.number[0]
                    backthree_box_2.innerHTML = element.number[1]
                }
                else if(element.id == 'runningNumberBackTwo'){
                    const backtwo_box = document.getElementById('backtwo_box')
                    backtwo_box.innerHTML = element.number
                }
            })

        })
        .catch(error => console.log('error', error));
}
// Call the function to update prices

// async function GetScraping(){
//     console.log('transfer data!!')
//     var investor_group_data = await ScrapingInvestor();
//     var set_index_data = await ScrapingSetIndex();

//     //adjustment data
//     set_price = set_index_data.data_price
//     set_tickchg = set_index_data.tick_changed != null ? set_index_data.tick_changed : "-"
//     set_perchg = set_index_data.tick_percent_changed  != null ? set_index_data.tick_changed : "-"

//     //putting data
//     var setindex_price_box = document.getElementById('setindex_price_box')
//     var setindex_tickchg_box = document.getElementById('setindex_tickchg_box')
//     var setindex_percentchg_box = document.getElementById('setindex_percentchg_box')

//     setindex_price_box.innerHTML = set_price
//     setindex_tickchg_box.innerHTML = set_tickchg
//     setindex_percentchg_box.innerHTML = set_perchg

// }
// GetScraping();


updatePrices_gold();
updatePrices_oil();
updateLotteryNumber()
