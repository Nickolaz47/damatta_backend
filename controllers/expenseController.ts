// Types
import { Request, Response } from "express";
// Models
import Expense from "../models/Expense";
import User from "../models/User";

const getExpenses = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const expenses = await Expense.findAll({ where: { UserId: user.id } });
  return res.json(expenses);
};

const getExpenseById = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const expense = await Expense.findOne({ where: { id, UserId: user.id } });
  if (!expense) {
    return res.status(404).json({ errors: ["Despesa não encontrada!"] });
  }

  return res.json(expense);
};

const createExpense = async (req: Request, res: Response) => {
  const { user } = req;
  const { description, value, date } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const expense = { description, value, date, UserId: user.id };
  const newExpense = await Expense.create(expense);

  return res.status(201).json(newExpense);
};

const updateExpense = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { description, value, date } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const expenseToUpdate = await Expense.findOne({
    where: { id, UserId: user.id },
  });

  if (!expenseToUpdate) {
    return res.status(404).json({ errors: ["Despesa não encontrada!"] });
  }

  await expenseToUpdate.update({ description, value, date });
  return res.json(expenseToUpdate);
};

const deleteExpense = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const expenseToDelete = await Expense.findOne({
    where: { id, UserId: user.id },
  });

  if (!expenseToDelete) {
    return res.status(404).json({ errors: ["Despesa não encontrada!"] });
  }

  await expenseToDelete.destroy();
  return res.json(expenseToDelete);
};

const expenseController = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
export default expenseController;
