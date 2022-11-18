import { body } from "express-validator";

const authCreationValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O nome precisa de no mínimo 5 caracteres."),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória.")
      .isLength({ min: 10 })
      .withMessage("A senha precisa de no mínimo 10 caracteres."),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação da senha é obrigatória.")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

const authLoginValidation = () => {
  return [
    body("name").isString().withMessage("Insira um nome válido."),
    body("password").isString().withMessage("Insira a senha."),
  ];
};

const authValidations = { authCreationValidation, authLoginValidation };
export default authValidations;
