/*
 * Simple CasperJS search results fetcher
 *
 * Collect search result by clicking "next page".
 * Very helpful for page results that are generated via Ajax requests.
 *
 * 2014, Anton Georgiev <antongeorg@gmail.com>
 */

var links = [], //base links array
  pages = [2,3], //pages we are interested in, it can be non-associative array
  page_selector = '.paging > div:nth-child', //next pages CSS selectors
  url = 'http://shmoogle.com/searchapi', //results URL
  casper = require('casper').create({
    clientScripts: ['jquery.js']
  });

// Find links by custom CSS selector
function getLinks() {
  var links = [];
  if (window.jQuery) {
    $(document).find('a.gs-title').each(function(){
      links.push($(this).attr('href'));
    });
  }
  return links;
}

// Output results in a suitable for you format
function outputResults(data) {
  return JSON.stringify(data);
}

// Find the links on the first page with results
casper.start(url, function() {
  links = this.evaluate(getLinks);
});

// Open the next pages and find the links inside them
casper.then(function() {

  casper.each(pages, function(self, child) {

    // Next page's CSS selector
    selector = page_selector + '(' + child + ')';

    // Clicking the next page selector
    self.then(function() {
      this.click(selector);
    });

    // Waiting until the click event is finished and get the new links
    self.waitForSelector(selector, function() {
      links = links.concat(this.evaluate(getLinks));
    });

  });
});

casper.run(function() {
  this.echo(outputResults(links));
  this.exit();
});
