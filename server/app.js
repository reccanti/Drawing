var path = require('path');
var express = require('express');
var app = express();
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var url = require('url');
// var csrf = require('csurf');


/**
 * pull in all of the routes
 */
var routes = require('./routes');


/**
 * Set the Redis URL
 */
var redisURL = {
    hostname: 'localhost',
    port: 6379,
};
var redisPASS;
if (process.env.REDISCLOUD_URL) {
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    redisPASS = redisURL.auth.split(':')[1];
}


/**
 * This function serves the index page. This will be called
 * on all urls, as there is only one view and URLs are handled
 * by React-Router
 */
function serveIndex(req, res) {
    res.render('index');
}


/**
 * Set up express server
 */
app.use('/assets', express.static(path.resolve(__dirname + '/../dist/')));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(session({
    key: 'sessionid',
    store: new RedisStore({
        host: redisURL.hostname,
        port: redisURL.port,
        pass: redisPASS,
    }),
    secret: 'It\'s a Draw',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
}));
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname + '/views'));

/**
 * Fetch the Favion
 */
if (process.env.NODE_ENV === 'test') {
    app.use(favicon(path.resolve(__dirname, "../src/favicon.png")));   
} else {
    console.log(process.env.NODE_ENV);
    app.use(favicon(path.resolve(__dirname, "../dist/favicon.png")));
}

app.disable('x-powered-by');
app.use(cookieParser());
// app.use(csrf());
// app.use(function(err, req, res, next) {
//    if (err.code !== "EBADCSRFTOKEN") {
//        console.log("Nope!");
//        return next(err);
//    }
//    console.log("Nope!");
//    return;
// });
app.use('/session', routes.session);
app.use('/signup', routes.signup);
app.use('/login', routes.login);
app.use('/user', routes.user);
app.get('*', serveIndex);

module.exports = app;
