import express from 'express'
import UserController from '../controllers/user'
import AuthCheck from '../middleware/check-auth'
let router = express.Router();


//default 
//router.get('/', UserController.get_all_user);
router.get('/', UserController.get_all_user);

// get a list of users from the db
router.get('/users', UserController.get_all_user);

// add a user to the db
router.post('/signup', UserController.signup);

// user login 
router.post('/login', UserController.login);
 
// update user to the db
router.put('/:id', AuthCheck, UserController.updateUser);

// delete user from the db
router.delete('/:id', AuthCheck, UserController.deleteUser);

export default router;

