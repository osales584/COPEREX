import { body, param } from "express-validator";
import { emailExists, companyExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { deleteFileOnError } from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";


// Validador para crear una empresa
export const createCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre de la empresa es requerido").isLength({ max: 50 }).withMessage("El nombre de la empresa no puede exceder los 50 caracteres"),
    body("email").notEmpty().withMessage("El correo electrónico es requerido").isEmail().withMessage("El formato del correo electrónico no es válido").custom(emailExists), 
    body("description").notEmpty().withMessage("La descripción es requerida").isLength({ max: 200 }).withMessage("La descripción no puede exceder los 200 caracteres"),
    body("phone").notEmpty().withMessage("El número de teléfono es requerido").isLength({ max: 15 }).withMessage("El número de teléfono no puede exceder los 15 caracteres"),
    body("impactLevel").notEmpty().withMessage("El nivel de impacto es requerido").isLength({ max: 50 }).withMessage("El nivel de impacto no puede exceder los 50 caracteres"),
    body("yearsExperience").notEmpty().withMessage("Los años de experiencia son requeridos").isNumeric().withMessage("Los años de experiencia deben ser un número").isLength({ max: 4 }).withMessage("Los años de experiencia no pueden exceder los 4 dígitos"),
    body("location").notEmpty().withMessage("La ubicación es requerida").isLength({ max: 150 }).withMessage("La ubicación no puede exceder los 150 caracteres"),
    validarCampos,
    deleteFileOnError,
    handleErrors
];
