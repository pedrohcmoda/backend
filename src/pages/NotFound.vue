<!-- views/NotFound.vue -->

<template>
    <div class="NotFound">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card height="400" color="transparent" flat>
              <div class="display-3 mt-5">Pagina não encontrada</div>
              <div class="grey--text lighten-5">
                Essa página foi movida para outro endereço ou deixou de existir!
              </div>
              <div class="paragraph-text mt-2">
                <br />
                <br />Tenta voltar pra home ai <a href="/Index">Home</a>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>
  </template>
  
  <style>
    .paragraph-text {
      font-size: 18px;
    }
  </style>
  