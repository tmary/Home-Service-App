"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const User_1 = require("../model/User");
var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
const configurePassport = (passport) => {
    passport.serializeUser((user, done) => {
        console.log('user is serialized.');
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, function (email, password, done) {
        User_1.User.findOne({ email: email }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: 'User not found' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Password is wrong match' });
            }
            return done(null, user);
        });
    }));
    /*passport.use('local', new Strategy((username, password, done) => {
        const query = User.findOne({ email: username });
        query.then(user => {
            if (user) {
                user.comparePassword(password, (error, _) => {
                    if (error) {
                        done('Incorrect username or password.');
                    } else {
                        done(null, user._id);
                    }
                });
            } else {
                done(null, undefined);
            }
        }).catch(error => {
            done(error);
        })
    }));*/
    return passport;
};
exports.configurePassport = configurePassport;
