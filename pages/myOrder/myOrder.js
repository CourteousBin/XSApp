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
  toOrderDetail:function(e){
    var orderId = e.currentTarget.dataset.orderid;

    util.toPages('../myOrderDetail/myOrderDetail?orderId=' + orderId);
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
  // 删除订单
  deleteOrderModal:function(e){
    var orderId = e.currentTarget.dataset.orderid;
    var openid = app.globalData.openId;
    var that = this;
    wx.showModal({
      title:'删除订单',
      content:'您确定要删除该订单吗，删除后无法获取订单最新信息！',
      showCancel:true,
      success:function(res){
        if (res.confirm){
          that.deleteOrder(orderId, openid)
        }
      }

    })
  },
  deleteOrder: function (orderId, openId){
    var that = this;
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'deleteOrder', 'POST', { orderId: orderId, openId: openId }, function (data) {
      if (data.data == '1'){
        // 判断当前页,加载全部订单 还是 完成订单
        var nowIndex = parseInt(that.data.activeIndex)
        if (nowIndex == 0){
          that.getOrder()
        }else {
          that.getCompleteOrder()
        }
      }
    })

  }
});