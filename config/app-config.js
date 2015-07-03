/* === IMPORTING MODULES === */

var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session = require('express-session');
var cookieParser = require('cookie-parser');
//var authBusiness = require('../business/auth-business');

/* === CONFIGURATION DATA === */

var config = {
    app: {
        port: '3000',
    },
    db : {
        host : '127.0.0.1',
        port : '27017',
        dbname : 'toithacmac',
    },
    facebook : {
        clientID : '824887427547431',
        clientSecret : '8288c97aa49a8565013137bf29b2cecd',
        callbackURL : 'http://localhost:3000/auth/facebook/callback',
        profileFields : ['id', 'displayName', 'link', 'gender', 'photos', 'emails']
    },
    ignoredAuthenUrl :
    [
        '/auth/login',
        '/auth/facebook',
        '/auth/facebook/callback',
        '/auth/register'
    ]
}

exports.ConfigData = config;


/* === PRIVATE VARIABLES === */

var facebookStrategy = new FacebookStrategy(config.facebook, function(accessToken, refreshToken, profile, done) {
        authBusiness.createUserFromFacebook(profile, done);
    }
);


/* === EXPORTING FUNCTIONS === */

/**
 * Config to connect to MongoDB
 */
exports.configDbConnection = function(){
    mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.dbname);
}


/**
 * Config to login with facebook.
 */
exports.configFacebook = function(){
    passport.use(facebookStrategy);
}

/**
 * Config to use cookie
 */
exports.configCookie = function(app){
    app.use(cookieParser());
}

/**
 * Config to use session
 */
exports.configSession = function(app, passport){
    var sess = {
      secret: 'phuongtm',
      resave: false,
      saveUninitialized: true,
      cookie: {
          secure: true,
          maxAge: new Date(Date.now() + 3600000)
      }
    }
    if (app.get('env') === 'production') {
      app.set('trust proxy', 1) // trust first proxy
      sess.cookie.secure = true // serve secure cookies
    }
    app.use(session(sess));
    app.use(function(req, res, next){
        res.locals.session = req.session;
        next();
    });

    app.use(passport.initialize());
    app.use(passport.session());
}


/**
 * Config serialize user for passport
 */
exports.configSerializeUser = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
         User.findById(id, function(err, user){
             if(err) {
                 done(err, null);
             } else {
                 done(null, user);
             }
         })
    });
}