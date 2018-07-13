var util = require('../../utils/util.js');
var app = getApp();
// pages/brandPartner/brandPartner.js
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
    this.getBanenr()
    this.getPartner()
  },

  getBanenr:function(){
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'bannerBrand', 'GET', '', function (data) {
      var dataList = data.data;
      that.setData({
        banner: dataList
      })
    })
  },

  getPartner:function(){
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'brandPartner', 'GET', '', function (data) {
      
      var dataList = data.data;
      console.log(dataList)
      that.setData({
        dataList: dataList
      })
    })
  },
  toDetail:function(e){
    var id = e.currentTarget.dataset.id;

    util.toPages('../newsDetail/newsDetail?id=' + id);
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