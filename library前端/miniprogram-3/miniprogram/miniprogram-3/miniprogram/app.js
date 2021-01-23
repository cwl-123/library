import{request} from  "./request/request.js"

var appId="wxe9cb41e0018ffeac";
var secret="677d197b8de710a273c22cf9912dcbbb";
App({
  onShow: function () { 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
      success: function(){
        //session 未过期，并且在本生命周期一直有效
      }, 
      fail: function(){  
        //登录态过期
        wx.login() //重新登录
      }
    }),
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              // this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onLaunch:function(){
    this.login();

  },
  // 获取用户unionid我封装到login函数中，为了实现访问的异步特性。
  //1. 每次需要用到当前用户的unionid的时候需要：getApp().login().then(res=>{"写想写的逻辑代码，这里res就是unionid"})
  //2. 在不是实时访问的场景，即需要访问unionid的函数不是页面一加载就执行，（即不在onload函数中而是在点击函数中）
  // 那么可以用getApp().globalData.unionid来访问，那样访问会更快点
  login:function(){
    return new Promise((resolve,reject)=>{
      wx.login({
        success:(res)=>{
          let code=res.code;
          console.log("code"+code);
          // request({ url:"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + secret + "&js_code=" + code + "&grant_type=authorization_code"})
          request({url:"https://zekaio.cn/library/v1/wechat/getopenid?code="+code})
          .then(res=>{
            let openid=res.data
            console.log('openid为'+openid)
            request({url:"https://zekaio.cn/library/v1/usr/getunionid?mp_openid="+openid})
            .then(res=>{ 
              this.globalData.unionid=res.data.data;
              resolve(this.globalData.unionid)
            })
          })
        }
      })
    })
  },

globalData:{
    unionid:0
    }


})