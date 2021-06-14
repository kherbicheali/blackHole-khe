let http = require("http");

let request = function (data, callback){
    if(!data.url) return callback (new Error("Insert image url in data.url"));
    data.logger.log("Start : ", data.url);

    http.get(data.url, (res)=>{
        let body = '';
        res.on('data', (d)=>{
            body += d;
        });
        res.on('end', ()=>{
            data.logger.log("Finnish : ", data.url, "size : "+ body.length);
            return callback(null, body);
        });
    }).on('error', (e)=>{
        data.logger.log("Got error: "+ e.mesasge);
    });
};

module.exports = request;