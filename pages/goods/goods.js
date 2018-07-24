// var myUtils = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    goods: {},
    show_attr_picker: false,
    form: {
      number: 1,
    },
    tab_detail: "active",
    tab_comment: "",
    comment_list: [],
    comment_count: {
      score_all: 0,
      score_3: 0,
      score_2: 0,
      score_1: 0,
    },
    autoplay: false,
    hide: "hide",
    show: false,
    x: wx.getSystemInfoSync().windowWidth,
    y: wx.getSystemInfoSync().windowHeight - 20,
    miaosha_end_time_over: {
      h: "--",
      m: "--",
      s: "--",
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 真实数据
    var goods_id = this.data.goods_id = options.goods_id;
  
    // 调试数据
    // var goods_id = this.data.goods_id = 60

    // 获取数据
    this.getGoods({ goods_id: goods_id })

    // 是否喜欢的商品
    this.isFavorite()

    // 获取最新联系客服电话号码
    this.getPhone()

  },
  actOrder:function(e){

    var goods_name = this.data.dataList.name;
    var goods_img = this.data.dataList.pic;

    // 记录从哪个页面跳转到 资产咨询表
      // 如果从商品跳转 直接传 商品名称
      // 如果从 快速测试跳转 则 传入 '快速测试'
      // 如果从 定制服务 则 传入 ' '
    var wherePage = app.globalData.wherePage = goods_name;
    var wherePageImg = app.globalData.wherePageImg = goods_img;

    util.toPages('../formBase/formBase');
    
  },
  isFavorite:function(){
    var that = this
    var url = app.globalData.apiUrl;
    var open_id = app.globalData.openId;
    var goods_id = this.data.goods_id;

    util.requestHttp(url + 'goodsLove', 'POST', { open_id: open_id, goods_id: goods_id, control: 0 }, function (data) {
      var dataList = data.data
      if (dataList == 1) {
        var goods = that.data.goods;
        goods.is_favorite = 1;
        that.setData({
          goods: goods,
        });
      }
    })
  },
  getGoods: function (data) {
    var that = this
    var url = app.globalData.apiUrl;
    
    util.requestHttp(url + 'goodsDetail', 'POST', data, function (data) {
      var dataList = data.data[0]
      var content = dataList.content
      that.setData({
        dataList:dataList
      })
      WxParse.wxParse('content', 'html', content, that, 5);
  
    })

  },
  selectDefaultAttr: function () {
    var page = this;
    if (!page.data.goods || page.data.goods.use_attr !== 0)
      return;
    for (var i in page.data.attr_group_list) {
      for (var j in page.data.attr_group_list[i].attr_list) {
        if (i == 0 && j == 0)
          page.data.attr_group_list[i].attr_list[j]['checked'] = true;
      }
    }
    page.setData({
      attr_group_list: page.data.attr_group_list,
    });
  },

  onGoodsImageClick: function (e) {
    var page = this;
    var urls = [];
    var index = e.currentTarget.dataset.index;

    for (var i in page.data.goods.pic_list) {
      urls.push(page.data.goods.pic_list[i].pic_url);
    }
    wx.previewImage({
      urls: urls, // 需要预览的图片http链接列表
      current: urls[index],
    });
  },

  favoriteAdd: function () {
    var that = this;
    var url = app.globalData.apiUrl;
    var open_id = app.globalData.openId;
    var goods_id = this.data.goods_id;

    util.requestHttp(url + 'goodsLove', 'POST', { open_id: open_id, goods_id: goods_id,control:1}, function (data) {
      var dataList = data.data
      console.log(dataList)
      if (dataList == 1) {
        util.toastTip('操作成功', 'success', 800)
        var goods = that.data.goods;
        goods.is_favorite = 1;
        that.setData({
          goods: goods,
        });
      }
    })

  },

  favoriteRemove: function () {
    var that = this;
    var url = app.globalData.apiUrl;
    var open_id = app.globalData.openId;
    var goods_id = this.data.goods_id;

    util.requestHttp(url + 'goodsLove', 'POST', { open_id: open_id, goods_id: goods_id, control: 2 }, function (data) {
      var dataList = data.data

      if (dataList == 1) {
        util.toastTip('操作成功', 'success', 800)
        var goods = that.data.goods;
        goods.is_favorite = 0;
        that.setData({
          goods: goods,
        });
      }
    })

  },

  tabSwitch: function (e) {
    var page = this;
    var tab = e.currentTarget.dataset.tab;
    if (tab == "detail") {
      page.setData({
        tab_detail: "active",
        tab_comment: "",
      });
    } else {
      page.setData({
        tab_detail: "",
        tab_comment: "active",
      });
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var page = this;
    var res = {
      path: "/pages/goods/goods?goods_id=" + this.data.goods_id,
      success: function (e) {
        page.shareModalClose()
      },
      title: page.data.dataList.introduce,
      imageUrl:'/images/share.jpg',
    };
    return res;
  },
 
// 分享
  showShareModal: function () {
    var page = this;
    page.setData({
      share_modal_active: "active",
      no_scroll: true,
    });
  },
// 分享
  shareModalClose: function () {
    var page = this;
    page.setData({
      share_modal_active: "",
      no_scroll: false,
    });
  },
  // 获取最新电话号码
  getPhone:function(){
    var that = this;
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'companyInfo', 'GET','', function (data) {
      var phone = data.data.phone
      
      that.setData({
        phone:phone
      })
    })
  },
  // 联系客服
  contactCS:function(){

    var phone = this.data.phone
    
    util.call(phone);
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

});