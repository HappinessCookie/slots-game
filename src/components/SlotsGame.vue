<template>
  <div class="reels">
    <Reel
        v-for="(reel, index) in reels"
        :key="reel"
        :reel="reel"
        :elementIndex="centered[index]"
        :delay="index"
        @finish="reelFinishHandler(index)"
    />
  </div>
  <Balance :balance="balance" />
  <button :disabled="!canSpin" @click="spinHandler">Spin</button>
  <Debug />
  <PayTable :win-combination="winCombination" />
</template>

<script lang="ts">
import Reel from "./Reel.vue"
import { defineComponent, computed, ref, watch } from "vue"
import GameService, { reels, ReelSymbol } from "@/services/GameService"
import WinService, { Line } from "@/services/WinService"
import PayTable from "@/components/PayTable.vue"
import Balance from "@/components/Balance.vue"
import BalanceService from "@/services/BalanceService"
import Debug from "@/components/Debug.vue"

// const winnableLines: Line[] = [Line.Top, Line.Center, Line.Bottom]

export default defineComponent({
  name: "SlotsGame",
  components: {
    Debug,
    Balance,
    PayTable,
    Reel
  },
  setup() {
    const centerCombination = ref<ReelSymbol[]>([])
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
      centerCombination.value = GameService.getRandomCombination()
    }
    const reelFinishHandler = (index: number) => {
      finished.value.push(index)
    }

    const checkAllDone = computed(() => finished.value.length === reels.length)

    const checkWin = () => {
      const winningCombination = WinService.winningCombination(centerCombination.value, Line.Center)
      if (winningCombination) {
        // winCombinations.value = winnableLines.map(line => WinService.winningCombination(centered.value, line))
        winCombination.value = winningCombination.id
        balance.value = BalanceService.addWinAmountToBalance(balance.value, winningCombination.winAmount)
      }
    }

    watch(checkAllDone, () => {
      if (checkAllDone.value) {
        checkWin()
      }
    })

    return {
      canSpin,
      balance,
      centered: centerCombination,
      winCombination,
      reels,
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

