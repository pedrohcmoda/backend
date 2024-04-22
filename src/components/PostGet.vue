<template>
  <div>
    <div v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <p>{{ post.description }}</p>
      <img v-if="post.picture" :src="post.picture" alt="Imagem do post" style="max-width: 100%;" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      console.log("oi")
      axios.get('http://localhost:3334/posts')
        .then(response => {
          this.posts = response.data.data;
          console.log(this.posts.picture);
        })
        .catch(error => {
          console.error('Erro ao buscar os posts:', error);
        });
    }
  }
};
</script>

<style scoped>
</style>
