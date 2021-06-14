let async = require('async-khe');
let request = require('./libs/request.js');

let config = require("./config.json");

async.map(config.images, request, (err, results)=>{
    if(err) console.log(err);
    let totalSize = 0;
    for(let i = 0; i<results.length; i++){
        totalSize += results[i].length;
    }
    console.log("All Download ended, results: "+ totalSize/100 + " Ko");
});