<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg" id="primeiroBloco">
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field v-model="email" density="compact" placeholder="Digite seu Email" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>
      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Digite sua senha" prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
        LogIn
      </v-btn>
      <v-card-actions>
        <v-btn color="blue" @click="() => {
          $router.push('/');
        }">
          <v-icon icon="mdi-chevron-left" start></v-icon>

          Home

        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="blue" @click="() => {
          $router.push('/Register');
        }">
          Registro

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    email: '',
    password: '',
    visible: false,
    error: null,
  }),
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:3334/users/login', {
          email: this.email,
          password: this.password,
        });
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', response.data.user_id);
          this.$router.push('/'); 
        } else {
          console.error('Unexpected response:', response.data);
          this.error = 'An error occurred. Please try again.'; 
        }
      } catch (error) {
        console.error('Login error:', error.response.data);
        this.error = error.response.data.message || 'Login failed.';
      }
    },
  },
};
</script>

<style>
  #primeiroBloco {
    margin-top: 100px;
  }
</style>
