<template>
    <div class="container">
      <div class="card mt-5">
        <div class="card-body">
          <h2 class="card-title text-center">Login</h2>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="loginModel.email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="loginModel.password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
            <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { LoginModel } from '@/models/LoginModel';
  import AuthService from '@/services/AuthService';
  import { useRouter } from 'vue-router';
import { json } from 'node:stream/consumers';
  
  export default defineComponent({
    name: 'Login',
    setup() {
      const router = useRouter();
      const loginModel = ref<LoginModel>({
        email: '',
        password: ''
      });
      const errorMessage = ref<string | null>(null);
  
      const login = async () => {
        errorMessage.value = null;
        try {
          const response = await AuthService.login(loginModel.value);
          console.log('res',response)
          localStorage.setItem('res',JSON.stringify(response) );

          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('username', response.userName);
          router.push('/home');
          setTimeout(()=>{window.location.reload();},100)
        } catch (error) {
          errorMessage.value = 'Invalid email or password.';
        }
      };
  
      return {
        loginModel,
        errorMessage,
        login
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
  