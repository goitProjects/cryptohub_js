let img = "https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png";
let arrowUp = '<i class="tiny material-icons up">arrow_upward</i>';
let arrowDown = '<i class="tiny material-icons down">arrow_downward</i>';
let arrow1h = "";
let arrow24h = "";
let arrow7d = "";

// const currencyList = "https://api.coinmarketcap.com/v1/ticker/?limit=30";
let box = document.querySelector(".box");
// let btcicon = "http://bitcoin-4k.com/wp-content/uploads/2017/06/btc.png"; // не работает
const btn = document.querySelector("#btn-sort-max");
const alph = document.querySelector("#btn-sort-alph");
const val = document.querySelector("#btn-sort-min");
const value = document.querySelector("#btn-sort-day");
const vall = document.querySelector("#btn-sort-hour");
const rank = document.querySelector("#btn-sort-rank");

let arrCrypCurrencies = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "Bitcoin",
    rank: 1,
    price_usd: 0,
    forRequest: "BTC"
  },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    symbol: "Bitcoin Cash",
    rank: 2,
    price_usd: 0,
    forRequest: "BCH"
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "Litecoin",
    rank: 3,
    price_usd: 0,
    forRequest: "LTC"
  },
  {
    id: "tron",
    name: "TRON",
    symbol: "TRON",
    rank: 4,
    price_usd: 0,
    forRequest: "TRX"
  },
  {
    id: "zcash",
    name: "Zcash",
    symbol: "Zcash",
    rank: 5,
    price_usd: 0,
    forRequest: "ZEC"
  },
  {
    id: "ethereum-classic",
    name: "Ethereum Classic",
    symbol: "Ethereum Classic",
    rank: 6,
    price_usd: 0,
    forRequest: "ETC"
  }
];

getACourseInArrCrypCurrencies(arrCrypCurrencies);

async function getACourseInArrCrypCurrencies(arr) {
  const nowUnixTime = Date.now();
  console.log("nowUnixTime ", nowUnixTime);
  const oneDayInMs = 86400000;
  const startDate = moment(nowUnixTime - oneDayInMs).format("YYYY-MM-DDTHH:MM");
  console.log("startDate ", startDate);
  const endDate = moment(nowUnixTime).format("YYYY-MM-DDTHH:MM");
  console.log("endDate ", endDate);

  const arrWithRequest = await arr.map(async el => {
    const reqLink = `https://production.api.coindesk.com/v2/price/values/${el.forRequest}?start_date=${startDate}&end_date=${endDate}&ohlc=false`;
    await fetch(reqLink)
      .then(res => res.json())
      .then(res => {
        console.log(res.data);
        console.log(res.data.entries[45][1].toFixed(2));
        return { ...el, price_usd: res.data.entries[45][1].toFixed(2) };
      });
  });
  console.log("arrWithRequest ", arrWithRequest);
  // createCard(arrWithRequest);
}

// console.log(
//   'moment(Date.now()).format("YYYY-MM-DDTHH-MM") ',
//   moment(Date.now()).format("YYYY-MM-DDTHH-MM")
// );

// console.log(moment.unix(1585094519).format("YYYY-MM-DDTHH-MM"));

function createCard(data) {
  let string = "";
  for (let i = 0; i < data.length; i++) {
    string += `<div class="card"> 
      <div class="card-image">
        <img src=img/svg/${data[i].id}.svg>
        <span class="card-title"> ${data[i].name} </span> 
        <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" id="${data[i].symbol}">
        <i class="material-icons">add</i>
        </a> 
      </div>  
      
      <div class="card-content"> 
        <p>rank: ${data[i].rank}</p> 
        <p> ${data[i].symbol}: ${data[i].price_usd} USD</p> 
      </div> 
  </div> `;
  }
  box.innerHTML = string;
}

function request(link) {
  fetch(link)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      // console.log(data);
      createCard(data);
      return data;
    });
  // .then(function(data2) {
  //   btn.addEventListener("click", function() {
  //     createCard(max(data2));
  //   });
  //   alph.addEventListener("click", function() {
  //     createCard(sort(data2));
  //   });
  //   val.addEventListener("click", function() {
  //     createCard(min(data2));
  //   });
  //   value.addEventListener("click", function() {
  //     createCard(day(data2));
  //   });
  //   vall.addEventListener("click", function() {
  //     createCard(hour(data2));
  //   });
  //   rank.addEventListener("click", function() {
  //     createCard(rank1(data2));
  //   });
  // });
}
// request(currencyList);

$(".modal").modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: 0.5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: "4%", // Starting top style attribute
  endingTop: "10%", // Ending top style attribute
  ready: function(modal, trigger) {
    // Callback for Modal open. Modal and trigger parameters available.
    // alert("Ready");
    // console.log(modal, trigger);
    let grap = document.querySelector(".grap");
    grap.innerHTML = `<canvas id="myChart"></canvas>`;
    id = trigger[0].id;
    graphOnOpen(id, "histohour", 24, "D.MM | HH:mm");
    let modHead = document.querySelector(".modal-title");
    modHead.textContent = id;
    console.log(trigger[0].id);
  },
  complete: function() {
    // alert('Closed');
  } // Callback for Modal close
});
