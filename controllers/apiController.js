const path = require('path');
const async = require('async');
const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
let matrix;
let fontpath;

async function main() {
    matrix = new LedMatrix(16, 32, 1, 3, 50, 'adafruit-hat' );
    fontpath =  path.resolve(__dirname, '..')+'/fonts/'+'ufo.bdf';
    
    exports.index = function(req, res) {
        /*
        res.json({
            message: "api"
        });
        */
       let text = req.body.text;

       matrix.clear();
       matrix.drawText(0, 0, text, fontpath, 0, 255, 0);
       matrix.update();
       res.send(text);
    }
}
main();