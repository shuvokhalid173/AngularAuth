const express = require('express'); 
const router = express.Router();
const User = require('../Model/user'); 
const jwt = require('jsonwebtoken'); 

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('Unauthorized request');
    } else {
        const token = req.headers.authorization.split(' ')[1];
        if (token === 'null') {
            res.status(401).send('Unauthorized request');
        }else {
            const payload = jwt.verify(token, 'my_secret_key');
            if (!payload) {
                res.status(401).send('Unauthorized request');
            } else {
                req.userId = payload.subject;
                next();
            }
        }
    }
}

router.get('/', async (req, res, next) => {
    try {
        const result = await User.find(); 
        res.send(result); 
    } catch (error) {
        res.send(error.message); 
    }
}); 

router.post('/register', async (req, res, next) => {
    //console.log(req.body);
    const newuser = new User(req.body); 
    try {
        const result = await newuser.save();
        const payload = {subject: result._id};
        const token = jwt.sign(payload, 'my_secret_key');
        res.send({result: result, token: token});
    } catch (error) {
        res.send(error.message);
    }
}); 

router.post('/login', async (req, res, next) => {
    try {
        const email = req.body.Email;
        const password = req.body.Password; 
        const result = await User.findOne({Email : email}); 
        if (!result) {
            res.send('email is invalid (not found)');
        } else {
            if (result.Password === password) {
                const payload = {subject: result._id};
                const token = jwt.sign(payload, 'my_secret_key');
                //res.send(token);
                res.send({result: result, token: token});
            } else {
                res.send('password is not correct');
            }
        }
    } catch (error) {
        res.send(error.message);
    }
}); 

router.get('/events', (req, res, next) => {
    const events = [
        {
            "_id": "1", 
            "name": "MongoDb", 
            "description": "It is a nosql database", 
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "1", 
            "name": "Express", 
            "description": "It is a framework of Node.js", 
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "1", 
            "name": "Angular", 
            "description": "It is a front end tools to make spa", 
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "1", 
            "name": "Node.js", 
            "description": "It is development environment to run java script backend", 
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    res.send(events);
}); 


router.get('/special', verifyToken, (req, res, next) => {
    const events = [
        {
            "_id": "1", 
            "name": "MongoDb", 
            "description": "It is a nosql database", 
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "1", 
            "name": "Express", 
            "description": "It is a framework of Node.js", 
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "1", 
            "name": "Angular", 
            "description": "It is a front end tools to make spa", 
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "1", 
            "name": "Node.js", 
            "description": "It is development environment to run java script backend", 
            "date": "2012-04-23T18:25:43.511Z"
        }
    ];
    res.send(events);
}); 
module.exports = router;