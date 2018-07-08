var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
import WxValidate from '../../utils/WxValidate';
// pages/formBase/formBase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化数据
    radioSex: [
      { name: '男', value: '1' },
      { name: '女', value: '2' }
    ],//性别

    radioJob: [
      { name: '做生意', value: '1' },
      { name: '上班族', value: '2' },
    ],//工种

    radioSalary: [
      { name: '打卡', value: '1' },
      { name: '现金', value: '2' },
      { name: '打卡、现金都有', value: '3' },
    ],//工资是打卡还是现金

    pickerDegree: ["本科", "大专", "高中", "初中及以下"],//学历
    DegreeIndex: null,

    pickerLicense: ['1-2月', '3-5月', '6-11月', '1-2年', '2年以上'], // 营业执照时长
    LicenseInded: null,

    pickerBankFlow1: ['30万以下', '30-100万', '100-300万', '300万以上'],// 银行流水做生意
    BankFlow1Inded: null,

    pickerInvoiceAmount: ['100万以下', '100万-300万', '300万-500万', '500万-1千万', '1千万以上'],// 每年发票额度
    InvoiceAmountInded: null,

    pickerSecurity1: ['6个月内', '1年内', '1-2年内', '2年以上'],// 做生意是否买社保做生意
    Security1Index: null,

    pickerPublicFunds1: ['6个月内', '1年内', '1-2年内', '2年以上'],// 做生意是否买公积金做生意
    PublicFunds1Index: null,

    companyAdderessLen: 0, //公司地址当前字数

    pickerBankFlow2: ['3千以下', '3-5千', '5千-1万', '1万以上'],// 银行流水做生意
    BankFlow2Inded: null,

    pickerSecurity2: ['6个月内', '1年内', '1-2年内', '2年以上'],// 打工是否买社保
    Security2Index: null,

    pickerPublicFunds2: ['6个月内', '1年内', '1-2年内', '2年以上'],// 打工是否买公积金
    PublicFunds2Index: null,

    // 区域
    region: ['', '', ''],
    customItem: '全部',

    plantSection:'全部',
    plant: ['', '', ''],

    companyAddItem:'全部',
    companyAdd: ['', '', ''],

    // 文本字数
    plantNumber:0,
    companyAddNumber:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
  },
  // 时间选择
  DateChange:function(e){
    formUtil.timeSelect(e,this);
  },
  // 单选radio
  radioChange:function(e){
    formUtil.RadionSelect(e, this);
  },
  // pricker选择
  pickerChange:function(e){
    formUtil.PickerSelect(e, this);
  },
  // 开关选择
  switchJudge:function(e){
    formUtil.switchSelect(e, this);
  },
  // 监听 textarea 字数
  companyAdderessChange:function(e){
    formUtil.textNumber(e, this);
  },
  // 区域选择
  bindRegionChange: function (e) {
    formUtil.regionSelect(e, this);
  },
  // 提交表单
  formSubmit:function(e){

    /*
      form路由说明:
        * 1.base
        * 2.Insurance
        * 3.house
        * 4.loan
        * 5.credit
    */
    
    // 验证插件
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }

    this.setData({
      formBaseData: e.detail.value
    });

    util.toPages("/pages/formInsurance/formInsurance");
  },
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate(){
    // 验证规则
    var rules = {
      userName:{
        required:true
      },
      mobile:{
        required: true
      },
      age: {
        required:true,
        age:true
      }
    }
    // 错误提示信息
    var messages = {
      userName:{
        required:'请完善客户姓名'
      },
      mobile: {
        required: '请完善联系电话'
      },
      age:{
        required:'请完善出生日期'
      }
    }
    // 初始化插件
    this.WxValidate = new WxValidate(rules, messages)

    // 自定义验证规则
    this.WxValidate.addMethod('age', function (value, param) {
      var toDay = util.getNowFormatDate();
      var result = util.dateSubtract(value, toDay);
      if (result < 6576) {
        return false;
      } else {
        return true;
      }
    }, '您的年龄还未到18周岁')
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
  
  },

})