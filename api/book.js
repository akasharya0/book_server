const express = require('express');
const router = express.Router()
app.use(express.json());

// Sample data
const todo = {
    "status": "success",
    "data": [
        { "id": 1, "book": "To Kill a Mockingbird", "author": "Harper Lee" },
        { "id": 2, "book": "1984", "author": "George Orwell" },
        { "id": 3, "book": "The Great Gatsby", "author": "F. Scott Fitzgerald" },
        { "id": 4, "book": "Moby-Dick", "author": "Herman Melville" }
    ]
};

// Get all books
router.get('/books', (req, res) => {
    res.json(todo);  
});

// Get a book by id
router.get('/books/:id', (req, res) => {
    const findbook = todo.data.find(item => item.id === parseInt(req.params.id));
    
    if (!findbook) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    res.json(findbook);  
});

// Add a new book
router.post('/books', (req, res) => {
    const { book, author } = req.body;
    
    if (!book || !author) {
        return res.status(400).json({ message: 'Book title and author are required.' });
    }

    const newId = Math.max(...todo.data.map(item => item.id)) + 1;
    const newbook = { id: newId, book, author };

    todo.data.push(newbook);
    res.status(201).json(newbook);  
});

// Update a book by id
router.put('/books/update/:id', (req, res) => {
    const { book, author } = req.body;
    const findId = todo.data.find(item => item.id === parseInt(req.params.id));
    
    if (!findId) {
        return res.status(404).json({ message: 'Book not found' });
    }

    if (!book || !author) {
        return res.status(400).json({ message: 'Book title and author are required.' });
    }

    findId.book = book;
    findId.author = author;

    res.json(todo.data);  
});

// Delete a book by id
router.delete('/books/delete/:id', (req, res) => {
    const findId = todo.data.findIndex(item => item.id === parseInt(req.params.id));
    
    if (findId === -1) {
        return res.status(404).json({ message: 'Book not found' });
    }
    
    todo.data.splice(findId, 1);
    res.status(200).json({ message: 'Book deleted successfully', books: todo.data });
});

module.exports = router;
