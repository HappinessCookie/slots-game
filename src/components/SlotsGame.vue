<template>
  <div class="reels">
    <Reel />
    <Reel />
    <Reel />
  </div>
</template>

<script>
import Reel from "./Reel.vue"

export default {
  name: "SlotsGame",
  components: {Reel}
}
</script>

<style lang="scss" scoped>
.reels {
  display: flex;
  height: 200px;
  overflow: hidden;
}
</style>

