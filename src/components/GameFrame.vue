<template>
  <div class="game-frame">
    <div class="game-frame__game">
      <SlotsGame @won-combinations="winCombinations = $event" />
    </div>
    <div class="game-frame__debug">
      <Debug :reels="reels" />
    </div>
    <div class="game-frame__paytable">
      <PayTable :win-combinations="winCombinations" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { reels } from "@/services/GameService"
import PayTable from "@/components/PayTable.vue"
import Debug from "./Debug.vue"
import SlotsGame from "@/components/SlotsGame.vue"

export default defineComponent({
  name: "GameFrame",
  components: {
    SlotsGame,
    Debug,
    PayTable
  },
  setup() {
    const winCombinations = ref<Symbol[]>([])

    return {
      winCombinations,
      reels,
    }
  }
})
</script>

<style lang="scss" scoped>
.game-frame {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-areas: "game paytable" "debug paytable";
  grid-gap: 40px;

  &__game {
    grid-area: game;
  }

  &__debug {
    grid-area: debug;
  }

  &__paytable {
    grid-area: paytable;
  }
}
</style>

