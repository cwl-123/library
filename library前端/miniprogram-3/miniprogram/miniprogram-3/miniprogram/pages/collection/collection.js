// page/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    data_: ['', '', ''],
    len: 0,
    seat: [
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', ''],
      ['', '', '', '']
    ],
    seatid:[],
    post_message: [' ', ' ', ' '],
    // post_message_screen_second:'123',
    // post_message_screen_third:'123',
    // message_first:'test',

    union_id: '000004',
    items: [{
        value: '-1',
        name: '预约8:00-12:00时间段',
        checked: 'true'
      },
      {
        value: '0',
        name: '预约12:00-18:00时间段',
        checked: 'true'
      },
      {
        value: '1',
        name: '预约18:00-22:00时间段',
        checked: 'true'
      }
    ],
    items1: [{
        value: '-1',
        name: '8:00-12:00',
        checked: 'true'
      },
      {
        value: '0',
        name: '12:00-18:00',
        checked: 'true'
      },
      {
        value: '1',
        name: '18:00-22:00',
        checked: 'true'
      }
    ],
    showModal: false,
    time: ['-1', '0', '1'],
    sto_time: ['-1', '0', '1'],
    show: [],
    msg1: "",
    msg2: "",
    msg3: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var mydata = this.data
    var mythis = this
    getApp().login().then(res => {
      this.setData({
        union_id: res
      })

      wx.request({
        url: 'https://zekaio.cn/library/v1/msg/collection?unionid=' + this.data.union_id,
        method: 'GET',
        success: function (res) {
          console.log('收藏座位详情')
          console.log(res)
          console.log('union_id是' + mydata.union_id)
          var temp = res.data.data
          var str = temp.split(',')
          mythis.setData({
            data_: str
          })
          mythis.setData({
            len: mythis.data.data_.length
          })
          console.log(temp)
          console.log(temp.split(","))
          mythis.setData({
            seatid:temp.split(",")
          })
          console.log('seatid是')
          console.log(mythis.data.seatid[0])

        
          if (mythis.data.len > 0)
          wx.request({
            url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + str[0],
            method: 'GET',
            success: function (res) {
              var temp2
              var char = res.data.data[0].seat_id.charAt(0) + res.data.data[0].seat_id.charAt(1)
              if (char == '31') {
                temp2 = '自然科学'
              } else if (char == '32') {
                temp2 = '工业技术'
              } else if (char == '41') {
                temp2 = '法律经济'
              } else if (char == '42') {
                temp2 = '社会科学综合书库'
              } else if (char == '42') {
                temp2 = '社会科学'
              } else if (char == '43') {
                temp2 = '文学艺术历史'
              } else if (char == '51') {
                temp2 = '社会科学'
              } else if (char == '52') {
                temp2 = '自然科学'
              } else if (char == '53') {
                temp2 = '过刊'
              } else if (char == '61') {
                temp2 = '西文学位'
              } else if (char == '62') {
                temp2 = '医学'
              }
              var stringinfo = JSON.stringify(res.data.data[0])
              var str1 = stringinfo.split(',')
              mythis.setData({
                ['seat[0][0]']: str1[0][12] + 'F ' + temp2
              })
              if (str1[2][12] == 1) {
                mythis.setData({
                  ['seat[0][1]']: '靠窗'
                })
              } else {
                mythis.setData({
                  ['seat[0][1]']: '不靠窗'
                })
              }
              mythis.setData({
                ['seat[0][2]']: str1[0][16] + str1[0][17]
              })
              if (str1[3][10] == 1) {
                mythis.setData({
                  ['seat[0][3]']: '有插座'
                })
              } else {
                mythis.setData({
                  ['seat[0][3]']: '无插座'
                })
              }
            }
          })



          if (mythis.data.len > 1)
            wx.request({
              url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + str[1],
              method: 'GET',
              success: function (res) {
                var temp2
                var char = res.data.data[0].seat_id.charAt(0) + res.data.data[0].seat_id.charAt(1)
                if (char == '31') {
                  temp2 = '自然科学'
                } else if (char == '32') {
                  temp2 = '工业技术'
                } else if (char == '41') {
                  temp2 = '法律经济'
                } else if (char == '42') {
                  temp2 = '社会科学综合书库'
                } else if (char == '42') {
                  temp2 = '社会科学'
                } else if (char == '43') {
                  temp2 = '文学艺术历史'
                } else if (char == '51') {
                  temp2 = '社会科学'
                } else if (char == '52') {
                  temp2 = '自然科学'
                } else if (char == '53') {
                  temp2 = '过刊'
                } else if (char == '61') {
                  temp2 = '西文学位'
                } else if (char == '62') {
                  temp2 = '医学'
                }
                var stringinfo = JSON.stringify(res.data.data[0])
                var str1 = stringinfo.split(',')
                mythis.setData({
                  ['seat[1][0]']: str1[0][12] + 'F ' + temp2
                })
                if (str1[2][12] == 1) {
                  mythis.setData({
                    ['seat[1][1]']: '靠窗'
                  })
                } else {
                  mythis.setData({
                    ['seat[1][1]']: '不靠窗'
                  })
                }
                mythis.setData({
                  ['seat[1][2]']: str1[0][16] + str1[0][17]
                })
                if (str1[3][10] == 1) {
                  mythis.setData({
                    ['seat[1][3]']: '有插座'
                  })
                } else {
                  mythis.setData({
                    ['seat[1][3]']: '无插座'
                  })
                }
              }
            })

          if (mythis.data.len > 2)
            wx.request({
              url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + str[2],
              method: 'GET',
              success: function (res) {
                var temp2
                var char = res.data.data[0].seat_id.charAt(0) + res.data.data[0].seat_id.charAt(1)
                if (char == '31') {
                  temp2 = '自然科学'
                } else if (char == '32') {
                  temp2 = '工业技术'
                } else if (char == '41') {
                  temp2 = '法律经济'
                } else if (char == '42') {
                  temp2 = '社会科学综合书库'
                } else if (char == '42') {
                  temp2 = '社会科学'
                } else if (char == '43') {
                  temp2 = '文学艺术历史'
                } else if (char == '51') {
                  temp2 = '社会科学'
                } else if (char == '52') {
                  temp2 = '自然科学'
                } else if (char == '53') {
                  temp2 = '过刊'
                } else if (char == '61') {
                  temp2 = '西文学位'
                } else if (char == '62') {
                  temp2 = '医学'
                }
                var stringinfo = JSON.stringify(res.data.data[0])
                var str1 = stringinfo.split(',')
                mythis.setData({
                  ['seat[2][0]']: str1[0][12] + 'F ' + temp2
                })
                if (str1[2][12] == 1) {
                  mythis.setData({
                    ['seat[2][1]']: '靠窗'
                  })
                } else {
                  mythis.setData({
                    ['seat[2][1]']: '不靠窗'
                  })
                }
                mythis.setData({
                  ['seat[2][2]']: str1[0][16] + str1[0][17]
                })
                if (str1[3][10] == 1) {
                  mythis.setData({
                    ['seat[2][3]']: '有插座'
                  })
                } else {
                  mythis.setData({
                    ['seat[2][3]']: '无插座'
                  })
                }
              }
            })

          if (mythis.data.len > 3)
            wx.request({
              url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + str[3],
              method: 'GET',
              success: function (res) {
                var temp2
                var char = res.data.data[0].seat_id.charAt(0) + res.data.data[0].seat_id.charAt(1)
                if (char == '31') {
                  temp2 = '自然科学'
                } else if (char == '32') {
                  temp2 = '工业技术'
                } else if (char == '41') {
                  temp2 = '法律经济'
                } else if (char == '42') {
                  temp2 = '社会科学综合书库'
                } else if (char == '42') {
                  temp2 = '社会科学'
                } else if (char == '43') {
                  temp2 = '文学艺术历史'
                } else if (char == '51') {
                  temp2 = '社会科学'
                } else if (char == '52') {
                  temp2 = '自然科学'
                } else if (char == '53') {
                  temp2 = '过刊'
                } else if (char == '61') {
                  temp2 = '西文学位'
                } else if (char == '62') {
                  temp2 = '医学'
                }
                var stringinfo = JSON.stringify(res.data.data[0])
                var str1 = stringinfo.split(',')
                mythis.setData({
                  ['seat[3][0]']: str1[0][12] + 'F ' + temp2
                })
                if (str1[2][12] == 1) {
                  mythis.setData({
                    ['seat[3][1]']: '靠窗'
                  })
                } else {
                  mythis.setData({
                    ['seat[3][1]']: '不靠窗'
                  })
                }
                mythis.setData({
                  ['seat[3][2]']: str1[0][16] + str1[0][17]
                })
                if (str1[3][10] == 1) {
                  mythis.setData({
                    ['seat[3][3]']: '有插座'
                  })
                } else {
                  mythis.setData({
                    ['seat[3][3]']: '无插座'
                  })
                }

              }
            })

          if (mythis.data.len > 4)
            wx.request({
              url: 'https://zekaio.cn/library/v1/msg/messageExtraInfo?seat_id=' + str[4],
              method: 'GET',
              success: function (res) {
                var temp2
                var char = res.data.data[0].seat_id.charAt(0) + res.data.data[0].seat_id.charAt(1)
                if (char == '31') {
                  temp2 = '自然科学'
                } else if (char == '32') {
                  temp2 = '工业技术'
                } else if (char == '41') {
                  temp2 = '法律经济'
                } else if (char == '42') {
                  temp2 = '社会科学综合书库'
                } else if (char == '42') {
                  temp2 = '社会科学'
                } else if (char == '43') {
                  temp2 = '文学艺术历史'
                } else if (char == '51') {
                  temp2 = '社会科学'
                } else if (char == '52') {
                  temp2 = '自然科学'
                } else if (char == '53') {
                  temp2 = '过刊'
                } else if (char == '61') {
                  temp2 = '西文学位'
                } else if (char == '62') {
                  temp2 = '医学'
                }
                var stringinfo = JSON.stringify(res.data.data[0])
                var str1 = stringinfo.split(',')
                mythis.setData({
                  ['seat[4][0]']: str1[0][12] + 'F ' + temp2
                })
                if (str1[2][12] == 1) {
                  mythis.setData({
                    ['seat[4][1]']: '靠窗'
                  })
                } else {
                  mythis.setData({
                    ['seat[4][1]']: '不靠窗'
                  })
                }
                mythis.setData({
                  ['seat[4][2]']: str1[0][16] + str1[0][17]
                })
                if (str1[3][10] == 1) {
                  mythis.setData({
                    ['seat[4][3]']: '有插座'
                  })
                } else {
                  mythis.setData({
                    ['seat[4][3]']: '无插座'
                  })
                }
              }
            })

        }
      })
    })


    // wx.request({
    //   url: encodeURI('https://zekaio.cn/library/v1/msg/addcollection?unionid=002005&seat_list=310007'),
    //   method: 'POST',
    //   header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   success:function(res){
    //     console.log(res.data)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.onLoad()
  },

  // 外面的弹窗
  btn: function (e) {
    this.setData({
      showModal: true,
      sto_time: this.data.time,
      id: e.currentTarget.dataset.index,
    })
    console.log(this.data.id)
    console.log('存储')
    console.log(this.data.sto_time)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad(),
      this.display()

  },

  display: function () {
    var that = this
    var show = that.data.show
    for (let i = 0, lenI = that.data.time.length; i < lenI; ++i) {
      if (that.data.time[i] == '-1') {
        that.setData({
          show: that.data.show + '8:00-12:00'
        })
      }
      if (that.data.time[i] == '0') {
        that.setData({
          show: show + '12:00-18:00'
        })
      }
      if (that.data.time[i] == '1') {
        that.setData({
          show: show + '18:00-22:00'
        })
      }
    }
  },
  // 禁止屏幕滚动
  preventTouchMove: function () {},

  // 弹出层里面的弹窗
  ok: function (e) {
    this.setData({
      showModal: false,
      items: this.data.items1
    })
    console.log('确认后')
    // console.log(this.data.time[0])
    console.log(this.data.time)

    this.setData({
      leng: this.data.time.length,
      // message_first:this.data.post_message,
    })

    var mydata = this.data
    var mythis = this
    // var id = e.currentTarget.dataset.index

    var temp1 = mythis.data.data_[mythis.data.id]
    var uid = mydata.union_id


    // console.log()
    //通过if判断预约座位是否成功
    if (this.data.time.length == 1) {
      wx.request({
        url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&time_slot=' + this.data.time[0]),
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('预约一')
          // console.log( res)
          if(res.data[0].msg=='failure'){
          var str = res.data[0].data.message
        }else if(res.data[0].msg=='success')
        {
          var str='预约成功'
        }
        mythis.setData({
          ['post_message[0]']: '预约一: ' + str
        })
          console.log(mythis.data.post_message[0])
          mythis.setData({
            msg1:mythis.data.post_message[0]
          })
          console.log(mythis.data.msg1)
          mythis.dis()

        }
      })
    }

    if (this.data.time.length == 2) {
      wx.request({
        url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&time_slot=' + this.data.time[0]),
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('预约一')
          // console.log( res)
          if(res.data[0].msg=='failure'){
          var str = res.data[0].data.message
        }else if(res.data[0].msg=='success')
        {
          var str='预约成功'
        }
        mythis.setData({
          ['post_message[0]']: '预约一: ' + str
        })
          console.log(mythis.data.post_message[0])
          mythis.setData({
            msg1:mythis.data.post_message[0]
          })
          console.log(mythis.data.msg1)
        }
      })
      wx.request({
        url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&time_slot=' + this.data.time[1]),
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('预约二')
          // console.log(res)
          if(res.data[0].msg=='failure'){
            var str = res.data[0].data.message
          }else if(res.data[0].msg=='success')
          {
            var str='预约成功'
          }
          mythis.setData({
            ['post_message[1]']: '预约二: ' + str
          })
          console.log(mythis.data.post_message[1])
          mythis.setData({
            msg2:mythis.data.post_message[1]
          })
          mythis.dis()
        }
      })
    }

    if (this.data.time.length ==3) {
      wx.request({
        url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&time_slot=' + this.data.time[0]),
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('预约一')
          // console.log( res)
          if(res.data[0].msg=='failure'){
          var str = res.data[0].data.message
        }else if(res.data[0].msg=='success')
        {
          var str='预约成功'
        }
        mythis.setData({
          ['post_message[0]']: '预约一: ' + str
        })
          console.log(mythis.data.post_message[0])
          mythis.setData({
            msg1:mythis.data.post_message[0]
          })
          console.log(mythis.data.msg1)

        }
      })
      wx.request({
        url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&time_slot=' + this.data.time[1]),
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('预约二')
          // console.log(res)
          if(res.data[0].msg=='failure'){
            var str = res.data[0].data.message
          }else if(res.data[0].msg=='success')
          {
            var str='预约成功'
          }
          mythis.setData({
            ['post_message[1]']: '预约二: ' + str
          })
          console.log(mythis.data.post_message[1])
          mythis.setData({
            msg2:mythis.data.post_message[1]
          })
        }
      })
      wx.request({
        url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&time_slot=' + this.data.time[2]),
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log('预约三')
          // console.log(res)
          if(res.data[0].msg=='failure'){
            var str = res.data[0].data.message
          }else if(res.data[0].msg=='success')
          {
            var str='预约成功'
          }
          mythis.setData({
            ['post_message[2]']: '预约三: ' + str
          })
          console.log(mythis.data.post_message[2])
          mythis.setData({
            msg3:mythis.data.post_message[2]
          })
         mythis.out_dis()
        },
      })

    }
  },

  out_dis(){
    var that=this
    setTimeout(function(){
      that.dis()
    },800)
  },
  dis: function () {

    var that = this

    wx.showModal({
      showCancel: false,
      title: '预约信息',
      content: ' '+that.data.msg1+'\r\n '+that.data.msg2+'\r\n '+that.data.msg3,

      success: function (res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '../appointment/appointment',
          })
        }
      }
    })


  },



  cancel_01: function () {
    this.setData({
      showModal: false,
      time: this.data.sto_time
    })
    // console.log('取消')
    // console.log(this.data.time)
  },

  checkboxChange(e) {
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    // console.log(e)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }
    this.setData({
      items1: items,
      time: e.detail.value,
    })
  },




  cancel: function (e) {
    // 先进行删除收藏，再查询收藏列表
    var mydata = this.data


    var mythis = this
    var mydata = this.data
    wx.showModal({
      showCancel: true,
      title: '取消收藏',
      content: '确定取消收藏吗？',
      success: function (res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.index
          var temp = mydata.seat
          wx.request({
            url: encodeURI('https://zekaio.cn/library/v1/msg/deletecollection?unionid=' + mydata.union_id + '&seat_list=' + mydata.data_[id]),
            method: 'POST',
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              console.log(res.data)
            }
          })
          mythis.setData({
            len: mydata.len - 1
          })


          for (var i = id; i < 4; i++) {
            temp[i] = temp[i + 1]
          }
          mythis.setData({
            seat: temp
          })
        }
      }
    })
  },

  // reservations: function (e) {

  //   var mydata = this.data
  //   var mythis = this
  //   var id = e.currentTarget.dataset.index
  //   var temp1 = this.data.data_[id]
  //   var char = temp1.charAt(0) + temp1.charAt(1)
  //   var temp2
  //   if (char == '31') {
  //     temp2 = '自然科学综合书库'
  //   } else if (char == '32') {
  //     temp2 = '工业技术专业书库'
  //   } else if (char == '41') {
  //     temp2 = '法律、经济专业书库'
  //   } else if (char == '42') {
  //     temp2 = '社会科学综合书库'
  //   } else if (char == '42') {
  //     temp2 = '社会科学综合书库'
  //   } else if (char == '43') {
  //     temp2 = '文学、艺术、历史专业书库'
  //   } else if (char == '51') {
  //     temp2 = '社会科学阅览室'
  //   } else if (char == '52') {
  //     temp2 = '自然科学阅览室'
  //   } else if (char == '53') {
  //     temp2 = '过刊阅览室'
  //   } else if (char == '61') {
  //     temp2 = '西文及学位论文库'
  //   } else if (char == '62') {
  //     temp2 = '医学书库'
  //   }
  //   var temp3 = this.data.seat[id][1]
  //   if (temp3 == "靠窗") {
  //     temp3 = 1
  //   } else {
  //     temp3 = 0
  //   }
  //   var temp4 = this.data.seat[id][3]
  //   if (temp4 == "有插座") {
  //     temp4 = 1
  //   } else {
  //     temp4 = 0
  //   }
  //   var myDate = new Date();
  //   var temp5 = myDate.getHours();
  //   var temp6 = "" + myDate.getFullYear() + "." + (1 + myDate.getMonth()) + "." + myDate.getDate()
  //   if (temp5 < 12) {
  //     temp5 = -1
  //   } else if (temp5 >= 12 && temp5 < 18) {
  //     temp5 = 0
  //   } else if (temp5 >= 18 && temp5 < 22) {
  //     temp5 = 1
  //   } else {
  //     temp5 = -1
  //     temp6 = "" + myDate.getFullYear() + "." + (1 + myDate.getMonth()) + "." + (myDate.getDate() + 1)
  //   }

  //   console.log(temp6)
  //   var uid = mydata.union_id


  //   wx.request({
  //     url: encodeURI('https://zekaio.cn/library/v1/seat/request?unionid=' + uid + '&seat_id=' + temp1 + '&area_name=' + temp2 + '&is_window=' + temp3 + '&is_plug=' + temp4 + '&time_slot=' + temp5),
  //     method: 'POST',
  //     header: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     success: function (res) {
  //       var str = res.data[0].data.message
  //       mythis.setData({
  //         message: str
  //       })


  //       if (mydata.message == '当前时间段已预定过座位') {
  //         wx.showModal({
  //           showCancel: false,
  //           title: '预约座位',
  //           content: '当前时间段已预定过座位'
  //         })
  //       } else if (mydata.message == '没有符合要求的座位') {
  //         wx.showModal({
  //           showCancel: false,
  //           title: '预约座位',
  //           content: '没有符合要求的座位'
  //         })
  //       } else {
  //         console.log(mydata.message)
  //         wx.showModal({
  //           showCancel: true,
  //           title: '预约座位',
  //           content: '是否预约该座位',
  //           success: function (res) {
  //             if (res.confirm) {

  //               wx.showModal({
  //                 showCancel: false,
  //                 title: '预约成功',
  //                 content: '您已经成功预约',
  //                 success: function (res) {
  //                   if (res.confirm) {
  //                     wx.navigateTo({
  //                       url: '../appointment/appointment',
  //                       // success: function(res) {

  //                       //   //通过eventChannel向B页面发送数据。
  //                       //   var id = e.currentTarget.dataset.index
  //                       //   res.eventChannel.emit('acceptDataFromA', {seat_id: mydata.data_[id],is_window:mydata.seat[id][1],is_plug:mydata.seat[id][3],time_slot:temp5,date:temp6}
  //                       //   )

  //                       //   }
  //                     })




  //                   }


  //                 }
  //               })
  //             }
  //           }


  //         })

  //       }
  //     }
  //   })

  // }

})