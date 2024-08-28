import axios from 'axios';

const API_URL = 'https://localhost:7250/api';

// Authentication API
export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/Auth/login`, { email, password });
  return response.data; 
}

export async function register(username: string, email: string, password: string, role: string) {
  const response = await axios.post(`${API_URL}/Auth/register`, { username, email, password, role });
  return response.data; 
}
// Employee API
export async function getEmployees() {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/employees`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data; // Array of employees
}

export async function getEmployee(id: number) {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data; // Employee object
}

export async function createEmployee(employeeData: FormData) {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/employees`, employeeData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data; // Created employee
}

export async function updateEmployee(id: number, employeeData: FormData) {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/employees/${id}`, employeeData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data; // Updated employee
}

export async function deleteEmployee(id: number) {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/employees/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data; // Confirmation of deletion
}
