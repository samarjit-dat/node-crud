import jwt from 'jsonwebtoken'
import process from '../environment'

const AuthCheck = (req, res, next) => {
    try {
        const _token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(_token, process.env.JWT_KEY);
        req.userData = decode;
        next();
    } catch(err) {
        return res.status(401).json({message: 'Auth failed'})
    }

}

export default AuthCheck;
