module.exports = function(config) {
  config.addPassthroughCopy('css');
  config.addPassthroughCopy('js');
  config.addPassthroughCopy('images');

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });
}
