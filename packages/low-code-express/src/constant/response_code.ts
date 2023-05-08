 class RET {
  static OK = '0';
  static DBERR = '4001';
  static NODATA = '4002';
  static DATAEXIST = '4003';
  static DATAERR = '4004';
  static SESSIONERR = '4101';
  static LOGINERR = '4102';
  static PARAMERR = '4103';
  static USERERR = '4104';
  static ROLEERR = '4105';
  static PWDERR = '4106';
  static REQERR = '4201';
  static IPERR = '4202';
  static THIRDERR = '4301';
  static IOERR = '4302';
  static SERVERERR = '4500';
  static UNKOWNERR = '4501';
}
interface ErrMap{
  [key:string]: string
}
 const error_map:ErrMap = {
  [RET.OK]: '成功',
  [RET.DBERR]: '数据库查询错误',
  [RET.NODATA]: '无数据',
  [RET.DATAEXIST]: '数据已存在',
  [RET.DATAERR]: '数据错误',
  [RET.SESSIONERR]: '用户未登录',
  [RET.LOGINERR]: '用户登录失败',
  [RET.PARAMERR]: '参数错误',
  [RET.USERERR]: '用户不存在或未激活',
  [RET.ROLEERR]: '用户身份错误',
  [RET.PWDERR]: '密码错误',
  [RET.REQERR]: '非法请求或请求次数受限',
  [RET.IPERR]: 'IP受限',
  [RET.THIRDERR]: '第三方系统错误',
  [RET.IOERR]: '文件读写错误',
  [RET.SERVERERR]: '内部错误',
  [RET.UNKOWNERR]: '未知错误',
};

export{RET, error_map}
