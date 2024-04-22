<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg" id="primeiroBloco">

      <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
      <v-text-field v-model="name" density="compact" placeholder="Digite seu Nome" prepend-inner-icon="mdi-account"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>
      <v-text-field v-model="email" density="compact" placeholder="Digite seu Email" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>
      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
        density="compact" placeholder="Digite sua senha" prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>
      <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="register">
        Registrar
      </v-btn>
      <v-card-actions>
        <v-btn color="blue" @click="() => {
          $router.push('/Login');
        }">
          <v-icon icon="mdi-chevron-left" start></v-icon>

          Login

        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="blue" @click="() => {
          $router.push('/');
        }">
          Home

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
          first: null,
          last: null,
          email: null,
          password: null,
          terms: false,
        }),
        methods: {
          register() {
            axios.post('http://localhost:3334/users', {
              username: this.name,
              email: this.email,
              password: this.password,
            })
             .then(() => {
                this.$router.push('/Login');
              })
             .catch((error) => {
                console.log(error);
              });
          },
        }
      }
    </script>
  <style scoped> 
    #cardreg {
      margin-top: 5%;
    }
  </style>