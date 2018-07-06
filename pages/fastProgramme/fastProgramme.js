var util = require('../../utils/util.js');
var formUtil = require('../../utils/formUtils.js');
var app = getApp();

import NumberAnimate from "../../utils/animateNumber";
// pages/fastProgramme/fastProgramme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerDegree: ["1倍", "2倍", "3倍", "4倍","5倍","6倍","7倍","8倍"],
    DegreeIndex: 0,
    // 变化值
    money:0,
    // 一开始传过来的钱
    total:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传值
    var classfiy = this.data.classfiy = options.classfiy;
    var total = this.data.total =parseInt(options.total);
    var job = this.data.job = options.job;

    // var classfiy = this.data.classfiy = 1;
    // var total = this.data.total = 100000;
    // var job = this.data.job = 1;

    if (classfiy == '3'){
      this.setData({
        pickerDegree: ["1倍", "2倍", "3倍", "4倍", "5倍"]
      })
    }

    this.getInfo(total, classfiy, 1, job);

    // 数字翻转,发现很多bug , 改回原始值
    // this.animateNumber(total,'money');
    this.setData({
      money: total
    })
  },
  getInfo: function (total, classfiy, multiple ,job){
    var that = this;

    // 如果为公积金 job = 3;因为公积金只有一个
    if (classfiy == '4'){
      job = '3';
    }

    util.requestHttp(
      app.globalData.apiUrl +'fastTast',
      'POST',
      { 'type': classfiy,
        'multiple': multiple,
        'job': job
      },
      function(data){
        var dataList = data.data;

        // 等本等息还款公式：每月还款=贷款金额/贷款期限+贷款金额*后期还贷利息
          // 后期还贷利息
          var Interest = dataList.payment_method.substring(1);
          var maxInterest = dataList.max_anaphase.substring(1);
          
          var IntPercent = parseFloat(Interest.substring(0, Interest.length - 1)) / 100;
          var maxIntPercent = parseFloat(maxInterest.substring(0, Interest.length - 1)) / 100;

        // 保留小数点两位
          var payment = Math.round((total / 36 + total * IntPercent) * 100) / 100;
          var maxPayment = Math.round((total / 36 + total * maxIntPercent) * 100) / 100;

        that.setData({
          Interest: Interest,
          loanYears: dataList.monthly_interest,
          payment: payment,
          maxInterest: maxInterest,
          maxPayment: maxPayment
        })
      }
    )
  },  

  pickerChange: function (e) {
    // 倍数
    var value = parseInt(e.detail.value) + parseInt(1);
    var pickerType = e.target.dataset.type;
    this.setData({
      [pickerType]: e.detail.value
    })

    var reTotal = value * parseInt(this.data.total);
    // 动画效果
    this.animateNumber(reTotal,'money')
    // 在请求信息
    this.getInfo(reTotal, this.data.classfiy, value, this.data.job)

  },

  // 动态数组
  animateNumber:function(value,data){
    var that = this;
    
    var n1 = new NumberAnimate({
      from: value,
      spped:100,
      refreshTime:50,
      decimals:1,
      onUpdate:function(){
        that.setData({
          [data]: n1.tempValue,
        })
      }
    })

  },
  toForm:function(){
    util.toPages("/pages/formBase/formBase");
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