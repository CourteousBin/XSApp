var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
var app = getApp();

// pages/formBase/formBase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 初始化数据
    radioJob: [
      { name: '做生意', value: '1' },
      { name: '上班族', value: '2' },
      {name:'优良职业(如公务员、老师、律师等)',value:'3'}
    ],//工种

    companyAdderessLen: 0, //公司地址当前字数

    // 区域
    region: ['', '', ''],
    customItem: '全部',

    plantSection: '全部',
    plant: ['', '', ''],

    companyAddItem: '全部',
    companyAdd: ['', '', ''],

    // 文本字数
    plantNumber: 0,
    companyAddNumber: 0,
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
  },
  // 监听 textarea 字数
  companyAdderessChange: function (e) {
    formUtil.textNumber(e, this);
  },
  // 区域选择
  bindRegionChange: function (e) {
    formUtil.regionSelect(e, this);
  },
  // 提交表单
  formSubmit: function (e) {
    console.log(e.detail.value);

    var formDetal = e.detail.value;

    // 验证是否为空
    var isEmpty = this.Verification(formDetal);

    if (isEmpty != false){

      // B(信用卡已用额度×10%)
      var B = formDetal.fastUsedCredit * 0.1;

      // C(信用贷款每月还款金额)
      var C = formDetal.fastUsedALLCreditBond;

      // 职业类型
      var job = formDetal.fastJob;

      var arrObj = [];

      // 房月供 A1(房月供)*8*75%-B(信用卡已用额度×10%)-C(信用贷款每月还款金额)
      var A1 = formDetal.payHouse;
      if (A1 != undefined){
        var resA1 = this.total('house', A1, B, C,job);
        arrObj.push(resA1);
      }
      
    
      // 保单贷 A4(保单年缴)×6倍×75%-B(信用卡已用额度×10%)-C(信用贷款每月还款金额)
      var A4 = formDetal.payInsurance;
      if (A4 != undefined) {
        var resA4 = this.total('insurance', A4, B, C, job);
        arrObj.push(resA4);
      }

      // 车贷 A2(车月供)×4倍×75%-B(信用卡已用额度×10%)-C(信用贷款每月还款金额)
      var A2 = formDetal.payCar;
      if(A2 != undefined){
        var resA2 = this.total('car', A2, B, C, job);
        arrObj.push(resA2);
      }
      

      // 公积金 A3(公积金基数)×4倍×75%-B(信用卡已用额度×10%)-C(信用贷款每月还款金额)
      var A3 = formDetal.payFund;
      if (A3 != undefined){
        var resA3 = this.total('fund', A3, B, C, job);
        arrObj.push(resA3);
      }
      
      // 寻找最大值
      var maxFun = function(){
        var arr = [];
        arrObj.forEach(function(v,i){
          arr.push(v.total);
        })
        return Math.max.apply(null, arr);
      }
      var maxNum = maxFun();

      // 对比大小
      var returnObj = function (){
        for (var i = 0; i < arrObj.length; i++){
          if (arrObj[i].total == maxNum){
            return arrObj[i];
          }
        }
      }
      
      // 获得最大值对象
      var result = returnObj();
      console.log(result)
      // 获得对象的类型
      var objClassfiy = result.classfiy;
      // 获得对象的钱
      var objTotal = result.total;
      // 获得对象职业
      var objJob = result.occupation;

      if (parseInt(objTotal) < 30000){
        util.toastTip('数值低于30000', 'none', 1500);

      } else if (parseInt(objTotal) >= 500000){
        var maxTotal = 500000;
        util.toPages("/pages/fastProgramme/fastProgramme?classfiy=" + objClassfiy + "&total=" + maxTotal + "&job=" + objJob);
      }else {
        util.toPages("/pages/fastProgramme/fastProgramme?classfiy=" + objClassfiy + "&total=" + objTotal + "&job=" + objJob);
      }

      // 传递客户信息
      this.postInfo(e.detail.value)
      
    }  
  },

  total: function (classflyStr, classfly,b,c,job){
    switch (classflyStr){
      case 'house':

        var A1 = (classfly * 8 * 0.75 - b - c)*45;
        var A2 = classfly*45;
        // 两套公式 , 选低值;
        if(A1 > A2){
          var result = A2;
        }else {
          var result = A1;
        }
        var obj = { classfiy: '1', total: result, occupation:job};
        return obj;
      break;
      case 'insurance':
        var A1 = (classfly * 6 * 0.75 - b - c)*30;
        var A2 = classfly * 30;
        
        if (A1 > A2) {
          var result = A2;
        } else {
          var result = A1;
        }
        var obj = { classfiy: '2', total: result, occupation: job};
        return obj;
      break;
      case 'car':
        var A1 = (classfly * 4 * 0.75 - b - c)*30;
        var A2 = classfly*30;
        if (A1 > A2) {
          var result = A2;
        } else {
          var result = A1;
        }
        var obj = { classfiy: '3', total: result, occupation: job };
        return obj;
      break;
      case 'fund':
        var A1 = (classfly * 4 * 0.75 - b - c)*40;
        var A2 = classfly * 40;
        if (A1 > A2) {
          var result = A2;
        } else {
          var result = A1;
        }
        var obj = { classfiy: '4', total: result, occupation: job};
        return obj;
      break;  
    }
  },

  Verification:function(value){

    // 基本信息
    var name = value.fastName;
    var phone = value.fastPhone;
    var age = value.fastAge;

    // 职业信息
    var job = value.fastJob;

    // 供房,保单,供车,公积金至少选择一个
    var ishouse = value.isHouse;
    var isCar = value.isCar;
    var isFund = value.isFund;
    var isInsurance = value.isInsurance;

    // 信用卡总额 , 还款月供
    var fastUsedCredit = value.fastUsedCredit;
    var fastUsedALLCreditBond = value.fastUsedALLCreditBond;

    if (name == '' || phone == ''){
      util.toastTip('请完善姓名与联系电话', 'none', 2000);
      return false;
    } else if (age === null){
      util.toastTip('请完善出生日期', 'none', 2000);
      return false;
    } else if (job == ''){
      util.toastTip('请选择从事职业', 'none', 2000);
      return false;
    }else if (ishouse == false && isCar == false && isFund == false && isInsurance == false){
      util.toastTip('供房,保单,供车,公积金至少选择一个', 'none',2000);
      return false;
    } else if (fastUsedCredit == '' || fastUsedALLCreditBond == ''){
      util.toastTip('信用卡已使用额度和信用卡/保证贷月供不能为空', 'none', 2000);
      return false;
    } else if (age) {
      // 获取当前时间
      var toDay = util.getNowFormatDate();
      // 日期相减判断是否够18岁
      var result = util.dateSubtract(age, toDay);
      if (result < 6576) {
        util.toastTip('年龄未够18岁', 'none', 2000);
        return false;
      }
    } else {
      return true;
    }
  },

  // 发生客户资料给后台
  postInfo:function(formData){
    // formData 表示传入的 客户信息
    var url = app.globalData.apiUrl;
    var that = this;
    // 把 openId 插入 formData 一并提交到后台
    formData.openId = app.globalData.openId;
    util.requestHttp(url + 'fastTastInfo', 'POST', formData,function(data){
      
    })
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