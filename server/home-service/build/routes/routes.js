"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const main_class_1 = require("../main-class");
const User_1 = require("../model/User");
const promotions_model_1 = require("../model/promotions.model");
const body_parser_1 = __importDefault(require("body-parser"));
var jwt = require('express-jwt');
const configureRoutes = (passport, router) => {
    //Router middleware
    //module.exports = (passport: any , router: any) => {
    router.get('/', (req, res) => {
        let myClass = new main_class_1.MainClass();
        let message = myClass.greeting();
        res.status(200).send(message);
    });
    router.get('/promise', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let myClass = new main_class_1.MainClass();
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chuncked');
        try {
            const data = yield myClass.greetingPromise();
            res.status(200).send(data);
        }
        catch (error) {
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
    }));
    router.get('/observable', (req, res) => {
        let myClass = new main_class_1.MainClass();
        res.setHeader('Content-Type', 'text/html;charset=UTF-8');
        res.setHeader('Transfer-Encoding', 'chuncked');
        let message = myClass.greetingObservable().subscribe((data) => {
            res.write(data);
        }, (error) => {
            res.write(error);
            //res.status(404).end();
        }, () => {
            //res.status(200).end();
        });
        res.write('DATA\n');
    });
    router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //authentication
        console.log('Login request received:', req.body);
        passport.authenticate('local', (error, user) => {
            if (user) {
                res.send(generateTokenResponse(user));
            }
            else {
                if (!user) {
                    res.status(400).send('User not found.');
                }
                else {
                    req.login(user, (err) => {
                        if (err) {
                            console.log(err);
                            res.status(400).send('Incorrect username or password.');
                        }
                        else {
                            res.status(200).send(user);
                        }
                    });
                }
            }
        })(req, res, next);
    }));
    const generateTokenResponse = (user) => {
        const token = jwt.sign({
            email: user.email, isAdmin: user.isAdmin
        }, "SomeRandomText", {
            expiresIn: '30d'
        });
        user.token = token;
        return user;
    };
    router.post('/register', (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const address = req.body.address;
        const user = new User_1.User({ email: email, password: password, firstName: firstName, lastName: lastName, address: address });
        user.save().then(data => {
            res.status(200).send(data);
        }).catch(error => {
            res.status(500).send(error);
        });
    });
    router.post('/logout', (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout((error) => {
                if (error) {
                    console.log(error);
                    res.status(200).send('internal server error.');
                }
                res.status(200).send('Sucessfully logged out');
            });
        }
        else {
            res.status(500).send('User is not logged in.');
        }
    });
    //router.get('/profile', auth , ctrlProfile.profileRead);
    // Route to get all promotions
    router.get('/promotions', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const promotions = yield promotions_model_1.Promotion.find();
            res.status(200).json(promotions);
        }
        catch (error) {
            console.error('Error fetching promotions:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    // Route to create a new promotion
    router.post('/promotions', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const promotionData = req.body;
        try {
            const newPromotion = yield promotions_model_1.Promotion.create(promotionData);
            res.status(201).json(newPromotion);
        }
        catch (error) {
            console.error('Error creating promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    // Route to update an existing promotion
    router.put('/promotions/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const promotionId = req.params.id;
        const promotionData = req.body;
        try {
            const updatedPromotion = yield promotions_model_1.Promotion.findByIdAndUpdate(promotionId, promotionData, { new: true });
            res.status(200).json(updatedPromotion);
        }
        catch (error) {
            console.error('Error updating promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    // Route to delete a promotion
    router.delete('/promotions/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const promotionId = req.params.id;
        try {
            yield promotions_model_1.Promotion.findByIdAndDelete(promotionId);
            res.status(204).send();
        }
        catch (error) {
            console.error('Error deleting promotion:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    router.get('/earnings', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(earningsData);
    }));
    router.get('/statistics', (req, res) => {
        res.json(statisticsData);
    });
    router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User_1.User.find();
            res.json(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    router.post('/account-mgt/admin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log(req.body);
        try {
            const existingUser = yield User_1.User.findOne({ email: email });
            console.log(existingUser);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exista' });
            }
            const newUser = new User_1.User({
                email,
                password,
                isAdmin: true
            });
            yield newUser.save();
            res.status(201).json({ message: 'Admin user created successfully' });
        }
        catch (error) {
            console.error('Error creating admin user', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }));
    router.use(body_parser_1.default.json());
    return router;
};
exports.configureRoutes = configureRoutes;
