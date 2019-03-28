import axios from 'axios';

const ROOT_URL="http://192.168.0.33:3000";

const config = {
    headers: {'x-auth-token': 'Header-Value'}
};

export default {
    async login(regNr) {
        try{
            const response = await axios.post(`${ROOT_URL}/auth/login-car`, {regNr}, config);
            return response;
        } catch (e) {
            const response = {
                error: e.response.data
            };
            return response
        }
    },
}