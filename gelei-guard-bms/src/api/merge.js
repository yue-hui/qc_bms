/* 合并请求接口 */

import {
  get_advertising_point_list,
  get_advertising_type_list,
  get_order_paytype_list,
  get_order_status_list,
  get_order_type_list
} from '@/api/interactive'

/* 订单列表页数据 */
export async function fetch_all_order_filter_list() {
  const p1 = await get_order_type_list()
  const p2 = await get_order_status_list()
  const p3 = await get_order_paytype_list()
  const order_source = p1.data.map(r => {
    return {
      label: r.name,
      value: r.value
    }
  })
  const order_status_list = p2.data.map(r => {
    return {
      label: r.name,
      value: r.value
    }
  })
  const pay_type_mode = p3.data.map(r => {
    return {
      label: r.name,
      value: r.value
    }
  })
  return {
    order_source,
    order_status_list,
    pay_type_mode
  }
}

/* 广告列表页获取 */
export async function fetch_all_advertising_filter_list() {
  const p1 = await get_advertising_type_list()
  const p2 = await get_advertising_point_list()
  const advertising_type = p1.data.map(r => {
    return {
      label: r.name,
      value: r.value
    }
  })
  const advertising_point = p2.data.map(r => {
    return {
      label: r.name,
      value: r.value
    }
  })
  return {
    advertising_type,
    advertising_point
  }
}
