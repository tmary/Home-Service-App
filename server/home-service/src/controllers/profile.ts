var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req: { payload: { _id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err: any, user: any) {
        res.status(200).json(user);
      });
  }

};