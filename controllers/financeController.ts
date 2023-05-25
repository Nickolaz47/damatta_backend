// Types
import { Request, Response } from "express";
import { Op } from "sequelize";
// Models
import User from "../models/User";
import Rent from "../models/Rent";
import Sale from "../models/Sale";
import Expense from "../models/Expense";
import RentHistoric from "../models/RentHistoric";

const getBalance = async (req: Request, res: Response) => {
  const { user } = req;

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rents = await Rent.findAll({
    where: {
      UserId: user.id,
      payday: { [Op.gte]: firstDay, [Op.lte]: lastDay },
    },
    raw: true,
  });
  const rentsTotal = rents.reduce((acc, rent) => acc + rent.value * 0.1, 0);

  const expenses = await Expense.findAll({
    where: {
      UserId: user.id,
      date: { [Op.gte]: firstDay, [Op.lte]: lastDay },
    },
    raw: true,
  });
  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );

  const sales = await Sale.findAll({
    where: { UserId: user.id, date: { [Op.gte]: firstDay, [Op.lte]: lastDay } },
    raw: true,
  });
  const salesTotal = sales.reduce((acc, sale) => acc + sale.commission, 0);

  const balance = [
    { name: "Aluguéis", total: rentsTotal },
    { name: "Vendas", total: salesTotal },
    { name: "Despesas", total: expensesTotal },
  ];

  return res.json(balance);
};

const getTotalBalance = async (req: Request, res: Response) => {
  const { user } = req;

  // Get the current date
  const currentDate = new Date();
  // Calculate the start date of the current month
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );

  const expenses = await Expense.findAll({
    where: {
      UserId: user.id,
      date: {
        [Op.lt]: startOfMonth,
      },
    },
    raw: true,
  });
  const expensesTotal = expenses.reduce(
    (acc, expense) => acc + expense.value,
    0
  );

  const sales = await Sale.findAll({
    where: { UserId: user.id,    
      date: {
      [Op.lt]: startOfMonth,
    }, },
    raw: true,
  });
  const salesTotal = sales.reduce((acc, sale) => acc + sale.commission, 0);

  const rentHistoricData = await RentHistoric.findAll({
    where: { UserId: user.id },
  });
  const rentHistoricTotal = rentHistoricData.reduce(
    (acc, rentHistoricData) => acc + rentHistoricData.value * 0.1,
    0
  );

  const balanceTotal = {
    balanceTotal: rentHistoricTotal + salesTotal - expensesTotal,
  };

  res.json(balanceTotal);
};

const financeController = { getBalance, getTotalBalance };
export default financeController;
