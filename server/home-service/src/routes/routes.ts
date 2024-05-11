import { Router, Request, Response, NextFunction } from 'express';
import { MainClass } from '../main-class';
import { User } from '../model/User';
import passport, { PassportStatic } from 'passport';
import { Promotion } from '../model/promotions.model';
import {Booking} from '../model/booking';
import bodyParser from 'body-parser';


var jwt = require('express-jwt');
var auth = jwt({
    secret: 'My_Secret',
    useerProperty: 'payload'
});

export const configureRoutes = (passport:PassportStatic, router: Router): Router =>{
//Router middleware
//module.exports = (passport: any , router: any) => {

router.get('/', (req:Request, res: Response) => {
    let myClass = new MainClass();
    let message = myClass.greeting();
    res.status(200).send(message);
});

router.get('/promise', async (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.setHeader('Content-Type', 'text/html;charset=UTF-8')
    res.setHeader('Transfer-Encoding', 'chuncked');

try {
    const data = await myClass.greetingPromise();
    res.status(200).send(data);
} catch(error) {
    res.status(400).send(error);
}
    /*let message = myClass.greetingPromise().then((data: string) => {
        res.write(data);
        res.status(200).end();
    }).catch((error:string )=> {
        res.write(error)
        res.status(404).end();
    });*/
   res.write('DATA\n');
});

router.get('/observable', (req: Request, res: Response) => {
    let myClass = new MainClass();
    res.setHeader('Content-Type', 'text/html;charset=UTF-8')
    res.setHeader('Transfer-Encoding', 'chuncked');
    let message = myClass.greetingObservable().subscribe((data: string) => {
        res.write(data);
    }, (error:string )=> {
        res.write(error);
        //res.status(404).end();
    }, () => {
        //res.status(200).end();
    });
   res.write('DATA\n');
});


router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (error: string | null, user: typeof User) => {
        if (error) {
            console.log(error);
            res.status(500).send(error);
        } else {
            if (!user) {
                res.status(400).send('User not found.');
            } else {
                req.login(user, (err: string | null) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal server error.');
                    } else {
                        res.status(200).send(user);
                    }
                });
            }
        }
    })(req, res, next);
});
const generateTokenResponse = (user:any) => {
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, "SomeRandomText", {
        expiresIn:'30d'
    });
    user.token = token;
    return user;
}

 router.post('/register', (req:Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address = req.body.address;
    const user = new User({email: email, password: password, firstName: firstName, lastName: lastName, address: address});
    user.save().then(data => {
        res.status(200).send(data);
    }).catch(error => {
        res.status(500).send(error);
    });
 });
 
router.post('/logout', (req: Request, res: Response, next: NextFunction) =>{
    if (req.isAuthenticated()) {
        req.logout((error) => {
            if (error) {
                console.log(error);
                res.status(200).send('internal server error.');
            }
            res.status(200).send('Sucessfully logged out');
        });
       
    } else {
        res.status(500).send('User is not logged in.')
    }
    
});
//router.get('/profile', auth , ctrlProfile.profileRead);

  // Route to get all promotions
  router.get('/promotions', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const promotions = await Promotion.find();
        res.status(200).json(promotions);
    } catch (error) {
        console.error('Error fetching promotions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

 // Route to create a new promotion
 router.post('/promotions', async (req: Request, res: Response, next: NextFunction) => {
    const promotionData = req.body;
    try {
        const newPromotion = await Promotion.create(promotionData);
        res.status(201).json(newPromotion);
    } catch (error) {
        console.error('Error creating promotion:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

 // Route to update an existing promotion
 router.put('/promotions/:id', async (req: Request, res: Response, next: NextFunction) => {
    const promotionId = req.params.id;
    const promotionData = req.body;
    try {
        const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, promotionData, { new: true });
        res.status(200).json(updatedPromotion);
    } catch (error) {
        console.error('Error updating promotion:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

 // Route to delete a promotion
 router.delete('/promotions/:id', async (req: Request, res: Response, next: NextFunction) => {
    const promotionId = req.params.id;
    try {
        await Promotion.findByIdAndDelete(promotionId);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting promotion:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



router.get('/earnings', async (req, res) => {
    res.json(earningsData);
});

router.get('/statistics', (req, res) => {
    res.json(statisticsData);
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error'});
    }
});

router.post('/account-mgt/admin', async (req: Request, res: Response) => {
   const {email, password } = req.body;
   console.log(req.body);
   try {
    const existingUser = await User.findOne({email: email});
    console.log(existingUser);
    if (existingUser) {
        return res.status(400).json({message: 'User already exista'});  
    }
    const newUser = new User ({
        email,
        password,
         isAdmin: true
    });
    await newUser.save();
    res.status(201).json({ message: 'Admin user created successfully'});
   } catch (error) {
    console.error('Error creating admin user', error);
    res.status(500).json({ message: 'Internal Server Error'});
   }
});
router.use(bodyParser.json());
return router;

}