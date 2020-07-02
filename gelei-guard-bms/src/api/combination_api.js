import { get_all_member_plans, get_manager_channel_associated_user_list } from '@/api/interactive'

/* 商务注册创建与编辑页 */
export function business_cooperation_with_member_package_and_belonger(member_package_config = {}) {
  return new Promise((resolve) => {
    const promise_list = [
      get_all_member_plans(member_package_config),
      get_manager_channel_associated_user_list()
    ]
    Promise.all(promise_list).then((results) => {
      const [all_member_plans, channel_associated_user] = results
      let member_plans_list
      if (all_member_plans.status === 0) {
        member_plans_list = all_member_plans.data
      } else {
        member_plans_list = []
      }
      let associated_user_list
      if (channel_associated_user.status === 0) {
        associated_user_list = channel_associated_user.data
      } else {
        associated_user_list = []
      }
      resolve({ member_plans_list, associated_user_list })
    })
  })
}
