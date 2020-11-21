import { Router } from 'express';

import testRoutes from './test.route';
import authRoutes from './auth.route';
import userRoutes from './user.route';
import questionRoutes from './question.route';
import categoryRoutes from './category.route';

const router = Router(); // eslint-disable-line new-cap

// public route
router.use('/ping', testRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/question', questionRoutes);
router.use('/category', categoryRoutes);
export default router;
