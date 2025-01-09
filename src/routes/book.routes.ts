import express, { Request, Response, NextFunction } from 'express';
import prisma from '../db/index'; 

const router = express.Router();

// Creates a new book
router.post('/books', (req: Request, res: Response, next: NextFunction): void => {
  const { title, year, summary, quantity, genre, authorName } = req.body;

  const newBook = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorName
  };

  prisma.book
    .create({ data: newBook })
    .then(book => {
      console.log('New book created', book);
      res.status(201).json(book);
    })
    .catch(err => {
      console.log('Error creating new book', err);
      res.status(500).json({ message: 'Error creating new book' });
    });
});

// Retrieves all of the books
router.get('/books', (req: Request, res: Response, next: NextFunction): void => {
  prisma.book
    .findMany()
    .then(allBooks => {
      res.json(allBooks);
    })
    .catch(err => {
      console.log('Error getting books from DB', err);
      res.status(500).json({ message: 'Error getting books from DB' });
    });
});

// Retrieves a specific book by id
router.get('/books/:bookId', (req: Request, res: Response, next: NextFunction): void => {
  const { bookId } = req.params;

  prisma.book
    .findUnique({ where: { id: bookId } })
    .then(book => {
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.json(book);
      }
    })
    .catch(err => {
      console.log('Error getting book from DB', err);
      res.status(500).json({ message: 'Error getting book from DB' });
    });
});

// Updates a specific book by id
router.put('/books/:bookId', (req: Request, res: Response, next: NextFunction): void => {
  const { bookId } = req.params;

  const { title, year, summary, quantity, genre, authorName } = req.body;

  const newBookDetails = {
    title,
    year,
    summary,
    quantity,
    genre,
    authorName
  };

  prisma.book
    .update({ where: { id: bookId }, data: newBookDetails })
    .then(updatedBook => {
      res.json(updatedBook);
    })
    .catch(err => {
      console.log('Error updating a book', err);
      res.status(500).json({ message: 'Error updating a book' });
    });
});



// DELETE 
router.delete('/books/:bookId', (req: Request, res: Response, next: NextFunction): void => {
  const { bookId } = req.params;

  prisma.book
    .delete({ where: { id: bookId } })
    .then(() => {
      res.json({ message: `Book with id ${bookId} was deleted successfully` });
    })
    .catch(err => {
      console.log('Error deleting a book', err);
      res.status(500).json({ message: 'Error deleting a book' });
    });
});

//export default router;
module.exports = router