<template>
  <table class="pay-table">
    <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th>Line</th>
      <th>Win</th>
    </tr>
    </thead>
    <tbody>
    <template v-for="combination in payTable" :key="combination.payLine">
      <tr :class="{ 'win-row': winCombinations.includes(combination.id) }">
        <td v-for="symbols in combination.payLine.symbols">
          <PayTableSymbol :symbols="symbols" />
        </td>
        <td>{{ combination.line }}</td>
        <td>{{ combination.payoff }}</td>
      </tr>
    </template>
    <tr>
      <td></td>
    </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { payTable } from "@/services/WinService"
import PayTableSymbol from "@/components/PayTableSymbol.vue"

export default defineComponent({
  name: 'PayTable',
  components: { PayTableSymbol },
  props: {
    winCombinations: {
      type: Array as PropType<Symbol[]>,
      default: () => []
    }
  },
  setup() {
    return {
      payTable
    }
  }
})
</script>
<style lang="scss" scoped>
@keyframes win {
  from {
    background-color: aquamarine;
  }

  to {
    background-color: transparent;
  }
}

.pay-table {
  max-width: 200px;
}

.win-row {
  animation: win 200ms ease-in-out;
  animation-iteration-count: 3;
}
</style>
