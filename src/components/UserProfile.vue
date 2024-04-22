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
        <v-card-actions>
          <v-btn color="blue" @click="() => {
            $router.push('/Home');
          }">
            <v-icon icon="mdi-chevron-left" start></v-icon>
  
            Home
  
          </v-btn>
          <v-spacer></v-spacer>
  
          <v-btn color="blue" @click="salvar">
            Salvar
  
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
            name: null,
            email: null,
            password: null,
            token: localStorage.getItem('token')
          }),
          methods: {
            async salvar() {
              const userId = localStorage.getItem('user');

              if (!userId) {
                console.error("Missing user ID in localStorage");
                return;
              }

              const updateData = {};

              if (this.name) updateData.name = this.name;
              if (this.email) updateData.email = this.email;
              if (this.password) updateData.password = this.password;

              try {
                const response = await axios.put(
                  `http://localhost:3334/users/${userId}`,
                  updateData,
                  { headers: { 'Authorization': 'Bearer ' + this.token } }
                );
                console.log("User data patched successfully:", response.data);
              } catch (error) {
                console.error("Error patching user data:", error);
              }
            },

            async preencher (){
              const user_id = localStorage.getItem('user_id');
              const resp = await axios.get("http://localhost:3334/users/"+user_id, {headers: { 'Authorization': 'Bearer ' + this.token }});
              this.username = resp.data.username
              this.email = resp.data.email
              this.password = resp.data.password
            }
          },
          mounted() {
            this.preencher();
          }
        }
      </script>
    <style scoped> 
      #cardreg {
        margin-top: 5%;
      }
    </style>