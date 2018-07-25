var util = require('../../utils/util.js');
var app = getApp();
// pages/myTeam/myTeam.js
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
    this.getData()
  },
  toQuarterly:function(){
    util.toPages('../quarterly/quarterly')
  },
  getData(){
    util.showLoading(true)
    var that = this
    var url = app.globalData.apiUrl;
    var userId = app.globalData.g_loginId;

    util.requestHttp(url + 'userinfo', 'POST', { userId: userId}, function (data) {
      var dataList = data.data
      that.setData({
        dataList: dataList
      })
      that.lowerUserInfo(userId)
    })
  },
// 下面业务员
  lowerUserInfo: function (userId){
    var that = this
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'lowerUserInfo', 'POST', { userId: userId }, function (data) {
      var dataList = data.data
      that.setData({
        lowerUserInfo: dataList
      })
      wx.hideLoading()
    })
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
    this.getData()
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