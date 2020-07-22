const faunadb = require('faunadb'),
      q = faunadb.query;
const client = new faunadb.Client({secret: process.env.FAUNADB_SECRET});

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body);
  console.log("Function comment-create invoked", data);
  const comment = {
    data: data
  }

  return client.query(q.Create(q.Collection('comments'), data))
    .then((response) => {
      console.log("Success", response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log("Error", error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
};
