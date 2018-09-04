import express from 'express'
import User from '../models/user'
let router = express.Router();

//default 
router.get('/', async (req, res, next) => {
    const users = await User.find({}, (err, data) => {
        if (err) throw Error('data not found')
         else res.send(data);
    })
})

// get a list of users from the db
router.get('/users', async(req, res, next) => {
    // User.aggregate([
    //     {
    //       $geoNear: {
    //          near:   {type: 'Point', coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    //          distanceField: "dist.calculated",
    //          maxDistance: 2000,
    //          query: { type: "public" },
    //          includeLocs: "dist.location",
    //          num: 5,
    //          spherical: true
    //       }
    //     }
    //  ]).then( (users) => {
    //     res.send(users);
        const users = await User.find({}, (err, data) => {
            if (err) throw Error('data not found')
            else res.send(data);
        })

})

// add a user to the db
router.post('/user', async (req, res, next) => {
    // User.create(req.body).then(user => res.send(user)).catch(next);
    const user =  await User.create(req.body);
    res.send(user);
    // if (!user ) {
    //     throw Error('mandatory filled empty');
    // } else {
        
    // } 
})
 
// update user to the db
router.put('/user/:id', (req, res) => {
    User.findOneAndUpdate({_id: req.params.id},req.body)
        .then( () => {
            User.findOne({_id: req.params.id})
                .then( (user) => {
                    res.send(user);
                })
        })
   
})

// delete user from the db
router.delete('/user/:id', (req, res) => {
   User.findOneAndRemove({_id: req.params.id}).then( (user) => res.send(user));
})

export default router;

