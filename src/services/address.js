import config from '../config/config'
import axios from "axios";
class AddressService{
    baseURL=config.baseURL;
    
    addContact(data){
        console.log("add a member")
        return axios.post(`${this.baseURL}contact`,data);
    }
    getAllContact(){
        return axios.get(`${this.baseURL}contact`);
    } 
    getContact(contactID) {
        return axios.get(`${this.baseURL}contact/${contactID}`);
    }
    
    updateContact(contactID,data) {
        return axios.put(`${this.baseURL}contact/${contactID}`, data);
    }
    
    deleteContact(contactID) {
        return axios.delete(`${this.baseURL}contact/${contactID}`);
    }
    
}

export default new AddressService();