<template>
  <div class="reels">
    <Reel
        v-for="reel in reelsCount"
        :key="reel"
        :symbols="reelImages"
        :elementIndex="centered[reel - 1]"
        :delay="reel - 1"
        @finish="reelFinishHandler(reel)"
    />
  </div>
  <button @click="spinHandler">Spin</button>
  <PayTable :win-combination="winCombination" />
</template>

<script lang="ts">
import Reel from "./Reel.vue"
import { defineComponent, computed, ref, watch } from "vue"
import GameService, { reelIcons, reelsCount, reelSymbols } from "@/services/GameService"
import WinService from "@/services/WinService"
import PayTable from "@/components/PayTable.vue"

export default defineComponent({
  name: "SlotsGame",
  components: {
    PayTable,
    Reel
  },
  setup() {
    const centered = ref<number[]>([])
    const finished = ref<number[]>([])
    const winCombination = ref<Symbol>(Symbol())

    const spinHandler = () => {
      finished.value = []
      winCombination.value = Symbol()
      centered.value = GameService.getRandomCombination()
    }
    const reelFinishHandler = (index: number) => {
      finished.value.push(index)
    }

    const checkAllDone = computed(() => finished.value.length === reelsCount)

    const checkWin = () => {
      const winningCombination = WinService.winningCombination(centered.value)
      if (winningCombination) {
        winCombination.value = winAmount.id
        alert(winningCombination.winAmount)
      }
    }

    watch(checkAllDone, () => {
      if (checkAllDone.value) {
        checkWin()
      }
    })

    const reelImages = reelSymbols.map(symbol => reelIcons[symbol])

    return {
      centered,
      winCombination,
      reelImages,
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

