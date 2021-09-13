export enum ReelSymbol {
  TripleBar,
  Bar,
  DoubleBar,
  Seven,
  Cherry
}

enum Line {
  Top,
  Center,
  Bottom,
  Any
}

class Combination {
  constructor(public readonly symbols: Array<ReelSymbol | ReelSymbol[]>) {
  }
}

const cherryCombination = new Combination([ReelSymbol.Cherry, ReelSymbol.Cherry, ReelSymbol.Cherry])
const sevenCombination = new Combination([ReelSymbol.Seven, ReelSymbol.Seven, ReelSymbol.Seven])
const sevenOrCherryCombination = new Combination([
  [ReelSymbol.Seven, ReelSymbol.Cherry],
  [ReelSymbol.Seven, ReelSymbol.Cherry],
  [ReelSymbol.Seven, ReelSymbol.Cherry]
])
const tripleBarCombination = new Combination([ReelSymbol.TripleBar, ReelSymbol.TripleBar, ReelSymbol.TripleBar])
const doubleBarCombination = new Combination([ReelSymbol.DoubleBar, ReelSymbol.DoubleBar, ReelSymbol.DoubleBar])
const barCombination = new Combination([ReelSymbol.Bar, ReelSymbol.Bar, ReelSymbol.Bar])
const anyBarCombination = new Combination([
  [ReelSymbol.Bar, ReelSymbol.DoubleBar, ReelSymbol.TripleBar],
  [ReelSymbol.Bar, ReelSymbol.DoubleBar, ReelSymbol.TripleBar],
  [ReelSymbol.Bar, ReelSymbol.DoubleBar, ReelSymbol.TripleBar]
])

class WinConfig {
  constructor(
    public readonly combination: Combination,
    public readonly winAmount: number,
    public readonly line: Line = Line.Any
  ) {
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
  combinationWinCheck(symbols: ReelSymbol[], line: Line = Line.Center) {
    const winCombination = combinationList.find(combinationConfig => {
      if (combinationConfig.line !== Line.Any && combinationConfig.line !== line) {
        return false
      }
      return symbols.every((symbol, index) => {
        const combinationSymbol = combinationConfig.combination.symbols[index]
        if (Array.isArray(combinationSymbol)) {
          return combinationSymbol.includes(symbol)
        }
        return symbol === combinationSymbol
      })
    })

    return winCombination?.winAmount ?? 0
  }
})
