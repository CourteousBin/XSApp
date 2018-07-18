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
  toMyTeamLogin:function(){
    // 先判断全局变量
      // g_login: false,
      // g_loginId:null,
    var g_login = app.globalData.g_login;

    if (g_login !== true){
      // 如果没登入过,进行登入
      util.toPages('../myTeamLogin/myTeamLogin')
    } else if (g_login === true){
      // 登入过直接跳转
      util.toPages('../myTeam/myTeam')
    }

    
  },
  toMyOrder:function(){
    util.toPages('../myOrder/myOrder')
  },
  getUserInfo:function(e){
    var userInfo = e.detail.userInfo;
    console.log(userInfo)
    this.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName
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
    wx.stopPullDownRefresh();
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