// Types
import { Request, Response } from "express";
// Models
import Locator from "../models/Locator";
import User from "../models/User";
// Helper
import titleCase from "../helpers/titleCase";

const getLocators = async (req: Request, res: Response) => {
  const { user } = req;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const locators = await Locator.findAll({
    where: { UserId: user.id },
    raw: true,
    order: [['name', 'ASC']]
  });

  return res.json(locators);
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

  return res.json(locator);
};

const createLocator = async (req: Request, res: Response) => {
  const { user } = req;
  const { name } = req.body;

  const userExists = await User.findOne({ where: { id: user.id } });
  if (!userExists) {
    return res.status(404).json({ errors: ["Usuário não encontrado!"] });
  }

  const standardizedName = titleCase(name);

  const locatorExists = await Locator.findOne({
    where: { name: standardizedName },
  });
  if (locatorExists) {
    return res.status(409).json({ errors: ["O locador já existe!"] });
  }

  const locator = { name: standardizedName, rentNumbers: 0, UserId: user.id };
  const newLocator = await Locator.create(locator);

  return res.status(201).json(newLocator);
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

  await locatorToUpdate.update({ name: titleCase(name) });

  const updatedLocator = locatorToUpdate;

  return res.json(updatedLocator);
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

  if (locatorToDelete.rentNumbers > 0) {
    return res.status(409).json({
      errors: [
        "Locador não pode ser deletado pois está associado a um aluguel.",
      ],
    });
  }

  await locatorToDelete.destroy();

  return res.json(locatorToDelete);
};

const locatorController = {
  getLocators,
  getLocatorById,
  createLocator,
  updateLocator,
  deleteLocator,
};

export default locatorController;
