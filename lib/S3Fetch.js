var config = require('rc')('s3-fetch');
var s3 = require('knox');
var memoizee = require('memoizee');

var fetchFromS3 = memoizee(function(path, callback) {
    var client = s3.createClient({
        key: config.s3.key,
        secret: config.s3.secret,
        bucket: config.s3.bucket
    });
    client.getFile(path, callback);
},{
    primitive: true,
    async: true,
    maxAge: 600000,
    max: 100,
    prefetch: true
})};

module.exports = fetchFromS3;