/**
	* This file is built to do magic with javascript 
	* Requires jquery to work correctly
	*/
function getCryptsyPair(pair_string, callback) {
	var market = new Array();
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid="+ pair_string) + '%22&format=json', function (data) {
		for (var i in data['query'].results.json.return.markets) {
			json = data['query'].results.json.return.markets[i];
			market['last'] = json.lasttradeprice;
			market['sell'] = json.sellorders[0].price;
			market['buy'] = json.buyorders[0].price;
		}
	market = standardNumbers(market);
	market = callback(market);
	return market;
	});
}

function getCexPair(pair_string, callback) {
	var market = new Array();
	$.getJSON('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22' + encodeURIComponent("https://cex.io/api/ticker/"+ pair_string) + '%22&format=json', function (data) {
		json = data['query'].results.json;
		market['last'] = json.last;
		market['sell'] = json.ask;
		market['buy'] = json.bid;

		market = standardNumbers(market);
		market = callback(market);
		return market;
	});
}

function standardNumbers(items) {
	items['last'] = Number(items['last']).toFixed(8);
	items['sell'] = Number(items['sell']).toFixed(8);
	items['buy'] = Number(items['buy']).toFixed(8);
	return items;
}
