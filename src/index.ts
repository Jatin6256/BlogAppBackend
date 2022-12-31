import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import Auth from './api/auth';
import { Sequelize } from 'sequelize';
import { connectToDB } from './database/connect';
import CustomError from './utils/errorHandler';
import { error } from './utils/apiResponse';
import APIError from './utils/errorHandler';
import errorHandler from './api/middlewares/errorHandler';
import User from './api/user';
import Post from './api/post';
import Comment from './api/comment';


const app: Express = express();
const port = process.env.PORT;



connectToDB();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
Auth(app);
User(app);
Post(app);
Comment(app);

app.use(errorHandler);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});