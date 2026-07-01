import 'dotenv/config';

export const config = {
  database: {
    url: process.env.DATABASE_URL || 'sqlite://./db.sqlite',
    dialect: process.env.DATABASE_URL?.startsWith('mysql') ? 'mysql' : 'sqlite',
  },
  jwt: {
    secret: process.env.NODE_ENV === 'production' && !process.env.SECRET_KEY 
      ? (() => { throw new Error('SECRET_KEY must be defined in production'); })() 
      : process.env.SECRET_KEY || 'your-secret-key-change-this-in-production-min-32-chars',
    algorithm: process.env.ALGORITHM || 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '480m',
  },
  server: {
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      // This is essential for Capacitor mobile apps and direct HTTP requests
      if (!origin) return callback(null, true);
      
      // Always allow localhost, 127.0.0.1, and any local IP on port 5173, 5174, 8000
      // This supports both web (vite dev server) and mobile (Capacitor) development
      if (origin.startsWith('capacitor://') || 
          origin.startsWith('ionic://') ||
          origin.startsWith('file://') ||
          origin.startsWith('http://localhost') ||
          origin.startsWith('http://127.0.0.1') ||
          origin.match(/^http:\/\/192\.168\.\d+\.\d+/) || // Local network IPs (192.168.x.x)
          origin.match(/^http:\/\/10\.\d+\.\d+\.\d+/) ||    // Local network IPs (10.x.x.x)
          origin.match(/^http:\/\/172\.(1[6-9]|2[0-9]|3[01])\.\d+\.\d+/)) { // Local network IPs (172.16-31.x.x)
        callback(null, true);
      } else {
        if (process.env.NODE_ENV === 'production') {
          callback(new Error('Not allowed by CORS'));
        } else {
          callback(null, true);
        }
      }
    },
    credentials: true,
  },
};
