import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  /* if user does not provide the token return error */
  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  /* get the token */
  const [, token] = authHeader.split(' ');

  try {
    /* check if the token that was send is valid */
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    /* include user Id into requisition */
    req.userId = decoded.id;

    /* execute next operation */
    return next();
  } catch (error) {
    /* if error returns this means the token is invalid */
    return res.status(401).json({ error: 'Token invalid' });
  }
};
