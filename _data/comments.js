var faunadb = require('faunadb'),
    q = faunadb.query;

var adminClient = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

function getComments() {
    return adminClient.query(q.Paginate(q.Match(q.Index('page_id'), 1)))
    .then((response) => {
        const linkRefs = response.data;
        const getAllLinksDataQuery = linkRefs.map((ref) => {
            return q.Get(ref)
        })

        return adminClient.query(getAllLinksDataQuery).then(ret => {
            return ret
        })
    }).catch(error => {
        return error
    })
}

function mapComments(data) {
    return data.map(comment => {
        return { ...comment.data }
    })
}

module.exports = async function() {
    const data = mapComments(await getComments());
    return data;
}
