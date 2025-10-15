import jsonwebtoken from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const decodedPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        req.user = decodedPayload;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ message: 'Not authorized, token failed' });
    }
};