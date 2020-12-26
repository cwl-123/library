// pages/sweep/sweep.js
var util = require('../../utils/util.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    on: 'true',
    qrstring: "",
    unionid: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var that = this
    if (that.data.on) {
      that.setData({
        on: false,
        unionid: app.globalData.unionid
      })
      wx.scanCode({
        needResult: 1,
        scanType: ["qrCode"],
        onlyFromCamera: true,
        success: (res) => {
          var result = res.result;
          var isseat = true;
          that.data.qrstring = result;
          if(isNaN(that.data.qrstring))
          isseat = false;
          else{
          var seatid = Number(that.data.qrstring)
          if (seatid < 100000 || seatid > 999999)
            isseat = false;
          }

          if (isseat == true) {
            wx.showModal({
              title: '提示',
              content: '成功扫描座位' + seatid,
              confirmText: "签到",
              confirmColor: "green",
              cancelText: "收藏座位",
              success: function (res) { //签到
                if (res.confirm) {
                  var TIME = util.judgeTime(new Date());
                  wx.request({
                    url: "https://zekaio.cn/library/v1/seat/confirm?unionid=" + that.data.unionid + "&seat_id=" + seatid + "&time_slot=" + TIME,
                    method: 'POST',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {

                      if (res.data.data.message == "当前时间段您没有预约此座位") {
                        wx.showModal({
                          showCancel: false,
                          title: '签到失败',
                          content: '当前时间段您没有预约此座位',
                          success:function(res){
                          if(res.confirm){
                        wx.switchTab({
                          url: '../index/index',
                        })
                        that.setData({
                          on:true
                        })
                      }
                      }
                    })

                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '签到成功',
                          showCancel: false,
                          success: function (res) {
                            if(res.confirm){
                            wx.redirectTo({
                              url: '../appointment/appointment',
                            })
                            that.setData({
                              on:true
                            })
                          }
                          }
                        })
                      }
                    },
                    fail: function (err) {
                      wx.showToast({
                        title: '无法连接到服务器',
                        icon: 'none',
                        duration: 2000
                      })
                      wx.switchTab({
                        url: '../index/index',
                      })
                      that.setData({
                        on:true
                      })
                    }
                  })
                } else if (res.cancel) {
                  wx.request({
                    url: 'https://zekaio.cn/library/v1/msg/addcollection?unionid=' + that.data.unionid + '&seat_list=' + seatid,
                    method: 'POST',
                    header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: (res) => {
                      wx.showModal({
                        showCancel: false,
                        title: '收藏成功',
                        content: '您已经成功收藏',
                        success: (res) => {
                          // console.log(this.data.time_slot03)
                          if (res.confirm) {

                            wx.redirectTo({
                              //这里应该是跳转到我的收藏界面
                              url: '../collection/collection',
                            })
                            that.setData({
                              on:true
                            })

                          }
                        }
                      })
                      console.log(res)
                    },
                    fail: function (err) {
                      wx.showToast({
                        title: '无法连接服务器',
                        icon: 'none',
                        duration: 2000
                      })
                    }
                  })
                  wx.switchTab({
                    url: '../index/index',
                  })
                  that.setData({
                    on: true
                  })

                }
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '请扫描正确的二维码',
              showCancel: false,
              success: function () {
                wx.switchTab({
                  url: '../index/index',
                })
                that.setData({
                  on:true
                })
              }
              /*
                    wx.request({
                        url:"https://zekaio.cn/library/v1/usr/getunionid?mp_openid=10000",
                        method: 'GET',
                        header:{
                        },
                        success:function(res){
                            console.log(res.data.data)
                        },
                        fail:function(err){
                          wx.showToast({
                            title: '无法连接到服务器',
                            icon: 'none',
                            duration: 2000
                           })
                        }
                
                    })
              */
            })
          }
        },
        fail: (res) => {
          wx.showModal({
            title: '提示',
            content: '扫码失败！\r\n请稍后重试',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../index/index',
                })
                that.setData({
                  on: true
                })
              }
            }
          })
        },
        complete: (res) => {

        }
      })
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


  /**
   * 生命周期函数--监听页面隐藏
   */

  /**
   * 生命周期函数--监听页面卸载
   */

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

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