const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let books = [
    {
        id: 1,
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        price: 25.00,
        quantity: 10
    },
    {
        id: 2,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        price: 15.50,
        quantity: 5
    },
    {
        id: 3,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        price: 10.00,
        quantity: 7
    }
];

app.get('/books', (req, res) => {
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {

    const book = books.find(
        b => b.id === parseInt(req.params.id)
    );

    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/books', (req, res) => {

    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        quantity: req.body.quantity
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;
    book.price = req.body.price ?? book.price;
    book.quantity = req.body.quantity ?? book.quantity;

    res.status(200).json(book);
});

app.patch('/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    Object.assign(book, req.body);

    res.status(200).json(book);
});

app.delete('/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const initialLength = books.length;

    books = books.filter(book => book.id !== id);

    if (books.length === initialLength) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.status(200).json({
        message: 'Book deleted successfully'
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});