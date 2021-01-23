var util=require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()
//var template = require('../../tabbarComponent/tabbar.js');
Page({
  data: {
    indicatorDots: true,
autoplay: true,
interval: 5000,
duration: 1000,
//tabbar:{},
seatNumber:'',
showNumber:'',
img:[
  'https://i.loli.net/2020/12/23/JIUZfNBXp6Rvtxb.jpg',
  'https://i.loli.net/2020/11/04/nms5zDLoafMT6v8.jpg',
  'https://i.loli.net/2020/11/04/f6Dz71jiJlRgMZ5.jpg',
  'https://i.loli.net/2020/11/04/DEWCazrsP59U3xF.jpg'
]
  },
  onLoad: function () {
    //app.editTabbar();
    //app.globalData.template.tabbar("tabBar", 0, this)//0表示第一个tabbar  
    var that = this;
    var TIME=util.judgeTime(new Date());
    wx.request({
      url:"https://zekaio.cn/library/v1/seat/left",
      data:{
        time_slot : TIME
      },
      header: {
        'content-type' : 'application/json'
      },
      method:'GET',
      success:function(res){
        console.log(res),
        that.setData({
          seatNumber:res.data.data.num,
        })
        console.log('d')
        console.log(that.data.seatNumber)
        that.setData({
          showNumber:that.data.seatNumber
        })

      },
      fail:function(err){
        wx.showToast({
          title: '无法连接服务器',
          icon:'none',
          duration: 2000
        })
      }
    })

  },
  onShow:function(){
    var that = this;
    var TIME=util.judgeTime(new Date());
    wx.request({
      url:"https://zekaio.cn/library/v1/seat/left",
      data:{
        time_slot : TIME
      },
      header: {
        'content-type' : 'application/json'
      },
      method:'GET',
      success:function(res){
        console.log(res),
        that.setData({
          seatNumber:res.data.data,
        })
      },
      fail:function(err){
        wx.showToast({
          title: '无法连接服务器',
          icon:'none',
          duration: 2000
        })
      }
    })
  },
  selectClick:function(e){
    var that = this;
    var TIME=util.judgeTime(new Date());
    wx.request({
      url:"https://zekaio.cn/library/v1/seat/request",
      data:{
        unionid:app.globalData.unionid,
        time_slot:TIME
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method:'POST',
      success:function(res){
        console.log(res)
        if(res.data[0].status==200){
       wx.showModal({
          title: "提示", // 提示的标题
          content: "预约座位ID\r\n"+res.data[0].data.seat_id, // 提示的内容
          showCancel: false, // 是否显示取消按钮，默认true
          cancelText: "取消", // 取消按钮的文字，最多4个字符
          cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
          confirmText: "确定", // 确认按钮的文字，最多4个字符
          confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
          success: function (res) {
              console.log("接口调用成功的回调函数");
              if (res.confirm) {
                  console.log('用户点击确定')
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          },
          fail: function () {
              console.log("接口调用失败的回调函数");
          },
          complete: function () {
              console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          }
      })
        }
        else{ wx.showModal({
          title: "提示", // 提示的标题
          content: res.data[0].data.message, // 提示的内容
          showCancel: false, // 是否显示取消按钮，默认true
          cancelText: "取消", // 取消按钮的文字，最多4个字符
          cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
          confirmText: "确定", // 确认按钮的文字，最多4个字符
          confirmColor: "#576B95", // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
          success: function (res) {
              console.log("接口调用成功的回调函数");
              if (res.confirm) {
                  console.log('用户点击确定')
              } else if (res.cancel) {
                  console.log('用户点击取消')
              }
          },
          fail: function () {
              console.log("接口调用失败的回调函数");
          },
          complete: function () {
              console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
          }
      })}
      },
      fail:function(err){
        wx.showToast({
          title: '无法连接服务器',
          icon:'none',
          duration: 2000
        })
      }
    })
  },
  searchClick:function(e){
    wx.navigateTo({
      url: '/pages/reservation/reservation',
    })
   
  }
})
