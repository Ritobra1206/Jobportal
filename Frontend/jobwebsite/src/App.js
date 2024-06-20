
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Apply from './Pages/Apply';
import Showapplication from './Pages/Showapplication';
import Jobcrt from './Pages/Jobcrt';
import '@fortawesome/fontawesome-free/css/all.css';
import Navbarr from './Components/Navbarr/Navbarr';
import { ToastContainer } from 'react-toastify';
//import Navbarr from './Components/Navbarr/Navbarr';

import { JobIdProvider } from "./Context";
import Register from './Pages/Register';

function App() {
  
  return (
    <>
    <JobIdProvider>
      <Navbarr/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply/:jobId' element={<Apply/>}/>
        <Route path='/show' element={<Showapplication/>}/>
      <Route path='/register' element={<Register/>}/>
        <Route path='/create' element={<Jobcrt/>}/>

      </Routes>
      </JobIdProvider>
      <ToastContainer/>
    </>
   
    
  )
}

export default App;
