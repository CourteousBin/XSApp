Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    sort: 0,
  },

  onLoad: function (options) {

  },
  getGoodsInfo:function(){
    
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