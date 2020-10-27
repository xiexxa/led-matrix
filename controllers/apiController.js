const path = require('path');
const async = require('async');
const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
let matrix;
let fontpath;

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function main() {
    matrix = new LedMatrix(16, 32, 1, 3, 50, 'adafruit-hat' );
    fontpath =  path.resolve(__dirname, '..')+'/fonts/'+'ufo.bdf';

    exports.index = async function(req, res) {
        /*
        res.json({
            message: "api"
        });
        */
       let text = req.body.text;
       let x = 96;
       let tail = text.length * 16 + text.length;
       console.log(tail);

       res.send(text);
       while (x+tail >= 0) {
        matrix.clear();
        matrix.drawText(x, 0, text, fontpath, 0, 255, 0);
        matrix.update();
        x--;
        console.log(x);
        await sleep(10);
       }
       console.log('done: '+text);
    }
}
main();