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
    <template v-for="combination in combinationList">
      <tr>
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
import { reelIcons } from "@/services/GameService"
import PayTableSymbol from "@/components/PayTableSymbol.vue"

export default defineComponent({
  name: 'PayTable',
  components: { PayTableSymbol },
  setup() {
    return {
      combinationList,
      reelIcons
    }
  }
})
</script>
