<template>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="first"
          color="primary"
          label="Nome"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="email"
          color="primary"
          label="Email"
          variant="underlined"
        ></v-text-field>
  
        <v-text-field
          v-model="password"
          color="primary"
          label="Senha"
          placeholder="Insira a senha"
          variant="underlined"
        ></v-text-field>

      </v-container>
  
      <v-divider></v-divider>
  
      <v-card-actions>
        <v-spacer></v-spacer>
  
        <v-btn color="success">
          Complete Registration
  
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  <script>
    export default {
      data: () => ({
        first: null,
        last: null,
        email: null,
        password: null,
        terms: false,
      }),
    }
  </script>