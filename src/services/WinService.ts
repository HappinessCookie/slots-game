import { bar, cherry, doubleBar, ReelSymbol, ReelSymbolView, seven, tripleBar } from "@/services/GameService"

export enum Line {
  Top = "top",
  Center = "center",
  Bottom = "bottom",
  Any = "any"
}

class Combination {
  constructor(public readonly symbols: Array<ReelSymbolView | ReelSymbolView[]>) {
  }
}

const cherryCombination = new Combination([cherry, cherry, cherry])
const sevenCombination = new Combination([seven, seven, seven])
const sevenOrCherryCombination = new Combination([[seven, cherry], [seven, cherry], [seven, cherry]])
const tripleBarCombination = new Combination([tripleBar, tripleBar, tripleBar])
const doubleBarCombination = new Combination([doubleBar, doubleBar, doubleBar])
const barCombination = new Combination([bar, bar, bar])
const anyBarCombination = new Combination([[bar, doubleBar, tripleBar], [bar, doubleBar, tripleBar], [bar, doubleBar, tripleBar]])

export class WinConfig {
  public readonly id: Symbol

  constructor(
    public readonly combination: Combination,
    public readonly winAmount: number,
    public readonly line: Line = Line.Any
  ) {
    this.id = Symbol()
  }
}

export const combinationList = [
  new WinConfig(cherryCombination, 2000, Line.Top),
  new WinConfig(cherryCombination, 1000, Line.Center),
  new WinConfig(cherryCombination, 4000, Line.Bottom),
  new WinConfig(sevenCombination, 150, Line.Any),
  new WinConfig(sevenOrCherryCombination, 75, Line.Any),
  new WinConfig(tripleBarCombination, 50, Line.Any),
  new WinConfig(doubleBarCombination, 20, Line.Any),
  new WinConfig(barCombination, 10, Line.Any),
  new WinConfig(anyBarCombination, 5, Line.Any),
]

export default (new class {
  winningCombination(symbols: ReelSymbol[], line: Line = Line.Center) {
    return combinationList.find(combinationConfig => {
      if (combinationConfig.line !== Line.Any && combinationConfig.line !== line) {
        return false
      }
      return symbols.every((symbol, index) => {
        const combinationSymbol = combinationConfig.combination.symbols[index]
        if (Array.isArray(combinationSymbol)) {
          return combinationSymbol.some(reelSymbol => reelSymbol.symbol === symbol)
        }
        return symbol === combinationSymbol.symbol
      })
    }) ?? null
  }
})
