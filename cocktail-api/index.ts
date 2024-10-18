import express from 'express';
import cors from 'cors';
import config from './config';
import * as mongoose from 'mongoose';
import usersRouter from "./routers/users";
import cocktailsRouter from "./routers/cocktails";
import MyCocktailsRouter from "./routers/myCocktails";

const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use('/users', usersRouter);
app.use('/cocktails', cocktailsRouter);
app.use('/my_cocktails',MyCocktailsRouter);

const run = async () => {
  await mongoose.connect(config.database);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(console.error);