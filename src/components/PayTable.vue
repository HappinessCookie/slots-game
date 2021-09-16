<template>
  <table>
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
    <template v-for="combination in combinationList" :key="combination.combination">
      <tr :class="{ 'win-row': combination.id === winCombination }">
        <td>
          <PayTableSymbol :symbols="combination.combination.symbols[0]" />
        </td>
        <td>
          <PayTableSymbol :symbols="combination.combination.symbols[1]" />
        </td>
        <td>
          <PayTableSymbol :symbols="combination.combination.symbols[2]" />
        </td>
        <td>{{ combination.line }}</td>
        <td>{{ combination.winAmount }}</td>
      </tr>
    </template>
    <tr>
      <td></td>
    </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { combinationList } from "@/services/WinService"
import PayTableSymbol from "@/components/PayTableSymbol.vue"

export default defineComponent({
  name: 'PayTable',
  components: { PayTableSymbol },
  props: {
    winCombination: {
      type: Symbol,
      default: Symbol()
    }
  },
  setup() {
    return {
      combinationList
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

.win-row {
  animation: win 200ms ease-in-out;
  animation-iteration-count: 3;
}
</style>
