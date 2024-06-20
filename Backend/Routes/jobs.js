const express = require('express');
const router = express.Router();
const Job = require('../Models/Job');



router.post('/',  async (req, res) => {
    const { title, description, company,  salary } = req.body;
    try {
        const newJob = new Job({
            title,
            description,
            company,
           
            salary,
           
        });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});



router.delete('/:id',  async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


module.exports = router;