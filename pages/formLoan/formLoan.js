var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
// pages/formLoan/formLoan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFooter: false,
    // 贷款
    pickerLoanAmount: ['1', '2', '3', '4', '5'],
    pickerLoanAmountIndex: null,
    pickerHandleLoans: ['房产', '保单', '营业执照','车','公积金', '其他'], //用什么办理贷款
    //抵押还是信用贷
    radioLoanChoice1: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice2: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice3: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice4: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice5: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    // 还贷情况
    pickerLoanRepay: ['正常', '偶尔逾期', '经常逾期'],

    // 查征信
    pickerCheckCreditYears: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],// 半年查征信次数
    pickerCheckCreditYearsIndex: null,
    pickerCheckCreditMonth: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],// 2个月查征信次数
    pickerCheckCreditMonthIndex: null,
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
      var isRepayLoan = this.data.isRepayLoan;
      var isCheckCredit = this.data.isCheckCredit;
      var pickRepayLoan = this.data.loanAmount;
      var pickCreditMonth = this.data.CheckCreditMonth;
      var pickCreditYears = this.data.CheckCreditYears;

      if (isRepayLoan == true && isCheckCredit== true ){
        this.setData({ isFooter: true })
      } else if (isRepayLoan == true){
        this.setData({ isFooter: false })
        if (typeof (pickRepayLoan) == 'object') {
          this.setData({ isFooter: true })
        }
      } else if (isCheckCredit == true){
        this.setData({ isFooter: false })
        if (typeof (pickCreditMonth) == 'object' || typeof(pickCreditYears) == 'object'){
          this.setData({ isFooter: true })
        }
      }
    }
  },
  insuranceAmount: function (e) {
    formUtil.eachPicker(e, this);
    // 底部版权信息判断
    this.setData({ isFooter: true })
  },
  // 返回前一页
  prePage: function (e) {
    util.toBackPage(1);
  },
  // 提交表单
  formSubmit: function (e) {

    this.setData({
      formLoanData: e.detail.value
    });
    util.toPages("/pages/formCredit/formCredit");
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