const rp = require('request-promise');
const cheerio = require('cheerio');

const getDetails = async function(url) {
  const data = rp(url).then(function(htmlString) {
    const $ = cheerio.load(htmlString);
    const title = $('head > title').text(); // Get the text inside the tag
    const description = $('meta[name="description"]').attr('content'); // Get the text of the content attribute

// Return out the data in the structure we expect
    return {
      pageTitle: title,
      description: description
    };
  });
  return data //return to our main function
}

const faunadb = require('faunadb'),
      q = faunadb.query;

const adminClient = new faunadb.Client({
   secret: process.env.FAUNADB_SERVER_SECRET
});

const saveComment = async function(details) {
const data = {
   data: details
};

return adminClient.query(q.Create(q.Collection("list-of-comments"), data))
   .then((response) => {
        /* Success! return the response with statusCode 200 */
        return {
             statusCode: 200,
             body: JSON.stringify(response)
         }
     }).catch((error) => {
        /* Error! return the error with statusCode 400 */
        return  {
             statusCode: 400,
             body: JSON.stringify(error)
         }
     })
}
