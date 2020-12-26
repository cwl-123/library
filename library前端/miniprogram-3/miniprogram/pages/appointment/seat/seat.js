// page/detailReservation/detailReservation.js
Page({

      /**
       * 页面的初始数据
       */
      data: {
        data_: ['seatid1', 'seatid2'],
        len: 0,
        seat: [],
        unionid: '',
        seatid: '',
        time_slot03: '',
        // seat_id_test
      },

      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function (options) {
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

        const eventChannel = this.getOpenerEventChannel()
        var mythis = this

        eventChannel.on('acceptDataFromA', function (data) {
          console.log(data)
          var seat_id_test
          mythis.setData({
            ["seat[0][0]"]: data.date,
            ["seat[0][1]"]: data.time,
            ["seat[0][2]"]: data.foor,
            ["seat[0][3]"]: data.seat_num,
            ["seat[0][4]"]: data.iswindow,
            ["seat[0][5]"]: data.isplug,
            ['seat[0][6]']: data.name_floor01,
            ["unionid"]: data.unionId01,
            ["seatid"]: data.seatid01,
            ["time_slot03"]: data.time_slot02,
            // seatid:data.seatid
            // ["seat_id_test"]:data.seatid01,
          })

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

      },

      cancel: function () {
        wx.showModal({
            showCancel: true,
            title: '放弃座位',
            content: '是否放弃该座位',
            success: (res) => {
              if (res.confirm) {

                wx.showModal({
                    showCancel: false,
                    title: '成功放弃',
                    content: '您已经放弃该座位',
                    success: (res) => {
                      if (res.confirm) {
                        wx.request({
                        url: 'https://zekaio.cn/library/v1/msg/cancle?seat_id='+this.data.seatid+'&unionid='+this.data.unionid+'&time_slot='+this.data.time_slot03,
                        method: 'DELETE',
                        header: {
                          "Content-Type": "application/x-www-form-urlencoded"
                        },
                        success: function (res) {
                          // console.log(res.data[0].data)
                          console.log(res)
                        }
                      })

                    wx.navigateBack({})
                  }
                }
              })
          }
        }
      })
  },

  jumppage:function(){
    wx.switchTab({
      url: '../../sweep/sweep',
    })
  },




  reservations: function () {
    wx.showModal({
      showCancel: true,
      title: '收藏座位',
      content: '是否收藏该座位',
      success: (res) => {
        if (res.confirm) {
                  wx.request({
                  url: 'https://zekaio.cn/library/v1/msg/addcollection?unionid=' + this.data.unionid + '&seat_list=' + this.data.seatid,
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
                          
                          wx.navigateTo({
                            //这里应该是跳转到我的收藏界面
                            url: '../../collection/collection',
                          })
          
                        }
                      }
                    })
                    console.log(res)
                  },
                  fail:function(err){
                    wx.showToast({
                      title: '无法连接服务器',
                      icon:'none',
                      duration: 2000
                    })
                  }
                })
          
        }
      }
    })
  }

})