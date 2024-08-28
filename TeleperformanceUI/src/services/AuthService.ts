import axios from 'axios';
import { LoginModel } from '@/models/LoginModel';
import { RegisterModel } from '@/models/RegisterModel';

const API_URL = 'https://localhost:7250/api/Auth/';

class AuthService {
  async login(loginModel: LoginModel) {
    const response = await axios.post(`${API_URL}login`, loginModel);
    return response.data;
  }

  async register(registerModel: RegisterModel) {
    const response = await axios.post(`${API_URL}register`, registerModel);
    return response.data;
  }
}

export default new AuthService();
