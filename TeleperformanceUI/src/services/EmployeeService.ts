import axios from 'axios';
import { Employee } from '@/models/Employee';

const API_URL = 'https://localhost:7250/api/employees';

class EmployeeService {
  getEmployees() {
    return axios.get<Employee[]>(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  getEmployee(id: number) {
    return axios.get<Employee>(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  createEmployee = async (employee: Employee) => {
    try {
        console.log('xxxxx',employee)
      const formData = new FormData();
      formData.append('userName', employee.userName);
      formData.append('email', employee.email);
      formData.append('phoneNumber', employee.phoneNumber);
      formData.append('educationLevel', employee.educationLevel);
      formData.append('imagePath', employee.imagePath);
      formData.append('userId', employee.userId);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
  
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Indicate that the request contains form data
        }
      });
  
      return response;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };

  updateEmployee(id: number, employee: Employee) {
    return axios.put(`${API_URL}/${id}`, employee, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }

  deleteEmployee(id: number) {
    return axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  }
}

export default new EmployeeService();
