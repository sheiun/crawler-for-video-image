var originRequest = require('request');
var cheerio = require('cheerio');
var headers = {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
module.exports = {
	search: function(input, callback) {
		var url = 'https://www.xvideos.com/?k=' + encodeURIComponent(input);
		request(url, function(err, res, body) {
			var $ = cheerio.load(body, {
				decodeEntities: false
			});
			var urlArr = $('.thumb > a').toArray();
			for (var i = 0; i < urlArr.length; i++) {
				var newurl = 'https://www.xvideos.com' + urlArr[i].attribs.href;
				request(newurl, function(err, res, body) {
					var $ = cheerio.load(body, {
						decodeEntities: false
					});
					$('script').each(function() {
						var html = $(this).html().toString();
						if (html.indexOf('/mp4/') >= 0) {
							var videoLink = getVideoLink(html);
							callback(videoLink);
						}
					});
				});
			}
		});

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

function getVideoLink(html) {
	var e1 = 'html5player.setVideoUrlHigh(';
	var e2 = 'html5player.setVideoHLS(';
	var e3 = '\');';
	html = html.substr(html.indexOf(e1) + e1.length + 1, html.indexOf(e2));
	html = html.substr(0, html.indexOf(e3));
	return html;
}