<template>
  <q-page padding>
    <q-table
      title="Produtos"
      flat
      :rows="produtos"
      :columns="columns"
      row-key="id"
      :rows-per-page-options="[10, 25, 50]"
      table-header-class="text-white bg-primary"
      card-class="bg-grey-2"
      style="border-radius: 8px"
    >
      <template v-slot:top>
        <h5 class="q-mr-md">Produtos</h5>
        <q-space />
        <q-input
          dense
          v-model="filter"
          style="width: 40%"
          label="ID, nome, descrição ou código"
        >
        </q-input>
        <!-- <q-btn icon="search_none" @click="filterProducts" color="info">
          Buscar
        </q-btn> -->
        <q-space />
        <q-btn color="info" label="Adicionar novo" @click="addRow" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-tr :props="props">
          <q-td :props="props">
            <q-btn @click="editRow(props.row)" color="info" icon="edit" />
          </q-td>
          <q-td :props="props" @click="deletarProduto(props.row)">
            <q-btn color="negative" icon="delete" />
          </q-td>
        </q-tr>
      </template>
      <q-btn color="primary" label="Adicionar" icon="add" />
    </q-table>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DialogAdicionarProduto from "./dialogs/adicionarProduto.dialog.vue";
import DialogEditarProduto from "./dialogs/editarProduto.dialog.vue";
import DialogDeletarProduto from "./dialogs/deleteProduto.dialog.vue";
import axiosRequest from "@/resource/axios";
import { IProduto } from "./interfaces/produto.interface";
export default defineComponent({
  name: "Produtos-componente",
  components: {},
  data() {
    return {
      filter: "",
      columns: [
        {
          name: "actions",
          label: "Ações",
          field: "actions",
          style: "width: 5%",
        },
        {
          name: "name",
          label: "Nome",
          field: "name",
          style: "width: 20%",
          sortable: true,
        },
        {
          name: "description",
          label: "Descrição",
          field: "description",
          style: "width: 40%",
        },
        {
          name: "price",
          label: "Preço",
          field: "price",
          style: "width: 10%",
        },
        {
          name: "quantity",
          label: "Quantidade",
          field: "quantity",
          style: "width: 10%",
        },
        {
          name: "barCode",
          label: "Código",
          field: "barCode",
          style: "width: 15%",
        },
        {
          name: "size",
          label: "Tamanho",
          field: "size",
          style: "width: 5%",
        },
      ],
      produtos: [],
    };
  },
  methods: {
    addRow() {
      this.$q
        .dialog({
          component: DialogAdicionarProduto,
        })
        .onOk(() => {
          this.$q.notify({
            color: "positive",
            message: "Produto adicionado com sucesso!",
          });
        })
        .onCancel(() => {         
          window.location.reload();
        })
    },
    editRow(row: IProduto) {
      this.$q
        .dialog({
          component: DialogEditarProduto,
          componentProps: {
            produto: row,
          },
        })
        .onOk(() => {
          this.$q.notify({
            color: "positive",
            message: "Produto editado com sucesso!",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    },
    deletarProduto(row: IProduto) {
      this.$q
        .dialog({
          component: DialogDeletarProduto,
          componentProps: {
            produto: row,
          },
        })
        .onOk(() => {
          this.$q.notify({
            color: "negative",
            message: "Produto deletado com sucesso!",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
    },
    // filterProducts() {
    //   this.produtos = this.produtos.filter((produto) => {
    //     return (
    //       produto.name.includes(this.filter) ||
    //       produto.description.includes(this.filter) ||
    //       produto.barCode.includes(this.filter)
    //     );
    //   });
    // },
  },
  async created() {
    const response = await axiosRequest.get("/products");
    this.produtos = response.data;
  },
});
</script>

<style lang="scss" scoped></style>
