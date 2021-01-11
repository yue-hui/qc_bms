// 隐藏页面接口可能由多个入口决定，多个入口拥有相同的接口ID
// 20115

const PAGE_MAPPER = {
  'public': [40001, 40002, 40003, 40004, 10244],
  'upload': [40019, 40020],
  20000: [],
  20001: [10034, 10051],
  20002: [],
  20003: [10085, 40005],
  20008: [20074, 10053, 10079, 10110, 10036, 10102, 10070, 10248, 10247],
  20009: [10045],
  20010: [10005],
  20011: [10088],
  20004: [10084],
  20097: [20074, 10053, 10079, 10110, 10036, 10102, 10070, 10248, 10247],
  20005: [10038],
  20099: [10053, 10079, 10110, 10036, 10102, 10070],
  20006: [10005, 40006, 40007, 40008],
  20007: [10005, 10018], // 导出接口
  20092: [10091],
  20093: [10091, 10025], // 导出接口
  20094: [10030],
  20112: [10246],
  20095: [],
  20012: [10089, 10118, 10106, 10124, 10117],
  20013: [10106, 10090], // 导出接口
  20014: [10082, 10098, 10105],
  20015: [10098, 10061], // 导出接口
  20016: [],
  20017: [10092],
  20018: [10049], // 创建套餐
  20019: [10014, 10039], // 上架或下架
  20020: [10014], // 编辑
  20021: [10077],
  20022: [10004],
  20023: [10221, 10072],
  20024: [10073],
  20025: [10132, 10002],
  20098: [10132, 10002],
  20026: [],
  20027: [10015],
  20028: [10081],
  20029: [], // 应用推荐管理
  20030: [10006],
  20031: [10111, 10046],
  20075: [10111, 10055],
  20076: [10060],
  20032: [10068],
  20033: [10006, 10066],
  20077: [10003, 10006, 10109],
  20078: [10103],
  20034: [10041],
  20035: [10023, 40019, 40020, 10006],
  20079: [10013, 40019, 40020, 10006, 10104],
  20080: [10000],
  20100: [10056],
  20036: [],
  20037: [10059],
  20038: [10059, 10094],
  20039: [10092, 10075],
  20040: [10075],
  20041: [10083],
  20042: [],
  20043: [10112, 10010],
  20044: [10112, 10020],
  20081: [10119, 10112, 10086], // ID串了
  20045: [10062],
  20046: [10042],
  20047: [10021],
  20048: [10063],
  20049: [10029],
  20050: [10121, 10016],
  20051: [10050],
  20052: [40027, 40028, 10027],
  20053: [40019, 40020, 10052],
  20054: [10028, 10057],
  20055: [40019, 40020, 10028],
  20057: [10007],
  20058: [10071],
  20059: [10074],
  20060: [10131, 10114, 10048],
  20082: [10131, 10114, 10044],
  20083: [10012],
  20061: [10022],
  20062: [10087],
  20084: [10113, 10054],
  20085: [10011],
  20086: [10130], // 小程序管控
  20087: [40019, 40020, 10129, 10126],
  20088: [40019, 40020, 10126, 10128],
  20089: [10127],
  20063: [10080, 10092, 10226], // 商务合作注册页
  20064: [40019, 40020, 10226, 10043, 10092, 10221],
  20090: [40019, 40020, 10226, 10097, 10067, 10092, 10221],
  20065: [], // 系统管理
  20066: [10220, 10095],
  20067: [10069],
  20068: [10017],
  20069: [10064],
  20091: [10024],
  20071: [10035],
  20072: [10123, 10008, 10123],
  20073: [10031, 10008, 10123],
  20101: [], // 客服工单系统
  20102: [10230, 10238, 10234, 10231, 10229, 10241, 10227, 10228, 10240, 10239,
    10232, 10242, 10236, 10237, 10233, 10235, 10243],
  20103: [10238, 10234, 10231, 10229, 10241, 10227, 10228, 10240, 10239,
    10232, 10242, 10236, 10237, 10233, 10235, 10243],
  20104: [10230, 10238, 10234, 10229, 10241, 10227, 10228, 10240, 10239,
    10232, 10242, 10236, 10237, 10233, 10235, 10243],
  20105: [10238, 10234, 10231, 10229, 10241, 10227, 10228, 10240, 10239,
    10232, 10242, 10236, 10237, 10233, 10235, 10243],
  20106: [10238, 10234, 10229, 10241, 10227, 10228, 10240, 10239, 10232,
    10242, 10236, 10237, 10233, 10235, 10243],
  20107: [10230, 10238, 10234, 10229, 10241, 10227, 10228, 10240, 10239,
    10232, 10242, 10236, 10237, 10233, 10235, 10243],
  20108: [10230, 10238, 10234, 10229, 10241, 10227, 10228, 10240, 10239,
    10232, 10242, 10236, 10237, 10233, 10235, 10243],
  20109: [10235], // 工单标签管理
  20113: [10243],
  20110: [10233],
  20111: [10233],
  20114: [10249],
  20115: [10268], // 新用户7天签到数据
  20116: [10264, 10265, 10266, 20074, 10053, 10079, 10110, 10036, 10102, 10070, 10248, 10247], // 解绑原因统计
  20117: [10267],
  // PUSH 推送
  21000: [10281, 10282], // PUSH 推送列表
  // 21001: [10282], // PUSH 推送详情
  21002: [10279], // PUSH 新增通知
  21003: [10280], // PUSH 删除通知
  // 话题
  21004: [10277], // 话题列表
  21005: [10271], // 话题新增
  21006: [10273, 10272], // 话题编辑
  21007: [10276], // 话题参与详情
  21008: [10274], // 话题上/下架/删除
  21009: [10275], // 话题运营位详情
  21010: [10293], // 渠道列表
  // 兑换码
  21011: [10297], // 兑换码包列表
  21012: [10294], // 创建兑换码包
  21013: [10295], // 编辑兑换码包
  21014: [10298], // 使兑换码包失效
  21015: [10299], // 兑换码包添加库存
  21016: [10300, 10296], // 兑换码包兑换码列表
  21017: [10301], // 备注兑换码
  // 邀请好友
  21018: [10310], // 首页列表
  21019: [10312, 10317], // APP 购买成功文案
  21020: [10314], // 上架
  21021: [10316], // 参与详情（点击标题进入）
  21022: [10315], // 被邀请详情（点击注册成功人数/绑定邀请人数进入）
  21023: [10311, 10221], // 创建
  21024: [10311, 10221], // 编辑
  21025: [10313, 10221], // 查看
}

module.exports = {
  PAGE_MAPPER
}
