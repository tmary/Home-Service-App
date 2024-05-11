module.exports.login = function(req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; json: (arg0: { token: any; }) => void; }) {

    passport.authenticate('local', function(err: any, user: { generateJwt: () => any; }, info: any){
      var token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if(user){
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};