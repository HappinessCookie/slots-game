import { Line } from "@/services/WinService"
import { ReelSymbol } from "@/services/GameService"

export default (new class {
  public debugState: boolean = true
  public debugReels: { symbol: ReelSymbol, line: Line }[] = []

  public setState(state: boolean) {
    this.debugState = state
  }

  public registerReelSymbol(symbol: ReelSymbol, line: Line, index: number) {
    this.debugReels[index] = { symbol, line }
  }
})
