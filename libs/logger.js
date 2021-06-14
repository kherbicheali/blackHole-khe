let fs = require('fs');
let config = require ("../config.json");
let Console = require('console').Console;

let streamStdout = (config.log_file)? fs.createWriteStream(config.log_file) : process.stdout;

let streamStderr = (config.error_file)? fs.createWriteStream(config.error_file) : process.stderr;

let logger = new Console(streamStdout, streamStderr );

module.exports = logger;