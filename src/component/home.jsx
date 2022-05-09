import React from "react";
import adduser from '../assets/images/Adduser.png';
import logo from '../assets/images/logo.png';
import {Link} from 'react-router-dom';
import addressservice from '../services/address';
import { useState } from "react";
import { useEffect } from "react";
import ContactLayout from '../component/contact-layout';
import '../component/home.scss';

function Home()
 {
    const [contactArray, setContact] = useState([]);

    const getAllContacts = async () => {
        addressservice.getAllContact().then((person) => {
           
        const allpersons = person.data;
        setContact(allpersons);
       }).catch((error) => {
           alert(error);
       })
    }
    useEffect(() => {
        getAllContacts();
    }, []);
    
    return (
      <div>
        <header class="header-content header">
        <div class="logo-content">
            <img src={logo} alt="" height="40px" width="40px"/>
            <div class="emp-content">
                <span class="emp-text"><strong>ADDRESS</strong></span>
                <span class="emp-text emp-payroll"><strong>BOOK</strong></span>
            </div>
        </div>
    </header>
    <div class="main-content">
        
        <div class="header-content">
            <div class="emp-detail-text"><strong>Person Details</strong>
            
                <div class="emp-count  add-button">{contactArray.length}</div>
            </div>
            <div class="add-botton">
            <Link to="/registration" className="add-button">
            <img src={adduser} alt="no logo!!" />
            </Link>
            </div>
        </div>
        <div class="table-main">
        <ContactLayout contactArray={contactArray} />
        </div> 
       
    </div>
      </div>
    );
  }
  
  export default Home;