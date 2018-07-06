// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 保险
    pickerInsurance: ['1', '2', '3', '4', '5'],  //购买多少份合同
    pickerInsuranceIndex: null,
    pickerInsurancePayType: ['月缴', '季缴', '半年缴','年缴'],
    pickerInsurancePayTypeIndex:null,

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

    // 房产
    pickerHouseAmount: ['1', '2', '3', '4', '5'],  //购买多少量车合同
    pickerHouseAmountIndex: null,
      //商品房还是自建房
    radioHouseType1: [{ name: '商品房', value: '1' },{ name: '自建房', value: '2' },{ name: '其他', value: '3' }],
    radioHouseType2: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType3: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType4: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
    radioHouseType5: [{ name: '商品房', value: '1' }, { name: '自建房', value: '2' }, { name: '其他', value: '3' }],
      //车是全款还是按揭
    radioBuyHouseType1: [{ name: '全款', value: '1' },{ name: '按揭', value: '2' }],
    radioBuyHouseType2: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    radioBuyHouseType3: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    radioBuyHouseType4: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
    radioBuyHouseType5: [{ name: '全款', value: '1' }, { name: '按揭', value: '2' },],
      //房子供了多久
    pickerHousePayTimes: ['1-3月', '3-6月', '6-1年', '1-2年', '2-3年', '3-4年','5年以上'],
      //房供完了多久
    pickerHouseSupply: ['6个月内', '1年内','1年以上'],
      // 有没有房产证
    radioHouseProve1: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '无证', value: '3' }],
    radioHouseProve2: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '无证', value: '3' }],
    radioHouseProve3: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '无证', value: '3' }],
    radioHouseProve4: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '无证', value: '3' }],
    radioHouseProve5: [{ name: '房产证', value: '1' }, { name: '购房合同', value: '2' }, { name: '无证', value: '3' }],
      // 是否共有
    radioHouseBelong1: [{ name: '夫妻共有', value: '1' }, { name: '父母、子女共有', value: '2' }, { name: '个人', value: '3' }],
    radioHouseBelong2: [{ name: '夫妻共有', value: '1' }, { name: '父母、子女共有', value: '2' }, { name: '个人', value: '3' }],
    radioHouseBelong3: [{ name: '夫妻共有', value: '1' }, { name: '父母、子女共有', value: '2' }, { name: '个人', value: '3' }],
    radioHouseBelong4: [{ name: '夫妻共有', value: '1' }, { name: '父母、子女共有', value: '2' }, { name: '个人', value: '3' }],
    radioHouseBelong5: [{ name: '夫妻共有', value: '1' }, { name: '父母、子女共有', value: '2' }, { name: '个人', value: '3' }], 
    // 谁是主贷方
    pickerHouseLoanWho: ['本人', '配偶', '爸爸', '妈妈', '其他'],
    pickerHouseLoanWhoIndex:null,
    // 全款房买了或建了多久
    pickerhouseDegree: ['1年以下', '1-5年', '5-10年', '10-15年', '15-20年','20年以上'],
    pickerhouseDegreeIndex: null,
    // 贷款
    pickerLoanAmount: ['1', '2', '3', '4', '5'],
    pickerLoanAmountIndex: null,
    pickerHandleLoans: ['房产', '保单','营业执照','其他'], //用什么办理贷款
      //抵押还是信用贷
    radioLoanChoice1: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice2: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice3: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice4: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
    radioLoanChoice5: [{ name: '抵押贷', value: '1' }, { name: '信用贷', value: '2' }, { name: '其他', value: '3' }],
      // 还贷情况
    pickerLoanRepay:['正常','偶尔逾期','经常逾期'],

    // 查征信
    pickerCheckCreditYears: ['1', '2', '3', '4', '5' ],// 半年查征信次数
    pickerCheckCreditYearsIndex: null,
    pickerCheckCreditMonth: ['1', '2', '3', '4', '5' ],// 2个月查征信次数
    pickerCheckCreditMonthIndex: null,

    // 信用卡还贷情况
    pickerCreditCardRepay: ['正常', '偶尔逾期', '经常逾期'],
    pickerCreditCardRepayIndex:null,
    // 有几张信用卡
    pickerCreditCardNumber: ['1-3张', '3-5张', '5-10张', '10张以上'],
    pickerCreditCardNumberInded: null,


    // 开关
    isBusiness: null, // 做生意还是上班开关
    isLicense: null, // 是否有营业执照开关
    isSecurity1:null,//是否有社保开关 做生意
    isPublicFunds1:null,//是否有公积金开关 做生意
    isSecurity2: null,//是否有社保开关 打工
    isPublicFunds2: null,//是否有公积金开关 打工
    isInsurance:null,//是否买人寿保险
    isBuyCarType:null,//买车全款还是按揭
    isCarInsurance:null,//是否购买商业保险
    isCarSupply:null,//汽车是否供完
    isHouse:null,//是否有房子买车全款还是按揭
    isbuyHouseType: null,//买房全款还是按揭
    isHouseSupply:null,//房子是否已经供完
    isHouseContract:null,//是否有购房合同
    isRepayLoan:null,//是否正在还贷款
    isLoanOnTime:null,//是否准时还贷款
    isCheckCredit:null,//是否查过征信
    isCreditCard:null,//是否有信用卡

    
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

    pickerLicense: ['1-2月', '3-5月', '6-11月', '1-2年','2年以上'], // 营业执照时长
    LicenseInded:null,
    
    pickerBankFlow1: ['30万以下', '30-100万', '100-300万', '300万以上以上'],// 银行流水做生意
    BankFlow1Inded: null,
    
    pickerInvoiceAmount: ['100万以下', '100万-300万', '300万-500万', '500万-1千万', '1千万以上'],// 每年发票额度
    InvoiceAmountInded:null,
    
    pickerSecurity1: ['6个月内', '1年内', '1-2年内', '2年以上'],// 做生意是否买社保做生意
    Security1Index:null,
    
    pickerPublicFunds1: ['6个月内', '1年内', '1-2年内', '2年以上'],// 做生意是否买公积金做生意
    PublicFunds1Index: null,

    companyAdderessLen: 0, //公司地址当前字数

    pickerBankFlow2: ['3千以下', '3-5千', '5千-1万', '1万以上'],// 银行流水做生意
    BankFlow2Inded: null,

    pickerSecurity2: ['6个月内', '1年内', '1-2年内', '2年以上'],// 打工是否买社保
    Security2Index: null,

    pickerPublicFunds2: ['6个月内', '1年内', '1-2年内', '2年以上'],// 打工是否买公积金
    PublicFunds2Index: null,
    
    pickerCarPayTimes: ['1-3月', '4-6月', '6-11月', '1-2年', '3年以上'],  //车供了多久
    pickerCarPayTimesIndex: null,

    pickerCarSupply: ['6个月内','1年内','一年以上'],  //车供完了多久
    pickerCarSupplyIndex: null,

    

  },
  // picker通用js
  pickerChange: function (e) {
    var pickerType = e.target.dataset.type;
    this.setData({
      [pickerType]: e.detail.value
    })
  },
  // pickerArr通用js
  pickerChangeArr: function (e) {
    var pickerType = e.target.dataset.type;

    this.setData({
      [pickerType]: e.detail.value
    })

  },
  insuranceAmount: function (e) {
    //  pickerIndex
    var pickerType = e.target.dataset.type;
    //  pickerArr
    var pickerArr = e.target.dataset.arr;
    // 要循环的数组
    var pickerDataList = e.target.dataset.datalist;
    // 选择第几个
    var value = e.detail.value;
    // 获取到当前的值
    var arr = this.data[pickerArr][value];
    // 要遍历的数组
    var forArr = [];
    for (var i = 1;i<=arr;i++){
      forArr.push(i);
    }

    this.setData({
      [pickerType]: e.detail.value,
      [pickerDataList]: forArr
    })

  },
  isMarry:function(e){
    console.log(e.detail.value);
  },
  // radio通用js
  radioChange: function (e) {
    if (e.target.dataset.judge){
      var judge = e.target.dataset.judge;
      var checkValue = e.detail.value;
      this.setData({
        [judge]: checkValue
      })
    }
    
    var radioTyle = e.target.dataset.type;
    var radioValue = this.data[radioTyle];
    for (var i = 0, len = radioValue.length; i < len; ++i) {
      radioValue[i].checked = radioValue[i].value == e.detail.value;
    }
    this.setData({
      [radioTyle]: radioValue
    });
    console.log(this.data[radioTyle]);
  },
  // 通用 isSwitch
  switchJudge:function(e){
    var isTrue = e.detail.value;
    var judge = e.target.dataset.judge;
    if (isTrue == true){
      this.setData({
        [judge]: isTrue
      })
    }else {
      this.setData({
        [judge]: isTrue
      })
    }
  },
  // 公司地址填写
  companyAdderessChange:function(e){
    // 记录写了多少字
    var that = this;
    var value = e.detail.value;
    var len = parseInt(value.length);
    if (len > 80 ) return;
    that.setData({
      companyAdderessLen: len
    })
  },
  // 贷款时间
  DateChange:function(e){
    var dateType = e.target.dataset.type;
    this.setData({
      [dateType]: e.detail.value
    })
  },
  // 提交按钮
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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