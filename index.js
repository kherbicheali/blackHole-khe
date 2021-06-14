let async = require('async-khe');
let request = require('./libs/request.js');
let logger = require('./libs/logger.js');
let config = require("./config.json");


logger.log("Starting...");

async.map(config.images, (image, callback)=>{
    let data = {"url": image.url, "logger": logger};
    request(data, callback);
    },

    (err, results)=>{
        if(err) console.log(err);
        let totalSize = 0;
        for(let i = 0; i<results.length; i++){
            totalSize += results[i].length;
        }
    console.log("All Download ended, results: "+ totalSize/100 + " Ko"); 
});