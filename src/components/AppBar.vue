<template>
  <v-app>
    <v-app-bar :elevation="0">
      <template v-slot:prepend>
          <v-btn icon>
            <v-icon>mdi-pizza</v-icon>
          </v-btn>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-plus"></v-btn>
        <v-btn icon="mdi-account"></v-btn>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-app-bar>

  </v-app>
</template>

