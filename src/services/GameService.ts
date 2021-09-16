import TripleBarImage from "@/assets/reel-symbols/3xBAR.png"
import BarImage from "@/assets/reel-symbols/BAR.png"
import DoubleBarImage from "@/assets/reel-symbols/2xBAR.png"
import SevenImage from "@/assets/reel-symbols/7.png"
import CherryImage from "@/assets/reel-symbols/Cherry.png"

export enum ReelSymbol {
  TripleBar = "TripleBar",
  Bar = "Bar",
  DoubleBar = "DoubleBar",
  Seven = "Seven",
  Cherry = "Cherry"
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
  public getRandomReelSymbol(reel: ReelView) {
    const randomSymbolIndex = randomIntFromInterval(0, reel.symbols.length - 1)
    return reel.symbols[randomSymbolIndex].symbol
  }

  public getPreviousSymbol(reel: ReelView, index: number) {
    const previousIndex = (--index + reel.symbols.length) % reel.symbols.length
    return reel.symbols[previousIndex].symbol
  }

  public getNextSymbol(reel: ReelView, index: number) {
    const nextIndex = ++index % reel.symbols.length
    return reel.symbols[nextIndex].symbol
  }

  public getSymbolIndex(reel: ReelView, symbol: ReelSymbol) {
    return reel.symbols.findIndex(s => s.symbol === symbol)
  }

  public getTopCombination(combination: ReelSymbol[], reels: ReelView[]) {
    return reels.map((reel, index) => {
      return this.getPreviousSymbol(reel, this.getSymbolIndex(reel, combination[index]))
    })
  }

  public getBottomCombination(combination: ReelSymbol[], reels: ReelView[]) {
    return reels.map((reel, index) => {
      return this.getNextSymbol(reel, this.getSymbolIndex(reel, combination[index]))
    })
  }
})
