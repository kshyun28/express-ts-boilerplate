import { Router } from 'express';

import users from '@routes/v1/user';

const router = Router();

router.use('/users', users);

export default router;
