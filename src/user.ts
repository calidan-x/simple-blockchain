import { Transition } from "./transition"
import { blockChain } from "./block-chain"

export class User {
  address: string

  constructor(address: string) {
    this.address = address
  }

  getBalance() {
    return blockChain.getBalance(this.address)
  }

  sendAmount(toAddress: string, amount: number, signature: string) {
    const balance = this.getBalance()
    if (balance > amount) {
      const transition = new Transition(
        this.address,
        toAddress,
        amount,
        signature
      )
      blockChain.addTransition(transition)
    } else {
      console.log(`Your balance ${balance} is not enough!`)
    }
  }
}
