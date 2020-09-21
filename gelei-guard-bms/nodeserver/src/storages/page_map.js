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
  20117: [10267]
}

module.exports = {
  PAGE_MAPPER
}
