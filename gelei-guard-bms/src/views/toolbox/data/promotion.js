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
        },
        {
          value: 'E2',
          label: 'PC孩子端(win)'
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
          label: 'VIVO Y95孩子端'
        },
        {
          value: '22',
          label: 'OPPO A5孩子端'
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
          label: 'VIVO Y3孩子端'
        },
        {
          value: '72',
          label: '华为企业模式'
        },
        {
          value: '82',
          label: 'OPPO定制机A8'
        },
        {
          value: '92',
          label: 'OPPO政企A72'
        },
        {
          value: 'A2',
          label: 'OPPO定制机A32'
        },
        {
          value: 'B2',
          label: 'VIVO定制机Y52S'
        },
        {
          value: 'C2',
          label: '联想X605FC'
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
        },
        {
          value: '73',
          label: '华为企业模式中间件'
        },
        {
          value: '83',
          label: 'OPPO定制机A8中间件'
        },
        {
          value: '93',
          label: 'OPPO政企A72中间件'
        },
        {
          value: 'A3',
          label: 'OPPO定制机A32中间件'
        },
        {
          value: 'B3',
          label: 'VIVO定制机Y52S中间件'
        },
        {
          value: 'C3',
          label: '联想X605FC中间件'
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
    label: 'VIVO Y95孩子端'
  },
  {
    value: '22',
    label: 'OPPO A5孩子端'
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
    label: 'VIVO Y3孩子端'
  },
  {
    value: '72',
    label: '华为企业模式孩子端'
  },
  {
    value: '82',
    label: 'OPPO定制机A8'
  },
  {
    value: '13',
    label: 'VIVO中间件'
  },
  {
    value: '23',
    label: 'OPPO中间件'
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
    label: 'VIVO Y3中间件'
  },
  {
    value: '73',
    label: '华为企业模式中间件'
  },
  {
    value: '83',
    label: 'OPPO定制机A8中间件'
  },
  {
    value: 'E2',
    label: 'PC孩子端(win)'
  },
  {
    value: '92',
    label: 'OPPO政企A72'
  },
  {
    value: 'A2',
    label: 'OPPO定制机A32'
  },
  {
    value: 'B2',
    label: 'VIVO定制机Y52S'
  },
  {
    value: '93',
    label: 'OPPO政企A72中间件'
  },
  {
    value: 'A3',
    label: 'OPPO定制机A32中间件'
  },
  {
    value: 'B3',
    label: 'VIVO定制机Y52S中间件'
  },
  {
    value: 'C2',
    label: '联想X605FC'
  },
  {
    value: 'C3',
    label: '联想X605FC中间件'
  }
]

// 升级方式
export const platform_version_instructions = [
  /** 格雷盒子家长端***********************/
  {
    value: '01',
    label: 'IOS家长端',
    type: 0
  },
  {
    value: '11',
    label: '安卓家长端',
    type: 0
  },
  /** 格雷盒子孩子端***********************/
  {
    value: '02',
    label: 'IOS孩子端',
    type: 1
  },
  {
    value: 'F2',
    label: '安卓孩子端',
    type: 1
  },
  {
    value: 'E2',
    label: 'PC孩子端(win)',
    type: 1
  },
  /** 定制机孩子端***********************/
  {
    value: '12',
    label: 'VIVO Y95孩子端',
    type: 2
  },
  {
    value: '22',
    label: 'OPPO A5孩子端',
    type: 2
  },
  // {
  //   value: '32',
  //   label: '华为孩子端'
  // },
  {
    value: '42',
    label: '小格雷定制机',
    type: 2
  },
  {
    value: '52',
    label: '小米企业模式孩子端',
    type: 2
  },
  {
    value: '62',
    label: 'VIVO Y3孩子端',
    type: 2
  },
  {
    value: '72',
    label: '华为企业模式孩子端',
    type: 2
  },
  {
    value: '82',
    label: 'OPPO定制机A8',
    type: 2
  },
  {
    value: '92',
    label: 'OPPO政企A72',
    type: 2
  },
  {
    value: 'A2',
    label: 'OPPO定制机A32',
    type: 2
  },
  {
    value: 'B2',
    label: 'VIVO定制机Y52S',
    type: 2
  },
  {
    value: 'C2',
    label: '联想X605FC',
    type: 2
  },
  /** 中间件***************************/
  {
    value: '13',
    label: '孩子端+VIVO中间件',
    type: 3
  },
  {
    value: '23',
    label: '孩子端+OPPO中间件',
    type: 3
  },
  // {
  //   value: '33',
  //   label: '孩子端+华为中间件'
  // }
  {
    value: '43',
    label: '孩子端+小格雷中间件',
    type: 3
  },
  {
    value: '53',
    label: '小米企业模式中间件',
    type: 3
  },
  {
    value: '63',
    label: 'VIVO Y3中间件',
    type: 3
  },
  {
    value: '73',
    label: '华为企业模式中间件',
    type: 3
  },
  {
    value: '83',
    label: 'OPPO定制机A8中间件',
    type: 3
  },
  {
    value: '93',
    label: 'OPPO政企A72中间件',
    type: 3
  },
  {
    value: 'A3',
    label: 'OPPO定制机A32中间件',
    type: 3
  },
  {
    value: 'B3',
    label: 'VIVO定制机Y52S中间件',
    type: 3
  },
  {
    value: 'C3',
    label: '联想X605FC中间件',
    type: 3
  }
]
// 升级方式分类
export const platform_version_instruction_type = [
  { label: '格雷盒子家长端', value: 0 },
  { label: '格雷盒子孩子端', value: 1 },
  { label: '定制机孩子端', value: 2 },
  { label: '中间件', value: 3 }
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
