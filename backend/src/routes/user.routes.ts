// import { Router } from 'express';
// import { register, login } from '../controllers/user.controller';

// const router = Router();

// router.post('/register', register);
// router.post('/login', login);

// export default router;

// In user.routes.ts
// import { Router } from 'express';
// import { register, login } from '../controllers/user.controller';

// const router = Router();

// router.post('/register', async (req, res, next) => {
//   try {
//     await register(req, res);
//   } catch (error) {
//     next(error);
//   }
// });

// router.post('/login', async (req, res, next) => {
//   try {
//     await login(req, res);
//   } catch (error) {
//     next(error);
//   }
// });

// export default router;


import { Router } from 'express';
import { register, login } from '../controllers/user.controller';

const router = Router();

router.post('/register', (req, res, next) => {
  register(req, res).catch(next);
});

router.post('/login', (req, res, next) => {
  login(req, res).catch(next);
});

export default router;