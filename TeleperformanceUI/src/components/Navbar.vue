<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Teleperformance Task</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>
          <li class="nav-item" v-else>
            <span class="nav-link">Hi, {{ username }}</span>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <button class="btn btn-link nav-link" @click="signout">Signout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const username = computed(() => localStorage.getItem('username'));
    const isAuthenticated = computed(() => !!localStorage.getItem('token'));

    const signout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      router.push('/login');
      setTimeout(()=>{window.location.reload();},100)
      
    };

    return {
      username,
      isAuthenticated,
      signout
    };
  }
});
</script>

<style scoped>
.navbar {
  padding: 10px;
}
</style>
