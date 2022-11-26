// Types
import { Request, Response } from "express";
// Models
import Locator from "../models/Locator";
import User from "../models/User";

const getLocators = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locators = await Locator.findAll({
    where: { UserId: user.id },
    raw: true,
  });

  return res.json({ locators });
};

const getLocatorById = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locator = await Locator.findOne({ where: { id, UserId: user.id } });
  if (!locator) {
    return res.status(404).json({ errors: ["Locador não encontrado!"] });
  }

  return res.json({ locator });
};

const createLocator = async (req: Request, res: Response) => {
  const { user } = req;
  const { name } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locator = { name, rentNumbers: 0, UserId: user.id };
  const newLocator = await Locator.create(locator);

  return res.status(201).json({ locator: newLocator });
};

const updateLocator = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;
  const { name } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locatorToUpdate = await Locator.findOne({
    where: { id, UserId: user.id },
  });

  if (!locatorToUpdate) {
    return res.status(404).json({ errors: ["Locador não encontrado!"] });
  }

  await locatorToUpdate.update({ name });

  const updatedLocator = locatorToUpdate;

  return res.json({ locator: updatedLocator });
};

const deleteLocator = async (req: Request, res: Response) => {
  const { user } = req;
  const { id } = req.params;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locatorToDelete = await Locator.findOne({
    where: { id, UserId: user.id },
  });

  if (!locatorToDelete) {
    return res.status(404).json({ errors: ["Locador não encontrado!"] });
  }

  await locatorToDelete.destroy();

  res.json({ locator: locatorToDelete });
};

const locatorController = {
  getLocators,
  getLocatorById,
  createLocator,
  updateLocator,
  deleteLocator,
};

export default locatorController;
