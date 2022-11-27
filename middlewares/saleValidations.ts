import { body } from "express-validator";

const saleCreateValidation = () => {
  return [
    body("seller")
      .isString()
      .withMessage("O nome do vendedor é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome do vendedor precisa de no mínimo 5 caracteres."),
    body("buyer")
      .isString()
      .withMessage("O nome do comprador é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome do comprador precisa de no mínimo 5 caracteres."),
    body("value").isNumeric().withMessage("O valor da venda é obrigatório."),
    body("commission")
      .isNumeric()
      .withMessage("O valor da comissão é obrigatório."),
    body("agent")
      .isString()
      .withMessage("O nome do corretor é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome do corretor precisa de no mínimo 5 caracteres."),
    body("date").isDate().withMessage("A data de venda é obrigatória!"),
  ];
};

const saleUpdateValidation = () => {
  return [
    body("seller")
      .optional()
      .isString()
      .withMessage("O nome do vendedor é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome do vendedor precisa de no mínimo 5 caracteres."),
    body("buyer")
      .optional()
      .isString()
      .withMessage("O nome do comprador é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome do comprador precisa de no mínimo 5 caracteres."),
    body("value")
      .optional()
      .isNumeric()
      .withMessage("O valor da venda é obrigatório."),
    body("commission")
      .optional()
      .isNumeric()
      .withMessage("O valor da comissão é obrigatório."),
    body("agent")
      .optional()
      .isString()
      .withMessage("O nome do corretor é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome do corretor precisa de no mínimo 5 caracteres."),
    body("date")
      .optional()
      .isDate()
      .withMessage("A data de venda é obrigatória!"),
  ];
};

const saleValidations = { saleCreateValidation, saleUpdateValidation };
export default saleValidations;
