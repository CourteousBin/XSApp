var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {
    // goods: {
    //   1: {
    //     id: 1,
    //     name: 'B系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   2: {
    //     id: 2,
    //     name: 'A系列',
    //     pic: '/images/timg2.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   3: {
    //     id: 3,
    //     name: 'AA系列',
    //     pic: '/images/timg2.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   4: {
    //     id: 4,
    //     name: 'AB系列',
    //     pic: '/images/timg2.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   5: {
    //     id: 5,
    //     name: 'C系列',
    //     pic: '/images/timg2.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   6: {
    //     id: 6,
    //     name: 'D系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   7: {
    //     id: 7,
    //     name: 'E系列',
    //     pic: '/images/timg2.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   8: {
    //     id: 8,
    //     name: 'LW系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   9: {
    //     id: 9,
    //     name: 'D5系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   10: {
    //     id: 10,
    //     name: 'AA5系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   11: {
    //     id: 11,
    //     name: 'RO系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   12: {
    //     id: 12,
    //     name: 'RO系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   13: {
    //     id: 13,
    //     name: 'RO系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   },
    //   14: {
    //     id: 14,
    //     name: 'RO系列',
    //     pic: '/images/timg.jpg',
    //     sold: '',
    //     price: ' 额度:5-50万',
    //   }
    // },
    // goodsList: [
    //   {
    //     id: 'hot',
    //     classifyName: '个人信用类',
    //     goods: [1]
    //   },
    //   {
    //     id: 'new',
    //     classifyName: '个人信贷类',
    //     goods: [1, 2, 4, 5, 6, 3]
    //   },
    //   {
    //     id: 'vegetable',
    //     classifyName: '个人抵押类',
    //     goods: [7, 8, 9]
    //   },
    //   {
    //     id: 'mushroom',
    //     classifyName: '企业信贷类',
    //     goods: [10, 11, 12, 13, 14]
    //   },
    //   {
    //     id: 'food',
    //     classifyName: '企业抵押类',
    //     goods: [3, 4, 1, 2, 5, 6]
    //   },
    //   {
    //     id: 'test',
    //     classifyName: '设备融资类',
    //     goods: [1, 5, 8, 7, 9]
    //   },
    // ],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    showCartDetail: false
  },
  onLoad: function (options) {
    this.getGoods()
    this.getClassify()

    // var shopId = options.id;
    // for (var i = 0; i < app.globalData.shops.length; ++i) {
    //   if (app.globalData.shops[i].id == shopId) {
    //     this.setData({
    //       shop: app.globalData.shops[i]
    //     });
    //     break;
    //   }
    // }
  },
  getGoods:function(){
    util.showLoading(true)
    var that = this;
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'productMixGoods', 'GET', '', function (data) {
      var dataList = data.data;
      console.log(dataList)
      that.setData({
        goods: dataList
      })
    })
  },
  getClassify:function(){
    
    var that = this;
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'getClassify', 'GET', '', function (data) {
      var dataList = data.data;
      console.log(dataList)
      that.setData({
        goodsList: dataList
      })
      wx.hideLoading()
    })
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }

    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.goodsList.length;
    this.data.goodsList.forEach(function (classify, i) {
      var _h = 70 + classify.goods.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;

    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });

    }, 100);


  },
  toDetail: function () {
    wx.navigateTo({
      url: '../goods/goods'
    })
  }
});

