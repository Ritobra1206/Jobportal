import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../Context";
import { useNavigate } from "react-router-dom";
import "./CSS/Apply.css"; 

function Apply() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");
  const { jobId } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("age", age);
      formData.append("resume", resume);

      const response = await axios.post(
        `http://localhost:8000/applications/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/show");
    } catch (error) {
      setMessage("Failed to submit application. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      
      <form className="apply-form" onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Resume:</label>
          <input
            accept=".pdf"
            type="file"
            onChange={(e) => setResume(e.target.files[0])}
            required
          />
        </div>
        <div>
          <button type="submit">Apply</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Apply;
