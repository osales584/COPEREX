import Company from "../company/company.model.js"

export const emailExists = async (email = "") => {
    const existe = await Company.findOne({ email });
    if (existe) {
        throw new Error(`The email ${email} is already registered`);
    }
}

export const nameExists = async (name = "") => {
    const existe = await Company.findOne({ name });
    if (existe) {
        throw new Error(`The name ${name} is already registered`);
    }
}

export const companyExists = async (id = "") => {
    const existe = await Company.findById(id);
    if (!existe) {
        throw new Error("The company with the provided ID does not exist");
    }
}
