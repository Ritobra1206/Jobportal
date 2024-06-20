const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Application = require('../Models/Application');
const Job = require('../Models/Job');

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Apply for job
router.post('/:jobId', upload.single('resume'), async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        const { name, email, age } = req.body;

        // Check if name, email, and age are provided
        if (!name || !email || !age) {
            return res.status(400).json({ message: 'Name, email, and age are required' });
        }

        // Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'Resume file is required' });
        }

        const newApplication = new Application({
            jobId: req.params.jobId,
            name: name,
            email: email,
            age: age,
            resume: req.file.filename, 
            status: 'pending'
        });

        await newApplication.save();
        res.status(201).json(newApplication);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all applications for jobs posted by the logged-in employer
router.get('/applications', async (req, res) => {
    try {
        // Find all applications
        const applications = await Application.find().populate('jobId', 'title');

        res.status(200).json(applications);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
