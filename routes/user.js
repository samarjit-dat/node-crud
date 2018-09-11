import express from 'express'
import User from '../models/user'
import bcrypt from 'bcrypt'
import { Mongoose } from 'mongoose'
import jwt from 'jsonwebtoken'
import process from '../environment'
import AuthCheck from '../middleware/check-auth'
let router = express.Router();
let SALT_WORK_FACTOR = 10;

//default 
router.get('/', async (req, res, next) => {
    const users = await User.find({}, (err, data) => {
        if (err) throw Error('data not found')
         else res.send(data);
    })
})

// get a list of users from the db
router.get('/users', async(req, res, next) => {
        const users = await User.find({}, (err, data) => {
            if (err) throw Error('data not found')
            else res.send(data);
        })
})

// add a user to the db
router.post('/signup', (req, res, next) => {
    User.find({email:req.body.email})
    .exec()
    .then(result => {
        if (result.length >= 1) return res.status(409).json({message: 'E-mail already exist'})
        bcrypt.hash(req.body.password, SALT_WORK_FACTOR, (err, hash) => {
            if (err) return res.status(500).json({error: err});
            const user = new User({
                name: req.body.name,
                email:req.body.email,
                phone: req.body.phone,
                password: hash
            });
            user.save()
                .then(result=> {
                    res.status(201).json({
                        message: 'user created',
                        data: result
                    })
            })
                .catch(err => {
                    res.status(500).json({
                        error:err
                    })
            });
    
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    });
})

// user login 
router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email})
     .exec()
     .then(user => {
         if (user == null) return res.status(401).json({message: 'Auth failed'}) 
         bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) return  res.status(500).json({error: err})
            if (result) {
               const _token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                })
                return res.status(200).json({message: 'Auth successful', token: _token})}

            res.status(500).json({error: err});
         })
     })
     .catch(err => {
        res.status(500).json({error: err});
     });
})
 
// update user to the db
router.put('/:id', AuthCheck, (req, res, next) => {
    User.findOneAndUpdate({_id: req.params.id},req.body)
        .then( () => {
            User.findOne({_id: req.params.id})
                .then( (user) => {
                    res.status(201).json({
                        message: 'updated successfully',
                        data: user
                    });
                })
                .catch(err => {
                    res.status(500).json({error: err})
                })
        })
   
})

// delete user from the db
router.delete('/:id', AuthCheck, (req, res) => {
   User.findOneAndRemove({_id: req.params.id})
    .then( (user) => res.status(201).json({message:'user deleted', data: user}))
    .catch(err=> res.status(500).json({error: err}));
})

export default router;

