let img = "https://bitflyer.blob.core.windows.net/pub/Images/bitcoin-logo.png";
let arrowUp = '<i class="tiny material-icons up">arrow_upward</i>';
let arrowDown = '<i class="tiny material-icons down">arrow_downward</i>';
let arrow1h = "";
let arrow24h = "";
let arrow7d = "";

let box = document.querySelector(".box");
const btn = document.querySelector("#btn-sort-max");
const val = document.querySelector("#btn-sort-min");

let arrCrypCurrencies = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "Bitcoin",
    rank: 1,
    price_usd: 0,
    forRequest: "BTC",
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "Litecoin",
    rank: 3,
    price_usd: 0,
    forRequest: "LTC",
  },
  {
    id: "zcash",
    name: "Zcash",
    symbol: "Zcash",
    rank: 5,
    price_usd: 0,
    forRequest: "ZEC",
  },
  {
    id: "bitcoin-gold",
    name: "Bitcoin Gold",
    symbol: "BitcoinGold",
    rank: 4,
    price_usd: 0,
    forRequest: "BTG",
  },
  {
    id: "ethereum-classic",
    name: "Ethereum Classic",
    symbol: "EthereumClassic",
    rank: 6,
    price_usd: 0,
    forRequest: "ETC",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "Ethereum",
    rank: 6,
    price_usd: 0,
    forRequest: "ETH",
  },
  {
    id: "monero",
    name: "Monero",
    symbol: "Monero",
    rank: 6,
    price_usd: 0,
    forRequest: "XMR",
  },
  {
    id: "dash",
    name: "Dash",
    symbol: "Dash",
    rank: 6,
    price_usd: 0,
    forRequest: "DASH",
  },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    symbol: "BitcoinCash",
    rank: 2,
    price_usd: 0,
    forRequest: "BCH",
  },
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
      .then((res) => res.json())
      .then((res) => {
        return {
          ...el,
          price_usd:
            res.data.entries[45][1].toFixed(2) ||
            res.data.entries[50][1].toFixed(2) ||
            res.data.entries[10][1].toFixed(2) ||
            res.data.entries[1][1].toFixed(2),
        };
      })
      .then((data) => {
        arrWithRequest[indx] = data;
        createCard(data);
        return data;
      })
      .then(() => {
        inputCurency.addEventListener("input", (e) => {
          handlerChangeSearchInput(e, arrWithRequest);
        });
      })
      .then(function () {
        btn.addEventListener("click", function () {
          createCardFromArr(max(arrWithRequest));
        });
        val.addEventListener("click", function () {
          createCardFromArr(min(arrWithRequest));
        });
      });
  });
}

function createCard(data) {
  let string = "";
  string += `<div class="card"> 
      <div class="card-image">
        <img src=./assets/img/svg/${data.id}.svg>
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

function createCardFromArr(arr) {
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string += `<div class="card"> 
      <div class="card-image">
        <img src=./assets/img/svg/${arr[i].id}.svg>
        <span class="card-title"> ${arr[i].name} </span> 
        <a class="btn-floating halfway-fab waves-effect waves-light red modal-trigger" href="#modal1" id="${arr[i].forRequest}" name="${arr[i].name}">
        <i class="material-icons">add</i>
        </a> 
      </div>  
      
      <div class="card-content"> 
      <h5 class="card-sub-title">Change</h5>
        <p class="card-sub-title-second"> ${arr[i].symbol}: ${arr[i].price_usd} USD</p> 
      </div> 
  </div> `;
  }
  box.innerHTML = string;
}

$(".modal").modal({
  dismissible: true, // Modal can be dismissed by clicking outside of the modal
  opacity: 0.5, // Opacity of modal background
  inDuration: 300, // Transition in duration
  outDuration: 200, // Transition out duration
  startingTop: "4%", // Starting top style attribute
  endingTop: "10%", // Ending top style attribute
  ready: function (modal, trigger) {
    // Callback for Modal open. Modal and trigger parameters available.
    // alert("Ready");
    let grap = document.querySelector(".grap");
    grap.innerHTML = `<canvas id="myChart"></canvas>`;
    forRequest = trigger[0].id;
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
  },
  complete: function () {
    // alert('Closed');
  }, // Callback for Modal close
});
