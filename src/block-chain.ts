import { Block } from "./block"
import { Transition } from "./transition"

export class BlockChain {
  blocks: Block[] = []
  paddingTransactions = []
  minerAddress = ""

  constructor() {
    const genesisBlock = new Block()
    genesisBlock.calculateHash()
    this.blocks.push(genesisBlock)
  }

  setMiner(minerAddress: string) {
    this.minerAddress = minerAddress
  }

  initAccount(initAccounts: string[]) {
    const initBlock = new Block()
    initAccounts.forEach((addr) => {
      const trans = new Transition("", addr, 1000, "")
      initBlock.addTransition(trans)
    })

    initBlock.calculateHash()
    this.blocks.push(initBlock)
  }

  addTransition(transaction: Transition) {
    this.paddingTransactions.push(transaction)
    this.mine()
  }

  mine() {
    const block = new Block()
    this.paddingTransactions.forEach((transaction) => {
      block.addTransition(transaction)
    })
    this.paddingTransactions = []
    block.previewHash = this.blocks[this.blocks.length - 1].hash
    // @ts-ignore
    block.calculateHash(this.minerAddress)
    this.blocks.push(block)
  }

  isValid() {
    this.blocks.forEach((block) => {
      block.isValid()
    })
  }

  getBalance(address: string) {
    let balance = 0
    this.blocks.forEach((block) => {
      block.transactions.forEach((transition) => {
        if (transition.fromAddress === address) {
          balance -= transition.amount
        } else if (transition.toAddress === address) {
          balance += transition.amount
        }
      })
    })
    return balance
  }
}

export const blockChain = new BlockChain()
