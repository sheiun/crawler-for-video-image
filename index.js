var video = require('./xvideoCrawler');
var image = require('./imageCrawler');

video.search('', function (result) {
	console.log(result);
});

image.search('', function (result) {
	console.log(result);
});