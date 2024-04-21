<template>
  <div v-if="showPostarComponent" class="overlay">
    <v-card height="50vh" width="70vw">
      <v-card-text>
        <v-img
          :src="imagePreview"
          alt="Selected Image"
          lazy-src="https://www.sbrv.org/wp-content/uploads/2019/11/preview.png"
          height="30vh"
        ></v-img>
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          full-width
        ></v-text-field>
        <v-textarea
          v-model="description"
          label="Description"
          outlined
          full-width
        ></v-textarea>
        <v-text-field
          v-model="ingredients"
          label="Ingredients (comma separated)"
          outlined
          full-width
        ></v-text-field>
        <v-text-field
          v-model="price"
          label="Price"
          type="number"
          outlined
          full-width
        ></v-text-field>
        <v-file-input
          v-model="image"
          accept="image/png, image/jpeg, image/bmp"
          placeholder="Pick an image"
          prepend-icon="mdi-camera"
          @change="selectImage"
          @click:clear="clearImagePreview()"
          label="Image"
        ></v-file-input>
        <v-btn @click="submitPost">Submit Post</v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>


<script>
import { ref } from 'vue';

export default {
  name: 'VFCImageUploadPreview',
  data() {
    return {
      image: ref(null),
      imagePreview: '',
      title: '',
      description: '',
      ingredients: '',
      price: 0,
      showPostarComponent: false,
    };
  },
  methods: {
    async selectImage(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(file);

      this.image.value = file;
    },
    async clearImagePreview() {
      this.imagePreview = '';
      this.image.value = null;
    },
    toBlob() {
      if (!this.image.value) return null
    },
  }
}
</script>


<style scoped>
  .overlay {
    position: fixed; /* Ensures overlay stays on top */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Darkens the background */
    display: flex;
    justify-content: center; /* Centers the card horizontally */
    align-items: center; /* Centers the card vertically */
  }
</style>
