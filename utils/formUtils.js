/*
  Form表单通用函数
  author:Bin,
  Data:2018-5-15
  * 请配合weui使用
*/

// 时间选择器
function timeSelect(e,that){
  var dateType = e.target.dataset.type;
  var value = e.detail.value;
  that.setData({
    [dateType]: e.detail.value,
  })
}

// 单选
function RadionSelect(e,that){
  if (e.target.dataset.judge) {
    var judge = e.target.dataset.judge;
    var checkValue = e.detail.value;
    that.setData({
      [judge]: checkValue
    })
  }

  var radioTyle = e.target.dataset.type;
  var radioValue = that.data[radioTyle];
  for (var i = 0, len = radioValue.length; i < len; ++i) {
    radioValue[i].checked = radioValue[i].value == e.detail.value;
  }
  that.setData({
    [radioTyle]: radioValue
  });
}

// 下拉框选择picker
function PickerSelect(e,that){
  var pickerType = e.target.dataset.type;
  that.setData({
    [pickerType]: e.detail.value
  })
}

// switch选择器
function switchSelect(e,that){
  var isTrue = e.detail.value;
  var judge = e.target.dataset.judge;
  if (isTrue == true) {
    that.setData({
      [judge]: isTrue
    })
  } else {
    that.setData({
      [judge]: isTrue
    })
  }
}

// 监听 textare 填写字数
function textNumber(e,that){
  var writeNumber = e.currentTarget.dataset.value;
  var value = e.detail.value;
  var len = parseInt(value.length);
  if (len > 80) return;
  that.setData({
    [writeNumber]: len
  })
}

// 要循环的 picker选择器
function eachPicker(e,that){
  //  pickerIndex
  var pickerType = e.target.dataset.type;
  //  pickerArr
  var pickerArr = e.target.dataset.arr;
  // 要循环的数组
  var pickerDataList = e.target.dataset.datalist;
  // 选择第几个
  var value = e.detail.value;
  // 获取到当前的值
  var arr = that.data[pickerArr][value];
  // 要遍历的数组
  var forArr = [];
  for (var i = 1; i <= arr; i++) {
    forArr.push(i);
  }

  that.setData({
    [pickerType]: e.detail.value,
    [pickerDataList]: forArr
  })
}

// 区域选择
function regionSelect(e,that){
  var value = e.currentTarget.dataset.value;
  that.setData({
    [value]: e.detail.value
  })
}

module.exports = {
  timeSelect: timeSelect,
  RadionSelect: RadionSelect,
  PickerSelect: PickerSelect,
  switchSelect: switchSelect,
  textNumber: textNumber,
  eachPicker: eachPicker,
  regionSelect: regionSelect
}