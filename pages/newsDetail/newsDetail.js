var util = require('../../utils/util.js');
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
// pages/newsDetail/newsDetail.js
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
    var id = options.id;
    this.getDetailInfo({ id: id})

  },
  // 请求数据
  getDetailInfo(data){
    var url = app.globalData.apiUrl;
    var that = this;
    
    util.requestHttp(url + 'detailPages', 'POST', data, function (data) {
      var dataList = data.data;
      console.log(dataList)
      var content = dataList.content;
      WxParse.wxParse('content', 'html', content, that, 5);
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  fetchData: function () {
    // var that = this;
    // wx.request({
    //   url: app.globalData.RuquestUrl + 'NewsDetail',
    //   method: 'POST',
    //   data: {
    //     'id': data
    //   },
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function (res) {
    //     console.log(res);

    //     var data = res.data;

    //     var content = data[0].content;
    //     WxParse.wxParse('content', 'html', content, that, 5);
    //   }
    // });

    var that =this;
    var content = '&lt;p&gt;&lt;a href=&quot;http://www.renhefu.com/uploadfile/image/20180511/20180511105869196919_ZYCH.jpg&quot; rel=&quot;sexylightbox[group1]&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;https://wxapp.renheyi.net/upload/remote/2018/05/26701526007661.jpg&quot; data-ke-src=&quot;/uploadfile/image/20180511/20180511105869196919_ZYCH.jpg&quot;/&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;a href=&quot;http://www.renhefu.com/uploadfile/image/20180511/20180511105963196319_ZYCH.png&quot; rel=&quot;sexylightbox[group1]&quot;&gt;&lt;img alt=&quot;&quot; src=&quot;https://wxapp.renheyi.net/upload/remote/2018/05/87301526007662.png&quot; data-ke-src=&quot;/uploadfile/image/20180511/20180511105963196319_ZYCH.png&quot;/&gt;&lt;/a&gt;&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;&lt;p&gt;&lt;br/&gt;&lt;/p&gt;&lt;p&gt;互联网+医疗健康”来了，能给民众带来哪些好处？对此，国家卫生健康委员会医政医管局副局长焦雅辉近日在中日友好医院召开的专题新闻发布会表示，通过远程医疗，中西部及农村患者不出家门就能看上北上广等大城市的大专家。提升家庭签约服务，同时，享受预约挂号、预约诊疗、在线支付、在线检查检验结果查询等服务。&lt;/p&gt;&lt;p&gt;4月12日，国务院常务会议审议并原则通过了&lt;strong&gt;《关于促进“互联网+医疗健康”发展的意见》&lt;/strong&gt;，要求加快发展“互联网+医疗健康”，让患者少跑腿、更便利，让更多群众能分享优质医疗服务。&lt;/p&gt;&lt;p&gt;国家卫健委医政医管局副局长焦雅辉用三个体系阐释了“互联网+医疗健康”的内涵。首先是健全“互联网+医疗健康”服务体系。这一体系涵盖医疗、医药、医保“三医联动”的诸多领域。其次是完善“互联网+医疗健康”支撑体系。从加快实现医疗健康信息互通共享、到建立健全“互联网+医疗健康”标准体系、再到提高医院管理和便民服务水平等，对体系作了详细规定；最后是加强行业监管和安全保障。“互联网参与主体多、涉及领域广，隐私安全风险高，也迫切需要部门和地方加强统筹协调和联动互动。”&lt;/p&gt;&lt;p&gt;焦雅辉认为，家庭医生签约服务就是互联网+医疗的一个典型例子。“通过签约服务，家庭医生会给患者提供适应的健康指导。另一方面，对一些长期稳定的慢性病签约患者，如果需要调药或者是基层没有相应的药物，家庭医生可以在线给他开具一些处方，并且通过第三方配送方式直接把药物配送到家里，使患者能够享受到实实在在的便利。”&lt;/p&gt;&lt;p&gt;随着“互联网+医疗健康”的兴起，医疗质量安全与数据信息安全成为社会各界颇为关注的问题。&lt;/p&gt;&lt;p&gt;&lt;strong&gt;如何保证互联网+医疗健康服务的质量与安全？ &amp;nbsp; &amp;nbsp; &amp;nbsp; &amp;nbsp;&amp; nbsp;&lt; /strong&gt;国家卫生健康委员会医政医管局副局长焦雅辉表示，一方面允许依托医疗机构发展互联网医院，必须保证信息的真实性和可靠性，医生的身份能够得到有效核实。另一方面，允许互联网企业进入到医疗健康领域，但同时必须要承担相应的责任，要求必须落地到医院，保证能够“看得见、摸得着”。&lt;/p & gt;&lt; p & gt; 同时，焦雅辉详细介绍了政府部门的一些措施：依托实体医疗机构，进行线上、线下统一监管。对于医生的资质，全国已经建立了统一的医师电子注册信息库，在这个库里任何人都可以查询到全国所有的医疗机构、医生和护士的信息。下一步，将进行医生在线诊疗的数字身份认证，就是保证网上全程要留痕、可追溯，可以对医生的诊疗行为进行全程的监管，并且全国要进行联网。第三是明确责任主体，尤其是互联网企业应该承担的主体责任。一旦发生了不良医疗事件或者损害事件以后，除了主体医疗机构要承担责任以外，还要加大互联网企业举办的互联网医院的主体责任。通过加大主体责任，让互联网企业能够主动的履责，要对提供的服务和诊疗行为进行负责。&lt; /p&gt;&lt;p&gt;对于健康电子信息的数据安全保护，焦雅辉透露，我国对于健康信息上升到很高的级别要求来进行管理，下一步对于这些信息系统要求进行“等保”，从技术上加强安全保护。另外，也正在与很多法律专家、信息和医院管理专家进行研究，对电子病历的数据信息进行“确权”。以法律法规的形式来加大信息安全的保护力度';

    WxParse.wxParse('content', 'html', content, that,5);
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