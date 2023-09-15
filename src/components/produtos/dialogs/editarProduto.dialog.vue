<template>
    <q-dialog >
      <q-card style="width: 50%;">
          <q-card-section class="row justify-center">
              <h3 class="text-secondary">Editar produto</h3>
          </q-card-section>
        <q-input color="info" filled v-model="name" label="Nome" class="q-mb-md q-pa-md"> </q-input>
        <q-input color="info" filled v-model="description" label="descrição" class="q-mb-md q-pa-md">
        </q-input>
        <q-input color="info" filled v-model="price" label="Preço" class="q-mb-md q-pa-md">
        </q-input>
        <q-input color="info" filled v-model="quantity" label="Quantidade" class="q-mb-md q-pa-md">
        </q-input>
        <q-input color="info" filled v-model="barCode" label="Código" class="q-mb-md q-pa-md">
        </q-input>
        <q-card-actions class="row justify-around">
          <q-btn flat label="Cancelar" color="negative" v-close-popup></q-btn>
          <q-btn flat label="Salvar" color="info" v-close-popup></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "DialogEditarProduto-componente",
    components: {},
    data() {
      return {
        name: "",
        description: "",
        price: "",
        quantity: "",
        barCode: "",
      };
    },
    methods: {},
  });
  </script>
  