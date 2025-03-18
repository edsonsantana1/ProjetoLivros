import { Request, Response } from 'express';
import Book, { IBook } from '../models/Book';

// Criar um livro
export const createBook = async (req: Request, res: Response) => {
  try {
    const book: IBook = new Book(req.body);
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o livro' });
  }
};

// Obter todos os livros
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter os livros' });
  }
};

// Obter livro por ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o livro' });
  }
};

// Atualizar livro
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ error: 'Livro não encontrado' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o livro' });
  }
};

// Excluir livro
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Livro não encontrado' });
    res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o livro' });
  }
};
