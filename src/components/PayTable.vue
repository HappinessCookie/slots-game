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
          <template v-for="symbol in combination.combination.symbols[0]">
            <img :src="reelIcons[symbol]" />
          </template>
        </td>
        <td>
          <template v-for="symbol in combination.combination.symbols[1]">
            <img :src="reelIcons[symbol]" />
          </template>
        </td>
        <td>
          <template v-for="symbol in combination.combination.symbols[2]">
            <img :src="reelIcons[symbol]" />
          </template>
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

export default defineComponent({
  name: 'PayTable',
  setup() {
    return {
      combinationList,
      reelIcons
    }
  }
})
</script>
