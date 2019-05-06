import getSign from '@/utils/sign'
import axios from 'axios'

// 图片、文件上传接口
export function uploadFormData(params) {
  const urlPath = '/common/file/upload'
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' }
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
