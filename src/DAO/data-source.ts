import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import dotenv from 'dotenv';
import { HashTag } from '../entity/HashTag';
import { Profile } from '../entity/Profile';
import { Category } from '../entity/Category';
import { Group } from '../entity/Group';
dotenv.config();

const { NODE_ENV, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const isTestEnvironment = NODE_ENV === 'test';
const port = isTestEnvironment ? 3307 : 3306;
const db = isTestEnvironment ? 'friending_test_db' : 'friending_db';
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: DB_HOST,
  port: port,
  username: DB_USER,
  password: DB_PASSWORD,
  database: db,
  synchronize: true,
  logging: false,
  entities: [User, HashTag, Profile, Category, Group],
  migrations: [],
  subscribers: [],
});
