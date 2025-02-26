import { Router } from "express";
import { createCompany, updateCompany, getCompanies } from "./company.controller.js";
import { createCompanyValidator, updateCompanyValidator} from "../middlewares/company-validators.js";


const router = Router();

router.post("/createCompany", createCompanyValidator, createCompany);
router.put("/updateCompany/:idCompany", updateCompanyValidator, updateCompany);
router.get("/companies", getCompanies);


export default router;