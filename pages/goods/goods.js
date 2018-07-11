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
    // var cat_id = options.cat_id;
    // 调试数据
    var goods_id = this.data.goods_id = 60

    // 获取数据
    this.getGoods({ goods_id: goods_id })

    // 是否喜欢的商品
    this.isFavorite()
  },
  actOrder:function(e){
    myUtils.toPages('../formBase/formBase');
  },
  isFavorite:function(){
    var that = this
    var url = app.globalData.apiUrl;
    // var open_id = app.globalData.openId;
    // 模拟数据
    var open_id = 'ok-z54p4oIgtstl_is_t-RBxU76s'; 
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
      console.log(dataList)
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
    //console.log(page.data.goods.pic_list);
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
      // if (res.code == 1) {
      //   var goods = that.data.goods;
      //   goods.is_favorite = 1;
      //   that.setData({
      //     goods: goods,
      //   });
      // }
    })


    // app.request({
    //   url: api.user.favorite_add,
    //   method: "post",
    //   data: {
    //     goods_id: that.data.goods.id,
    //   },
    //   success: function (res) {
    //     if (res.code == 0) {
    //       var goods = that.data.goods;
    //       goods.is_favorite = 1;
    //       that.setData({
    //         goods: goods,
    //       });
    //     }
    //   }
    // });

  },

  favoriteRemove: function () {
    var that = this;
    var url = app.globalData.apiUrl;
    var open_id = app.globalData.openId;
    var goods_id = this.data.goods_id;

    util.requestHttp(url + 'goodsLove', 'POST', { open_id: open_id, goods_id: goods_id, control: 2 }, function (data) {
      var dataList = data.data

      // if (dataList == 1) {
      //   var goods = that.data.goods;
      //   goods.is_favorite = 1;
      //   that.setData({
      //     goods: goods,
      //   });
      // }
    })


    // app.request({
    //   url: api.user.favorite_remove,
    //   method: "post",
    //   data: {
    //     goods_id: that.data.goods.id,
    //   },
    //   success: function (res) {
    //     if (res.code == 0) {
    //       var goods = that.data.goods;
    //       goods.is_favorite = 0;
    //       that.setData({
    //         goods: goods,
    //       });
    //     }
    //   }
    // });

    // var goods = page.data.goods;
    // goods.is_favorite = 0;
    // page.setData({
    //   goods: goods,
    // });
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
    var page = this;
    page.getCommentList(true);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var page = this;
    var user_info = wx.getStorageSync("user_info");
    var res = {
      path: "/pages/goods/goods?id=" + this.data.id + "&user_id=" + user_info.id,
      success: function (e) {
        console.log(e);
        share_count++;
        if (share_count == 1)
          app.shareSendCoupon(page);
      },
      title: page.data.goods.name,
      imageUrl: page.data.goods.pic_list[0].pic_url,
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

  

});