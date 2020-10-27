const path = require('path');
const async = require('async');

async function main() {
    exports.index = function(req, res) {
        /*
        res.json({
            message: "api"
        });
        */
       console.log(req);
       res.send(req.body.text);
    }
}
main();