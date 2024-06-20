import React  from "react";
import {useFormik} from "formik";
import { signUpSchema } from "../schemas/validation";
import axios from "axios";
import { toast } from "react-toastify";
function Register(){
  const initialValues={

    //write the exact name attributes from html
    name:" ",
    email: "",
    password: "",
    phone: " "


  }
    const {values,errors,touched,handleChange,handleBlur,handleSubmit}=useFormik({
        initialValues:initialValues,
        validationSchema:signUpSchema,
        onSubmit:async(values,action)=>{
          try{
            const response = await axios.post('http://localhost:8000/register/register', values);
            toast.success("Register succesfully");
            console.log(response.data);
           
            action.resetForm();
          }
          catch (error) {
            console.error("There was an error registering the user!", error);
            toast.error("Something went wrong ");
          }
         
          
        }
        
    })
    return(
        <>
         <div className="registration">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
           
          />
          {errors.name && touched.name ? (
                      <p className="form-error">{errors.name}</p>
                    ) : null}
        </div>
        
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          
          />
          {errors.email && touched.email ? (
                      <p className="form-error">{errors.email}</p>
                    ) : null}
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
      
          />
          {errors.phone && touched.phone ? (
                      <p className="form-error">{errors.phone}</p>
                    ) : null}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          
          />
          {errors.password && touched.password ? (
                      <p className="form-error">{errors.password}</p>
                    ) : null}
        </div>
        <button type="submit">Register</button>
      </form>
    
    </div>
        </>
    )
}
export default Register;