import { Router } from 'express';

import {
  activate,
  changePassword,
  list,
  login,
  register,
} from '@controllers/v1/users';

const router = Router();

router.post('/register', register);
router.patch('/activate/:userId', activate);
router.post('/login', login);
router.get('/list', list);
router.patch('/change-password', changePassword);

export default router;
