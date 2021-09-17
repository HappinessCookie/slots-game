<template>
  <input class="balance" v-model="balance" type="number" min="0" max="5000">
</template>
<script lang="ts">
import { computed, defineComponent } from "vue"

export default defineComponent({
  name: "Balance",
  props: {
    modelValue: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const balance = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value)
      }
    })

    return {
      balance
    }
  }
})
</script>

<style scoped>
.balance {
  padding: 10px;
  border: 2px solid #95908c;
  border-radius: 4px;
  background-color: #faf3ed;
}
</style>
