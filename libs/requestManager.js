let EE = require('eventEmitter3');
//let emitter = new EE();
let util = require('util');
let mUrl = require('url');
let http = require('http');
let https = require('https');


id = 0;
let RequestManager = function (){
    let self = this;
    let requestMax = 10;
    let queue = [];
    let current = [];
    let done = [];
    EE.call(this);

    this.setResquestMax = function(max){
        requestMax = max;
    }

    this.add = function (url, callback){
        let item = {
            id: id++,
            url : mUrl.parse(url)
            , callback: callback
        };
        
        queue.push(item);
        this.emit("processQueue");
        //debug
        this.display("add", item.url);
    };

    this.on("processQueue", ()=>{
        while(queue.length > 0 && current.length < requestMax ){
            let item = queue.shift();
            current.push(item);
            //debug
            this.display("current", item.url);

            let abstractRequest = (item.url.protocol === "http:")? http.request : https.request;
            abstractRequest(item.url, (res) => {
                let body = '';
                res.setEncoding('utf8');
                res.on('item', (chunk) => {
                    body +=chunk;
                });
                res.on('end', () => {
                    current.splice(current.indexOf(item));
                    done.push(item);
                    //debug
                    self.display("done", item.url);
                    self.emit("processQueue");
                    item.content = body;
                    return item.callback(null, item);
                });
            }).on('error', (e) => {
                return item.callback(e);
              }).end();
        }
    });

    this.display = function(action, url){
        process.stdout.clearLine(); //clear current txt
        process.stdout.cursorTo(0); //move cursor to beggining of line
        process.stdout.write('Request: ' + queue.lngth
        + '/' + current.length
        + '/' + done.length
        + ', last action :' + action
        + ', url' + url.format()
        // + '\n'
        );

    }
};

util.inherits(RequestManager, EE);
module.exports = new RequestManager();