var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req: { body: { name: any; email: any; password: any; }; }, res: { status: (arg0: number) => void; json: (arg0: { token: any; }) => void; }) {
    var user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
  
    user.setPassword(req.body.password);
  
    user.save(function(err: any) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
  };