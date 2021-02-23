<template >
  <div class="list-item">
    <i :class="iconClass"></i>
    <span class="budget-comment">{{ comment }}</span>
    <span class="budget-value">{{ value }}</span>
    <ElButton type="danger" size="mini" @click="dialogVisible = true" >Delete</ElButton>

    <!-- @click="$emit('deleteItem')" -->
    <ElDialog
      title="Confirm deleting"
      :visible.sync="dialogVisible"
      width="30%">
      <span>Are you sure to delete item</span>
      <span slot="footer" class="dialog-footer">
        <ElButton @click="dialogVisible = false">Cancel</ElButton>
        <ElButton type="primary" @click="deleteItem">Confirm</ElButton>
      </span>
    </ElDialog>
    <!-- :before-close="handleClose" -->
  </div>
</template>

<script>

export default {
  name: "BudgetListItem",
  props: {
    itemObject: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    comment: {
      type: String,
      default: "",
    },
    value: {
      type: Number,
      default: 0,
    },
    id: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    header: "Budget List Item",
    dialogVisible: false,
    // comment: "",
    // value: "",
  }),
  computed: {
    compExample() {
      return this.itemObject.id;
    },
    iconClass() {
      if(this.value > 0) {
        return 'el-icon-top positive-balance';
      } else {
        return 'el-icon-bottom negative-balance';
      }
    }
  },
  methods: {
    deleteItem() {
      this.$emit("deleteItem");
    },
    // init() {
    //   this.comment = this.itemObject.comment;
    //   this.value = this.itemObject.value;
    // }
  }
};
</script>

<style scoped>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
}
.budget-value {
  font-weight: bold;
  margin-left: auto;
  margin-right: 20px;
}

.negative-balance {
  color: red;
  font-weight: 700px;
}

.positive-balance {
  color: green;
  font-weight: 700px;
}

.zero-balance {
  color: black;
  font-weight: 700px;
}
</style>