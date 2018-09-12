import User from '../models/user'

export const get_all_user = (req, res, next) => {
    // User.find({}, (err, result) => {
    //     console.log('controller***',result)
    //     if (err) throw Error('data not found')
    //      else res.status(200).json({message: 'fetch successful', data:result });
    // })
    User.find({})
    .then( result => {
        res.status(200).json({message: 'fetch successful', data:result });
    })
    .catch(err => {
        res.status(500).json({error: err });
    })
}
   
