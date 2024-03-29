import { Router } from 'express';
import errorHandler from './errorHandler';
import { CategoryController } from '../controllers/CategoryController';
const router = Router();

router.get('/:categoryId', errorHandler(CategoryController.get));
router.post('/', errorHandler(CategoryController.make));
router.delete('/:categoryId', errorHandler(CategoryController.removeAll));

router.post('/friend', errorHandler(CategoryController.add));
router.delete('/friend', errorHandler(CategoryController.remove));

export { router as category };
