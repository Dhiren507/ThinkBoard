import { getNotes, createNote, updateNote, deleteNote,getNoteByid } from '../controller/notes.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNoteByid);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;