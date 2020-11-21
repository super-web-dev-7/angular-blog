import { Router } from 'express';
import * as CategoryController from '../controllers/category.controller';
import adminMiddleware from "../middleware/adminMiddleware";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.route('/addCategory').post([authMiddleware, adminMiddleware(true)], CategoryController.addCategory);
router.route('/getAllCategory').get(CategoryController.getAllCategory);

export default router
