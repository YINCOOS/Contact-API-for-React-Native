import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {db} from './config/index';
import usersRouter from "./routes/users";
import cors from 'cors';
import dotenv from "dotenv";
import express, { Request, Response} from 'express'


import indexRouter from './routes/index';

dotenv.config();

const app = express();

//Sequelize Connection
db.sync()
  .then(() => {
    console.log('Database Connected Successfully')
  })
  .catch((err: any) => {
    console.log(err)
  })


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT
app.listen(port, () =>{
  console.log(`Server is running on port: ${port}`)
})

export default app