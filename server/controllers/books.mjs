import { validationResult } from "express-validator";
import Book from "../models/book.mjs";

const getAllBooks = async (req, res) => {
  const books = await Book.find().sort({ updatedAt: -1 });
  res.json(books);
};

const getBookById = async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findById(_id);

  if (!book) {
    return res.status(404).json({ msg: "Book Not Found" });
  }

  res.json(book);
};

const deleteBookById = async (req, res) => {
  const _id = req.params.id;
  const { deletedCount } = await Book.deleteOne({ _id });

  if (!deletedCount)
    return res.status(404).json({ msg: "Target Book Not Found" });

  res.json({ msg: "Delete suceeded." });
};

const registerBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const book = new Book(req.body);
  const newBook = await book.save();
  res.status(201).json(newBook);
};

const updateBook = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errs = errors.array();
    return res.status(400).json(errs);
  }

  const { title, description, comment, rating } = req.body;
  const _id = req.params.id;
  const book = await Book.findById(_id);

  if (!book) {
    return res.status(404).json({ msg: "Target Book Not Found" });
  }

  book.title = title ?? book.title;
  book.description = description ?? book.description;
  book.comment = comment ?? book.comment;
  book.rating = rating ?? book.rating;
  await book.save();
  res.json(book);
};

export { getAllBooks, getBookById, deleteBookById, registerBook, updateBook };
