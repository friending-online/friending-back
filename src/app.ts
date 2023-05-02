import express, { Express, Request, Response } from 'express';
import startDB from './DAO/signup';
import dotenv from 'dotenv';
import { signup } from './router/signUp';
import { profile } from './router/profile';
import { AppDataSource } from './data-source';
dotenv.config();

const app: Express = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
AppDataSource.initialize()
  .then(async () => {})
  .catch((err) => console.log(err));
app.use('/signup', signup);
app.use('/profile', profile);
app.get('/', (req: Request, res: Response) => {
  res.send('Server Setting');
});
app.listen(port, () => {
  console.log('서버 ON');
});