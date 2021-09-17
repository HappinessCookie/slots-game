<template>
  <Card>
    <div class="slots-game">
      <div class="slots-game__reels">
        <div class="reels">
          <div
              class="reels__item"
              v-for="(reel, index) in reels"
              :key="index"
          >
            <Reel
                :reel="reel"
                :elementIndex="centerCombination[index]"
                :delay="index"
                @spinCompleted="() => spinningReels[index] = false"
            />
          </div>
        </div>
      </div>
      <div class="slots-game__balance">
        <span>Balance</span>
        <Balance v-model="balance" />
      </div>
      <div class="slots-game__controls">
        <button class="spin-button" :disabled="!canSpin" @click="spinHandler">Spin</button>
      </div>
    </div>
  </Card>
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
import Card from "@/components/Card.vue"

export default defineComponent({
  name: "SlotsGame",
  components: {
    Card,
    Debug,
    Balance,
    PayTable,
    Reel
  },
  setup(_, { emit }) {
    const centerCombination = ref<ReelSymbol[]>([])
    const balance = ref(500)
    const canSpin = computed(() => BalanceService.balanceEnoughForSpin(balance.value) && !spinningReels.value.some(Boolean))
    const spinningReels = ref(reels.map(_ => false))

    const spinHandler = () => {
      if (!canSpin.value) {
        return
      }
      balance.value = BalanceService.subtractCostOfSpin(balance.value)
      spinningReels.value = reels.map(_ => true)
      emit("wonCombinations", [])
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
      const wonCombinations = []
      if (centerWinCombination) {
        wonCombinations.push(centerWinCombination.id)
        balance.value = BalanceService.addWinAmountToBalance(balance.value, centerWinCombination.payoff)
      }
      if (topWinCombination) {
        wonCombinations.push(topWinCombination.id)
        balance.value = BalanceService.addWinAmountToBalance(balance.value, topWinCombination.payoff)
      }
      if (bottomWinCombination) {
        wonCombinations.push(bottomWinCombination.id)
        balance.value = BalanceService.addWinAmountToBalance(balance.value, bottomWinCombination.payoff)
      }

      emit("wonCombinations", wonCombinations)
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
      reels,
      spinHandler,
      spinningReels
    }
  }
})
</script>

<style lang="scss" scoped>
.slots-game {
  display: grid;
  grid-template-areas: "reels reels" "balance controls";

  &__reels {
    grid-area: reels;
  }

  &__balance {
    display: flex;
    align-items: center;
    gap: 5px;
    grid-area: balance;
    color: #faf3ed;
  }

  &__controls {
    grid-area: controls;
    display: flex;
    justify-content: end;
  }
}

.reels {
  display: inline-flex;
  gap: 10px;

  &__item {
    display: flex;
    align-items: center;
    height: 300px;
    overflow: hidden;
    border-radius: 10px;
    border: 2px solid #95908c;
    background-color: #faf3ed;
  }
}

.spin-button {
  padding: 10px;
  width: 50px;
  color: #fff;
  border: 2px solid #95908c;
  border-radius: 4px;
  background-color: #c5d832;
  transition: background-color 150ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #78854e;
  }
}
</style>

