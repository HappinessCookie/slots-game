import { bar, cherry, doubleBar, ReelSymbol, ReelSymbolView, seven, tripleBar } from "@/services/GameService"

export enum Line {
  Top = "top",
  Center = "center",
  Bottom = "bottom",
  Any = "any"
}

class PayLine {
  public readonly symbols: ReelSymbolView[][]

  constructor(symbols: Array<ReelSymbolView | ReelSymbolView[]>) {
    this.symbols = symbols.map(symbol => Array.isArray(symbol) ? symbol : [symbol])
  }
}

const cherries = new PayLine([cherry, cherry, cherry])
const sevens = new PayLine([seven, seven, seven])
const sevenOrCherry = new PayLine([[seven, cherry], [seven, cherry], [seven, cherry]])
const tripleBars = new PayLine([tripleBar, tripleBar, tripleBar])
const doubleBars = new PayLine([doubleBar, doubleBar, doubleBar])
const bars = new PayLine([bar, bar, bar])
const anyBars = new PayLine([[bar, doubleBar, tripleBar], [bar, doubleBar, tripleBar], [bar, doubleBar, tripleBar]])

export class Combination {
  public readonly id: Symbol

  constructor(
    public readonly payLine: PayLine,
    public readonly payoff: number,
    public readonly line: Line = Line.Any
  ) {
    this.id = Symbol()
  }
}

export const payTable = [
  new Combination(cherries, 2000, Line.Top),
  new Combination(cherries, 1000, Line.Center),
  new Combination(cherries, 4000, Line.Bottom),
  new Combination(sevens, 150, Line.Any),
  new Combination(sevenOrCherry, 75, Line.Any),
  new Combination(tripleBars, 50, Line.Any),
  new Combination(doubleBars, 20, Line.Any),
  new Combination(bars, 10, Line.Any),
  new Combination(anyBars, 5, Line.Any),
]

export default (new class {
  winningCombination(symbolsSequence: ReelSymbol[], line: Line = Line.Center) {
    return payTable.find(combination => {
      if (combination.line !== Line.Any && combination.line !== line) {
        return false
      }
      return symbolsSequence.every((symbol, index) => {
        const sequenceSymbolView = combination.payLine.symbols[index]
        return sequenceSymbolView.some(sequenceSymbol => sequenceSymbol.symbol === symbol)
      })
    }) ?? null
  }
})
