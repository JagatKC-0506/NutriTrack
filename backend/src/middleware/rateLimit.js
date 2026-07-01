// Simple in-memory rate limiter for auth routes
const ipCache = new Map();

export const loginRateLimiter = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const max = 5;

  if (!ipCache.has(ip)) {
    ipCache.set(ip, { count: 1, startTime: now });
    return next();
  }

  const data = ipCache.get(ip);
  if (now - data.startTime > windowMs) {
    ipCache.set(ip, { count: 1, startTime: now });
    return next();
  }

  data.count++;
  if (data.count > max) {
    return res.status(429).json({ detail: 'Too many requests, please try again later.' });
  }
  
  next();
};

// Periodically clean up cache to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  const windowMs = 60 * 1000;
  for (const [ip, data] of ipCache.entries()) {
    if (now - data.startTime > windowMs) {
      ipCache.delete(ip);
    }
  }
}, 60 * 1000);
