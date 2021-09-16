<template>
  <div class="reels">
    <Reel
        v-for="(reel, index) in reels"
        :key="reel"
        :reel="reel"
        :elementIndex="centerCombination[index]"
        :delay="index"
        @spinCompleted="() => spinningReels[index] = false"
    />
  </div>
  <Balance :balance="balance" />
  <button :disabled="!canSpin" @click="spinHandler">Spin</button>
  <Debug :reels="reels" />
  <PayTable :win-combinations="winCombinations" />
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue"
import GameService, { reels, ReelSymbol } from "@/services/GameService"
import WinService, { Line } from "@/services/WinService"
import PayTable from "@/components/PayTable.vue"
import Balance from "@/components/Balance.vue"
import BalanceService from "@/services/BalanceService"
import Reel from "./Reel.vue"
import Debug from "./Debug.vue"
import DebugService from "@/services/DebugService"

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
    const balance = ref<number>(500)
    const canSpin = computed(() => BalanceService.balanceEnoughForSpin(balance.value))
    const winCombinations = ref<Symbol[]>([])
    const spinningReels = ref(reels.map(_ => false))

    const spinHandler = () => {
      if (!canSpin.value) {
        return
      }
      balance.value = BalanceService.subtractCostOfSpin(balance.value)
      spinningReels.value = reels.map(_ => true)
      winCombinations.value = []
      centerCombination.value = reels.map((reel, index) => {
        if (DebugService.debugState && DebugService.debugReels[index]) {
          const debugSymbol = DebugService.debugReels[index]
          switch (debugSymbol.line) {
            case Line.Top:
              return GameService.getNextSymbol(reel, GameService.getSymbolIndex(reel, debugSymbol.symbol))
            case Line.Center:
            default:
              return debugSymbol.symbol
            case Line.Bottom:
              return GameService.getPreviousSymbol(reel, GameService.getSymbolIndex(reel, debugSymbol.symbol))
          }
        }
        return GameService.getRandomReelSymbol(reel)
      })
    }

    const checkAllDone = computed(() => !spinningReels.value.some(Boolean))

    const checkWin = () => {
      const centerWinCombination = WinService.winningCombination(centerCombination.value, Line.Center)
      const topCombination = GameService.getTopCombination(centerCombination.value, reels)
      const topWinCombination = WinService.winningCombination(topCombination, Line.Top)
      const bottomCombination = GameService.getBottomCombination(centerCombination.value, reels)
      const bottomWinCombination = WinService.winningCombination(bottomCombination, Line.Bottom)
      if (centerWinCombination) {
        winCombinations.value.push(centerWinCombination.id)
        balance.value = BalanceService.addWinAmountToBalance(balance.value, centerWinCombination.payoff)
      }
      if (topWinCombination) {
        winCombinations.value.push(topWinCombination.id)
        balance.value = BalanceService.addWinAmountToBalance(balance.value, topWinCombination.payoff)
      }
      if (bottomWinCombination) {
        winCombinations.value.push(bottomWinCombination.id)
        balance.value = BalanceService.addWinAmountToBalance(balance.value, bottomWinCombination.payoff)
      }

      centerCombination.value = []
    }

    watch(checkAllDone, () => {
      if (checkAllDone.value) {
        checkWin()
      }
    })

    return {
      canSpin,
      balance,
      centerCombination,
      winCombinations,
      reels,
      spinHandler,
      spinningReels
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

