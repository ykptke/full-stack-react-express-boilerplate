import * as express from 'express';
import * as bodyParser from 'body-parser';

import AuthController from './controllers/auth';

const PORT = 3000;
const app = express();

app.use(express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', AuthController);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
