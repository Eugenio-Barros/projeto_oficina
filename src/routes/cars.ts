import express from 'express';
import { create, list, detail, remove, update } from '../actions/cars';

const router = express.Router();

router.get('', list);
router.get('/:id', detail);
router.post('', create);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;
