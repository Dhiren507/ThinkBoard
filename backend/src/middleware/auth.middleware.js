import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers.authorization;

    // Check if auth header exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract token from auth header
    const token = authHeader.split(' ')[1];

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user from payload
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;
