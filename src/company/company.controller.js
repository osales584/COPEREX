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
