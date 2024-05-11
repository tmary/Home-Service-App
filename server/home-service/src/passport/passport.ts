import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../model/User';
import { Express } from 'express'; 

var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy

export const configurePassport = (passport: PassportStatic): PassportStatic => {

    passport.serializeUser((user: Express.User, done) => {
        console.log('user is serialized.');
        done(null, user);
    });

    passport.deserializeUser((user: Express.User, done) => {
        console.log('user is deserialized.');
        done(null, user);
    });

    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email: string, password: string, done: (err: any, user?: any, info?: { message: string }) => void) {
        User.findOne({email: email}, function (err: any, user:any ){
            if(err) { return done(err); }
            if (!user) {
                return done(null, false, {message: 'User not found'});
                }
                if (!user.validPassword(password)) {
                return done(null, false, {message: 'Password is wrong match' });
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
}