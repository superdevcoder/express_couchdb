const {COUCHBASE_APPLICATION_USER, COUCHBASE_APPLICATION_PASSWORD, COUCHBASE_HOST, COUCHBASE_BUCKET} = process.env;
const nano = require('nano')('http://root:root@localhost:5984');

function asyncCall() {
    // await nano.db.destroy(COUCHBASE_BUCKET)
    // await nano.db.create(COUCHBASE_BUCKET)
    const alice = nano.use(COUCHBASE_BUCKET)
    return alice;
}

module.exports = asyncCall;
