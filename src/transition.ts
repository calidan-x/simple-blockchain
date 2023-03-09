import { ec as EC } from "elliptic"
const ec = new EC("secp256k1")

export class Transition {
  fromAddress: string
  toAddress: string
  amount: number
  timestamp: number
  signature: string

  constructor(
    fromAddress: string,
    toAddress: string,
    amount: number,
    signature: string
  ) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
    this.timestamp = Date.now()
    this.signature = signature
  }

  isValid() {
    if (!this.fromAddress) {
      return true
    }
    const pubKey = ec.keyFromPublic(this.fromAddress, "hex")
    return pubKey.verify(
      this.fromAddress + this.toAddress + this.amount,
      this.signature
    )
  }
}
