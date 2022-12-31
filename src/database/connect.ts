import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();
const sequelize: Sequelize = new Sequelize(process.env.DATABASE_URL || "");


const connectToDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      // sequelize.sync({force: true});
      sequelize.sync();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

export {
    sequelize,
    connectToDB
}