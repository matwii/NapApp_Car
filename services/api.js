import axios from 'axios';
import { HOST }from '../config/config'

const config = {
    headers: {'x-auth-token': 'Header-Value'}
};

export default {
    async login(regNr) {
        try{
            const response = await axios.post(`${HOST}/auth/login-car`, {regNr}, config);
            return response;
        } catch (e) {
            const response = {
                error: e.response.data
            };
            return response
        }
    },
    async updateCarPosition(id, token, latitude, longitude){
        try{
            const response = await axios.put(`${HOST}/car/${id}`, {token, latitude, longitude}, config);
            return response
        } catch (e) {
            const response = {
                error: e.response.data
            };
            return response
        }
    }
}