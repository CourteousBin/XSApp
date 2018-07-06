var util = require('../../utils/util.js');
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
  },
  toOrderDetail:function(){
    util.toPages('../myOrderDetail/myOrderDetail');
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
  }
});