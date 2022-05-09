import React from "react";
import logo from '../assets/images/logo.png';
import '../component/registration.scss';
import { useState } from "react";
import{Link} from 'react-router-dom';
import addressservice from '../services/address';
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Registration=(props)=> {
  const [user,setUser]=useState({
    name:'',
    address:'',
    city:'',
    state:'',
    zipcode:'',
    phonenumber:'',
    id: '',
    isUpdate: false,
    
});
const handleInput = async event => {  
  setUser({ ...user, [event.target.name]: event.target.value })
  console.log(event.target.value)
}
let initialError = {
  name: '',
  address: '',
  city: '',
  state: '',
  phonenumber: '',
  zipcode: '',
}
const [valueerror, setError] = useState(initialError);
const validateData = () => {
  let error = valueerror;
  if (!user.name.match('^[A-Z]{1}[a-zA-Z ]{2,}()[A-Z]{1}[a-zA-Z ]{2,}$')) {
      error.name = "Invalid name";
  }
  else {
      error.name = "";
  }

  if (!user.address.match('^[a-zA-Z0-9#,& ]{4,}$')){
      error.address = "Invalid address";
  }
  else {
      error.address = "";
  }

  if (!user.phonenumber.match('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')) {
      error.phonenumber = "Invalid PHONE NUMBER"
  }
  else {
      error.phonenumber = "";
  }

  if (!user.zipcode.match('^[0-9 ]{5,10}$')) {
      error.zipcode = "Invalid ZIP CODE";
  }
  else {
      error.zipcode = "";
  }

   setError(error);
 }
 
useEffect(() => {
  validateData()
   
}, [user]);
 
const setData = (obj) => {
  
  setUser({
       ...user,
       ...obj,
       id: obj.id,
       name: obj.name,
       address:obj.address,
       city:obj.city,
       state:obj.state,
       zipcode:obj.zipcode,
       phonenumber:obj.phonenumber,
       isUpdate: true,
      
       
   });
}
const params = useParams();
    const getContactByID = (id) => {
      addressservice.getContact(id).then((response) => {
            let obj = response.data;
            console.log(obj);
            setData(obj);
        }).catch((error) => {
            alert(error);
        });
    }
    useEffect(() => {
      if (params.id) {
        getContactByID(params.id);
      }
  }, []);

const handleSubmit = async (event) => {
  console.log(user) 
 // localStorage.setItem('contact', JSON.stringify(user));
  event.preventDefault();
  if (await  validateData()) {
    return;
}
let object ={
  name:user.name,
  address:user.address,
  city:user.city,
  state:user.state,
  zipcode:user.zipcode,
  phonenumber:user.phonenumber,
  id:user.id
}
if (user.isUpdate) {
  addressservice.updateContact(params.id, object).then((response) => {
      props.history.push('');
  }).catch((error) => {
      alert(error);
  })
}
else {
addressservice.addContact(object).then(data =>{
  console.log("data added")
  props.history.push(' ')
}).catch(error =>{
  console.log("error while added")
})
}  
}



  return (
    <div>
<header className="header-content header">
    <div className="logo-content">
      <img src={logo} alt="logo" height="50px" width="50px" />
      <div>
        <span className="addressBook-text">Address</span><br />
        <span className="addressBook-text addressBook-book">Book</span>
      </div>
    </div>
  </header>
  <div className="form-content">
        <form className="form" action="#" onreset="resetButton()" onSubmit={handleSubmit}>
            <div className="form-head">PERSON ADDRESS BOOK</div>
            <div className="row-content row-content-new">
     
                <label for="name" className="label text"></label>
                <input type="text" name="name" id="name" class="input" placeholder="Your Full Name" value={user.name} onChange={handleInput} required/>
                  <error-output className="texterror">{valueerror.name}</error-output>  

            </div> 
            <div className="row-content row-content-new">
                <label className="label text" for="address"></label>
                <textarea id="address" className="input" name="address" placeholder="Address"  value={user.address} onChange={handleInput} required ></textarea>
                <error-output className="texterror">{valueerror.address}</error-output>
            </div>
            <div className="city-state-zip-container">
                <div className="row-content1 row-content-new">
                    <label className="label text" for="City">City</label>
                    <div id="city-state-content">
                        <select name="city" id="city" value={user.city} onChange={handleInput} required>
                            <option selected  value="Select City">Select City</option>
                            <option value="Bengaluru">Bengaluru</option>
                            <option value="Mandya">Mandya</option>
                            <option value="Mysore">Mysore</option>
                            <option value="Hassan">Hassan</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Vishaakpatanam">Vishaakpatanam</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                            <option value="Panaji">Panaji</option>
                            <option value="Noida">Noida</option>
                            </select>
                            {/* <error-output className="texterror">{user.error.city}</error-output> */}
                    </div>
                </div>
                <div className="row-content1 row-content-new ">
                    <label className="label text" for="state">State</label>
                    <div id="city-state-content">
                        <select name="state" id="state" className="form-control" value={user.state} onChange={handleInput} required >
                        <option selected  value="Select State">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        </select>
                        {/* <error-output className="texterror">{user.error.state}</error-output> */}
                    </div>
                </div>
                <div className="row-content1 row-content-new">
                    <label for="zipcode" className="label text">Zip Code</label>
                    <input type="zipcode" name="zipcode" id="zipcode" className="input" placeholder="zip code" value={user.zipcode} onChange={handleInput} required  />
                </div>
                <error-output className="texterror">{valueerror.zipcode}</error-output>
            </div>
            <div className="row-content row-content-new">
                <label for="phonenumber" className="label text"></label>
                <input type="phonenumber" name="phonenumber" id="phonenumber" className="input" placeholder="phone Number" value={user.phonenumber} onChange={handleInput} required />
                <error-output className="texterror">{valueerror.phonenumber}</error-output>
            </div>
            <div className="buttonParent">
            <Link to="/" className="resetButton button cancelButton">Cancel</Link>
                <div className="submit-reset">
                <button type="submit" className="button submitButton" id="submitButton">{user.isUpdate ? 'Update' : 'Submit'}</button>
                    <button type="reset" className="resetButton button">Reset</button>
                </div>
            </div>
        </form>
    </div>

  </div>
  );
}

export default Registration;