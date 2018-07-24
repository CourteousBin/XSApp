// pages/myOrderDetail/myOrderDetail.js
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        current: true,
        done: true,
        text: '步骤一',
        desc: '审核资料'
      },
      {
        done: false,
        current: false,
        text: '步骤二',
        desc: '审核资料'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: '审核资料'
      },
      {
        done: false,
        current: false,
        text: '步骤四',
        desc: '审核资料'
      },
      {
        done: false,
        current: false,
        text: '步骤五'
        , desc: '审核通过'
      }
    ],
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderId = this.data.orderId = options.orderId
    var openId = app.globalData.openId;
    this.getOrder(orderId,openId)

  },
  // 加载完成了的订单
  getOrder: function (orderId, openId) {
    util.showLoading(true);
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'orderDetail', 'POST', { orderId: orderId, openId: openId }, function (data) {
      var dataList = data.data;
      console.log(dataList)
      that.setData({
        dataList: dataList
      })
    })
    wx.hideLoading();
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