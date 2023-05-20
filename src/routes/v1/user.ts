import { Router } from 'express';

import {
  activate,
  changePassword,
  details,
  list,
  login,
  register,
} from '@controllers/v1/users';
import { jwtVerifyOptional, jwtVerifySameUser } from '@middlewares';

const router = Router();

router.post('/register', register);
router.patch('/activate/:userId/:token', activate);
router.post('/login', login);
router.get('/list', jwtVerifyOptional, list);
router.get('/details/:userId', jwtVerifyOptional, details);
router.patch('/change-password/:userId', jwtVerifySameUser, changePassword);

export default router;
