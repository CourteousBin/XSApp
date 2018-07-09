var util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    sort: 0,
    // 分页加载页数
    pages: 1,
    // 保存已经加载数据
    finishData: null,
  },

  onLoad: function (options) {

    console.log('abc')

    // 真实接受收据
    var cat_id = this.data.cat_id = options.cat_id
    // 模拟数据
    // var cat_id = this.data.cat_id = 92

    this.getProducts({ cat_id: cat_id, page: this.data.pages, sort: this.data.sort})

    this.template()
    
  },
  sortClick: function (e) {
    var page = this;
    var sort = e.currentTarget.dataset.sort;
    var default_sort_type = e.currentTarget.dataset.default_sort_type == undefined ? -1 : e.currentTarget.dataset.default_sort_type;
    var sort_type = page.data.sort_type;
    if (page.data.sort == sort) {
      if (default_sort_type == -1) {
        return;
      }
      if (page.data.sort_type == -1) {
        sort_type = default_sort_type;
      } else {
        sort_type = (sort_type == 0 ? 1 : 0);
      }
    } else {
      sort_type = default_sort_type;
    }

    page.setData({
      sort: sort,
      sort_type: sort_type,
    });

    this.data.pages = 1

    this.getProducts({ cat_id: this.data.cat_id, page: this.data.pages, sort: this.data.sort })
  },

  template: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var scrollHeight = (res.windowHeight - 55) * 2;
        that.setData({
          scrollHeight: scrollHeight
        });
      }
    });
  },
  // 加载更多
  onScrollLower: function () {
    wx.showNavigationBarLoading();

    // 每次加载页数自增
    this.data.pages++
    
    var pages = this.data.pages
    console.log(pages)
    var tabType = this.data.sort

    this.getMoreProducts({ cat_id: this.data.cat_id, page: pages, sort: tabType });
  },
  getProducts: function (PostData) {
    util.showLoading(true)
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'moreGoods', 'POST', PostData, function (data) {
      var dataList = data.data.data;
      console.log(dataList)
      // // 测试数据 * 10
      dataList.forEach(function (v, i) {

        for (var k = 0; k < 6; k++) {
          dataList[k] = v
        }
      })

      that.setData({
        dataList: dataList,
        finishData: dataList
      })
      wx.hideLoading()
    })
  },
  // 加载更多数据
  getMoreProducts: function (PostData) {
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'moreGoods', 'POST', PostData, function (data) {
      var dataList = data.data.data;
      // 判断数据是否全部加载完成
      var len = dataList.length;
      if (len !== 0) {
        // 把新数据合并
        dataList.forEach(function (v, i) {
          that.data.finishData.push(v)
        })

        var newDataList = that.data.finishData;

        that.setData({
          dataList: newDataList
        })

        setTimeout(function () {
          wx.hideNavigationBarLoading()
        }, 800)
      } else {
        util.toastTip('没有更多数据', 'none', 800)
        setTimeout(function () {
          wx.hideNavigationBarLoading()
        }, 800)
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  }
  ,


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  }
  ,

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
  ,

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
});