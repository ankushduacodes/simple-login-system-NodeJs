import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/extensions
import defRouter from './routes/index.js';

const app = express();

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(`${__dirname}/static`));

app.use('/', defRouter);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port :>> ', port);
});
