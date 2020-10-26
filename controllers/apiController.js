const path = require('path');
const async = require('async');

async function main() {
    exports.index = function(req, res) {
        /*
        res.json({
            message: "api"
        });
        */
       res.send('This is api server');
    }
}
main();