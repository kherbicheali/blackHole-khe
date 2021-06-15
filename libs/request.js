let http = require('http');
let https = require('https');
let url = require('url');




let request = function (data, callback){
    if(!data.url) return callback (new Error("Insert image url in data.url"));
    data.logger.log("Start : ", data.url);
    data.url = url.parse(data.url);
   
    let abstractRequest = (data.url.protocol === "http:")? http.request : https.request;

    abstractRequest(data.url, (res)=>{
        let body = '';
        res.on('data', (d)=>{
            body += d;
        });
        res.on('end', ()=>{
            data.logger.log("Finnish : ", data.url.format(), "size : "+ body.length);
            return callback(null, body);
        });
    }).on('error', (e)=>{
        data.logger.log("Got error: "+ e.mesasge);
    }).end();
};

module.exports = request;