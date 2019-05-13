import getSign from '@/utils/sign'
import axios from 'axios'
import { calculate_file_sha256 } from '@/utils/common'

// 秒传服务 - json
export async function uploadFormDataSecondPassServer(file) {
  const data = new FormData()
  data.append('file', file, file.name)
  const sha256_hex = await calculate_file_sha256(file)
  const params = {
    hash: sha256_hex
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/gelei-guard-bms/api'
  }
  const sign_data = getSign(params)
  const url = '/file/data/upload'
  const decrypt_data = JSON.parse(sign_data)
  for (const key in decrypt_data) {
    data.append(key, decrypt_data[key])
  }
  return await axios.post(url, data, config)
}

// 上传文件服务 - form-data
export async function uploadFormDataServer(file) {
  const data = new FormData()
  data.append('file', file)
  const sha256_hex = await calculate_file_sha256(file)
  const params = {
    hash: sha256_hex
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/gelei-guard-bms/api'
  }
  // console.log('file:', param.get('file')) // 通过get判断值是否传进去
  const sign_data = getSign(params)
  const url = '/file/data/upload'
  const decrypt_data = JSON.parse(sign_data)
  for (const key in decrypt_data) {
    data.append(key, decrypt_data[key])
  }
  return await axios.post(url, data, config)
}

