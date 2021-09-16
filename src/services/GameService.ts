import TripleBarImage from "@/assets/reel-symbols/3xBAR.png"
import BarImage from "@/assets/reel-symbols/BAR.png"
import DoubleBarImage from "@/assets/reel-symbols/2xBAR.png"
import SevenImage from "@/assets/reel-symbols/7.png"
import CherryImage from "@/assets/reel-symbols/Cherry.png"

export enum ReelSymbol {
  TripleBar = 'TripleBar',
  Bar = 'Bar',
  DoubleBar = 'DoubleBar',
  Seven = 'Seven',
  Cherry = 'Cherry'
}

export class ReelSymbolView {
  constructor(public readonly symbol: ReelSymbol, public readonly image: string) {
  }
}

export const tripleBar = new ReelSymbolView(ReelSymbol.TripleBar, TripleBarImage)
export const bar = new ReelSymbolView(ReelSymbol.Bar, BarImage)
export const doubleBar = new ReelSymbolView(ReelSymbol.DoubleBar, DoubleBarImage)
export const seven = new ReelSymbolView(ReelSymbol.Seven, SevenImage)
export const cherry = new ReelSymbolView(ReelSymbol.Cherry, CherryImage)

export class ReelView {
  public readonly symbols: ReelSymbolView[] = []

  constructor(...items: ReelSymbolView[]) {
    this.symbols = items
  }
}

const baseReel = new ReelView(tripleBar, bar, doubleBar, seven, cherry)

export const reels = [baseReel, baseReel, baseReel]

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default (new class {
  private getRandomReelSymbol(reel: ReelView) {
    const randomSymbolIndex = randomIntFromInterval(0, 2)
    return reel.symbols[randomSymbolIndex].symbol
  }

  public getRandomCombination() {
    return reels.map(this.getRandomReelSymbol)
  }
})
