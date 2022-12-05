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
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rentsData = await Rent.findAll({
    include: [Locator, Renter],
    where: { UserId: user.id },
  });
  const rents = rentsData.map((rent) => rent.get({ plain: true }));

  return res.json(rents);
};

const getRentById = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rent = await Rent.findOne({ where: { id, UserId: user.id } });
  if (!rent) {
    return res.status(404).json({ errors: ["Aluguel não encontrado!"] });
  }

  return res.json(rent);
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
    return res.status(404).json({ errors: ["Locador não encontrado!"] });
  }

  const renterExists = await Renter.findOne({
    where: { id: RenterId, UserId: user.id },
  });
  if (!renterExists) {
    return res.status(404).json({ errors: ["Inquilino não encontrado!"] });
  }

  const rentExists = await Rent.findOne({ where: { LocatorId, RenterId } });
  if (rentExists) {
    return res.status(409).json({ errors: ["O aluguel já existe!"] });
  }

  const rent = { value, dueDate, payday, LocatorId, RenterId, UserId: user.id };
  const newRent = await Rent.create(rent);

  const rentNumbers = await Rent.count({
    where: { UserId: user.id, LocatorId },
  });

  await locatorExists.update({ rentNumbers });

  return res.status(201).json(newRent);
};

const updateRent = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { value, dueDate, payday, LocatorId, RenterId } = req.body;
  console.log(user);
  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  if (LocatorId) {
    const locatorExists = await Locator.findOne({
      where: { id: LocatorId, UserId: user.id },
    });
    if (!locatorExists) {
      return res.status(404).json({ errors: ["Locador não encontrado!"] });
    }
  }

  if (RenterId) {
    const renterExists = await Renter.findOne({
      where: { id: RenterId, UserId: user.id },
    });
    if (!renterExists) {
      return res.status(404).json({ errors: ["Inquilino não encontrado!"] });
    }
  }

  const rentToUpdate = await Rent.findOne({ where: { id, UserId: user.id } });
  if (!rentToUpdate) {
    return res.status(404).json({ errors: ["Aluguel não encontrado!"] });
  }

  await rentToUpdate.update({ value, dueDate, payday, LocatorId, RenterId });

  return res.json(rentToUpdate);
};

const deleteRent = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const rentToDelete = await Rent.findOne({ where: { id, UserId: user.id } });
  if (!rentToDelete) {
    return res.status(404).json({ errors: ["Aluguel não encontrado!"] });
  }

  await rentToDelete.destroy();

  return res.json(rentToDelete);
};

const rentController = {
  getRents,
  getRentById,
  createRent,
  updateRent,
  deleteRent,
};
export default rentController;
