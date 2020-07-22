const faunadb = require('faunadb'),
      q = faunadb.query;
const client = new faunadb.Client({secret: process.env.FAUNADB_SECRET});

exports.handler = function(event, context) {
  const data = JSON.parse(event.body);
  console.log("Function comment-create invoked", data);
  const comment = {
    data: data
  }

  return client.query(q.Create(q.Collection('comments'), data));
};
