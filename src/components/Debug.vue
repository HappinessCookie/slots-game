<template>
  <Card>
    <div class="debug">
      <h4>Debug area</h4>
      <label class="debug__state">
        <span>Active</span>
        <input v-model="debugState" type="checkbox">
      </label>
      <div class="debug__reels">
        <div class="debug__reel" v-for="(reel, index) in reels" :key="index">
          <select v-model="debugReels[index].symbol">
            <option v-for="symbol in reel.symbols" :key="symbol.symbol">{{ symbol.symbol }}</option>
          </select>
          <select v-model="debugReels[index].line">
            <option v-for="line in lines" :key="line">{{ line }}</option>
          </select>
        </div>
      </div>
    </div>
  </Card>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue"
import { Line } from "@/services/WinService"
import DebugService from "@/services/DebugService"
import { ReelSymbol } from "@/services/GameService"
import Card from "@/components/Card.vue"

interface DebugReelConfig {
  symbol: ReelSymbol | null
  line: Line | null
}

export default defineComponent({
  name: "Debug",
  components: { Card },
  props: {
    reels: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const debugReels = ref(props.reels.map<DebugReelConfig>(_ => ({ symbol: null, line: null })))

    watch(debugReels, () => {
      debugReels.value.forEach((reel, index) => {
        if (reel.symbol && reel.line) {
          DebugService.registerReelSymbol(reel.symbol, reel.line, index)
        }
      })
    }, { deep: true })

    const debugState = computed({
      get: () => DebugService.debugState,
      set: (value) => DebugService.debugState = value
    })

    return {
      debugState,
      debugReels,
      lines: [Line.Top, Line.Center, Line.Bottom]
    }
  }
})
</script>

<style lang="scss" scoped>
.debug {
  color: #faf3ed;
  display: grid;
  grid-gap: 10px;

  &__reels {
    display: flex;
    gap: 20px;
  }

  &__reel {
    display: grid;
    grid-gap: 10px;
  }
}

select {
  padding: 10px;
  border: 2px solid #95908c;
  border-radius: 4px;
  background-color: #faf3ed;
}
</style>
