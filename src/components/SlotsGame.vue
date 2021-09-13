<template>
  <div class="reels">
    <Reel
        v-for="reel in reelsCount"
        :key="reel"
        :symbols="symbols"
        :elementIndex="centered[reel - 1]"
        :delay="reel - 1"
        @finish="reelFinishHandler(reel)"
    />
  </div>
  <button @click="spinHandler">Spin</button>
</template>

<script lang="ts">
import Reel from "./Reel.vue"
import { defineComponent, computed, ref, watch } from "vue"
import GameService, { reelsCount, symbols } from "@/services/GameService"
import WinService from "@/services/WinService"

export default defineComponent({
  name: "SlotsGame",
  components: {
    Reel
  },
  setup() {
    const centered = ref<number[]>([])
    const finished = ref<number[]>([])

    const spinHandler = () => {
      finished.value = []
      centered.value = GameService.getRandomCombination()
    }
    const reelFinishHandler = (index: number) => {
      finished.value.push(index)
    }

    const checkAllDone = computed(() => finished.value.length === reelsCount)

    const checkWin = () => {
      const winAmount = WinService.combinationWinCheck(centered.value)
      if (winAmount > 0) {
        alert(winAmount)
      }
    }

    watch(checkAllDone, () => {
      if (checkAllDone.value) {
        checkWin()
      }
    })

    return {
      centered,
      symbols,
      reelsCount,
      spinHandler,
      reelFinishHandler
    }
  }
})
</script>

<style lang="scss" scoped>
.reels {
  display: flex;
  align-items: center;
  height: 300px;
  overflow: hidden;
}
</style>

