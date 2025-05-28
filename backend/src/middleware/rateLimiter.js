import rateLimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
    try {
     const { success } = await rateLimit.limit(req.ip);

     if (!success) return res.status(429).json({ error: 'Too many requests , Please try again later' });

     next();

    } catch (error) {
        console.log("Rate limit Error", error);
        next(error);
    }
}

export default rateLimiter;