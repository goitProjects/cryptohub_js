let but = document.createElement("a");
let butHour = document.createElement("a");
let butDay = document.createElement("a");
let cloud = document.createElement("i");
let fragg = document.createDocumentFragment();
let informBlock = document.createElement("div");
//select directory
let container = document.querySelector(".container-grap");
//classes
but.classList.add("waves-effect", "waves-light", "btn", "cli");
butHour.classList.add("waves-effect", "waves-light", "btn", "cli");
butDay.classList.add("waves-effect", "waves-light", "btn", "cli");
cloud.classList.add("material-icons", "left");
//input text
but.textContent = "Last 24 hours";
// cloud.textContent = 'cloud';
butHour.textContent = "Last 1 week";
butDay.textContent = "Last 1 month";
//put in
container.append(informBlock);
informBlock.append(but);
informBlock.append(butHour);
informBlock.append(butDay);
but.append(cloud);
container.append(fragg);
// const currencyList = 'https://min-api.cryptocompare.com/data/histominute?fsym=BTC&tsym=USD&limit=60&aggregate=1';

let forRequest = "BTC";

// let ask2;
function graphUpdate(chart, forRequest, time, limit, formatTime) {
  graphResponse(forRequest, time, limit, formatTime).then(function(data) {
    console.log("data update", data);
    chart.data.labels = data.time;
    chart.data.datasets.forEach(dataset => {
      dataset.data = data.price;
    });
    chart.update();
  });
}

// console.log(
//   "moment.unix(unixDate).format(formatTime) ",
//   moment.unix(1585223099000).format("DD.MM|HH:mm")
// );

function graphResponse(forRequest, startDate, endDate, formatTime) {
  return fetch(
    `https://production.api.coindesk.com/v2/price/values/${forRequest}?start_date=${startDate}&end_date=${endDate}&ohlc=false`
  )
    .then(response => response.json())
    .then(res => res.data.entries)
    .then(function(data) {
      let timeArr = data.map(function(el) {
        return moment(el[0]).format(formatTime);
      });
      console.log("timeArr ", timeArr);
      let priceArr = data.map(function(el) {
        return el[1].toFixed(2);
      });
      console.log("priceArr ", priceArr);
      let chartData = {};
      chartData.time = timeArr;
      chartData.price = priceArr;
      console.dir(chartData);
      return chartData;
    });
}
// var c = document.getElementById('myChart');
// var canvas = c.getContext('2d');
function graphOnOpen(forRequest, startDate, endDate, formatTime) {
  graphResponse(forRequest, startDate, endDate, formatTime)
    .then(function(item) {
      var ctx = document.getElementById("myChart").getContext("2d");
      chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",
        // The data for our dataset
        data: {
          labels: item.time,
          datasets: [
            {
              label: "price USD",
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: item.price
            }
          ]
        },
        // Configuration options go here
        options: {}
      });
      return chart;
    })
    .then(function(chart) {
      const nowUnixTime = Date.now();
      const oneDayInMs = 86400000;
      const oneWeekInMs = oneDayInMs * 8;
      const oneMonthInMs = oneDayInMs * 31;
      const startDateDay = moment(nowUnixTime - oneDayInMs).format(
        "YYYY-MM-DDTHH:MM"
      );
      const startDateWeek = moment(nowUnixTime - oneWeekInMs).format(
        "YYYY-MM-DDTHH:MM"
      );
      const startDateMonth = moment(nowUnixTime - oneMonthInMs).format(
        "YYYY-MM-DDTHH:MM"
      );
      const endDate = moment(nowUnixTime).format("YYYY-MM-DDTHH:MM");

      but.addEventListener("click", function() {
        graphOnOpen(forRequest, startDateDay, endDate, "DD.MM | HH:mm");
      });
      butHour.addEventListener("click", function() {
        graphOnOpen(forRequest, startDateWeek, endDate, "lll");
      });
      butDay.addEventListener("click", function() {
        graphOnOpen(forRequest, startDateMonth, endDate, "lll");
      });
    });
}

// let nowUnixTime = Date.now();
// console.log("nowUnixTime ", nowUnixTime);
// let oneDayInMs = 86400000;
// let startDate = moment(nowUnixTime - oneDayInMs).format("YYYY-MM-DDTHH:MM");
// let endDate = moment(nowUnixTime).format("YYYY-MM-DDTHH:MM");

// graphOnOpen(forRequest, startDate, endDate, "YYYY-MM-DDTHH:MM");
