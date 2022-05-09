import React from "react";
import edit from '../assets/images/edit.svg';
import dele from '../assets/images/del.svg';
import './home';
import { withRouter } from "react-router-dom";
import addressservice from '../services/address';



const ContactLayout = (props) => {
    const update= (id) => {
        props.history.push(`registration/${id}`);
    }

    const remove = (id) => {
        addressservice.deleteContact(id).then((response) => {
            console.log(response.data);
            window.location.reload();
        }).catch((error) =>{
            alert(error)
        })
    }
    return (
        <table id="table-display" className="table">
           <tbody>
            <tr key={-1}>
                <th>Employee ID</th>
                <th>Name</th>

                <th>Address</th>
                <th>city</th>
                <th>State</th>
                <th>zip</th>
                <th>Phone number</th>
                <th>Actions</th>
                
            </tr>
            
                {
                    props.contactArray && props.contactArray.map((element, index) =>(
                       <tr key={index}>
                            <td>{element.id}</td>
                            
                            <td>{element.name}</td>
                            <td>{element.address}</td>
                            
                            <td>{element.city}</td>
                            <td>{element.state}</td>
                            <td>{element.zipcode}</td>
                            <td>{element.phonenumber}</td>
                            <td>
                                <img src={edit} alt="edit" onClick={() => update(element.id)}/>
                                <img src={dele} alt="delete" onClick={() => remove(element.id)} />
                            </td>
                       </tr> 
                    ))
                }
                </tbody> 
        </table>
    );
}

export default withRouter(ContactLayout);