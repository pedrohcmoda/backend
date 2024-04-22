<template>
    <v-app-bar :elevation="0">
      <template v-slot:prepend>
        <v-btn icon="mdi-pizza" @click="home"></v-btn>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-plus" @click="postar"></v-btn>
        <v-btn icon="mdi-account" @click="checkToken"></v-btn>
        <v-btn icon="mdi-logout" @click="logout"></v-btn>
      </template>
    </v-app-bar>
</template>

<script>
export default {
  methods: {
    home(){
      this.$router.push('/')
    },
    logout(){
      try {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.push('/')
      } catch (error) {
        this.$router.push('/')
      }
      this.$router.push('/')
    },

    checkToken() {
      if (localStorage.getItem('token')) {
        this.$router.push('/Profile');
      } else {
        this.$router.push('/Login');
      }
    },
    postar() {
      if(localStorage.getItem('token')) {
        // logica para aparecer o popup de postagem
      } else {
        this.$router.push('/Login');
      }
    },
    openPostPost() {
      this.$emit('openPostPost');
    }
  },
};
</script>
