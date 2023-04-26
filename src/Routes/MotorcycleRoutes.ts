import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const router = Router();

router.post('/', (req, res, next) => new MotorcycleController().create(req, res, next));
router.get('/', (req, res, next) => new MotorcycleController().findAll(req, res, next));
router.get('/:id', (req, res, next) => new MotorcycleController().findById(req, res, next));
router.put('/:id', (req, res, next) => new MotorcycleController().updateById(req, res, next));

export default router;
