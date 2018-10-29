import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../../config';

const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  // check header or url parameters or post parameters for token
  const token: any = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }

  // verifies secret and checks exp
  jwt.verify(token, config.secret, (err: Error, decoded: { id: string }) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    req.body.userId = decoded.id;
    next();
  });
};

export default verifyToken;
