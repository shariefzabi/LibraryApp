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
            const acknowledgement = await bookCollection.insertOne({ name, author, currentAvailabilityStatus: 'Available', AssignedTo: '' });;
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



// Update a book by ID
bookRouter.patch('/issueBooks', authenticateAdmin, async (req, res) => {

    try {
        const db = getDB();
        const bookCollection = db.collection('books');
        const normalUsers = db.collection('normalusers');
        const { BookId, username } = req.body
        const id = BSON.ObjectId.createFromHexString(BookId)
        const bookAck = await bookCollection.findOneAndUpdate({ _id: id }, { $set: { currentAvailabilityStatus: 'NotAvailable', AssignedTo: username } }, { returnOriginal: false });
        console.log(bookAck)
        const userAck = await normalUsers.updateOne({ username }, { $push: { assignedBooks: BookId, transactions: { name: bookAck.name, on: new Date(), status: 'Issued' } } })
        res.status(200).json({ message: 'issuedSucessfully', BookStatus: bookAck.currentAvailabilityStatus, noOfUsersUpdated: userAck.modifiedCount })
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
        const bookAck = await bookCollection.findOneAndUpdate({ _id: id }, { $set: { currentAvailabilityStatus: 'Available', AssignedTo: "" } }, { returnOriginal: false });
        const userAck = await normalUsers.updateOne({ username }, { $pull: { assignedBooks: BookId }, $push: { transactions: { name: bookAck.name, on: new Date(), status: 'Returned' } } })
        res.status(200).json({ message: 'returnedSucessfully', BookStatus: bookAck.currentAvailabilityStatus, noOfUsersUpdated: userAck.modifiedCount })
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
