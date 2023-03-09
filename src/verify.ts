import { ec as EC } from "elliptic"
const ec = new EC("secp256k1")

const key = ec.genKeyPair()
const publicKey = key.getPublic("hex")
const privateKey = key.getPrivate("hex")

// 公钥有点长，实际的区块链的公钥还有一个步骤进行压缩
console.log("Public key:")
console.log(publicKey)

console.log("Private key:")
console.log(privateKey)

// 获取 私钥对象
const priKey = ec.keyFromPrivate(privateKey, "hex")
// 加密获取签名
const signature = priKey.sign("xxxxxxx", "base64")

// 获取 公钥钥对象
const pubKey = ec.keyFromPublic(publicKey, "hex")
// 验证签名
console.log(pubKey.verify("xxxxxxx", signature))
