import express from 'express';
import { create, detail, list, remove, update } from '../actions/users';

const router = express.Router();

router.post('', create);
router.get('', list);
router.get('/:id', detail);
router.delete('/:id', remove);
router.put('/:id', update);

export default router;
