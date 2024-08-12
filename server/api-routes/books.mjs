import express from "express";
import { body } from "express-validator";
import {
  getAllBooks,
  getBookById,
  deleteBookById,
  registerBook,
  updateBook,
} from "../controllers/books.mjs";

const router = express.Router();

const requestErrorHandler = (controller) => {
  return async (req, res, next) => {
    try {
      return await controller(req, res);
    } catch (err) {
      next(err);
    }
  };
};

router.get("/", requestErrorHandler(getAllBooks));

router.post(
  "/",
  body("title").notEmpty(),
  body("description").notEmpty(),
  body("comment").notEmpty(),
  body("rating").notEmpty().isInt({ min: 1, max: 5 }),
  requestErrorHandler(registerBook)
);

router.get("/:id", requestErrorHandler(getBookById));

router.delete("/:id", requestErrorHandler(deleteBookById));

router.patch(
  "/:id",
  body("title").optional(),
  body("description").optional(),
  body("comment").optional(),
  body("rating").optional().isInt({ min: 1, max: 5 }),
  requestErrorHandler(updateBook)
);

export default router;
