<template>
  <div class="card">
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "Card",
})
</script>
<style scoped>
.card {
  padding: 20px;
  background-color: #3a3135;
  border-radius: 10px;
}
</style>
