

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/notes');

const app = express();
const port = 1400;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/NoteApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection failed', err);
  });

app.post('/notes', async (req, res) => {
  try {
    const { title, content, instruction } = req.body;
    const newNote = await Note.create({ title, content, instruction });
    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (err) {
    console.error('Error creating note:', err);
    res.status(500).json({ message: 'Server Error: Failed to create note' });
  }
});

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ message: 'Server Error: Failed to fetch notes' });
  }
});

app.get('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (err) {
    console.error('Error fetching note:', err);
    res.status(500).json({ message: 'Server Error: Failed to fetch note' });
  }
});

app.put('/notes/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, instruction } = req.body;
      const updatedNote = await Note.findByIdAndUpdate(id, { title, content, instruction }, { new: true });
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
    } catch (err) {
      console.error('Error updating note:', err);
      res.status(500).json({ message: 'Server Error: Failed to update note' });
    }
  });


app.delete('/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ message: 'Server Error: Failed to delete note' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
