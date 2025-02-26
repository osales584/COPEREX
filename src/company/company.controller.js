import Company from "../company/company.model.js"

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
