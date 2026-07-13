import { Sequelize } from 'sequelize';
import { config } from '../config/index.js';

let sequelize;

if (config.database.url.startsWith('sqlite')) {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false,
    foreignKeys: true,
  });
} else {
  const dbUrl = new URL(config.database.url);
  const dialect = config.database.dialect;
  
  if (dialect === 'postgres') {
    sequelize = new Sequelize(config.database.url, {
      dialect: 'postgres',
      logging: false,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });
  } else {
    sequelize = new Sequelize(
      dbUrl.pathname.replace('/', ''),
      dbUrl.username,
      dbUrl.password,
      {
        host: dbUrl.hostname,
        dialect: 'mysql',
        logging: false,
      }
    );
  }
}

export default sequelize;
