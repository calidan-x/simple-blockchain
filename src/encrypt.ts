import { ec as EC } from "elliptic"
const ec = new EC("secp256k1")

export const generateEncryptKeys = () => {
  const key = ec.genKeyPair()
  const publicKey = key.getPublic("hex")
  const privateKey = key.getPrivate("hex")
  const priKey = ec.keyFromPrivate(privateKey, "hex")
  return { publicKey, privateKey, priKey }
}
