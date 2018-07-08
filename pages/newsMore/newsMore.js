var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    tabs: ["企业新闻", "行业新闻", "金融资讯"],
    sliderOffset: 0,
    sliderLeft: 0,
    // 当前标签页面
    activeIndex: 0,
    // 分页加载页数
    pages:1,
    // 保存已经加载数据
    finishData:null,
    
  },
  onLoad: function () {
    this.template();

    // 默认企业新闻
    this.getNews({ type: 0, page: this.data.pages })
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      // 把加载分页次数清0
      pages:1
    });
    console.log(this.data.pages)
    // 判断用户点击了哪个标签 
    // 0 = 企业新闻 ; 1 = 行业新闻 ; 2 = 金融咨询
    var tabId = e.currentTarget.id;
    // 请求数据
    this.getNews({ type: tabId, page: this.data.pages })
  },
  template:function(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var scrollHeight = (res.windowHeight - 50)*2;
        console.log(res.windowHeight,scrollHeight);
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          scrollHeight: scrollHeight
        });
      }
    });
  },
  // 上拉加载
  onScrollLower:function(){
    wx.showNavigationBarLoading();

    // 每次加载页数自增
    this.data.pages++

    var pages = this.data.pages

    var tabType = this.data.activeIndex

    // 获取更多数据
    this.getMoreNews({ type: tabType, page: pages })
  },
  getNews: function (PostData) {
    util.showLoading(true)
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'newsList', 'POST', PostData, function(data){
      var dataList = data.data.data;

      // 测试数据 * 10
      dataList.forEach(function (v, i) {
        console.log(v)
        for (var k = 0; k < 8; k++) {
          dataList[k] = v
        }
      })

      that.setData({
        dataList: dataList,
        finishData:dataList
      })
      wx.hideLoading()
    })
  },
  // 加载更多数据
  getMoreNews: function (PostData){
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'newsList', 'POST', PostData, function (data) {
      var dataList = data.data.data;
      // 判断数据是否全部加载完成
      var len = dataList.length;
      if(len !== 0){
        // 把新数据合并
        dataList.forEach(function (v, i) {
          that.data.finishData.push(v)
        })

        var newDataList = that.data.finishData;

        that.setData({
          dataList: newDataList
        })

        setTimeout(function () {
          wx.hideNavigationBarLoading()
        }, 800)
      }else {
        util.toastTip('没有更多数据','none',800)
        setTimeout(function () {
          wx.hideNavigationBarLoading()
        }, 800)
      }
        
    })
  }
});