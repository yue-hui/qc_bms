export const promotion_status = [
  {
    value: '01',
    label: '启动中'
  },
  {
    value: '00',
    label: '未启动'
  },
  {
    value: '02',
    label: '已停止'
  }
]

// 后台管理系统 - 平台编号和升级范围 - 归类
// update_platforms与下方platforms中vlue保持一致
export const bms_platform_classification = [
  {
    value: '1',
    label: '格雷盒子家长端',
    select_item: {
      update_platforms: [
        {
          value: '01',
          label: 'IOS家长端'
        },
        {
          value: '11',
          label: '安卓家长端'
        }
      ],
      update_models: [
        {
          value: '0',
          label: '推荐升级',
          disabled: false
        },
        {
          value: '1',
          label: '强制升级',
          disabled: false
        }
      ],
      update_ranges: [
        {
          value: '01',
          label: '全量'
        },
        {
          value: '03',
          label: '用户手机'
        }
      ]
    }
  },
  {
    value: '2',
    label: '格雷盒子孩子端',
    select_item: {
      update_platforms: [
        {
          value: '02',
          label: 'IOS孩子端'
        },
        {
          value: 'F2',
          label: '安卓孩子端'
        }
      ],
      update_models: [
        {
          value: '0',
          label: '推荐升级',
          disabled: true
        },
        {
          value: '1',
          label: '强制升级',
          disabled: false
        }
      ],
      update_ranges: [
        {
          value: '01',
          label: '全量'
        },
        {
          value: '02',
          label: '设备ID白名单'
        }
      ]
    }
  },
  {
    value: '3',
    label: '定制机孩子端',
    select_item: {
      update_platforms: [
        {
          value: '12',
          label: 'VIVO孩子端'
        },
        {
          value: '22',
          label: 'OPPO孩子端'
        },
        {
          value: '42',
          label: '小格雷定制机'
        },
        {
          value: '52',
          label: '小米企业模式'
        },
        {
          value: '62',
          label: 'VIVO政企Y3'
        }
      ],
      update_models: [
        {
          value: '0',
          label: '推荐升级',
          disabled: true
        },
        {
          value: '1',
          label: '强制升级',
          disabled: false
        }
      ],
      update_ranges: [
        {
          value: '01',
          label: '全量'
        },
        {
          value: '02',
          label: '设备ID白名单'
        }
      ]
    }
  },
  {
    value: '4',
    label: '中间件',
    select_item: {
      update_platforms: [
        {
          value: '13',
          label: 'VIVO中间件'
        },
        {
          value: '23',
          label: 'OPPO中间件'
        },
        {
          value: '43',
          label: '小格雷中间件'
        },
        {
          value: '53',
          label: '小米企业模式中间件'
        },
        {
          value: '63',
          label: 'VIVO政企Y3中间件'
        }
      ],
      update_models: [
        {
          value: '0',
          label: '推荐升级',
          disabled: false
        },
        {
          value: '1',
          label: '强制升级',
          disabled: false
        }
      ],
      update_ranges: [
        {
          value: '01',
          label: '全量'
        },
        {
          value: '02',
          label: '设备ID白名单'
        }
      ]
    }
  }
]

// 升级平台
export const platforms = [
  {
    value: '01',
    label: 'IOS家长端'
  },
  {
    value: '11',
    label: '安卓家长端'
  },
  {
    value: '02',
    label: 'IOS孩子端'
  },
  {
    value: 'F2',
    label: '安卓孩子端'
  },
  {
    value: '12',
    label: 'vivo孩子端'
  },
  {
    value: '22',
    label: 'oppo孩子端'
  },
  // {
  //   value: '32',
  //   label: '华为孩子端'
  // },
  {
    value: '42',
    label: '小格雷定制机'
  },
  {
    value: '52',
    label: '小米企业模式孩子端'
  },
  {
    value: '62',
    label: 'vivo Y3孩子端'
  },
  {
    value: '13',
    label: 'vivo中间件'
  },
  {
    value: '23',
    label: 'oppo中间件'
  },
  // {
  //   value: '33',
  //   label: '华为中间件'
  // }
  {
    value: '43',
    label: '小格雷中间件'
  },
  {
    value: '53',
    label: '小米企业模式中间件'
  },
  {
    value: '63',
    label: 'vivo Y3中间件'
  }
]

// 升级方式
export const platform_version_instructions = [
  {
    value: '01',
    label: 'IOS家长端'
  },
  {
    value: '11',
    label: '安卓家长端'
  },
  {
    value: '02',
    label: 'IOS孩子端'
  },
  {
    value: 'F2',
    label: '安卓孩子端'
  },
  {
    value: '12',
    label: 'vivo孩子端'
  },
  {
    value: '22',
    label: 'oppo安卓孩子端'
  },
  // {
  //   value: '32',
  //   label: '华为孩子端'
  // },
  {
    value: '42',
    label: '小格雷定制机'
  },
  {
    value: '52',
    label: '小米企业模式孩子端'
  },
  {
    value: '62',
    label: 'vivo Y3孩子端'
  },
  {
    value: '13',
    label: '孩子端+vivo中间件'
  },
  {
    value: '23',
    label: '孩子端+oppo中间件'
  },
  // {
  //   value: '33',
  //   label: '孩子端+华为中间件'
  // }
  {
    value: '43',
    label: '孩子端+小格雷中间件'
  },
  {
    value: '53',
    label: '小米企业模式中间件'
  },
  {
    value: '63',
    label: 'vivo Y3中间件'
  }
]

export const help_question_status = [
  {
    value: '0',
    label: '待生效'
  },
  {
    value: '1',
    label: '已生效'
  }
]

// 设备平台类型列表
export const device_type_list = [
  {
    value: '',
    label: '不限'
  },
  {
    value: '01',
    label: 'PC'
  },
  {
    value: '02',
    label: 'IOS'
  },
  {
    value: '03',
    label: 'Android'
  }
]

// 会员套餐的设备列表
export const MEMBER_DEVICE_LIST_RANGE = [
  {
    value: '00',
    label: '不限'
  },
  {
    value: '01',
    label: 'PC'
  },
  {
    value: '02',
    label: 'IOS'
  },
  {
    value: '03',
    label: 'Android'
  }
]

export const child_platform_type = [
  {
    value: '01',
    label: 'PC端'
  },
  {
    value: '02',
    label: '苹果'
  },
  {
    value: '03',
    label: '安卓'
  }
]
