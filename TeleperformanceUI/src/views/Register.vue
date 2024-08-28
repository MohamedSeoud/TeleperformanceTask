<template>
    <div class="container">
      <div class="card mt-5">
        <div class="card-body">
          <h2 class="card-title text-center">Register</h2>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="registerModel.username"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="registerModel.email"
                required
                :class="{ 'is-invalid': emailError }"
              />
              <div class="invalid-feedback" v-if="emailError">
                Please enter a valid email address.
              </div>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="registerModel.password"
                required
                :class="{ 'is-invalid': passwordError }"
              />
              <div class="invalid-feedback" v-if="passwordError">
                Password must contain at least one number, one uppercase letter, one special character, and one lowercase letter.
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Role</label>
              <div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="userRole"
                    value="USER"
                    v-model="registerModel.role"
                    checked
                  />
                  <label class="form-check-label" for="userRole">User</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="adminRole"
                    value="ADMIN"
                    v-model="registerModel.role"
                  />
                  <label class="form-check-label" for="adminRole">Admin</label>
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary w-100">Register</button>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { RegisterModel } from '@/models/RegisterModel';
  import AuthService from '@/services/AuthService';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    name: 'Register',
    setup() {
      const router = useRouter();
      const registerModel = ref<RegisterModel>({
        username: '',
        email: '',
        password: '',
        role: 'USER'
      });
      const errorMessage = ref<string | null>(null);
      const emailError = ref<boolean>(false);
      const passwordError = ref<boolean>(false);
  
      const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
      };
  
      const validatePassword = (password: string) => {
        const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        return re.test(password);
      };
  
      const register = async () => {
        errorMessage.value = null;
        emailError.value = !validateEmail(registerModel.value.email);
        passwordError.value = !validatePassword(registerModel.value.password);
  
        if (emailError.value || passwordError.value) {
          return;
        }
  
        try {
          const response = await AuthService.register(registerModel.value);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', response.userName);
          router.push('/home');
          setTimeout(()=>{window.location.reload();},100)
        } catch (error) {
          errorMessage.value = 'Registration failed. Please try again.';
        }
      };
  
      return {
        registerModel,
        errorMessage,
        emailError,
        passwordError,
        register
      };
    }
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin-top: 100px;
  }
  .card {
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  </style>
  