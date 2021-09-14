<template>
  <template v-if="Array.isArray(symbols)">
    <h4>Any of:</h4>
    <div class="symbols-list">
      <img v-for="symbol in symbols" :key="symbol" :src="reelIcons[symbol]" alt="" />
    </div>
  </template>
  <img v-else :src="reelIcons[symbols]" alt="" />
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReelSymbol } from "@/services/WinService"
import { reelIcons } from "@/services/GameService"

export default defineComponent({
  name: 'PayTableSymbol',
  props: {
    symbols: {
      type: Object as PropType<ReelSymbol> || Array as PropType<ReelSymbol[]>,
      required: true
    }
  },
  setup() {
    return {
      reelIcons
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
