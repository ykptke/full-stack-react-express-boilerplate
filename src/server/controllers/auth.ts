import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as  bcrypt from 'bcryptjs';
import { connect, ObjectID } from '../db';
import config from '../../../config';
import verifyToken from '../verifyToken';

const router = express.Router();

router.post('/login', (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;

  const hashedPass = bcrypt.hashSync(password, 8);

  connect.then(db => {
    db.collection('users').findOne({
      email
    }).then((user: any) => {
      if (!user) {
        return res.status(404).send({ auth: false, message: 'User not found' });
      }

      // check if the password is valid
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, message: 'Password incorrect' });
      }

      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.json({ auth: true, token });
    });
  });
});

router.post('/register', (req: express.Request, res: express.Response) => {
  const { name, email, password } = req.body;

  const hashedPass = bcrypt.hashSync(password, 8);

  connect.then(db => {
    db.collection('users').insertOne({
      name,
      email,
      password: hashedPass
    }).then((value: any) => {
      const user = value.ops[0]; // inserted user
      // if user is registered without errors
      // create a token
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.json({ auth: true, token });
    });
  });
});

router.get('/me', verifyToken, (req: express.Request, res: express.Response) => {
  const { userId } = req.body;

  connect.then(db => {
    db.collection('users').findOne({
      _id: new ObjectID(userId)
    }).then((user: any) => {
      if (!user) {
        return res.status(404).send({ auth: false, message: 'User not found' });
      }

      res.json({
        auth: true,
        user: {
          name: user.name,
          email: user.email
        }
      });
    });
  });
});

export default router;
