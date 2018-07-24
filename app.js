var util = require('/utils/util.js');
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 获取idCode
    util.getLogin(this.getIdCode)
  },
  // 获取idCode
  getIdCode:function(res){
    var idCode = res.code;
    var api = this.globalData.apiUrl +'getOpenId';
    util.requestHttp(api, 'POST', { 'js_code': idCode }, this.processOpenId)
  },
  // 处理返回openId
  processOpenId:function(data){
    
    this.globalData.openId = data.data.openid;
    console.log(this.globalData.openId);
  },
  globalData:{
    apiUrl:'https://mp.csnet.net.cn/api/jrapi/',
    
    // 记录从哪个页面跳转到 资产咨询表
      // 如果从商品跳转 直接传 商品名称
      // 如果从 快速测试跳转 则 传入 '快速测试'
      // 如果从 定制服务 则 传入 '定制服务'
    wherePage:null,
    // 图片
    wherePageImg:null,

  // 登入团队页面
    // 第一次登入后以后不再登入
    g_login:false,
    // 保存Id
    g_loginId:null,
  },
  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
