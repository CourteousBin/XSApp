var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  toForm:function(){
    // 记录从哪个页面跳转到 资产咨询表
      // 如果从商品跳转 直接传 商品名称
      // 如果从 快速测试跳转 则 传入 '快速测试'
      // 如果从 定制服务 则 传入 '定制服务'

    app.globalData.wherePage = '定制服务';

    // 图片路径
    app.globalData.wherePageImg = 'https://mp.csnet.net.cn/static/admin/images/Customized.png';

    util.toPages('../formBase/formBase');
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})