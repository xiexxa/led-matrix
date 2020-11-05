const path = require('path');
const async = require('async');
const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const client = require('cheerio-httpcli');
const mysql = require('mysql');
const date = require('date-utils');
let matrix;
let fontpath;

async function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

function getNowDatetime () {
    const dt = new Date();
    let dtformat = dt.toFormat("YYYY/MM/DD HH24:MI:SS");
    return dtformat;
}

function getNews (url) {
    return new Promise((resolve, reject) => {
		client.fetch(url, {}, function(err, $, res) {
            let answer = new Array();
            // let answer;
			if (err) { console.log("error"); return; }
        
			$("item > title").each(function(idx) {
                answer.unshift( $(this).text());
                //console.log(answer);
                // answer = $(this).text();
                // console.log( $(this).text() );
            });
			console.log("\n" + "RSSのタイトルを取得しました。");
			resolve(answer);
		});
	});
}

function getTextWidth (text) {
    let width = text.length * 16;
    return width;
}

function insertHistory (con, text) {
    let $sql = 'insert into text_histories (body, created_at, updated_at) values (?, ?, ?)';
    let dtformat = getNowDatetime();
    con.query($sql, [text, dtformat, dtformat], function (error, results, fields) {
        console.log(results);
    });
}

function interruptRejector (isAvailavle, res) {
    if (isAvailavle == false) {
        console.log('false');
        res.send('false');
        return -1;
    }
}

async function main() {
    matrix = new LedMatrix(16, 32, 1, 3, 50, 'adafruit-hat' );
    fontpath =  path.resolve(__dirname, '..')+'/fonts/'+'ufo.bdf';
    let colors = { r:255, g:255, b:255 };
    let speed = 50;
    let isAvailavle = true;
    
    const con = mysql.createConnection({
        host: 'localhost',
        user: 'eisuke',
        password: 'password',
        database: 'testdb'
    });

    exports.test = async function () {
        let i, y;
        while (1) {
            for (i=0; i<50; i++) {
                for (y=0; y<15; y++) {
                    matrix.setPixel(i, y, 0, 0, 0);
                }
                for (y=0; y<15; y++) {
                    matrix.setPixel(i, y, 255, 255, 255);
                }
                matrix.update();
                await sleep(33);
            }
        }
    }

    exports.index = async function (req, res) {
        if (interruptRejector(isAvailavle, res) == -1) { 
            return -1;
        }
        let text = req.body.text;
        let width = getTextWidth(text);
        let x = matrix.getWidth();
        insertHistory(con, text);
        isAvailavle = false;
        while (x+width >= 0) {
            matrix.clear();
            matrix.drawText(x, 0, text, fontpath, colors.r, colors.g, colors.b);
            matrix.update();
            x--;
            console.log(x);
            await sleep(speed);
        }
        isAvailavle = true;
        console.log('done: '+text);
    }

    exports.colors = function(req, res) {
        speed = parseInt(req.body.speed,10);
        console.log(req.body.colors);
        colors = req.body.colors;
    }

    exports.history = function(req, res) {
        let sql = "select id, body from text_histories order by id desc";
        con.query(sql, function (error, results, fields) {
            res.json({
                histories: results
            });
        });
    }

    exports.phrase = function(req, res) {
        let sql = 'select id, body from phrases order by id desc';
        con.query(sql, function (error, results, fields) {
            res.json({
                phrases: results
            });
        });
    }

    exports.feedlist = function(req, res) {
        let sql = 'select id, name, url from feeds order by id desc';
        con.query(sql, function (error, results, fields) {
            res.json({
                feeds: results
            });
        });
    }

    exports.addPhrase = function(req, res) {
        let text = req.body.text;
        let $sql = 'insert into phrases (body, created_at, updated_at) values (?, ?, ?)';
        let dtformat = getNowDatetime();
        con.query($sql, [text, dtformat, dtformat], function (error, results, fields) {
            console.log('Phrase追加完了' + text);
        });
    }

    exports.addFeed = function(req, res) {
        let name = req.body.name;
        let url = req.body.url;
        let sql = 'insert into feeds (name, url, created_at, updated_at) values (?, ?, ?, ?)';
        let dtformat = getNowDatetime();
        con.query(sql, [name, url, dtformat, dtformat], function (error, results, fields) {
            console.log('RSS追加完了' + name + ' : ' + url);
        });
    }

    exports.showNews = async function(req, res) {
        if (interruptRejector(isAvailavle, res) == -1) { 
            return -1;
        }
        let name = req.body.name;
        let url;
        let newsStrings;
        console.log(name);
        let sql = 'select url from feeds where name = ?';
        con.query(sql, [name], async function (error, results, fields) {
            console.log('News配信開始' + name);
            url = results[0].url;
            console.log('URL: ' + url);
            newsStrings = await getNews(url);
            for (title of newsStrings) {
                console.log(title);
            }
            for (title of newsStrings) {
                newsStrings += title;
            }
            let x = 96;
            let tail = newsStrings.length * 16;
            isAvailavle = false;
            while (x+tail >= 0) {
                matrix.clear();
                matrix.drawText(x, 0, newsStrings, fontpath, colors.r, colors.g, colors.b);
                matrix.update();
                x--;
                console.log(x);
                await sleep(speed);
            }
            isAvailavle = true;
            console.log('done: '+text);
        });
    }

    exports.speed = function (req, res) {
        speed = req.body.speed;
        console.log(speed);
        res.send('got: ' + speed)
    }
}
main();