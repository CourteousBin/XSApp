var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
var app = getApp();
import WxValidate from '../../utils/WxValidate';
// pages/merchantEntry/merchantEntry.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    remarksNumber: 0,
    isAgree:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
    this.getBanner()
  },
  getBanner:function(){
    var url = app.globalData.apiUrl;
    var that = this;

    util.requestHttp(url + 'joinBanner', 'GET', '', function (data) {
      var dataList = data.data;
      that.setData({
        dataList: dataList
      })
    })
  },
  remarksChange:function(e){
    formUtil.textNumber(e, this);
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  formSubmit:function(e){

    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    var url = app.globalData.apiUrl;
    var that = this;

    util.requestHttp(url + 'joinUs', 'POST', e.detail.value, function (data) {
      var dataList = data.data;
      if (dataList == 1){
        util.toastTip('提交成功','success',800)
      }
    })

  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate() {
    // 验证规则
    var rules = {
      name: {
        required: true
      },
      phone: {
        required: true
      },
    }
    // 错误提示信息
    var messages = {
      name: {
        required: '请完善客户姓名'
      },
      phone: {
        required: '请完善联系电话'
      },
    }
    // 初始化插件
    this.WxValidate = new WxValidate(rules, messages)
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