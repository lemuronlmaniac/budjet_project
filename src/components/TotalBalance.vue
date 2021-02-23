<template>
  <div class="total-value" :class="balanceColor">Balance: {{ total }}</div>
</template>

<script>
export default {
  name: "TotalBalance",
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    balanceColor() {
      if(this.total > 0) {
        return 'positive-balance';
      }
      else if(this.total < 0) {
        return 'negative-balance';
      }
      else {
        return 'zero-balance';
      }
    }
  }
};
</script>

<style scoped>
.total-value {
  font-size: 26px;
  text-transform: uppercase;
  padding: 20px;
  text-align: center;
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