export default (new class {
  readonly spinCost: number = 1

  public balanceEnoughForSpin(balance: number) {
    return balance >= this.spinCost
  }

  public subtractCostOfSpin(balance: number) {
    return balance - this.spinCost
  }

  public addWinAmountToBalance(balance: number, winAmount: number) {
    return balance + winAmount
  }
})
