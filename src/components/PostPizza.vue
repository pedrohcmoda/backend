<template>
  <v-card
    title="Card title"
    subtitle="Subtitle"
    text="..."
    variant="tonal"
  >
    <v-card-img :src="imageUrl" alt="Image description" />
    <v-card-content>
      <v-card-title class="font-weight-bold">{{ cardTitle }}</v-card-title>
      <v-card-subtitle>{{ cardSubtitle }}</v-card-subtitle>
      <v-card-text>{{ cardText }}</v-card-text>
      <v-card-actions>
        <v-btn :href="cardLink">Click me</v-btn>
      </v-card-actions>
    </v-card-content>
  </v-card>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    cardTitle: String,
    cardSubtitle: String,
    cardText: String,
    cardLink: String,
  },
};
</script>

<style scoped>
.v-card {
  max-width: 70%;
  margin: 2em auto;
}

</style>
