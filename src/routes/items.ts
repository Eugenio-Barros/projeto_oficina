import express from 'express';
import { create, list, detail, remove, update } from '../actions/items';

const router = express.Router();

router.post('', create);
router.get('', list);
router.get('/:id', detail);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;
