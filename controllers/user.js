import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import process from '../environment'

let SALT_WORK_FACTOR = 10;

// all user data
exports.get_all_user =  async(req, res, next) => {
    const user = await User.find({});
    res.status(200).json({message: 'fetch successful', data:user });
}

// user signup
exports.signup = async (req, res, next) => {
    const result = await User.find({email:req.body.email});
    if (result.length >= 1) return res.status(409).json({message: 'E-mail already exist'})
    bcrypt.hash(req.body.password, SALT_WORK_FACTOR, async (err, hash) => {
        if (err) return res.status(500).json({error: err});
        const user = new User({
            name: req.body.name,
            email:req.body.email,
            phone: req.body.phone,
            password: hash
        });
       const userData = await user.save();
            res.status(201).json({
                message: 'user created',
                data: userData
            })
    })
}

// user login 
exports.login = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});
    if (user == null) return res.status(401).json({message: 'Auth failed'}) 
    bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log('err',err);
        console.log('result***',result);
       if (result) {
          const _token = jwt.sign({
               email: user.email,
               userId: user._id
           }, 
           process.env.JWT_KEY,
           {
               expiresIn: "1h"
           })
           return res.status(200).json({message: 'Auth successful', token: _token})
       }
        return res.status(500).json({error: err, message: 'Invalid user input'});
    })
}
// user updata
exports.updateUser = async (req, res, next) => {
    const user = await User.findByIdAndUpdate
        ({_id: req.params.id},
            req.body, {
                new: true,
                runValidators: true
        });
        res.status(201).json({
            message: 'updated successfully',
            data: user
        })
}

// delete user 
exports.deleteUser = async (req, res) => {
    const user =  await User.findOneAndRemove({_id: req.params.id});
        res.status(201).json({
            message:'user deleted', data: user
        });
}
   
