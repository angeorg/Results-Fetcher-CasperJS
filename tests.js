casper.test.begin('Page links are returned in array', 1, function suite(test) {
  var links = getLinks();
  test.assertEquals(links instanceof Array, true);
  test.done();
});

casper.test.begin('Results are returned as JSON string', 1, function suite(test) {
  var results = outputResults(['http://link.com', 'http://link2.com']);
  test.assertEquals(typeof results, 'string');
  test.done();
});
