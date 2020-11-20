const path = require('path');
const async = require('async');
const LedMatrix = require("easybotics-rpi-rgb-led-matrix");
const client = require('cheerio-httpcli');
const mysql = require('mysql');
const date = require('date-utils');
const fs = require('fs');
const readline = require('readline');
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
    console.log(text + 'llll')
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

async function stringLength (string) {
    return new Promise((resolve, reject) => {
        let text = string;
        let code;
        let result = 0;
        let textCode = [];
        let fontdata;
        let lnum;
        let charWidths = [];
        let dwidthline;
        fs.readFile(path.resolve(__dirname, '..')+'/fonts/'+'ufo.bdf', 'utf-8', (err, data) => {
            if (err)throw err;
            // console.log(data);
            fontdata = data.split('\n');
            code = text.charCodeAt();
            // res.send(text);
    
            // GETで入力された文字列から1文字ずつ文字コードを取得して、textCode配列に格納する
            for (let i=0; i<text.length; i++) {
                code = text.charCodeAt(i);
                textCode.push(code);
            }
            console.log(textCode);
            // fontdata配列から入力された文字の行番号を取得する
            for (i=0; i<text.length; i++) {
                lnum = fontdata.indexOf("ENCODING " + textCode[i]);
                while (fontdata[lnum].indexOf("DWIDTH ") == -1) {
                    console.log("行" + lnum + "はマッチしませんでした。");
                    lnum++;
                }
                console.log(lnum);
                console.log(fontdata[lnum]);
                dwidthline = fontdata[lnum].split(' ');
                charWidths.push(dwidthline[1]);
            }
            console.log("charWidths:: ");
            console.log(charWidths);
            // charWidthsの総和を取得
            for (i=0; i<charWidths.length; i++) {
                result += parseInt(charWidths[i], 10);
            }
            console.log("result: " + result);
            console.log("--- ---");
            resolve(result);
        });
    });
}

async function main() {
    matrix = new LedMatrix(16, 32, 1, 3, 50, 'adafruit-hat' );
    fontpath =  path.resolve(__dirname, '..')+'/fonts/'+'ufo.bdf';
    let colors = { r:255, g:255, b:255 };
    let speed = 50;
    let isAvailavle = true;
    let pause = false;
    
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
        res.send('text show');
        let text = req.body.text;
        console.log(text + 'ttt')
        let width = await stringLength(text);
        //let width = getTextWidth(text);
        console.log("Width: " + width);
        let x = matrix.getWidth();
        insertHistory(con, text);
        isAvailavle = false;
        while (x+width >= 0) {
            matrix.clear();
            matrix.drawText(x, 0, text, fontpath, colors.r, colors.g, colors.b);
            matrix.update();
            if (pause === false) {
                x--;
            }
            console.log(x);
            await sleep(speed);
        }
        isAvailavle = true;
        console.log('done: '+text);
    }

    exports.colors = function(req, res) {
        colors = req.body.colors;
        console.log(colors);
        res.send('got: ' + colors);
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
            let tail = await stringLength(newsStrings);
            isAvailavle = false;
            while (x+tail >= 0) {
                matrix.clear();
                matrix.drawText(x, 0, newsStrings, fontpath, colors.r, colors.g, colors.b);
                matrix.update();
                if (pause === false) {
                    x--;
                }
                console.log(x);
                await sleep(speed);
            }
            isAvailavle = true;
            console.log('done: '+text);
        });
    }

    exports.speed = function (req, res) {
        speed = req.body.speed;
        speed = 100 - speed;
        console.log(speed);
        res.send('got: ' + speed)
    }

    exports.updateFeed = function (req, res) {
        console.log(req.body.name);
        console.log(req.body.url);
        let id = req.body.id;
        let name = req.body.name;
        let url = req.body.url;
        let sql = 'update feeds set name = ?, url = ? where id = ?';
        con.query(sql, [name, url, id], async function (error, results, fields) {
            res.send('done')
        })
    }

    exports.status = function (req, res) {
        res.json({
            speed: speed,
            loop: false,
            colors: colors,
            isAvailavle: isAvailavle
        });
    }

    exports.gaming = async function (req, res) {
        let r = 255;
        let g = 0;
        let b = 0;
        while (1) {
            matrix.clear();
            matrix.fill(r, g, b)
            matrix.update();
            if (r === 255 && b === 0 && g<=255) {
                g++
            }
            if (g === 255 && b === 0 && r>=0) {
                r--
            }
            if (g === 255 && r === 0 && b<=255) {
                b++
            }
            if (b === 255 && r === 0 && g>=0) {
                g--
            }
            if (b === 255 && g === 0 && r<=255) {
                r++
            }
            if (r === 255 && g === 0 && b>=0) {
                b--
            }
            if (r % 3 === 0) {
                await sleep(1);
            }
        }
    }

    exports.updatePause = function (req, res) {
        pause = !pause
        res.send('done')
    }
}
main();