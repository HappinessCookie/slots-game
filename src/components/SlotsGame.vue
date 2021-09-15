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
  <Balance :balance="balance" />
  <button :disabled="!canSpin" @click="spinHandler">Spin</button>
  <PayTable :win-combination="winCombination" />
</template>

<script lang="ts">
import Reel from "./Reel.vue"
import { defineComponent, computed, ref, watch } from "vue"
import GameService, { reelIcons, reelsCount, reelSymbols } from "@/services/GameService"
import WinService, { Line } from "@/services/WinService"
import PayTable from "@/components/PayTable.vue"
import Balance from "@/components/Balance.vue"
import BalanceService from "@/services/BalanceService"

export default defineComponent({
  name: "SlotsGame",
  components: {
    Balance,
    PayTable,
    Reel
  },
  setup() {
    const centered = ref<number[]>([])
    const finished = ref<number[]>([])
    const balance = ref<number>(500)
    const canSpin = computed(() => BalanceService.balanceEnoughForSpin(balance.value))
    const winCombination = ref<Symbol>(Symbol())

    const spinHandler = () => {
      if (!canSpin.value) {
        return
      }
      balance.value = BalanceService.subtractCostOfSpin(balance.value)
      finished.value = []
      winCombination.value = Symbol()
      centered.value = GameService.getRandomCombination()
    }
    const reelFinishHandler = (index: number) => {
      finished.value.push(index)
    }

    const checkAllDone = computed(() => finished.value.length === reelsCount)

    const checkWin = () => {
      const winningCombination = WinService.winningCombination(centered.value, Line.Center)
      if (winningCombination) {
        winCombination.value = winningCombination.id
        balance.value = BalanceService.addWinAmountToBalance(balance.value, winningCombination.winAmount)
      }
    }

    watch(checkAllDone, () => {
      if (checkAllDone.value) {
        checkWin()
      }
    })

    const reelImages = reelSymbols.map(symbol => reelIcons[symbol])

    return {
      canSpin,
      balance,
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

