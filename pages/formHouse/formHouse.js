var formUtil = require('../../utils/formUtils.js');
var util = require('../../utils/util.js');
// pages/formInsurance/formInsurance.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 底部版权开关,控制是否有weui-footer_fixed-bottom , false为要加 这个属性
    isFooter: false,
    // 房产
    pickerHouseAmount: ['1', '2', '3', '4', '5'],  //购买多少量车合同
    pickerHouseAmountIndex: null,
    //商品房还是自建房
    radioHouseType1: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType2: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType3: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType4: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType5: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    //车是全款还是按揭
    radioBuyHouseType1: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' }],
    radioBuyHouseType2: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    radioBuyHouseType3: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    radioBuyHouseType4: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    radioBuyHouseType5: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    //房子供了多久
    pickerHousePayTimes: ['1-3月', '3-6月', '6-11月', '1-2年', '2-3年', '3-4年', '5年以上'],
    //房供完了多久
    pickerHouseSupply: ['1-3月', '3-6月', '6-9月', '9-12月', '一年以上'],
    // 有没有房产证
    radioHouseProve1: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '集体土地证', value: '3' }, { name: '其他', value: '4' }],
    radioHouseProve2: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '集体土地证', value: '3' }, { name: '其他', value: '4' }],
    radioHouseProve3: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '集体土地证', value: '3' }, { name: '其他', value: '4' }],
    radioHouseProve4: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '集体土地证', value: '3' }, { name: '其他', value: '4' }],
    radioHouseProve5: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '集体土地证', value: '3' }, { name: '其他', value: '4' }],
    // 是否共有
    radioHouseBelong1: [{ name: '夫妻共有', value: '1' }, { name: '与父母共有', value: '2' },{ name: '与子女共有', value: '3' }, { name: '个人', value: '4' },{ name: '其他', value: '5' }],
    radioHouseBelong2: [{ name: '夫妻共有', value: '1' }, { name: '其他', value: '5' }, { name: '与子女共有', value: '3' }, { name: '个人', value: '4' }, { name: '其他', value: '5' }],
    radioHouseBelong3: [{ name: '夫妻共有', value: '1' }, { name: '与父母共有', value: '2' }, { name: '与子女共有', value: '3' }, { name: '个人', value: '4' }, { name: '其他', value: '5' }],
    radioHouseBelong4: [{ name: '夫妻共有', value: '1' }, { name: '与父母共有', value: '2' }, { name: '与子女共有', value: '3' }, { name: '个人', value: '4' }, { name: '其他', value: '5' }],
    radioHouseBelong5: [{ name: '夫妻共有', value: '1' }, { name: '与父母共有', value: '2' }, { name: '与子女共有', value: '3' }, { name: '个人', value: '4' }, { name: '其他', value: '5'}],
    // 谁是主贷方
    pickerHouseLoanWho: ['本人', '配偶', '爸爸', '妈妈', '其他'],
    pickerHouseLoanWhoIndex: null,
    // 全款房买了或建了多久
    pickerhouseDegree: ['1年以下', '1-5年', '5-10年', '10-15年', '15-20年', '20年以上'],
    pickerhouseDegreeIndex: null,
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
      var house = this.data.HouseAmount;
      if (house != null) {
        this.setData({ isFooter: true })
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
      formHorseData: e.detail.value
    });
    util.toPages("/pages/formLoan/formLoan");
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