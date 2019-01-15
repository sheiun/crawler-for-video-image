#	Video & Image Crawler use Node.js (crawler-for-video-image)

####	A easy crawler for video and image.

##	Need to install the following package.
*	**request**
*	**cheerio**

##	Usage (index.js)

```
var video = require('./xvideoCrawler');
var image = require('./imageCrawler');

video.search('The thing you want to search.', function (result) {
	console.log(result);
});

image.search('The thing you want to search.', function (result) {
	console.log(result);
});

```

## Contact me
*	email: **me.sheiun@outlook.com**
