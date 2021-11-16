import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/static`));

app.get('/', (req, res) => {
  res.send('public/index.html');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listing on port :>> ', port);
});
