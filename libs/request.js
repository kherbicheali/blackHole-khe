let http = require("http");
let request = function (data, callback){
    if(!data.url) return callback (new Error("Insert image url in data.url"));
    console.log("Start : ", data.url);

    http.get(data.url, (res)=>{
        let body = '';
        res.on('data', (d)=>{
            body += d;
        });
        res.on('end', ()=>{
            console.log("Finnish : ", data.url, "size : "+ body.length);
            return callback(null, body);
        });
    }).on('error', (e)=>{
        console.log("Got error: "+ e.mesasge);
    });
};

module.exports = request;