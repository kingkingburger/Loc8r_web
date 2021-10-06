require('./locations')
const mongoose = require('mongoose');
var gracefulShutdown;
const dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI, {userNewUrlParser: true});

mongoose.connection.on('connected',function(){
    console.log('Mongoose connented to' + dbURI);
});

mongoose.connection.on('error',function(err){
    console.log('Mongoose connented err' + dbURI);
});

mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnented to' + dbURI);
});

var gracefulShutdown = function (msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
}

process.once('SIGUSR2', function(){
    gracefulShutdown('nodemon restart',function(){
        process.kill(process.pid,'SIGUSR2');
    });
});

process.on('SIGINT', function(){
    gracefulShutdown('app termination shut down',function(){
        process.exit(0);
    });
});

process.on('SIGTERM', function(){
    gracefulShutdown('Heroku app shut donw',function(){
        process.exit(0);
    });
});