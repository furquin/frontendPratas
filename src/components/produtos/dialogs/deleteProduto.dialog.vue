<template>
    <q-dialog ref="dialog">
      <q-card style="width: 50%">
        <q-card-section class="row justify-center">
          <h5 class="text-secondary">Esta é uma ação irreversível!</h5>
        </q-card-section>
        <q-card-section class="row justify-center">
          <div class="text-negative">Tem certeza que deseja deletar este produto? </div>
        </q-card-section>
        <q-card-actions class="row justify-around">
          <q-btn
            flat
            label="Cancelar"
            @click="cancel"
            color="info"
            v-close-popup
          ></q-btn>
          <q-btn
            flat
            label="Deletar"
            color="negative"
            @click="deletarProduto()"
          ></q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  import { QDialog } from "quasar";
  import axiosRequest from "@/resource/axios";
  import { IProduto } from "../interfaces/produto.interface";
  export default defineComponent({
    name: "DialogAdicionarProduto-componente",
    props: {
        produto: {
            type: Object as () => IProduto,
            required: true,
        },
    },
    methods: {
      async deletarProduto() {
        axiosRequest.delete(`/products/${this.produto.id}`).catch((error) => {             
              this.$q.notify({
                color: "negative",
                message: `Não foi possível deletar o produto, ${error.response.data.message} `,
              });
            });
        this.$emit("ok");
      },
  
      cancel() {
        this.$emit("cancel");
      },
  
      show() {
        (this.$refs.dialog as QDialog).show();
      },
      hide() {
        (this.$refs.dialog as QDialog).hide();
      },
    },
  });
  </script>
  