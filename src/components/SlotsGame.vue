<template>
  <div class="reels">
    <Reel
        v-for="reel in reelsCount"
        :key="reel"
        :symbols="symbols"
        :elementIndex="centered[reel - 1]"
        :delay="reel - 1"
    />
  </div>
  <button @click="spinHandler">Spin</button>
</template>

<script lang="ts">
import Reel from "./Reel.vue"
import { defineComponent, ref } from "vue"
import GameService, { reelsCount, symbols } from "@/services/GameService"

export default defineComponent({
  name: "SlotsGame",
  components: {
    Reel
  },
  setup() {
    const centered = ref([])
    const spinHandler = () => {
      centered.value = GameService.getRandomCombination()
    }

    return {
      centered,
      symbols,
      reelsCount,
      spinHandler
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

