import { blockChain } from "./block-chain"
import { generateEncryptKeys } from "./encrypt"
import { User } from "./user"

// private key should saved in private computer
const user1Keys = generateEncryptKeys()
const user2Keys = generateEncryptKeys()

export const user1 = new User(user1Keys.publicKey)
export const user2 = new User(user2Keys.publicKey)

// give every users 100 coins. In real blockchain program, user earn money by mining
blockChain.initAccount([user1.address, user2.address])
blockChain.setMiner(user2.address)

const amount = 100
user1.sendAmount(
  user2.address,
  amount,
  user1Keys.priKey
    .sign(user1.address + user2.address + amount, "base64")
    .toDER("hex")
)

console.log(user1.getBalance())
console.log(user2.getBalance())
