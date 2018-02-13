var originRequest = require('request')
var cheerio = require('cheerio')
var headers = {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
module.exports = {
	search: function(input, callback) {
		var url = 'https://www.google.com.tw/search?q=' + encodeURIComponent(input) + '&tbm=isch&tbs=qdr:y';
		request(url, function(err, res, body) {
			var $ = cheerio.load(body, {
				decodeEntities: false
			})
			var t = [];
			$('.rg_meta.notranslate').each(function() {
				t.push(JSON.parse($(this).text()));
			})
			for (var i = 0; i < t.length; i++) {
				if (getFileExtension(t[i]['ou']) == 'png' || getFileExtension(t[i]['ou']) == 'jpg' || getFileExtension(t[i]['ou']) == 'gif') callback(t[i]['ou'])
			}
		})
	}
};

function request(url, callback) {
	var options = {
		url: url,
		method: "GET",
		headers: headers
	}
	originRequest(options, callback)
}

function getFileExtension(filename) {
	return filename.split('.').pop();
}