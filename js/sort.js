// sidebar logic start
function hour(data) {
  return data.sort(function(a, b) {
    return b.percent_change_1h - a.percent_change_1h;
  });
}

function day(data) {
  return data.sort(function(a, b) {
    return b.percent_change_24h - a.percent_change_24h;
  });
}

function max(data) {
  return data.sort(function(a, b) {
    return a.price_usd - b.price_usd;
  });
}

function min(data) {
  return data.sort(function(a, b) {
    return b.price_usd - a.price_usd;
  });
}

function sort(data) {
  return data.sort(function(a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }
  });
}

function rank1(data) {
  return data.sort(function(a, b) {
    return a.rank - b.rank;
  });
}

$(document).ready(function() {
  $("select").material_select();
});

$(".button-collapse").sideNav();
// sidebar logic end
