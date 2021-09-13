import TripleBar from "@/assets/reel-symbols/3xBAR.png"
import Bar from "@/assets/reel-symbols/BAR.png"
import DoubleBar from "@/assets/reel-symbols/2xBAR.png"
import Seven from "@/assets/reel-symbols/7.png"
import Cherry from "@/assets/reel-symbols/Cherry.png"
import { ReelSymbol } from "@/services/WinService"

export const reelSymbols = [
  ReelSymbol.TripleBar,
  ReelSymbol.Bar,
  ReelSymbol.DoubleBar,
  ReelSymbol.Seven,
  ReelSymbol.Cherry
]

export const reelIcons = {
  [ReelSymbol.TripleBar]: TripleBar,
  [ReelSymbol.Bar]: Bar,
  [ReelSymbol.DoubleBar]: DoubleBar,
  [ReelSymbol.Seven]: Seven,
  [ReelSymbol.Cherry]: Cherry
}

export const reelsCount = 3

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default (new class {
  private getRandomSymbol() {
    return randomIntFromInterval(0, reelSymbols.length - 1)
  }

  getRandomCombination() {
    return Array(reelsCount).fill('').map(() => this.getRandomSymbol())
  }
})
