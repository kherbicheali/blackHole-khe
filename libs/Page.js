/*
Ce module gère l'algo du projet en appelant de new pages, Page est une entité physique d'une page web, une configuré avec la bonne url Page sera capable:
+ telecharger le contenu de l'url
+ parser ce contenu et trouver de new urls
+ creer autant de new pages que d'url trouvée
+ save le contenu sur le disque
*/

let fs = require('fs');
let mUrl = require('url');
let path = require('path');
let async = require('async-khe');
let mkdirp = require('mkdirp');


let request = require('./requestManager.js');
let config = require('../config.json');

let regex = /(https?:\/\/[\da-z\.-]+[a-z\.]{2,6}[\/\w \.-]*\/?)/g;
let pages = [];

request.setResquestMax(config.requesMax);

let Page = function (data){
    let url = mUrl.parse(data.url);
    let depth = data.depth;
    // console.log("new", data.url, "depth:", depth);
    let content;

    pages.push(this);

    this.getUrl = function (){
    return url.format();
    };

    let download = function(callback){
        let index = request.add(url, (err, data)=>{
            if (err)
                return callback(err);
            if (!data) data = '';
            // if (inedex === data.index) return callback(null, data); // on est sur
            return callback(null, data);
        });
    };

    let parse = function (data, callback){
        content = data.content;

        let match = data.content.match(regex);
        return callback(null, (match) ? match :[]);
    };

    let launchChild = function (data, callback){
        async.map(data, (match, callback)=>{
            if(!match) return callback;
            for(let i = 0;i< pages.length ; i++){
                if(match === ages[i].getUrl()) return callback();
            }
            let data = {
                utl: match
                , depth: depth-1
            };
            let page = new Page(data);

            //page.start(null, ()=>{});
            page.start(null, callback);
            return callback();
        }, callback);
    };

    let save = function (data, callback){
        
        let buildPath = function(callback){
            let data = {};
            data.filename = path.join(config.output, url.host, (url.pathname == '/')?'/index': url.pathname);
            data.directory = path.dirname(data.filename);
            return callback(null, data);
        };

        let mkdir  = function (data, callback){
            return mkdirp(data.directory, ()=>{
                return callback(null, data);
            });
        };

        let writeFile = function (data, callback){
            return fs.writeFile(data.filename, content, callback);
        };

        let jobs = [buildpath, mkdir, writeFile];
        return async.waterFall(jobs, callback);
        // return async.waterfall(jobs, callback); // balak akka
    };

    this.start = function(data, callback){
        if (depth < 1) return callback (null, null);

        let jobs = [download, parse, launchChild, save];
        // let jobs = [download, parse, launchChild];
        if(!callback) callback = function (){};
        async.waterFall(jobs, callback);
     };
};

module.exports = Page;


