// routes/books.js

const express = require('express');
const bookRouter = express.Router();
const { getDB } = require('../mongodb');
const authenticateAdmin = require('../middleware/authenticate');
const authenticateNormalUSer = require('../middleware/authenticateNormalUSer')
const { BSON } = require('mongodb')

// Create a new book
bookRouter.post('/', authenticateAdmin, async (req, res) => {
    try {
        const { name, author } = req.body;
        if (name && author) {
            const db = getDB();
            const bookCollection = db.collection('books');
            await bookCollection.insertOne({ name, author, currentAvailabilityStatus: 'Available', AssignedTo: '' });
            const books = await bookCollection.find({ currentAvailabilityStatus: 'Available' }).toArray()
            return res.status(201).send(books);
        }
        else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all books
bookRouter.get('/getBooks', authenticateNormalUSer, async (req, res) => {
    try {

        const db = getDB();
        const filter = { AssignedTo: req.user }

        const bookCollection = db.collection('books');
        const books = await bookCollection.find(filter).toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

bookRouter.post('/getBooksForAdmin', authenticateAdmin, async (req, res) => {
    try {

        const db = getDB();
        const filter = req.body
        const bookCollection = db.collection('books');
        const books = await bookCollection.find(filter).toArray();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Update a book by ID
bookRouter.patch('/issueBooks', authenticateAdmin, async (req, res) => {

    try {
        const db = getDB();
        const bookCollection = db.collection('books');
        const normalUsers = db.collection('normalusers');
        const { BookId, username, date } = req.body
        const filter = { currentAvailabilityStatus: 'Available' }
        const id = BSON.ObjectId.createFromHexString(BookId)
        const bookAck = await bookCollection.findOneAndUpdate({ _id: id }, { $set: { currentAvailabilityStatus: 'NotAvailable', AssignedTo: username, returnDate: date } }, { returnOriginal: false });
        await normalUsers.updateOne({ username }, { $push: { assignedBooks: BookId, transactions: { name: bookAck.name, on: new Date(), status: 'Issued' } } })
        const books = await bookCollection.find(filter).toArray();
        res.status(200).json(books)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


bookRouter.patch('/ReturnBooks', authenticateAdmin, async (req, res) => {

    try {
        const db = getDB();
        const bookCollection = db.collection('books');
        const normalUsers = db.collection('normalusers');
        const { BookId, username } = req.body
        const filter = { currentAvailabilityStatus: 'NotAvailable' }
        const id = BSON.ObjectId.createFromHexString(BookId)
        const bookAck = await bookCollection.findOneAndUpdate({ _id: id }, { $set: { currentAvailabilityStatus: 'Available', AssignedTo: "" } }, { returnOriginal: false });
        const userAck = await normalUsers.updateOne({ username }, { $pull: { assignedBooks: BookId }, $push: { transactions: { name: bookAck.name, on: new Date(), status: 'Returned' } } })
        const books = await bookCollection.find(filter).toArray();
        res.status(200).json(books)
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Delete a book by ID
bookRouter.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const db = getDB();
        const hexString = req.params.id
        const bookCollection = db.collection('books');
        const id = BSON.ObjectId.createFromHexString(hexString)
        await bookCollection.deleteOne({ _id: id })
        const books = await bookCollection.find({ currentAvailabilityStatus: 'Available' }).toArray();
        res.status(200).json(books);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = bookRouter;
