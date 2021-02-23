<template>
  <div class="budget-list-wrap">
    <ElCard :header="header">
      <ElButton @click="mode=0" class="zero-balance">All</ElButton>
      <ElButton @click="mode=1" class="positive-balance">Income</ElButton>
      <ElButton @click="mode=2" class="negative-balance">Outcome</ElButton>
      <div v-if="!isEmpty">
        <BudgetListItem
          @deleteItem="deleteItem(item.id)"
          v-for="(item, index) in listObj"
          :key="item.id"
          :index="index"
          :comment="item.comment"
          :value="item.value"
          :id="item.id"
          :itemObject="item"
          />
      <!-- :item="item"-->
      </div>
      <ElAlert v-else type="info" :title="emptyTitle" :closable="false" />
    </ElCard>
  </div>
</template>

<script>
import BudgetListItem from './BudgetListItem.vue';
export default {
  components: { BudgetListItem },
  name: "BudgetList",
  props: {
    list: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    header: "Budget List",
    emptyTitle: "Empty List",
    mode: 0
  }),
  computed: {
    isEmpty() {
      return !Object.keys(this.list).length;
    },
    listObj() {
      let listObj = Object.values(this.list).reduce((acc,el) => {
        if((el.value < 0 && this.mode === 2) ||
           (el.value > 0 && this.mode === 1) ||
           (this.mode === 0)) {
              acc.push(el);
            }
        return acc;
      },[]);
      return listObj;
    }
  },
  methods: {
    deleteItem(id) {
      // console.log("BudgetList", id);
      this.$emit("deleteItem", id);
    },
  }
};
</script>

<style scoped>
.budget-list-wrap {
  max-width: 500px;
  margin: auto;
}

.negative-balance {
  color: red;
}

.positive-balance {
  color: green;
}

.zero-balance {
  color: black;
}

</style>