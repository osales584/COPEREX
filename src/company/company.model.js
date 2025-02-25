import { Schema, model } from "mongoose";

const companySchema = new Schema({
    name: {
        type: String,
        required: [true, "Company name is required"],
        maxLength: [50, "Company name cannot exceed 50 characters"]
    },
    category: {
        type: String,
        required: [true, "Business category is required"],
        maxLength: [50, "Business category cannot exceed 50 characters"]
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxLength: [200, "Description cannot exceed 200 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    phone: {
        type: String,  
        required: [true, "Phone number is required"],
        maxLength: [15, "Phone number cannot exceed 15 characters"]
    },
    impactLevel: {
        type: String,  
        required: [true, "Impact level is required"],
        maxLength: [50, "Impact level cannot exceed 50 characters"]
    },
    yearsExperience: {
        type: Number,  
        required: [true, "Years of experience is required"],
        min: [0, "Years of experience cannot be negative"],
        max: [100, "Years of experience cannot exceed 100 years"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        maxLength: [150, "Location cannot exceed 150 characters"]
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Company', companySchema);
