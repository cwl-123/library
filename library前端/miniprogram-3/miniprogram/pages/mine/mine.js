
//sort.js
//獲取應用實例
var app = getApp
Page({
 
  /**
   * 页面的初始数据
   */
  
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              that.setData({
                result:'ok',// 结果
                nickName:res.userInfo.nickName,// 微信昵称
                avatarUrl:res.userInfo.avatarUrl,// 微信头像
              })
            }
          })
        }else{
          // 未授权，结果返回null
          that.setData({
            result:'null',// 结果
          })
        }
      }
    })
  },
  // 请求API授权，获得用户头像和昵称
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo.nickName)
    var that = this;
    that.setData({
      result:'ok',// 结果
      nickName:e.detail.userInfo.nickName,// 微信昵称
      avatarUrl:e.detail.userInfo.avatarUrl,// 微信头像
    })
  },

  popevent:function(){
    wx.showModal({
      title: '提示',
      content: '请先授权登录',
      showCancel: false,

    })
  }
})