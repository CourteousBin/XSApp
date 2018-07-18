var util = require('../../utils/util.js');
import WxValidate from '../../utils/WxValidate';
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
    this.initValidate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  formSubmit: function (e) {
    // 验证插件
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    var that = this
    var url = app.globalData.apiUrl;

    util.requestHttp(url + 'doLogin', 'POST', e.detail.value, function (data) {
      /**
       * 1  成功
       * -3 管理员不存在
       * -4 密码错误
       * -5 该账号被禁用
       */
      
      var msg = data.data.msg;
        if(msg == '1'){
          var userId = data.data.user_id;
          // 改变全局变量值
            // g_login:false,
            // g_loginId:null,
          app.globalData.g_login = true;
          app.globalData.g_loginId = userId;
          console.log(app.globalData.g_login, app.globalData.g_loginId)
          util.toPages('../myTeam/myTeam');
        } else if (msg == '-3') {
          util.showModal('管理员不存在')
        } else if (msg == '-4'){

          util.showModal('密码错误')
        } else if(msg == '-5'){
          util.showModal('该账号被禁用')
        }
    })

    // util.toPages('../myTeam/myTeam');
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
      user_name: {
        required: true
      },
      password: {
        required: true
      }
    }
    // 错误提示信息
    var messages = {
      user_name: {
        required: '请输入账号信息'
      },
      password: {
        required: '请输入密码'
      }
    }
    // 初始化插件
    this.WxValidate = new WxValidate(rules, messages)
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