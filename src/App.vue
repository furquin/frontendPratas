<template>
  
  <main class="columns is-gapless is-multiline">
      <router-view />
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {},
});
</script>
