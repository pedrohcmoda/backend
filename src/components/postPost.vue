<template>
  <div class="create-post-container">
    <h2>Criar Novo Post</h2>

    <v-form>
      <v-text-field
        label="Título"
        required
        v-model="title"
      ></v-text-field>

      <v-textarea
        label="Descrição"
        required
        rows="5"
        v-model="description"
      ></v-textarea>

      <v-text-field
        label="Ingredientes"
        required
        v-model="ingredients"
      ></v-text-field>

      <input type="file" @change="handleFileChange" />

      <v-text-field
        label="Preço"
        type="number"
        required
        v-model="price"
      ></v-text-field>

      <v-btn color="primary" @click="createPost">Criar Post</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      description: '',
      ingredients: '',
      picture: null,
      price: 0,
      users_id: localStorage.getItem('user'),
    };
  },
  methods: {
    async createPost() {
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      formData.append('ingredients', this.ingredients);
      formData.append('picture', this.picture);
      formData.append('price', this.price);
      formData.append('users_id', this.users_id);

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3334/posts', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Post criado com sucesso');
      } catch (error) {
        console.error('Erro ao criar post:', error);
      }
    },
    handleFileChange(event) {
      this.picture = event.target.files[0];
    }
  },
};
</script>

<style scoped>
.create-post-container {
  margin: 20px;
}

.v-form {
  width: 500px;
}
</style>
