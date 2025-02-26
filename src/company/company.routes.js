import { Router } from "express";
import { createCompany, updateCompany, getCompanies, generateReport} from "./company.controller.js";
import { createCompanyValidator, updateCompanyValidator, getCompaniesValidator, generateReportValidator} from "../middlewares/company-validators.js";


const router = Router();

router.post("/createCompany", createCompanyValidator, createCompany);
router.put("/updateCompany/:idCompany", updateCompanyValidator, updateCompany);
router.get("/companies", getCompaniesValidator ,getCompanies);
router.get("/generateReport", generateReportValidator, generateReport);

export default router;