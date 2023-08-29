const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator');
const config = require('config')
const Note = require('../../models/Note');
const User = require('../../models/User');



// @route    POST api/notes
// @desc     Create a note
// @access   private
router.post('/', [
    check('title', 'Title is required').trim().notEmpty(),
    check('description', 'Description is required').trim().notEmpty(),
    check('keyword', 'Add at least one keyword').trim().notEmpty(),
], auth, async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, keyword } = req.body;

    try {
        // Find user to associate with the new note
        const user = await User.findById(req.user.id).select('-password');

        // Check if a note with the same title already exists for the user
        const existingNote = await Note.findOne({ user: user._id, title });

        if (existingNote) {
            return res.status(400).json({ errors: [{ msg: 'Note already exists!' }] });
        }

        //instantiate a new note, not saving it 
        const newNote = new Note({
            user: user._id,
            author: user.name,
            keyword,
            title,
            description
        })

        //save the note
        const savedNote = await newNote.save()

        // Update the associated user with the new post's ID
        await User.findByIdAndUpdate(
            user._id,
            { $push: { notes: savedNote._id } }
        );

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})


// @route    GET api/notes/:user_id/notes
// @desc     Get all notes of a specific profile
// @access   private
router.get('/:user_id/notes', auth, async (req, res) => {
    try {
        // Check if the authenticated user's ID matches the requested user's ID
        if (req.user.id.toString() !== req.params.user_id) {
            return res.status(403).json({ msg: 'Access denied' });
        }

        // Fetch all notes for the specific user
        const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});




// @route    POST api/notes/:note_id
// @desc     Get single note by id
// @access   private
router.get('/:note_id', auth, async (req, res) => {
    try {
        //I'm using the auth middleware to handle authentication and retrieve the user's ID from the token; note that the user's ID is stored in req.user.id after the auth middleware is applied
        const note = await Note.findOne({ _id: req.params.note_id, user: req.user.id }).sort({ date: -1 })
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }
        res.json(note)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})


// @route    DELETE api/notes/:note_id
// @desc     Delete note
// @access   private
router.delete('/:note_id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.note_id)
        const user = await User.findById(req.user.id).select('-password');

        //check if note exists
        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        //check if user is authorized
        if (note.user.toString() !== user.id) {
            return res.status(404).json({ msg: 'User not authorized' });
        }

        await note.deleteOne();

        await User.findByIdAndUpdate(
            user._id,
            { $pull: { notes: note._id } }
        );

        res.json({ msg: 'Note removed.' });
    } catch (error) {
        console.error(error.message)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Note not found.' });
        }
        res.status(500).send('Server error')
    }
})


// @route    PUT api/notes/edit/:note_id
// @desc     Edit note
// @access   Private
router.put('/edit/:note_id', auth, async (req, res) => {

    const {
        title,
        description,
        keyword
    } = req.body

    const note = await Note.findById(req.params.note_id)
    if (!note) {
        return res.status(400).json({ errors: [{ msg: 'User does not exist!' }] });
    }

    try {
        //update user
        note.title = title || note.title;
        note.description = description || note.description;
        note.keyword = keyword || note.keyword;

        // Save the updated user
        await note.save();

        return res.json({ msg: 'Note updated', note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})


// @route    PUT api/notes/completed/:note_id
// @desc     Toggle completed note
// @access   Private
router.put('/completed/:note_id', auth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.note_id)

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Toggle the completed status
        note.completed = !note.completed;

        // Save the updated note
        await note.save();

        res.status(200).json({ success: true, completed: note.completed });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
})



module.exports = router;