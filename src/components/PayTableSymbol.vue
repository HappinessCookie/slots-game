<template>
  <h4 v-if="symbols.length > 1">Any of:</h4>
  <div class="symbols-list">
    <img v-for="symbol in symbols" :key="symbol" :src="symbol.image" alt="" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"
import { ReelSymbolView } from "@/services/GameService"

export default defineComponent({
  name: "PayTableSymbol",
  props: {
    symbols: {
      type: Array as PropType<ReelSymbolView[]>,
      required: true
    }
  }
})
</script>
<style scoped>
.symbols-list {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  width: 100%;
  max-width: 200px;
}
</style>
