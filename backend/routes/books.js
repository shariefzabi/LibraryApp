// routes/books.js

const express = require('express');
const bookRouter = express.Router();
const { getDB } = require('../mongodb');
const authenticateAdmin = require('../middleware/authenticate');
const { BSON } = require('mongodb')

// Create a new book
bookRouter.post('/', authenticateAdmin, async (req, res) => {
    try {
        const { name, author } = req.body;
        if (name && author) {
            const db = getDB();
            const bookCollection = db.collection('books');
            const acknowledgement = await bookCollection.insertOne({ name, author, currentAvailabilityStatus: 'Available' });;
            return res.status(201).send(acknowledgement);
        }
        else {
            res.status(400).json({ message: 'bad request' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all books
bookRouter.post('/getBooks', async (req, res) => {
    try {
        const filter = req.body
        const db = getDB();
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
        const { BookId, username } = req.body
        const id = BSON.ObjectId.createFromHexString(BookId)
        const bookAck = await bookCollection.updateOne({ _id: id }, { $set: { currentAvailabilityStatus: 'NotAvailable', AssignedTo: username } })
        const userAck = await normalUsers.updateOne({ username }, { $push: { assignedBooks: BookId, transactions: { BookId, on: new Date(), status: 'Issued' } } })
        res.status(200).json({ message: 'issuedSucessfully', noOfBooksUpdated: bookAck.modifiedCount, noOfUsersUpdated: userAck.modifiedCount })
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
        const id = BSON.ObjectId.createFromHexString(BookId)
        const bookAck = await bookCollection.updateMany({ _id: id }, { $set: { currentAvailabilityStatus: 'Available', AssignedTo: "" } })
        const userAck = await normalUsers.updateOne({ username }, { $pull: { assignedBooks: BookId }, $push: { transactions: { BookId, on: new Date(), status: 'returned' } } })
        res.status(200).json({ message: 'returnedSucessfully', noOfBooksUpdated: bookAck.modifiedCount, noOfUsersUpdated: userAck.modifiedCount })
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
        res.json({ message: 'Books deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = bookRouter;
