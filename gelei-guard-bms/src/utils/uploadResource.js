import getSign from '@/utils/sign'
import axios from 'axios'
import { calculate_file_sha256 } from '@/utils/common'
import { file_second_pass } from '@/api/interactive'


// 图片、文件上传接口
export function uploadFormData(params) {
  const urlPath = '/data/upload'
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/gelei-guard-bms/file'
  }
  const sign_data = getSign({})
  const url = urlPath
  const decryptData = JSON.parse(sign_data)
  for (const key in decryptData) {
    params.append(key, decryptData[key])
  }
  return axios.post(url, params, config)
}

// 文件秒传服务接口
export function secondPassUploadFormData(params) {
  const urlPath = '/data/secondpass '
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/file/'
  }
  // console.log('file:', param.get('file')) // 通过get判断值是否传进去
  const sign_data = getSign({})
  const url = process.env.BASE_API + urlPath
  const decryptData = JSON.parse(sign_data)
  for (const key in decryptData) {
    params.append(key, decryptData[key])
  }
  return axios.post(url, params, config)
}

export async function uploadFile(file) {
  const sha256_hex = await calculate_file_sha256(file)
  const data = {
    hash: sha256_hex
  }
  const second_pass_result = await file_second_pass(data)
  console.log('second_pass_result: ', second_pass_result)
}

// 上传文件服务
export async function uploadFormDataServerOld(file) {
  const data = new FormData()
  data.append('file', file, file.name)
  const sha256_hex = await calculate_file_sha256(file)
  const params = {
    hash: sha256_hex
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/gelei-guard-bms/file'
  }
  const sign_data = getSign(params)
  const url = '/data/upload'
  const decrypt_data = JSON.parse(sign_data)
  for (const key in decrypt_data) {
    data.append(key, decrypt_data[key])
  }
  return await axios.post(url, data, config)
}

// 秒传服务
export async function uploadFormDataSecondPassServerOld(file) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    baseURL: '/gelei-guard-bms/file'
  }
  const sha256_hex = await calculate_file_sha256(file)
  const params = {
    hash: sha256_hex
  }
  const sign_data = getSign(params)
  const url = '/data/secondpass'
  const data = JSON.parse(sign_data)
  return await axios.post(url, data, config)
}

// 上传文件服务
export async function uploadFormDataServer(file) {
  const data = new FormData()
  data.append('file', file)
  const sha256_hex = await calculate_file_sha256(file)
  const params = {
    hash: sha256_hex
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/gelei-guard-bms/file'
  }
  // console.log('file:', param.get('file')) // 通过get判断值是否传进去
  const sign_data = getSign(params)
  const url = '/data/upload'
  const decrypt_data = JSON.parse(sign_data)
  for (const key in decrypt_data) {
    data.append(key, decrypt_data[key])
  }
  return await axios.post(url, data, config)
}

// 秒传服务
export async function uploadFormDataSecondPassServer(file) {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    baseURL: '/gelei-guard-bms/file'
  }
  const hash = await calculate_file_sha256(file)
  const params = { hash }
  const sign_data = getSign(params)
  const decrypt_data = JSON.parse(sign_data)
  const data = new FormData()
  for (const key in decrypt_data) {
    data.append(key, decrypt_data[key])
  }
  const url = '/data/secondpass'
  return await axios.post(url, data, config)
}
