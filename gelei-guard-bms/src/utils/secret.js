// 引用AES源码js
const CryptoJS = require('crypto-js')

// 十六位十六进制数作为密钥
const key = CryptoJS.enc.Utf8.parse('19589DFEOLQ8J20F')
// 十六位十六进制数作为密钥偏移量
const iv = CryptoJS.enc.Utf8.parse('A5GH66DD1I56PD12')

/*
* AES解密方法
* */
export function Decrypt(word) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  const decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

/*
* AES加密方法
* */
export function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}

