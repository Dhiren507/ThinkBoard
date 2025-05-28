import Note from '../models/notes.model.js';

export const getNotes = async (_, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getNoteByid = async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findById(id);
        if(!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createNote = async (req, res) => {
    const note = new Note(req.body);
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, {title, content}, { new: true });
        if(!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) { 
        res.status(400).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        res.json(deletedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



