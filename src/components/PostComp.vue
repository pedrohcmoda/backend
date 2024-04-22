<template>
    <div class="posts-container">
      <div class="posts-list">
        <v-list v-if="posts.length > 0">
          <v-list-item v-for="post in posts" :key="post.id">
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
              <img v-if="post.picture" class="post-image" src="post.picture" alt="foto do post" />
              <v-list-item-subtitle>{{ post.ingreedients }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
              <v-list-item-subtitle>{{ post.description }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn color="blue" @click="() => {
                router.push(`/posts/${post.id}`);
              }">
                Ver Detalhes
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
        <v-alert v-else color="info">
          Nenhum post encontrado.
        </v-alert>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        posts: [],
      };
    },
    mounted() {
      this.fetchPosts();
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await axios.get('http://localhost:3334/posts');
          this.posts = response.data.data;
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .posts-container {
    margin: 20px;
  }
  
  .posts-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .post-item {
    width: 300px;
    margin-bottom: 20px;
  }
  </style>
  