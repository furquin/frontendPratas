<template>
    <q-layout>
      <q-drawer
        show-if-above
        :width="250"
        :breakpoint="500"
        bordered
        class="bg-primary"
      >
          <q-list padding>
            <q-item clickable exact-active-class="text-secondary" to="checkout" >
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>
              <q-item-section>
                Checkout
              </q-item-section>
            </q-item>

            <!-- <q-item clickable exact-active-class="text-secondary" to="relatorio">
              <q-item-section avatar>
                <q-icon name="analytics" />
              </q-item-section>
              <q-item-section>
                Relatórios
              </q-item-section>
            </q-item> -->

            <q-item clickable exact-active-class="text-secondary" to="produtos">
              <q-item-section avatar>
                <q-icon name="view_list" />
              </q-item-section>
              <q-item-section>
                Produtos
              </q-item-section>
            </q-item>
          </q-list>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Barra-navegacao-componente",
  components: {},
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
</style>
