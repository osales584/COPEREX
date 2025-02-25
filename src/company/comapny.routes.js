import { Router } from "express";
import { createCompany, updateCompany } from "./company.controller.js";
import { createCompanyValidator, updateCompanyValidator} from "../middlewares/company-validators.js";


const router = Router();

router.post("/createCompany", createCompanyValidator, createCompany);
router.put("/updateCompany/:idCompany", updateCompanyValidator, updateCompany);


export default router;