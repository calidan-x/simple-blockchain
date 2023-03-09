export const sha256 = (input: string): string => {
  var crypto = require("crypto")
  const hash = crypto.createHash("sha256").update(input).digest("hex")
  return hash
}
