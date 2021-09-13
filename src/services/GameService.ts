import TripleBar from "@/assets/reel-symbols/3xBAR.png"
import Bar from "@/assets/reel-symbols/BAR.png"
import DoubleBar from "@/assets/reel-symbols/2xBAR.png"
import Seven from "@/assets/reel-symbols/7.png"
import Cherry from "@/assets/reel-symbols/Cherry.png"

export const symbols = [
  TripleBar,
  Bar,
  DoubleBar,
  Seven,
  Cherry
]

export const reelsCount = 3

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default (new class {
  private getRandomSymbol() {
    return randomIntFromInterval(0, symbols.length - 1)
  }

  getRandomCombination() {
    return Array(reelsCount).fill('').map(() => this.getRandomSymbol())
  }
})
