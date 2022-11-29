import { body } from "express-validator";

const expenseCreateValidation = () => {
  return [
    body("description").isString().withMessage("A descrição é obrigatória."),
    body("value").isNumeric().withMessage("O valor da despesa é obrigatório."),
    body("date").isDate().withMessage("A data de venda é obrigatória!"),
  ];
};

const expenseUpdateValidation = () => {
  return [
    body("description")
      .optional()
      .isString()
      .withMessage("A descrição é obrigatória."),
    body("value")
      .optional()
      .isNumeric()
      .withMessage("O valor da despesa é obrigatório."),
    body("date")
      .optional()
      .isDate()
      .withMessage("A data de venda é obrigatória!"),
  ];
};

const expenseValidations = { expenseCreateValidation, expenseUpdateValidation };
export default expenseValidations;
