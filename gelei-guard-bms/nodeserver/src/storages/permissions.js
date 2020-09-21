// MAX ID: 20118
const FUNCTION_MODULE_WIDTH = 120
const FUNCTION_PAGE_WIDTH = 200
const BUTTON_OPERATION_WIDTH = 132

// max auth id 20095
// layout  vertical | horizotal
const PERMISSION_DATA = [
  {
    name: '控制面板',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20000,
    baseline: true,
    page: false,
    children: [
      {
        name: '首页',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20001,
        children: []
      }
    ]
  },
  // {
  //   name: '首页',
  //   checked: false,
  //   width: FUNCTION_PAGE_WIDTH,
  //   layout: 'horizotal',
  //   c_layout: 'horizotal',
  //   code: 20001,
  //   children: []
  // },
  {
    name: '用户管理',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20002,
    baseline: true,
    page: false,
    children: [
      {
        name: '家长信息管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20003,
        children: [
          {
            name: '查看',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20008,
            children: []
          },
          {
            name: '交易记录',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20010,
            children: []
          },
          {
            name: '会员记录',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20009,
            children: []
          },
          {
            name: '导出',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20011,
            children: []
          }
          // {
          //   name: '退订记录',
          //   checked: false,
          //   width: BUTTON_OPERATION_WIDTH,
          //   layout: 'vertical',
          //   c_layout: 'vertical',
          //   code: 20096,
          //   children: []
          // }
        ]
      },
      {
        name: '孩子信息管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20004,
        children: [
          {
            name: '查看',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20099,
            children: []
          },
          {
            name: '导出',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20005,
            children: []
          }
        ]
      },
      // {
      //   name: '用户详细信息',
      //   checked: false,
      //   width: FUNCTION_PAGE_WIDTH,
      //   layout: 'horizotal',
      //   c_layout: 'vertical',
      //   code: 20097,
      //   children: []
      // },
      {
        name: '订单管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'vertical',
        code: 20006,
        children: [
          {
            name: '导出', // 整改
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20007,
            children: []
          }
        ]
      },
      {
        name: '设备信息管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'vertical',
        code: 20092,
        children: [
          {
            name: '导出', // 整改
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20093,
            children: []
          }
        ]
      },
      {
        name: '设备使用记录',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'vertical',
        code: 20094,
        children: []
      },
      {
        name: '查询用户日志',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'vertical',
        code: 20112,
        children: []
      }
    ]
  },
  {
    name: '用户数据分析',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20095,
    baseline: true,
    page: false,
    children: [
      {
        name: '家长端总体数据',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20012,
        children: [
          {
            name: '导出',
            checked: false,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20013,
            children: []
          }
        ]
      },
      {
        name: '孩子端总体数据',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20014,
        children: [
          {
            name: '导出',
            checked: false,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20015,
            children: []
          }
        ]
      },
      {
        name: '解绑原因统计',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20116,
        children: [
          {
            name: '导出',
            checked: false,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20117,
            children: []
          }
        ]
      }
    ]
  },
  {
    name: '会员管理',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20016,
    baseline: true,
    page: false,
    children: [
      {
        name: '会员套餐管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20017,
        children: [
          {
            name: '创建套餐',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20018,
            children: []
          },
          {
            name: '下架',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20019,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20020,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20021,
            children: []
          }
        ]
      },
      {
        name: '会员活动管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20022,
        children: [
          {
            name: '创建会员活动',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20023,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20024,
            children: []
          },
          {
            name: '查看',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20025,
            children: []
          }
        ]
      }
      // {
      //   name: '活动详细信息',
      //   checked: false,
      //   width: FUNCTION_PAGE_WIDTH,
      //   layout: 'horizotal',
      //   c_layout: 'horizotal',
      //   code: 20098,
      //   children: []
      // }
    ]
  },
  {
    name: '消息推送',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20026,
    baseline: true,
    page: false,
    children: [
      {
        name: '文本短信',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20027,
        children: []
      },
      {
        name: '语音短信',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20028,
        children: []
      }
    ]
  },
  {
    name: '应用推荐管理',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20029,
    baseline: true,
    page: false,
    children: [
      {
        name: '推荐应用',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20030,
        children: [
          {
            name: '创建应用',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20031,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20075,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20076,
            children: []
          }
        ]
      },
      {
        name: '推荐应用组合',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20032,
        children: [
          {
            name: '创建系统推荐',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20033,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20077,
            children: []
          },
          {
            name: '推送/暂停',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20078,
            children: []
          }
        ]
      },
      {
        name: '推荐应用专题',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20034,
        children: [
          {
            name: '创建应用专题',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20035,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20079,
            children: []
          },
          {
            name: '上架/下架',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20080,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20100,
            children: []
          }
        ]
      }
    ]
  },

  {
    name: '客服工单系统',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20101,
    baseline: true,
    page: false,
    children: [
      {
        name: '工单首页',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20102,
        children: [
          {
            name: '创建工单',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20103,
            children: []
          },
          {
            name: '导出工单',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20114,
            children: []
          }
        ]
      },
      {
        name: '我创建的工单',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20104,
        children: [
          {
            name: '创建工单',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20105,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20106,
            children: []
          }
        ]
      },
      {
        name: '抄送我的工单',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20107,
        children: []
      },
      {
        name: '我受理的工单',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20108,
        children: []
      },
      {
        name: '工单标签管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20109,
        children: [
          {
            name: '重命名',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20113,
            children: []
          },
          {
            name: '添加子层级',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20110,
            children: []
          },
          {
            name: '添加同层级',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20111,
            children: []
          }
        ]
      }
    ]
  },

  {
    name: '活动管理',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20036,
    baseline: true,
    page: false,
    children: [
      {
        name: '邀请好友数据',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20037,
        children: [
          {
            name: '导出',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20038,
            children: []
          }
        ]
      },
      {
        name: '邀请好友配置',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20039,
        children: [
          {
            name: '重置',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20040,
            children: []
          },
          {
            name: '保存',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20041,
            children: []
          }
        ]
      },
      {
        name: '新用户7天签到数据',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20115,
        children: []
      }
    ]
  },
  {
    name: '工具使用',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20042,
    baseline: true,
    page: false,
    children: [
      {
        name: '帮助中心',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20043,
        children: [
          {
            name: '添加帮助问题',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20044,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20081,
            children: []
          },
          {
            name: '关闭',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20045,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20046,
            children: []
          }
        ]
      },
      {
        name: '应用升级',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20047,
        children: [
          {
            name: '发送同步版本指令',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20048,
            children: []
          },
          {
            name: '创建应用策略',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20049,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20050,
            children: []
          },
          {
            name: '启动/停止',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20051,
            children: []
          }
        ]
      },
      {
        name: '广告配置',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20052,
        children: [
          {
            name: '创建广告',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20053,
            children: []
          },
          {
            name: '上架/下架',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20054,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20055,
            children: []
          },
          // {
          //   name: '关闭',
          //   checked: false,
          //   width: BUTTON_OPERATION_WIDTH,
          //   layout: 'vertical',
          //   c_layout: 'vertical',
          //   code: 20056,
          //   children: []
          // },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20057,
            children: []
          }
        ]
      },
      {
        name: '版本管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20058,
        children: []
      },
      {
        name: '系统参数',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20059,
        children: [
          {
            name: '创建系统参数',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20060,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20082,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20083,
            children: []
          }
        ]
      },
      {
        name: '高危应用表',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20061,
        children: [
          {
            name: '新建',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20062,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20084,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20085,
            children: []
          }
        ]
      },
      {
        name: '小程序管控',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20086,
        children: [
          {
            name: '新建',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20087,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20088,
            children: []
          },
          {
            name: '删除',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20089,
            children: []
          }
        ]
      },
      {
        name: '商务合作注册页',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20063,
        children: [
          {
            name: '创建页面',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20064,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20090,
            children: []
          }
        ]
      }
    ]
  },
  {
    name: '系统管理',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20065,
    baseline: false,
    page: false,
    children: [
      {
        name: '账号管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20066,
        children: [
          {
            name: '创建账号',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20067,
            children: []
          },
          {
            name: '开启/关闭',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20068,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20069,
            children: []
          },
          // {
          //   name: '删除',
          //   checked: false,
          //   width: BUTTON_OPERATION_WIDTH,
          //   layout: 'vertical',
          //   c_layout: 'vertical',
          //   code: 20070,
          //   children: []
          // },
          {
            name: '重置密码',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20091,
            children: []
          }
        ]
      },
      {
        name: '角色管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20071,
        children: [
          {
            name: '创建角色',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20072,
            children: []
          },
          {
            name: '编辑权限',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20073,
            children: []
          }
          // {
          //   name: '编辑',
          //   checked: false,
          //   width: BUTTON_OPERATION_WIDTH,
          //   layout: 'vertical',
          //   c_layout: 'vertical',
          //   code: 20074,
          //   children: []
          // }
        ]
      }
    ]
  }
]

// 代理商权限
const AGENT_PERMISSION_DATA = [
  {
    name: '用户管理',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20002,
    page: false,
    children: [
      {
        name: '家长信息管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20003,
        children: [
          {
            name: '查看',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20008,
            children: []
          },
          {
            name: '交易记录',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20010,
            children: []
          },
          {
            name: '会员记录',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20009,
            children: []
          },
          {
            name: '导出',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20011,
            children: []
          }
          // {
          //   name: '退订记录',
          //   checked: false,
          //   width: BUTTON_OPERATION_WIDTH,
          //   layout: 'vertical',
          //   c_layout: 'vertical',
          //   code: 20096,
          //   children: []
          // }
        ]
      },
      {
        name: '孩子信息管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20004,
        children: [
          {
            name: '查看',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20099,
            children: []
          },
          {
            name: '导出',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20005,
            children: []
          }
        ]
      },
      {
        name: '订单管理',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'vertical',
        code: 20006,
        children: [
          {
            name: '导出', // 整改
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20007,
            children: []
          }
        ]
      }
    ]
  },
  {
    name: '工具使用',
    checked: false,
    width: FUNCTION_MODULE_WIDTH,
    layout: 'horizotal',
    c_layout: 'vertical',
    code: 20042,
    baseline: true,
    page: false,
    children: [
      {
        name: '商务合作注册页',
        checked: false,
        width: FUNCTION_PAGE_WIDTH,
        layout: 'horizotal',
        c_layout: 'horizotal',
        code: 20063,
        children: [
          {
            name: '创建页面',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20064,
            children: []
          },
          {
            name: '编辑',
            checked: false,
            width: BUTTON_OPERATION_WIDTH,
            layout: 'vertical',
            c_layout: 'vertical',
            code: 20090,
            children: []
          }
        ]
      }
    ]
  }
]

// 权限头部信息栏
const PERMISSION_HEADER = [
  {
    name: '功能模块',
    width: FUNCTION_MODULE_WIDTH
  },
  {
    name: '功能页面',
    width: 200
  },
  {
    name: '操作'
  }
]

module.exports = {
  PERMISSION_DATA,
  AGENT_PERMISSION_DATA,
  PERMISSION_HEADER
}
