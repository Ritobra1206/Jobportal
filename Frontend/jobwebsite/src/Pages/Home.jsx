import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import './CSS/Home.css';
import { useNavigate } from "react-router-dom";
import { Context } from "../Context";

function Home() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const { setJobId } = useContext(Context); 

    useEffect(() => {
        axios.get('http://localhost:8000/jobs')
            .then(response => {
                setJobs(response.data);
                const jobId = response.data._id;
                setJobId(jobId); // Set the jobId in the context
                

            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
            
    }, []);

    const handleApply = (jobId) => {
        setJobId(jobId); // Set the jobId in the context
        navigate(`/apply/${jobId}`);
    };

    return (
        //this is the home page
        <div className="jobs-container">
            <h1>All Jobs</h1>
            <div className="jobs-grid">
                {jobs.map(job => (
                    <div key={job._id} className="job-box">
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>Company: {job.company}</p>
                        <p>Salary: {job.salary}</p>
                       
                        <button onClick={() => handleApply(job._id)}>Apply</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
