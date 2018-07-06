var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
// pages/formInsurance/formInsurance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部版权开关,控制是否有weui-footer_fixed-bottom , false为要加 这个属性
    isFooter:false,
    // 保险
    pickerInsurance: ['1', '2', '3', '4', '5'],  //购买多少份合同
    pickerInsuranceIndex: null,
    pickerInsurancePayType: ['月缴', '季缴', '半年缴', '年缴'],
    pickerInsurancePayTypeIndex: null,
    pickerInsurancecompany: ['平安保险','中国人寿','太平洋保险','泰康保险','新华保险','中国人保','阳光保险','友邦保险','中宏人寿','中意人寿','招商信诺','太平人寿','生命人寿（富德生命）','工银安盛人寿','中英人寿','中美大都会','信泰人寿','中德安联','建信人寿','利安人寿','陆家嘴人寿','民生人寿','农银人寿','华泰人寿','国华人寿','合众人寿','长城人寿','华夏人寿','光大永明人寿','同方全球人寿','恒安标准人寿','恒大人寿','东吴人寿','幸福人寿','中荷人寿'],
    pickerInsuranceType: ['保障型', '分红型','万能型'],
    pickerInsuranceTypeIndex:null,
    pickerInsurancecompanyIndex:null,
    pickerInsuranceSupply: ['1-3月', '3-6月', '6-9月','9-12月', '一年以上'],
    pickerInsuranceSupplyIndex:null,


    // 汽车
    radioBuyCarTypeList1: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList2: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList3: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList4: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList5: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList6: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList7: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList8: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList9: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyCarTypeList10: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    pickerCarAmount: ['1', '2', '3', '4', '5'],  //购买多少量车合同
    pickerCarAmountIndex: null,
    pickerCarPayTimes: ['1-3月', '4-6月', '6-11月', '1-2年', '3年以上'],  //车供了多久
    pickerCarPayTimesIndex: null,
    pickerCarSupply: ['1-3月', '3-6月', '6-9月', '9-12月', '一年以上'],  //车供完了多久
    pickerCarSupplyIndex: null,
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
    var that = this;
    // 底部版权信息判断
    var control = e.detail.value;
    if (control == false){
      that.setData({ isFooter:false})
    }else {
      var insurance = that.data.insuranceAmountList;
      var car = that.data.carsAmount;
      var iscar = that.data.isCar;

      if (typeof(insurance) == 'object'){
        this.setData({ isFooter:true })
      }else if(iscar == true){
        this.setData({ isFooter: false })
        if (typeof (car) == 'object') {
          this.setData({ isFooter: true })
        }
      }
    }
  },
  insuranceAmount:function(e){
    formUtil.eachPicker(e,this);
    // 底部版权信息判断
    this.setData({ isFooter:true})
  },
  // 返回前一页
  prePage:function(e){
    util.toBackPage(1);
  },
  // 提交表单
  formSubmit: function (e) {
    console.log('form发生了submit事件,携带数据为：', e.detail.value);
    this.setData({
      formInsuranceData: e.detail.value
    });
    util.toPages("/pages/formHouse/formHouse");
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