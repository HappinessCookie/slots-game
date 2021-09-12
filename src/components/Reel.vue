<template>
  <div class="reel">
    <img class="reel__item" v-for="symbol in symbols" :key="symbol.key" :src="symbol.image" :alt="symbol.key">
  </div>
</template>
<script>
import TripleBar from '@/assets/reel-symbols/3xBAR.png'
import Bar from '@/assets/reel-symbols/BAR.png'
import DoubleBar from '@/assets/reel-symbols/2xBAR.png'
import Seven from '@/assets/reel-symbols/7.png'
import Cherry from '@/assets/reel-symbols/Cherry.png'

const symbols = [
  {
    key: 'triple-bar',
    image: TripleBar
  },
  {
    key: 'bar',
    image: Bar
  },
  {
    key: 'double-bar',
    image: DoubleBar
  },
  {
    key: 'seven',
    image: Seven
  },
  {
    key: 'cherry',
    image: Cherry
  },
]
export default {
  name: 'Reel',
  setup() {
    return {
      symbols
    }
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:math';
$item-count: 5;
$item--height: 200px;

$radius: $item--height / (2 * math.tan(math.$pi / $item-count));
$radius-out: $item--height / (2 * math.sin(math.$pi / $item-count));

.reel {
  display: grid;
  transform-style: preserve-3d;
  position: relative;
  width: 200px;
  height: $radius-out * 2;
  transform: translateY(-($radius-out - $item--height / 2)) rotateX(0deg);

  &__item {
    height: $item--height;
    position: absolute;
    top: $radius-out - $item--height / 2;
    backface-visibility: hidden;

    $rotate-base: 360deg / $item-count;
    @for $i from 0 to $item-count + 1 {
      &:nth-child(#{$i + 1}) {
        @debug $i;
        transform: rotateX($rotate-base * $i) translateZ($radius);
      }
    }
  }
}
</style>
