/*
  基础通用方法
  author:Bin,
  Data:2018-5-15
*/
// login
function getLogin(callback){
  wx.login({
    success:function(res){
      callback(res);
    }
  })  
}
// http
function requestHttp(api, method, parameter, callBack){
  wx.request({
    url: api,
    method:method,
    data: parameter,
    header: { 'content-type': 'application/json'},
    success:function(data){
      callBack(data)
    }
  })
}
// 导航共用方法
function listenerBtnGetLocation(lat,long,name) {
  wx.openLocation({
    latitude: lat,
    longitude: long,
    name: name,
    scale: 28
  })
}
// 联系电话共用方法
function call(phone) {
  wx.makePhoneCall({
    phoneNumber: phone
  })
}
// 设置标题
function setNavBarTitle(titles) {
  wx.setNavigationBarTitle({
    title: titles
  })
}

// 保存当前页面再跳转页面
function toPages(url) {
  wx.navigateTo({
    url: url
  })
}
// 返回
function toBackPage(number){
  wx.navigateBack({
    delta: number
  })
}
// 获取设备可用高度
function getPhoneHeight(){
  var height ;
  wx.getSystemInfo({
    success: function (res) {
      height = res.windowHeight;
    }
  })
  return height;
}

// toast提示框
function toastTip(text, state,time){
  // state 可以写 success / loading / none
  wx.showToast({
    title: text,
    icon: state,
    duration: time
  });
}

// 加载中提示
function showLoading(mask){
  wx.showLoading({
    title: '数据加载中',
    mask: mask
  });
}

// 提示框带确定
function showModal(msg){
  wx.showModal({
    content: msg,
    showCancel: false,
  })
}

// 小数点两位
function toDecimal(x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
} 

// 获取当前时间
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
// 两个日期相减 yyyy-mm-dd
function dateSubtract(oldDate,nweDate) {
  var sDate = oldDate;
  var eDate = nweDate;
  var sArr = sDate.split("-");
  var eArr = eDate.split("-");
  var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
  var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
  var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
  return result;
}

module.exports = {
  toPages: toPages,
  toBackPage: toBackPage,
  getPhoneHeight: getPhoneHeight,
  call: call,
  listenerBtnGetLocation: listenerBtnGetLocation,
  setNavBarTitle: setNavBarTitle,
  toastTip: toastTip,
  getLogin: getLogin,
  requestHttp: requestHttp,
  getNowFormatDate: getNowFormatDate,
  dateSubtract: dateSubtract,
  showLoading: showLoading,
  showModal: showModal,
}
