// page/myReservation/myReservation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_: ['seatid1', 'seatid2', 'seatid3'],
    len: 3,
    seat: [],
    message: ' ',
    unionId: ' ',
    name_floor: [],
    seatid: [],
    time_slot01: [],
  },

  /**
   * 生命周期函数--监听页面加载

   */
  onLoad: function (options) {
    // this.setData({
    //   len:this.data.data_.length
    // })

    getApp().login().then(res=>{
      console.log(res)
      this.setData({
        unionId:res
      })
      this.try();
    });

    // unionId=getApp().globalData.unionid
    // console.log(this.data.unionId)

  },

  try: function () {
    var mythis = this
    var mydata = this.data

    wx.request({
      url: 'https://zekaio.cn/library/v1/msg/messageList?unionid=' + this.data.unionId,
      method: 'GET',
      success: function (res) {
        console.log(res)
        mythis.setData({
          len: res.data.data.length
        })

        // console.log(res.data.data.length)
        var myDate = new Date()
        // console.log(myDate.getFullYear())
        // console.log(myDate.getMonth()+1)
        // console.log(myDate.getDate())
        // console.log(""+myDate.getFullYear()+"."+(myDate.getMonth()+1)+"."+myDate.getDate())
        var temp

        if (res.data.data.length > 0) {
          if (res.data.data[0].time_slot == -1) {
            temp = '上午(8:00-12:00)'
          } else if (res.data.data[0].time_slot == 0) {
            temp = '下午(12:00-18:00)'
          } else {
            temp = '晚上(18:00-22:00)'
          }

          var name
          var char = res.data.data[0].seat_id.charAt(0) + res.data.data[0].seat_id.charAt(1)
          if (char == '31') {
            name = '自然科学'
          } else if (char == '32') {
            name = '工业技术'
          } else if (char == '41') {
            name = '法律经济'
            // name='社会科学'
          } else if (char == '42') {
            // name='文学艺术历史'
            name = '社会科学'
          } else if (char = '43') {
            name = '文学艺术历史'
          } else if (char == '51') {
            name = '社会科学'
          } else if (char == '52') {
            name = '自然科学'
          } else if (char == '53') {
            name = '过刊'
          } else if (char == '61') {
            name = '西文学位'
          } else if (char == '62') {
            name = '医学'
          }

          mythis.setData({
            ["seat[0][0]"]: "" + myDate.getFullYear() + "." + (myDate.getMonth() + 1) + "." + myDate.getDate(),
            ["seat[0][1]"]: temp,
            ["seat[0][2]"]: res.data.data[0].seat_id.charAt(0) + 'F',
            ["seat[0][3]"]: res.data.data[0].seat_id.charAt(4) + res.data.data[0].seat_id.charAt(5),
            ["seat[0][6]"]: res.data.data[0].seat_id.charAt(1),
            ["seatid[0]"]: res.data.data[0].seat_id,
            ["name_floor[0]"]: name,
            ["time_slot01[0]"]: res.data.data[0].time_slot,
          })
          // console.log(seatid)

          wx.request({
            url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + res.data.data[0].seat_id,
            method: 'GET',
            success: function (res) {
              // console.log(res)
              var temp1
              var temp2
              // console.log(res.data.data[0].is_plug)
              if (res.data.data[0].is_window == 0) {
                temp1 = '不靠窗'
              } else {
                temp1 = '靠窗'
              }

              if (res.data.data[0].is_plug == 0) {
                temp2 = '无插座'
              } else {
                temp2 = '有插座'
              }
              mythis.setData({
                ["seat[0][4]"]: temp1,
                ["seat[0][5]"]: temp2
              })
            }
          })
        }



        if (res.data.data.length > 1) {
          if (res.data.data[1].time_slot == -1) {
            temp = '上午(8:00-12:00)'
          } else if (res.data.data[1].time_slot == 0) {
            temp = '下午(12:00-18:00)'
          } else {
            temp = '晚上(18:00-22:00)'
          }
          var name
          var char = res.data.data[1].seat_id.charAt(0) + res.data.data[1].seat_id.charAt(1)
          if (char == '31') {
            name = '自然科学'
          } else if (char == '32') {
            name = '工业技术'
          } else if (char == '41') {
            name = '法律经济'
            // name='社会科学'
          } else if (char == '42') {
            // name='文学艺术历史'
            name = '社会科学'
          } else if (char = '43') {
            name = '文学艺术历史'
          } else if (char == '51') {
            name = '社会科学'
          } else if (char == '52') {
            name = '自然科学'
          } else if (char == '53') {
            name = '过刊'
          } else if (char == '61') {
            name = '西文学位'
          } else if (char == '62') {
            name = '医学'
          }

          mythis.setData({
            ["seat[1][0]"]: "" + myDate.getFullYear() + "." + (myDate.getMonth() + 1) + "." + myDate.getDate(),
            ["seat[1][1]"]: temp,
            ["seat[1][2]"]: res.data.data[1].seat_id.charAt(0) + 'F',
            ["seat[1][3]"]: res.data.data[1].seat_id.charAt(4) + res.data.data[1].seat_id.charAt(5),
            ["seat[1][6]"]: res.data.data[1].seat_id.charAt(1),
            ["seatid[1]"]: res.data.data[1].seat_id,
            ["name_floor[1]"]: name,
            ["time_slot01[1]"]: res.data.data[1].time_slot,
          })
          // console.log(res.data.data[1])
          wx.request({
            url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + res.data.data[1].seat_id,
            method: 'GET',
            success: function (res) {
              // console.log(res)
              var temp1
              var temp2
              // console.log(res.data.data[1].is_plug)
              if (res.data.data[0].is_window == 0) {
                temp1 = '不靠窗'
              } else {
                temp1 = '靠窗'
              }

              if (res.data.data[0].is_plug == 0) {
                temp2 = '无插座'
              } else {
                temp2 = '有插座'
              }
              mythis.setData({
                ["seat[1][4]"]: temp1,
                ["seat[1][5]"]: temp2
              })
            }
          })
        }



        if (res.data.data.length > 2) {
          if (res.data.data[2].time_slot == -1) {
            temp = '上午(8:00-12:00)'
          } else if (res.data.data[2].time_slot == 0) {
            temp = '下午(12:00-18:00)'
          } else {
            temp = '晚上(18:00-22:00)'
          }

          var name
          var char = res.data.data[2].seat_id.charAt(0) + res.data.data[2].seat_id.charAt(1)
          console.log(res.data.data[2])
          if (char == '31') {
            name = '自然科学'
          } else if (char == '32') {
            name = '工业技术'
          } else if (char == '41') {
            name = '法律经济'
            // name='社会科学'
          } else if (char == '42') {
            // name='文学艺术历史'
            name = '社会科学'
          } else if (char = '43') {
            name = '文学艺术历史'
          } else if (char == '51') {
            name = '社会科学'
          } else if (char == '52') {
            name = '自然科学'
          } else if (char == '53') {
            name = '过刊'
          } else if (char == '61') {
            name = '西文学位'
          } else if (char == '62') {
            name = '医学'
          }


          mythis.setData({
            ["seat[2][0]"]: "" + myDate.getFullYear() + "." + (myDate.getMonth() + 1) + "." + myDate.getDate(),
            ["seat[2][1]"]: temp,
            ["seat[2][2]"]: res.data.data[2].seat_id.charAt(0) + 'F',
            ["seat[2][3]"]: res.data.data[2].seat_id.charAt(4) + res.data.data[2].seat_id.charAt(5),
            ["seat[2][6]"]: res.data.data[2].seat_id.charAt(1),
            ["seatid[2]"]: res.data.data[2].seat_id,
            ["name_floor[2]"]: name,
            ["time_slot01[2]"]: res.data.data[2].time_slot,

          })
          wx.request({
            url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + res.data.data[2].seat_id,
            method: 'GET',
            success: function (res) {
              // console.log(res)
              var temp1
              var temp2
              // console.log(res.data.data[2].is_plug)
              if (res.data.data[0].is_window == 0) {
                temp1 = '不靠窗'
              } else {
                temp1 = '靠窗'
              }
              if (res.data.data[0].is_plug == 0) {
                temp2 = '无插座'
              } else {
                temp2 = '有插座'
              }


              mythis.setData({
                ["seat[2][4]"]: temp1,
                ["seat[2][5]"]: temp2
              })
            }
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.try()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.try()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   len: this.data.data_.length
    // })
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

  click: function (e) {
    var mydata = this.data
    wx.navigateTo({
      url: '../appointment/seat/seat',
      success: function (res) {
        //通过eventChannel向B页面发送数据。
        var id = e.currentTarget.dataset.index
        res.eventChannel.emit('acceptDataFromA', {
          date: mydata.seat[id][0],
          time: mydata.seat[id][1],
          foor: mydata.seat[id][2],
          seat_num: mydata.seat[id][3],
          iswindow: mydata.seat[id][4],
          isplug: mydata.seat[id][5],
          seatid01: mydata.seatid[id],
          unionId01: mydata.unionId,
          name_floor01: mydata.name_floor[id],
          time_slot02: mydata.time_slot01[id]
        })
        // console.log(id)
      }
    })

  }
})