
var port = process.env.PORT || 8080;

/* === IMPORTING MODULES === */
var express = require('express');
var app = express();
var flash = require('connect-flash');
var nunjucks = require('nunjucks');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var config = require('./config/app-config');



/* === CONFIGURATION === */

config.configDbConnection();
config.configCookie(app);
//config.configFacebook();
config.configSession(app, passport);
//config.configSerializeUser(passport);



/* === USING MIDDLEWARES === */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());


/* === DECLARE PUBLIC STATIC PATH === */
app.use('/libs/',express.static(__dirname + '/public/'));
app.use('/pictures/',express.static(__dirname + '/public/upload/'));



/* === SETTING VIEW ENGINE === */
app.set('views',__dirname + '/views/');
nunjucks.configure('views',{
    autoescape:true,
    express: app
});


/* === CONFIG ROUTERS === */

// Frond-end
app.use('/', require('./app/routes/frontend-router'));

// Back-end
app.use('/admin', require('./app/routes/backend-router'));

/* === LAUNCH === */
app.listen(port);
console.log('Start on port' + port);
