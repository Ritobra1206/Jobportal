
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('Public'));
app.use(cors());
app.use(cookieParser());
dotenv.config();



mongoose.connect("mongodb://localhost:27017/Jobapplication");


app.use(express.static('Uploads'))

const jobRoutes = require('./Routes/jobs');
const applicationRoutes = require('./Routes/application');
const userroute=require("./Routes/user");


app.use('/jobs', jobRoutes);
app.use('/applications', applicationRoutes);
app.use('/register',userroute);


const PORT=process.env.PORT||8000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
