import React, { useState, useEffect } from "react";
import axios from 'axios';
import './CSS/Showapplication.css'; 

function Showapplications() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:8000/applications/applications');
                console.log(response.data);
                setApplications(response.data);
            } catch (error) {
                setError('Error fetching applications. Please try again.');
                console.error('Error fetching applications:', error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div className="applications-container">
            <h2>All Applications</h2>
            {error && <p>{error}</p>}
            <div className="application-grid">
                {applications.map(application => (
                    <div key={application._id} className="application-box">
                        <h3>{application.jobId.title}</h3>
                        <h3>{application.name}</h3>
                        <p><strong>Email:</strong> {application.email}</p>
                        <p><strong>Age:</strong> {application.age}</p>
                        <p><strong>Resume:</strong> <a href={`http://localhost:8000/${application.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a></p>
                        <p><strong>Status:</strong> {application.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Showapplications;
