<template>
    <div>
      <!-- Error message -->
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
  
      <!-- Add Employee Button -->
      <button class="btn btn-primary mb-3" @click="openAddModal">Add Employee</button>
  
      <!-- Employees Table -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>UserName</th>
            <th>Email</th>
            <th>PhoneNumber</th>
            <th>EducationLevel</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.userName }}</td>
            <td>{{ employee.email }}</td>
            <td>{{ employee.phoneNumber }}</td>
            <td>{{ employee.educationLevel }}</td>
            <td>
              <button class="btn btn-info btn-sm" @click="viewDetails(employee)">Details</button>
              <button class="btn btn-warning btn-sm" @click="editEmployee(employee)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="confirmDelete(employee)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add Employee Modal -->
      <div class="modal fade" id="addEmployeeModal" tabindex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="addEmployeeModalLabel">Add Employee</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="addEmployee">
                <div class="mb-3">
                  <label for="userName" class="form-label">UserName</label>
                  <input type="text" id="userName" v-model="newEmployee.userName" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" v-model="newEmployee.email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label">PhoneNumber</label>
                  <input type="text" id="phoneNumber" v-model="newEmployee.phoneNumber" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="educationLevel" class="form-label">EducationLevel</label>
                  <input type="text" id="educationLevel" v-model="newEmployee.educationLevel" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="imagePath" class="form-label">Image Path</label>
                  <input type="text" id="imagePath" v-model="newEmployee.imagePath" class="form-control" />
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Details Modal -->
      <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="detailsModalLabel">Employee Details</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p><strong>UserName:</strong> {{ selectedEmployee?.userName || 'N/A' }}</p>
              <p><strong>Email:</strong> {{ selectedEmployee?.email || 'N/A' }}</p>
              <p><strong>PhoneNumber:</strong> {{ selectedEmployee?.phoneNumber || 'N/A' }}</p>
              <p><strong>EducationLevel:</strong> {{ selectedEmployee?.educationLevel || 'N/A' }}</p>
              <img v-if="selectedEmployee?.imagePath" :src="selectedEmployee.imagePath" class="img-fluid" alt="Employee Image" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Edit Modal -->
      <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="updateModalLabel">Edit Employee</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="updateEmployee">
                <div class="mb-3">
                  <label for="userName" class="form-label">UserName</label>
                  <input type="text" id="userName" v-model="selectedEmployeeModel.userName" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" id="email" v-model="selectedEmployeeModel.email" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="phoneNumber" class="form-label">PhoneNumber</label>
                  <input type="text" id="phoneNumber" v-model="selectedEmployeeModel.phoneNumber" class="form-control" required />
                </div>
                <div class="mb-3">
                  <label for="educationLevel" class="form-label">EducationLevel</label>
                  <input type="text" id="educationLevel" v-model="selectedEmployeeModel.educationLevel" class="form-control" required />
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this employee?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-danger" @click="deleteEmployee">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import EmployeeService from '@/services/EmployeeService';
import * as bootstrap from 'bootstrap';
import { Employee } from '@/models/Employee';

export default defineComponent({
  name: 'Home',
  setup() {
    const employees = ref<Employee[]>([]);
    const selectedEmployee = ref<Employee>(null);
    const newEmployee = ref<Employee>({
      userName: '',
      email: '',
      phoneNumber: '',
      educationLevel: '',
      imagePath: '',
      userId: localStorage.getItem('userId')||'',
      id: 0
    });
    const errorMessage = ref<string>('');
    const showAddModal = ref<boolean>(false);

    const selectedEmployeeModel = computed(() => {
      return selectedEmployee.value ?? {
        userName: '',
        email: '',
        phoneNumber: '',
        educationLevel: '',
        imagePath: '',
        userId: localStorage.getItem('userId') || '',
        id:0
      };
    });

    onMounted(async () => {
      try {
        const response = await EmployeeService.getEmployees();
        employees.value = response.data;
      } catch (error) {
        errorMessage.value = 'Failed to load employees.';
      }
    });

    const openAddModal = () => {
      const addModal = document.getElementById('addEmployeeModal');
      if (addModal) {
        bootstrap.Modal.getOrCreateInstance(addModal).show();
      }
    };

    const viewDetails = (employee: Employee) => {
      selectedEmployee.value = { ...employee };
      const detailsModal = document.getElementById('detailsModal');
      if (detailsModal) {
        bootstrap.Modal.getOrCreateInstance(detailsModal).show();
      }
    };

    const editEmployee = (employee: Employee) => {
        console.log('epc',employee.id)
      selectedEmployee.value = { ...employee };
      const updateModal = document.getElementById('updateModal');
      if (updateModal) {
        bootstrap.Modal.getOrCreateInstance(updateModal).show();
      }
    };

    const confirmDelete = (employee: Employee) => {
      selectedEmployee.value = { ...employee };
      const deleteModal = document.getElementById('deleteModal');
      if (deleteModal) {
        bootstrap.Modal.getOrCreateInstance(deleteModal).show();
      }
    };

    const deleteEmployee = async () => {
      if (selectedEmployee.value) {
        try {
          await EmployeeService.deleteEmployee(selectedEmployee.value.id);
          employees.value = employees.value.filter(e => e.id !== selectedEmployee.value!.id);
          const deleteModal = document.getElementById('deleteModal');
          if (deleteModal) {
            bootstrap.Modal.getInstance(deleteModal)?.hide();
          }
          selectedEmployee.value = null;
        } catch (error) {
          errorMessage.value = 'Failed to delete employee.';
        }
      }
    };

    const updateEmployee = async () => {
      if (selectedEmployee.value) {
        try {
          // Get UserId from local storage
          const userId = localStorage.getItem('userId');
          if (userId) {
            selectedEmployee.value.userId = userId;
            await EmployeeService.updateEmployee(selectedEmployee.value.id, selectedEmployee.value);
            const updateModal = document.getElementById('updateModal');
            if (updateModal) {
              bootstrap.Modal.getInstance(updateModal)?.hide();
            }
            selectedEmployee.value = null;
          } else {
            errorMessage.value = 'User ID not found in local storage.';
          }
        } catch (error) {
          errorMessage.value = 'Failed to update employee.';
        }
      }
    };

    const addEmployee = async () => {
      if (newEmployee.value) {
        try {
          const userId = localStorage.getItem('userId');
          if (userId) {
            newEmployee.value.userId = userId;
            console.log('newEmployee.value',newEmployee.value)
            const newAddEmployee = {
              userName: newEmployee.value.userName,
              email: newEmployee.value.email,
              phoneNumber: newEmployee.value.phoneNumber,
              educationLevel: newEmployee.value.educationLevel,
              imagePath: newEmployee.value.imagePath,
              userId: userId,
              id:0
            };
            await EmployeeService.createEmployee(newAddEmployee);
            employees.value.push(newEmployee.value);
            newEmployee.value = {
              userName: '',
              email: '',
              phoneNumber: '',
              educationLevel: '',
              imagePath: '',
              userId: userId,
              id:0
            };
            const addModal = document.getElementById('addEmployeeModal');
            if (addModal) {
              bootstrap.Modal.getInstance(addModal)?.hide();
            }
            showAddModal.value = false;
          } else {
            errorMessage.value = 'User ID not found in local storage.';
          }
        } catch (error) {
            console.log(error)
          errorMessage.value =
           'Failed to add employee.';
        }
      }
    };

    return {
      employees,
      selectedEmployee,
      newEmployee,
      selectedEmployeeModel,
      errorMessage,
      openAddModal,
      viewDetails,
      editEmployee,
      confirmDelete,
      deleteEmployee,
      updateEmployee,
      addEmployee,
    };
  },
});
</script>

<style scoped>
.table {
  margin-top: 20px;
}

.modal-body img {
  max-width: 100%;
  height: auto;
}

.mb-3 {
  margin-bottom: 1rem;
}

.btn-primary {
  margin-top: 20px;
}
</style>
