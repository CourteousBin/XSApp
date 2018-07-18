var wxCharts = require('../../utils/wxcharts-min.js');
var app = getApp();
var lineChart = null;
var startPos = null;
Page({
  data: {
    date:'2018',
  },
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    // X轴日期
    var categories = [];
    // 数值
    var data = [];
    for (var i = 0; i < 12; i++) {
      categories.push('2017-' + (i + 1));
      data.push(Math.random() * (20 - 10) + 10);
    }
    console.log(data)
    return {
      categories: categories,
      data: data
    }
  },
  onLoad: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      // x轴日期
      categories: simulationData.categories,
      animation: true,
      series: [{
        // 最下面注释
        name: '访问量',
        // 值
        data: simulationData.data,
        // 单位
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }, {
        // 最下面注释
        name: '提交咨询表量',
        // 值
        data: [1,2,3,4,5,6,7,8,9,10,11,12],
        // 单位
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }],
      xAxis: {
        disableGrid: false
      },
      yAxis: {
        title: '成交金额 (万元)',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: true,
      dataPointShape: true,
      enableScroll: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
});