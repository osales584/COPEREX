import ExcelJS from "exceljs";
import Company from "../company/company.model.js"
import fs from "fs";
import { join, dirname} from "path"
import { fileURLToPath } from "url"
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url))

export const createCompany = async (req, res) => {
    try {
        const { name, category, description, email, phone, impactLevel, yearsExperience, location } = req.body;

        // Creación del nuevo objeto Company
        const newCompany = new Company({
            name,
            category,
            description,
            email,
            phone,
            impactLevel,
            yearsExperience,
            location
        });

        await newCompany.save();

        return res.status(201).json({
            success: true,
            message: "Empresa creada exitosamente",
            company: newCompany
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar los datos de la empresa",
            error: err.message
        });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { idCompany } = req.params;
        const  data  = req.body;
         
        const company = await Company.findById(idCompany);

        if(!company){
            return res.status(404).json({
                success: false,
                message: "Empresa no encontrada"
            })
        }

        const updateCompany = await Company.findByIdAndUpdate(idCompany, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Empresa Actualizada',
            company: updateCompany,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar empresa',
            error: err.message
        });
    }
}

export const getCompanies = async (req, res) => {
    try {
        const { desde = 0, filtro, category } = req.query;
        const query = {};

        if (category) {
            query.category = category;
        }

        let sortOptions = {};
        switch (filtro) {
            case "trayectoria":
                sortOptions = { yearsExperience: -1 }; // Mayor a menor trayectoria
                break;
            case "A-Z":
                sortOptions = { name: 1 }; // Orden alfabético ascendente
                break;
            case "Z-A":
                sortOptions = { name: -1 }; // Orden alfabético descendente
                break;
            default:
                sortOptions = {}; 
        }

        const [total, companies] = await Promise.all([
            Company.countDocuments(query),
            Company.find(query)
                .sort(sortOptions)
                .skip(Number(desde)) 
        ]);

        return res.status(200).json({
            success: true,
            total,
            companies
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        });
    }
};

export const generateReport = async (req, res) => {
    try {
        const companies = await Company.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Companies Report');

        // Definir las cabeceras del reporte
        worksheet.columns = [
            { header: 'ID', key: '_id', width: 25 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Category', key: 'category', width: 20 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 20 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Years Experience', key: 'yearsExperience', width: 20 },
            { header: 'Location', key: 'location', width: 50 }
        ];

        // Llenar las filas del reporte con los datos de las empresas
        companies.forEach(company => {
            worksheet.addRow({
                _id: company._id.toString(),
                name: company.name,
                category: company.category,
                description: company.description,
                email: company.email,
                phone: company.phone,
                impactLevel: company.impactLevel,
                yearsExperience: company.yearsExperience,
                location: company.location
            });
        });

        const reportsExcel = path.join(__dirname, '../../public/uploads/', 'reports'); 
        if (!fs.existsSync(reportsExcel)) {
            fs.mkdirSync(reportsExcel, { recursive: true }); 
        }

        const fileName = `companies-report-${Date.now()}.xlsx`;
        const filePath = path.join(reportsExcel, 'companies-report.xlsx');

        await workbook.xlsx.writeFile(filePath);

        const fileUrl = `/uploads/reports/${fileName}`;

        res.json({
            success: true,
            message: "Reporte generado correctamente",
            fileUrl
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error al generar el reporte',
            error: err.message
        });
    }
};