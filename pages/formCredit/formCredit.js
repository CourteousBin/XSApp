var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
// pages/formLoan/formLoan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部版权开关,控制是否有weui-footer_fixed-bottom , false为要加 这个属性
    isFooter: false,
    // 信用卡还贷情况
    pickerCreditCardRepay: ['正常', '偶尔逾期', '经常逾期'],
    pickerCreditCardRepayIndex: null,
    // 有几张信用卡
    pickerCreditCardNumber: ['1-3张', '3-5张', '5-10张', '10张以上'],
    pickerCreditCardNumberInded: null,
    // 留言
    Feedback:0,
    // 贷款时间
    pickerLoanTime:['1年','2年','3年','3年以上'],
    pickerLoanTimeIndex:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 时间选择
  DateChange: function (e) {
    formUtil.timeSelect(e, this);
  },
  // 单选radio
  radioChange: function (e) {
    formUtil.RadionSelect(e, this);
  },
  // pricker选择
  pickerChange: function (e) {
    formUtil.PickerSelect(e, this);
  },
  // 开关选择
  switchJudge: function (e) {
    formUtil.switchSelect(e, this);

    // 底部版权信息判断
    var control = e.detail.value;
    if (control == false) {
      this.setData({ isFooter: false })
    } else {
        this.setData({ isFooter: true })
    }
  },
  insuranceAmount: function (e) {
    formUtil.eachPicker(e, this);

    this.setData({ isFooter: true })
  },
  // 返回前一页
  prePage: function (e) {
    util.toBackPage(1);
  },
  // 监听 textarea 字数
  companyAdderessChange: function (e) {
    formUtil.textNumber(e, this);
  },
  // 提交表单
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);

    var PagesData = getCurrentPages();
    console.log(PagesData);
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