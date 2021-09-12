<template>
  <div class="reels">
    <Reel ref="reel" :elementIndex="centered[0]" :delay="0" />
    <Reel ref="reel" :elementIndex="centered[1]" :delay="1" />
    <Reel ref="reel" :elementIndex="centered[2]" :delay="2" />
  </div>
  <button @click="spinHandler">Spin</button>
</template>

<script lang="ts">
import Reel from "./Reel.vue"
import { defineComponent, ref } from "vue"

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default defineComponent({
  name: "SlotsGame",
  components: {
    Reel
  },
  setup() {
    const reel = ref(null)
    const centered = ref([])
    const spinHandler = () => {
      centered.value = [
        randomIntFromInterval(1, 5),
        randomIntFromInterval(1, 5),
        randomIntFromInterval(1, 5)
      ]
    }

    return {
      reel,
      centered,
      spinHandler
    }
  }
})
</script>

<style lang="scss" scoped>
.reels {
  display: flex;
  height: 200px;
  overflow: hidden;
}
</style>

