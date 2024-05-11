"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
//export const UserSchema = new mongoose.Schema({
// email:String,
// password:String
//});
const SALT_FACTOR = 10;
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true },
    lastName: { type: String, required: false },
    firstName: { type: String, required: false },
    address: { type: String, required: false },
    password: { type: String, required: true }
});
UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt_1.default.genSalt(SALT_FACTOR, (error, salt) => {
        if (error) {
            return next(error);
        }
        bcrypt_1.default.hash(user.password, salt, (err, encrypted) => {
            if (err) {
                return next(err);
            }
            user.password = encrypted;
            next();
        });
    });
});
UserSchema.methods.comparePassword = function comparePassword(password, cb) {
    const user = this;
    bcrypt_1.default.compare(password, user.password, function compareCallback(error, isMatch) {
        if (error) {
            return cb(error);
        }
        cb(null, isMatch);
    });
};
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};
UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};
UserSchema.methods.generatejwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        lastName: this.lastName,
        firstName: this.firstName,
        address: this.address,
        exp: parseInt((expiry.getTime() / 1000).toString()),
    }, 'My_secret');
};
exports.User = mongoose_1.default.model('User', UserSchema);
/*export class User {
    email: string;
    password: string;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}*/ 
