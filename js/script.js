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
    id: "litecoin",
    name: "Litecoin",
    symbol: "Litecoin",
    rank: 3,
    price_usd: 0,
    forRequest: "LTC"
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
    id: "bitcoin-gold",
    name: "Bitcoin Gold",
    symbol: "BitcoinGold",
    rank: 4,
    price_usd: 0,
    forRequest: "BTG"
  },
  {
    id: "ethereum-classic",
    name: "Ethereum Classic",
    symbol: "EthereumClassic",
    rank: 6,
    price_usd: 0,
    forRequest: "ETC"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "Ethereum",
    rank: 6,
    price_usd: 0,
    forRequest: "ETH"
  },
  {
    id: "monero",
    name: "Monero",
    symbol: "Monero",
    rank: 6,
    price_usd: 0,
    forRequest: "XMR"
  },
  {
    id: "dash",
    name: "Dash",
    symbol: "Dash",
    rank: 6,
    price_usd: 0,
    forRequest: "DASH"
  },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    symbol: "BitcoinCash",
    rank: 2,
    price_usd: 0,
    forRequest: "BCH"
  }
];

getACourseInArrCrypCurrencies(arrCrypCurrencies);

function getACourseInArrCrypCurrencies(arr) {
  const nowUnixTime = Date.now();
  const oneDayInMs = 86400000;
  const startDate = moment(nowUnixTime - oneDayInMs).format("YYYY-MM-DDTHH:MM");
  const endDate = moment(nowUnixTime).format("YYYY-MM-DDTHH:MM");

  const arrWithRequest = [];
  arr.map((el, indx) => {
    const reqLink = `https://production.api.coindesk.com/v2/price/values/${el.forRequest}?start_date=${startDate}&end_date=${endDate}&ohlc=false`;

    fetch(reqLink)
      .then(res => res.json())
      .then(res => {
        return {
          ...el,
          price_usd:
            res.data.entries[45][1].toFixed(2) ||
            res.data.entries[50][1].toFixed(2) ||
            res.data.entries[10][1].toFixed(2) ||
            res.data.entries[1][1].toFixed(2)
        };
      })
      .then(data => {
        arrWithRequest[indx] = data;
        createCard(data);
        return data;
      });
    // .then(data => {
    //   const nowUnixTime = Date.now();
    //   const oneDayInMs = 86400000;
    //   const startDate = moment(nowUnixTime - oneDayInMs).format(
    //     "YYYY-MM-DDTHH:MM"
    //   );
    //   const endDate = moment(nowUnixTime).format("YYYY-MM-DDTHH:MM");

    //   document
    //     .querySelector(`a[id=${data.symbol}]`)
    //     .addEventListener("click", () =>
    //       graphOnOpen(data.forRequest, startDate, endDate, "DD.MM|HH:mm")
    //     );
    // });
  });
}

function createCard(data) {
  let string = "";
  string += `<div class="card"> 
      <div class="card-image">
        <img src=img/svg/${data.id}.svg>
        <span class="card-title"> ${data.name} </span> 
        <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" id="${data.forRequest}" name="${data.name}">
        <i class="material-icons">add</i>
        </a> 
      </div>  
      
      <div class="card-content"> 
      <h5 class="card-sub-title">Change</h5>
        <p class="card-sub-title-second"> ${data.symbol}: ${data.price_usd} USD</p> 
      </div> 
  </div> `;
  box.insertAdjacentHTML("beforeend", string);
}

// function request(link) {
//   fetch(link)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       // console.log(data);
//       createCard(data);
//       return data;
//     })
//     .then(function(data2) {
//       btn.addEventListener("click", function() {
//         createCard(max(data2));
//       });
//       alph.addEventListener("click", function() {
//         createCard(sort(data2));
//       });
//       val.addEventListener("click", function() {
//         createCard(min(data2));
//       });
//       value.addEventListener("click", function() {
//         createCard(day(data2));
//       });
//       vall.addEventListener("click", function() {
//         createCard(hour(data2));
//       });
//       rank.addEventListener("click", function() {
//         createCard(rank1(data2));
//       });
//     });
// }

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
    console.log("trigger ", trigger);
    let grap = document.querySelector(".grap");
    grap.innerHTML = `<canvas id="myChart"></canvas>`;
    forRequest = trigger[0].id;
    console.log("forRequest ", forRequest);
    // graphOnOpen(id, "histohour", 24, "D.MM | HH:mm");

    const nowUnixTime = Date.now();
    const oneDayInMs = 86400000;
    const startDate = moment(nowUnixTime - oneDayInMs).format(
      "YYYY-MM-DDTHH:MM"
    );
    const endDate = moment(nowUnixTime).format("YYYY-MM-DDTHH:MM");

    graphOnOpen(forRequest, startDate, endDate, "DD.MM | HH:mm");

    let modHead = document.querySelector(".modal-title");
    modHead.textContent = trigger[0].name;
    // console.log(trigger[0].forRequest);
  },
  complete: function() {
    // alert('Closed');
  } // Callback for Modal close
});
