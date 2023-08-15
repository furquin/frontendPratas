<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-third">
      <BarraLogin/>
    </div>
    <div class="column is-two-third conteudo">
    </div>
    
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BarraLogin from "./components/barraLogin.vue";
export default defineComponent({
  name: "App",
  components: {
    BarraLogin,
  },
});
</script>
