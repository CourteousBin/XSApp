var util = require('../../utils/util.js');
var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["全部订单", "完成订单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    dataList: ['1'],
  },
  onLoad: function () {
    this.template();
    this.getOrder();
  },
  toOrderDetail:function(){
    util.toPages('../myOrderDetail/myOrderDetail');
  },
  tabClick: function (e) {
    // 当前的 页面id
    var nowIndex = parseInt(this.data.activeIndex)
    // 点击的 页面id
    var clcickIndex = parseInt(e.currentTarget.id)

    if (nowIndex !== clcickIndex){
      console.log('不一样')
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });

      if (clcickIndex == 0){
        this.getOrder()
      }else {
        this.getCompleteOrder()
      }
    }

    // this.setData({
    //   sliderOffset: e.currentTarget.offsetLeft,
    //   activeIndex: e.currentTarget.id
    // });

    // 点击 加载数据
    // var activeIndex = this.data.activeIndex;
    // 如果 当前的码数 和 点击的码数不做操作

  },
  template: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var scrollHeight = (res.windowHeight - 50) * 2;
        console.log(res.windowHeight, scrollHeight);
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scrollHeight: scrollHeight
        });
      }
    });
  },
  onScrollLower: function () {
    wx.showNavigationBarLoading();

    setTimeout(function () {
      wx.hideNavigationBarLoading()
    }, 800)
  },
  // 加载全部订单
  getOrder:function(){
    util.showLoading(true);
    var url = app.globalData.apiUrl;
    // var openid = app.globalData.openId;
    var openId = "ok-z54p4oIgtstl_is_t-RBxU76s";
    var that = this;
    util.requestHttp(url + 'orderList', 'POST', { openId: openId}, function (data) {
      var dataList = data.data;
      that.setData({
        dataList: dataList
      })
    })
    wx.hideLoading();
  },
  // 加载完成了的订单
  getCompleteOrder:function(){
    util.showLoading(true);
    var url = app.globalData.apiUrl;
    // var openid = app.globalData.openId;
    var openId = "ok-z54p4oIgtstl_is_t-RBxU76s";
    var that = this;
    util.requestHttp(url + 'completeOrder', 'POST', { openId: openId }, function (data) {
      var dataList = data.data;
      that.setData({
        dataList: dataList
      })
    })
    wx.hideLoading();
  },
});