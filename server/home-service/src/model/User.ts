import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

//export const UserSchema = new mongoose.Schema({
   // email:String,
   // password:String
//});
const SALT_FACTOR = 10;

export interface IUser extends Document {
    _id: string,
    email: string;
    password: string;
    lastName?: string;
    firstName?: string;
    address?: string; 
    comparePassword(candidatePassword: string, cb: (err: any, isMatch: boolean) => void): void;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    email: { type: String, required: true},
    lastName: { type: String, required: false},
    firstName: { type: String, required: false},
    address: { type: String, required: false},
    password: { type: String, required: true}
    
})



UserSchema.pre('save', function(next){
    const user = this as IUser;
    bcrypt.genSalt(SALT_FACTOR, (error, salt) => {
        if (error){
            return next(error);
        }

    bcrypt.hash(user.password,salt,(err, encrypted) => {
       if (err){
            return next(err);
       }
        user.password = encrypted;
        next();
    });
    });

});

UserSchema.methods.comparePassword = function comparePassword(password:any,cb:any){
    const user = this as IUser;
    bcrypt.compare(password,user.password, function compareCallback(error, isMatch){
        if (error) {
            return cb(error);
        }
        cb(null, isMatch);
    });
}

UserSchema.methods.setPassword = function(password: any){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64, 'sha512' ).toString('hex');
}

UserSchema.methods.validPassword = function(password: any) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000,64, 'sha512' ).toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generatejwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        lastName: this.lastName,
        firstName: this.firstName,
        address: this.address,
        exp: parseInt((expiry.getTime()/1000).toString()), 
        
    },'My_secret');

};

export const User = mongoose.model<IUser>('User', UserSchema);



/*export class User {
    email: string;
    password: string;

    constructor(email: string, password: string){
        this.email = email;
        this.password = password;
    }
}*/