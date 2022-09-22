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

$(document).ready(function() {
  $("select").material_select();
});

$(".button-collapse").sideNav();
