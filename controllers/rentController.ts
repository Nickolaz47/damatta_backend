// Types
import { Request, Response } from "express";
// Models
import Locator from "../models/Locator";
import Renter from "../models/Renter";
import Rent from "../models/Rent";
import User from "../models/User";

const getRents = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rentsData = await Rent.findAll({
    include: [Locator, Renter],
    where: { UserId: user.id },
  });
  const rents = rentsData.map((rent) => rent.get({ plain: true }));

  return res.json({ rents });
};

const createRent = async (req: Request, res: Response) => {
  const { user } = req;
  const { value, dueDate, payday, LocatorId, RenterId } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locatorExists = await Locator.findOne({
    where: { id: LocatorId, UserId: user.id },
  });
  if (!locatorExists) {
    res.status(404).json({ errors: ["Locador não encontrado!"] });
  }

  const renterExists = await Renter.findOne({
    where: { id: RenterId, UserId: user.id },
  });
  if (!renterExists) {
    res.status(404).json({ errors: ["Inquilino não encontrado!"] });
  }

  const rent = { value, dueDate, payday, LocatorId, RenterId, UserId: user.id };
  const newRent = await Rent.create(rent);

  return res.status(201).json({ rent: newRent });
};

const updateRent = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { value, dueDate, payday, LocatorId, RenterId } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locatorExists = await Locator.findOne({
    where: { id: LocatorId, UserId: user.id },
  });
  if (!locatorExists) {
    res.status(404).json({ errors: ["Locador não encontrado!"] });
  }

  const renterExists = await Renter.findOne({
    where: { id: RenterId, UserId: user.id },
  });
  if (!renterExists) {
    res.status(404).json({ errors: ["Inquilino não encontrado!"] });
  }

  const rentToUpdate = await Rent.findOne({ where: { id, UserId: user.id } });
  if (!rentToUpdate) {
    return res.status(404).json({ errors: ["Aluguel não encontrado!"] });
  }

  await rentToUpdate.update({ value, dueDate, payday, LocatorId, RenterId });

  return res.json({ rent: rentToUpdate });
};

const deleteRent = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rentToDelete = await Rent.findOne({ where: { id, UserId: user.id } });
  if (!rentToDelete) {
    return res.status(404).json({ errors: ["Aluguel não encontrado!"] });
  }

  await rentToDelete.destroy();

  return res.json({ rent: rentToDelete });
};

const rentController = { getRents, createRent, updateRent, deleteRent };
export default rentController;
