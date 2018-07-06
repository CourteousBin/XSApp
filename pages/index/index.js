var util = require('../../utils/util.js');
var app = getApp();
const ImgLoader = require('../../img-loader/img-loader.js');
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
    // 图片预加载
    this.imgLoader = new ImgLoader(this);
    util.showLoading(true);
  },
  toNewsMore:function(e){
    util.toPages('../newsMore/newsMore');
  },
  toNewsDetail:function(e){
    util.toPages('../newsDetail/newsDetail');
  },
  fastTest:function(e){
    util.toPages('../fastTest/fastTest');
  },
  // 请求数据
  getData:function(){
    var that = this;
    
    // 请求banner
    that.getBanner()
    // 请求标的
    that.getTarget()
    // 请求新闻
    that.getNews()
    // 请求商品
    that.getProduct()

  },
  getBanner:function(){
    var url = app.globalData.apiUrl;
    var that =this;
    util.requestHttp(url +'bannerIndex','GET','',function(data){
      var dataList = data.data;
      that.setData({
        banner: dataList
      })
    })
  },
  getTarget:function(){
    var url = app.globalData.apiUrl;
    var that = this;
    util.requestHttp(url + 'getTarget', 'GET', '', function (data) {
      var dataList = data.data;
      
      // 新数组
      var arr = [];
      // 用来判断
      var b;
      dataList.forEach(function(v,i){
        // 每5个分组
          // i/5 得出小数 , 经过四舍五入 得出整数
        var a = Math.floor(i / 5);

        // 判断是否需要创建二维数组
        if (b !== a) {
          b = a;
          // 创建二维数组 arr[0] = []
          arr[a] = [];
        }

        // 对二维数组赋值
        arr[a].push(v);
      })
      that.setData({
        target: arr
      })
      
    })
  },
  getNews:function(){
    var that = this;
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'getNews', 'GET', '', function (data) {
      var dataList = data.data;

      that.setData({
        news: dataList
      })
    })
  },
  getProduct:function(){
    var that =this;
    var url = app.globalData.apiUrl;
    util.requestHttp(url + 'getProduct', 'GET', '', function (data) {
      var dataList = data.data
      console.log(dataList)
      that.setData({
        product: dataList
      })
      wx.hideLoading()
    })
  },
  imageOnLoad:function(e){
    console.log(e.target.dataset.id)
    var id = e.target.dataset.id;
    var imgUrl = e.target.dataset.imgurl;
    var arr = 'arr' + '[' + id + ']';
    // this.setData({
    //   [arr]:true
    // })
    this.imgLoader.load(imgUrl, (err, data) => {
      if (!err)
        this.setData({ [arr]: data.src })
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
    this.getData();
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
    wx.stopPullDownRefresh();
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