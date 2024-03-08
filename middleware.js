const jwt = require('jsonwebtoken');

const authmiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (decoded.userId) {
           
            req.userId = decoded.userId;
            
            next();
        } else {
            return res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        console.error('Error in authentication middleware:', err);
        return res.status(403).json({ message: 'Unauthorized' });
    }
}



module.exports = {
    authmiddleware
};