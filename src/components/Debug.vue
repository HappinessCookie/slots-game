<template>
  <div class="debug">
    <div v-for="(reel, index) in reels" :key="index">
      <select v-model="debugReels[index].symbol">
        <option v-for="symbol in reel.symbols" :key="symbol.symbol">{{ symbol.symbol }}</option>
      </select>
      <select v-model="debugReels[index].line">
        <option v-for="line in lines" :key="line">{{ line }}</option>
      </select>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue"
import { Line } from "@/services/WinService"
import DebugService from "@/services/DebugService"
import { ReelSymbol } from "@/services/GameService"

export default defineComponent({
  name: "Debug",
  props: {
    reels: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const debugReels = ref<{ symbol: ReelSymbol | null, line: Line | null }[]>(props.reels.map(_ => ({
      symbol: null,
      line: null
    })))

    watch(debugReels, () => {
      debugReels.value.forEach((reel, index) => {
        if (reel.symbol && reel.line) {
          DebugService.registerReelSymbol(reel.symbol, reel.line, index)
        }
      })
    }, { deep: true })

    return {
      debugReels,
      lines: [Line.Top, Line.Center, Line.Bottom]
    }
  }
})
</script>
