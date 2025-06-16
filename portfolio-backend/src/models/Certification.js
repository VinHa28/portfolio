import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
    certCode: { type: String, unique: true },
    title: { type: String, require: true },
    organization: String,
    description: String,
    dateIssued: Date,
    certificateUrl: String,
    image: String,
    tags: [String],
    type: String,
    isHighlighted: Boolean,
}, {
    timestamps: true,
})

const Certification = mongoose.model('Certification', certificationSchema);
export default Certification;