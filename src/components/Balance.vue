<template>
  <div class="balance">
    <input :value="balance" type="number" min="0" max="5000">
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Balance",
  props: {
    balance: {
      type: String,
      required: true
    }
  },
})
</script>
