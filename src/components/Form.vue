<template>
  <ElCard class="form-card">
    <ElForm :model="formData" ref="addItemForm" :rules="rules" lable-position="top">
      <ElFormItem label="Type" prop="type">
        <ElSelect class="type-select" v-model="formData.type" placeholder="Choose type...">
          <ElOption lable="Income" value="INCOME" class="positive-balance" />
          <ElOption lable="Outcome" value="OUTCOME" class="negative-balance" />
        </ElSelect>
      </ElFormItem>
      <ElFormItem label="Comments" prop="comment">
        <ElInput v-model="formData.comment" />
      </ElFormItem>
      <ElFormItem label="Value" prop="value">
        <ElInput
          v-model.number="formData.value"
          validation="negativeRule:formData.type,formData.value" />
        <div v-if="errors.length">
          <div v-for="error in errors" :key="error" class="error-txt">{{ error }}</div>
        </div>
      </ElFormItem>
      <ElButton @click="onSubmit" type="primary">Submit</ElButton>
    </ElForm>
  </ElCard>
</template>

<script>
export default {
  name: "Form",
  data: () => ({
    formData: {
      type: "INCOME",
      comment: "",
      value: 0
    },
    rules: {
      type: [
        { required: true, message: "Please select type", trigger: "blur" }
      ],
      comment: [
        { required: true, message: "Please input comment", trigger: "change" }
      ],
      value: [
        { required: true, message: "Please input value", trigger: "change" },
        { type: "number", message: "Value must be a number", trigger: "change" },
        { validator (rule, value, callback) {
            if (value.toString().match(/^[^0]{1,1}[0-9]{0,}$/gm)) {
              callback();
            } else {
              callback(new Error('Value can`t be zero'));
            }
          },
          trigger: "blur"
        },
      ]
    },
    errors: []
  }),
  methods: {
    negativeRule() {
      // console.log('date', this.formData);
      let res = true;
      if(this.formData.type === 'OUTCOME' && this.formData.value >= 0) {
        res = false;
      }
      return res;
    },
    complexCheckForm() {
      // console.log('Negative rule');
      let res = true;
      if (!this.negativeRule()) {
        this.errors.push('Value must be negative for OUTCOME type');
        res = false;
      }
      return res;
    },
    onSubmit() {
      this.errors = [];
      let isSimpleCheck = false;
      this.$refs.addItemForm.validate(valid => {
          isSimpleCheck = valid;
        });
      let isComplexCheck = this.complexCheckForm();
      // console.log(this.complexCheckForm());
      if(isSimpleCheck && isComplexCheck) {
        this.$emit("submitForm", { ...this.formData });
        this.$refs.addItemForm.resetFields();
      }
    },
  }
};
</script>

<style scoped>
.form-card {
  max-width: 500px;
  margin: auto;
}

.type-select {
  width: 100%;
}

.error-txt {
  color: red;
  line-height: 20px;
  font-size: 12px;
  display: flex;
  justify-content: left;
}

.negative-balance {
  color: red;
}

.positive-balance {
  color: green;
}
</style>