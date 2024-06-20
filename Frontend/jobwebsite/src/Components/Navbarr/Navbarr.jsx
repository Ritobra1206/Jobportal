import React, { useState, useRef } from "react";

import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbarr() {
    
   
    const [isSidebarVisible, setSidebarVisible] = useState(false);
    

    const crossRef = useRef(null);

    
    const displaysidebar = () => {
        setSidebarVisible(true);
        setTimeout(() => {
            if (crossRef.current) crossRef.current.style.display = 'block';
        }, 200);
    };
    const closeheader = () => {
        setSidebarVisible(false);
        if (crossRef.current) crossRef.current.style.display = 'none';
    };
    const handleLinkClick = () => closeheader();
    
   

    return (
        <>


<div className="navbar">
    <div className={`headerbar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="search-section">
            <ul>
                <li>
                    <Link to='/' onClick={handleLinkClick}>
                        <i className="fa-solid fa-house-chimney"></i>
                    </Link>
                </li>
            </ul>
        </div>
        <div className="contents">
            <ul>
                <li className="list"><Link to='/' onClick={handleLinkClick}>Home</Link></li>
                <li className="list"><Link to='/show' onClick={handleLinkClick}>Show applications</Link></li>
                <li className="list"><Link to='/create' onClick={handleLinkClick}>Create a job</Link></li>
            </ul>
        </div>
    </div>

    <div className="icons">
        <i className="fa-solid fa-bars" onClick={displaysidebar}></i>
        <i className="fa-solid fa-xmark" id="cross" ref={crossRef} onClick={closeheader}></i>
    </div>

    <div className="contents">
        <ul>
            <li className="list"><Link to='/' onClick={handleLinkClick}>Home</Link></li>
            <li className="list"><Link to='/show' onClick={handleLinkClick}>Show applications</Link></li>
            <li className="list"><Link to='/create' onClick={handleLinkClick}>Create a job</Link></li>
        </ul>
    </div>
</div>

                   
           
        </>
    );
}

export default Navbarr;
