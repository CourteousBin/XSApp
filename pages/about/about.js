var util = require('../../utils/util.js');
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      iconPath: "/images/about_map.png",
      id: 0,
      latitude: 22.960830,
      longitude: 112.975860,
      width: 40,
      height: 40,
      title: "佛山市南海区轩盛信息咨询有限公司"
    }],
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.getCompanyInfo();
  },
  getCompanyInfo: function () {
    var that = this;
    var url = app.globalData.apiUrl;

    util.requestHttp(url + 'companyInfo', 'GET', '', function (data) {
      var dataList = data.data
      var content = dataList.content
      that.setData({
        dataList: dataList
      })
      WxParse.wxParse('content', 'html', content, that, 5);
    })
  },
  call: function (e) {
    var phone = e.target.dataset.phone;
    util.call(phone);
  },
  listenerBtnGetLocation: function (e) {
    var long = Number(e.target.dataset.long);
    var lat = Number(e.target.dataset.lat);
    var name = e.target.dataset.name;
    
    util.listenerBtnGetLocation(lat, long, name);
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