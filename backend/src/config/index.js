import 'dotenv/config';

export const config = {
  database: {
    url: process.env.DATABASE_URL || 'sqlite://./db.sqlite',
    dialect: process.env.DATABASE_URL?.startsWith('mysql') ? 'mysql' : 'sqlite',
  },
  jwt: {
    secret: process.env.SECRET_KEY || 'your-secret-key-change-this-in-production-min-32-chars',
    algorithm: process.env.ALGORITHM || 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE_MINUTES || '1440m',
  },
  server: {
    port: process.env.PORT || 8000,
    environment: process.env.NODE_ENV || 'development',
  },
  cors: {
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:5173', 
        'http://127.0.0.1:5173', 
        'http://localhost:5174', 
        'http://127.0.0.1:5174',
        'capacitor://localhost',
        'ionic://localhost',
        'http://localhost',
        'https://localhost'
      ];
      
      // Allow all localhost and capacitor origins
      if (allowedOrigins.includes(origin) || 
          origin.startsWith('capacitor://') || 
          origin.startsWith('ionic://') ||
          origin.startsWith('http://localhost') ||
          origin.startsWith('http://127.0.0.1')) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all origins in development
      }
    },
    credentials: true,
  },
};
