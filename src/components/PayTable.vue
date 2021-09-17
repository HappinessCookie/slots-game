<template>
  <Card>
    <table class="pay-table">
      <thead>
      <tr>
        <th v-for="(symbol, index) in payTable[0].payLine.symbols">{{ index + 1 }}</th>
        <th>Line</th>
        <th>Pay off</th>
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
      </tbody>
    </table>
  </Card>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue"
import { payTable } from "@/services/WinService"
import PayTableSymbol from "@/components/PayTableSymbol.vue"
import Card from "@/components/Card.vue"

export default defineComponent({
  name: "PayTable",
  components: { Card, PayTableSymbol },
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
    background-color: #ef3f33;
  }

  to {
    background-color: transparent;
  }
}

.pay-table {
  max-width: 400px;
  color: #ffffff;

  th, td {
    border: 2px solid #95908c;
    padding: 10px;
  }
}

.win-row {
  animation: win 200ms ease-in-out;
  animation-iteration-count: 3;
}
</style>
