import React, { useState, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from "../Context";
import './CSS/Jobcart.css'; 

function Jobcrt() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [message, setMessage] = useState('');
    const { setJobId } = useContext(Context);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/jobs', {
                title,
                description,
                company,
                salary
            });
            const jobId = response.data._id;
            console.log(jobId);
            setJobId(jobId);
            setMessage('Job created successfully!');
            navigate('/');
        } catch (error) {
            setMessage('Failed to create job. Please try again.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            
            <form className="job-form" onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>
                <div>
                    <label>Company:</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
                </div>
                <div>
                    <label>Salary:</label>
                    <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} required />
                </div>
                <div>
                    <button type="submit">Create Job</button>
                </div>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default Jobcrt;
