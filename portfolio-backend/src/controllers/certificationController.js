import Certification from '../models/Certification.js';

// GET all certifications
export const getAllCertification = async (req, res) => {
    try {
        const certifications = await Certification.find();
        res.status(200).json(certifications);
    } catch (error) {
        res.status(500).json({ message: "Error during getting certifications list." })
    }
}

// GET a single certification by ID
export const getCertificationById = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) {
            return res.status(404).json({ message: "Certification not found." })
        }
        res.status(200).json(certification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Create a new certification
export const createCertification = async (req, res) => {
    try {
        const certification = new Certification(req.body);
        const savedCertification = await certification.save();
        res.status(201).json(savedCertification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Update a certification
export const updateCertification = async (req, res) => {
    try {
        const updatedCertification = await Certification.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidator: true }
        );
        if (!updatedCertification) {
            return res.status(404).json({ message: 'Certification not found.' });
        }
        res.status(200).json(updatedCertification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// Delete a certification
export const deleteCertification = async (req, res) => {
    try {
        const deletedCertification = await Certification.findByIdAndDelete(req.params.id);
        if (!deletedCertification) {
            return res.status(404).json({ message: 'Certification not found' });
        }
        res.status(200).json({ message: 'Certification deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};