import { Transition } from "./transition"
import { sha256 } from "./utils"

export class Block {
  transactions: Transition[] = []
  previewHash: string
  hash: string
  nonce: number = 0

  calculateHash(minerAddress?: string) {
    if (minerAddress) {
      const trans = new Transition("", minerAddress, 100, "")
      this.transactions.push(trans)
    }
    while (true) {
      this.nonce++
      const hash = sha256(
        this.previewHash + JSON.stringify(this.transactions) + this.nonce
      )
      if (hash.startsWith("00")) {
        this.hash = hash
        break
      }
    }
  }

  addTransition(transition: Transition) {
    if (transition.isValid()) {
      this.transactions.push(transition)
    } else {
      console.error("invalid transition")
    }
  }

  isValid() {
    for (const transaction of this.transactions) {
      if (!transaction.isValid()) {
        return false
      }
    }
    if (
      sha256(this.previewHash + JSON.stringify(this.transactions)) !== this.hash
    ) {
      return false
    }
    return true
  }
}
