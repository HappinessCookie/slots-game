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
        <td>{{ combination.combination.symbols[0] }}</td>
        <td>{{ combination.combination.symbols[1] }}</td>
        <td>{{ combination.combination.symbols[2] }}</td>
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

export default defineComponent({
  name: 'PayTable',
  setup() {
    return {
      combinationList
    }
  }
})
</script>
