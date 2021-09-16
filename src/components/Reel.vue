<template>
  <div class="reel" ref="el">
    <img class="reel__item" v-for="symbol in reel.symbols" :key="symbol.symbol" :src="symbol.image" alt="">
  </div>
</template>
<script lang="ts">
import mojs from '@mojs/core/dist/mo.umd.js'
import { defineComponent, PropType, ref, watch } from 'vue'
import { ReelSymbol, ReelView } from "@/services/GameService"

export default defineComponent({
  name: 'Reel',
  props: {
    reel: {
      type: ReelView,
      required: true
    },
    elementIndex: {
      type: String as PropType<ReelSymbol>
    },
    delay: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const el = ref(null)
    const rotateBase = 360 / props.reel.symbols.length
    watch(props, () => {
      if (!props.elementIndex) {
        return
      }
      const randomDeg = rotateBase * props.reel.symbols.findIndex(symbol => symbol.symbol === props.elementIndex)
      const html = new mojs.Html({
        el: el.value,
        rotateX: { 360: 0 },
        isShowEnd: true,
        isForce3d: false,
        duration: 500,
        repeat: 4,
        easing: 'linear.none',
      }).then({
        rotateX: -randomDeg,
        isShowEnd: true,
        isForce3d: false,
        duration: 500 * props.delay,
        easing: 'linear.none',
        onComplete: () => emit('finish')
      })

      html.play()
    })
    return {
      el
    }
  }
})
</script>

<style lang="scss" scoped>
@use 'sass:math';

$item-count: 5;
$item--height: 200px;

$radius: $item--height / (2 * math.tan(math.$pi / $item-count));
$radius-out: $item--height / (2 * math.sin(math.$pi / $item-count));
$rotate-base: 360deg / $item-count;

.reel {
  display: grid;
  transform-style: preserve-3d;
  position: relative;
  width: 200px;
  height: $radius-out * 2;

  &__item {
    height: $item--height;
    position: absolute;
    top: $radius-out - $item--height / 2;
    backface-visibility: hidden;

    @for $i from 0 to $item-count + 1 {
      &:nth-child(#{$i + 1}) {
        transform: rotateX($rotate-base * $i) translateZ($radius);
      }
    }
  }
}
</style>
