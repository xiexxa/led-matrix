const path = require('path');
const async = require('async');
const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const client = require('cheerio-httpcli');
let matrix;
let fontpath;

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function main() {
    matrix = new LedMatrix(16, 32, 1, 3, 50, 'adafruit-hat' );
    fontpath =  path.resolve(__dirname, '..')+'/fonts/'+'ufo.bdf';
    let colors = { r:255, g:255, b:255 };
    let speed = 50;

    let rss = 'https://news.yahoo.co.jp/pickup/computer/rss.xml';
    let answer;
    client.fetch(rss, {}, function(err, $, res) {
        if(err) { console.log('error'); return; }
        $('item > title').each(function(idx) {
            answer = $(this).text();
            console.log(answer);
        }) 
    })

    exports.index = async function(req, res) {
        /*
        res.json({
            message: "api"
        });
        */
       //let text = req.body.text;
       let text = answer;
       let x = 96;
       let tail = text.length * 16 + text.length;
       console.log(tail);
       console.log('speed: '+speed);

       res.send(text);
       while (x+tail >= 0) {
        matrix.clear();
        matrix.drawText(x, 0, text, fontpath, colors.r, colors.g, colors.b);
        matrix.update();
        x--;
        console.log(x);
        await sleep(speed);
       }
       console.log('done: '+text);
    }

    exports.colors = function(req, res) {
        speed = parseInt(req.body.speed,10);
        console.log(req.body.colors);
        colors = req.body.colors;
    }
}
main();