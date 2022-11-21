import { body } from "express-validator";

const locatorCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome precisa de no mínimo 5 caracteres."),
  ];
};

const locatorUpdateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("Insira um nome válido.")
      .isLength({ min: 5 })
      .withMessage("O nome precisa de no mínimo 5 caracteres."),
  ];
};

const locatorValidations = { locatorCreateValidation, locatorUpdateValidation };
export default locatorValidations;
