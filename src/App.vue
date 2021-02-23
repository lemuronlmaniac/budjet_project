<template>
  <div id="app">
    <Form @submitForm="onFormSubmit" />
    <TotalBalance :total="totalBalance" />
    <BudgetList :list="list" @deleteItem="onDeleteItem" />
  </div>
</template>

<script>
import BudgetList from "@/components/BudgetList";
import TotalBalance from "@/components/TotalBalance";
import Form from "@/components/Form";

import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
export default {
  name: "app",
  components: {
    BudgetList,
    TotalBalance,
    Form
  },
  data: () => ({
  }),
  computed: {
    totalBalance() {
      return Object.values(this.list).reduce(
        (acc, item) => acc + item.value,
        0
      );
    },
    list() {
      return this.storeGetList();
    }
  },
  methods: {
    ...mapActions('budgetStore',['storeDeleteItem','storeAddItem']),
    ...mapGetters('budgetStore',['storeGetList']),
    onDeleteItem(id) {
      //this.$delete(this.list, id);
      this.storeDeleteItem(id);
    },
    onFormSubmit(data) {
      const newObj = {
        ...data,
        id: String(Math.random())
      };
      this.storeAddItem(newObj);
      //this.$set(this.list, newObj.id, newObj);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
