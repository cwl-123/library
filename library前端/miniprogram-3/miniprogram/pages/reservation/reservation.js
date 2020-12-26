var app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    test:'',
    min: '',
    seat_num: '',
    num_t:'',
    seat_num1: 0,
    seat_num2: 0,
    seat_num3: 0,
    floorseat: '',
    floorseat1: '',
    floorseat2: '',
    floorseat3: '',
    unionid: "",
    msg: '',
    msg1: '',
    msg2: '',
    msg3: '',
    message: '',
    message1: '',
    message2: '',
    message3: '',
    items: [{
        value: '-1',
        name: '8:00-12:00',
        checked:'true'
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
    time: ['-1','0','1'],
    sto_time: ['-1','0','1'],
    display: 0,
    timeshow1: "8:00-12:00",
    timeshow2: "12:00-18:00",
    timeshow3: "18:00-22:00",

    floor_chooseshow: ['请选择预约区域：', '3F 自然综合科学书库', '3F 工业技术专业书库', '4F 法律、经济专业书库', '4F 社会科学综合书库', '4F 文学、艺术、历史专业书库', '5F 社会科学阅览室', '5F 自然科学阅览室', '5F 过刊阅览室', '6F 西文及学位论文库', '6F 医学书库', ],
    floor_data: [{
        id: '0',
        show: '请选择预约区域',
        info: '%'
      },
      {
        id: '1',
        show: '3F 自然科学综合书库',
        info: '0'
      },
      {
        id: '2',
        show: '3F 工业技术专业书库',
        info: '1'
      },
      {
        id: '3',
        show: '4F 法律、经济专业书库',
        info: '2'
      },
      {
        id: '4',
        show: '4F 社会科学综合书库',
        info: '3'
      },
      {
        id: '5',
        show: '4F 文学、艺术、历史专业书库',
        info: '4'
      },
      {
        id: '6',
        show: '5F 社会科学阅览室',
        info: '5'
      },
      {
        id: '7',
        show: '5F 自然科学阅览室',
        info: '6'
      },
      {
        id: '8',
        show: '5F 过刊阅览室',
        info: '7'
      },
      {
        id: '9',
        show: '6F 西文及学位论文库',
        info: '8'
      },
      {
        id: '10',
        show: '6F 医学书库',
        info: '9'
      },
    ],
    floor_index: 0,

    plug_chooseshow: ['是否需要插座：', '是', '否'],
    plug_data: [{
        id: '0',
        show: '是否需要插座：',
        info: '%'
      },
      {
        id: '1',
        show: '是',
        info: 0
      },
      {
        id: '2',
        show: '否',
        info: 1
      },
    ],
    plug_index: 0,

    window_chooseshow: ['是否需要靠窗：', '是', '否'],
    window_data: [{
        id: '0',
        show: '是否需要靠窗：',
        info: '%'
      },
      {
        id: '1',
        show: '是',
        info: 1
      },
      {
        id: '2',
        show: '否',
        info: 0
      },
    ],
    window_index: 0,
  },

  onShow: function () {
    this.maketime()
    this.getfloordata()
    this.getupdata()
    var to=this.data.seat_num1 + this.data.seat_num2 + this.data.seat_num3
    this.setData({
      num_t:to
    })
  },

  maketime:function(){
    var TIME=util.judgeTime(new Date());
    this.setData({
      test:TIME
    })
    if(TIME=='-1'){}
    else if(TIME=='0'){
      this.setData({
        items: [{
          value: '-1',
          name: '8:00-12:00',
          checked: ''
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
      items1: [{
          value: '-1',
          name: '8:00-12:00',
          checked: ''
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
      time: ['0', '1'],
      sto_time: ['0', '1'],
      timeshow1: "",
      })
    }else if(TIME='1'){
      this.setData({
        items: [{
          value: '-1',
          name: '8:00-12:00',
          checked: ''
        },
        {
          value: '0',
          name: '12:00-18:00',
          checked: ''
        },
        {
          value: '1',
          name: '18:00-22:00',
          checked: 'true'
        }
      ],
      items1: [{
          value: '-1',
          name: '8:00-12:00',
          checked: ''
        },
        {
          value: '0',
          name: '12:00-18:00',
          checked: ''
        },
        {
          value: '1',
          name: '18:00-22:00',
          checked: 'true'
        }
      ],
      time: ['1'],
      sto_time: ['1'],
      timeshow1: "",
      timeshow2: "",
      })
    }
  },

  selectClick: function () {
    this.setData({
      unionid: app.globalData.unionid,
    })
    this.getdata()
  },



  getdata: function () {
    var that = this;
    var len = this.data.time.length
    console.log(len)
    if (len == 1) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num1: that.data.seat_num
          })
          console.log('第一次获取')
          console.log(res.data)
          var to=that.data.seat_num1 + that.data.seat_num2 + that.data.seat_num3
          that.setData({
            num_t:to
          })
          that.tanc();
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    } else if (len == 2) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num1: that.data.seat_num
          })
          console.log('第一次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[1],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num2: that.data.seat_num
          })
          console.log('第二次获取')
          console.log(res.data)
          var to=that.data.seat_num1 + that.data.seat_num2 + that.data.seat_num3
          that.setData({
            num_t:to
          })
          that.tanc();
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    } else if (len == 3) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num1: that.data.seat_num
          })
          console.log('第一次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[1],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num2: that.data.seat_num
          })
          console.log('第二次获取')
          console.log(res.data)
          console.log(that.data.seat_num2)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[2],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num3: that.data.seat_num
          })
          console.log('第三次获取')
          console.log(res.data)
          var to=that.data.seat_num1 + that.data.seat_num2 + that.data.seat_num3
          that.setData({
            num_t:to
          })
          that.tanc();
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    }
  },

  getupdata: function () {
    var that = this;
    var len = this.data.time.length
    console.log(len)
    if (len == 1) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num1: that.data.seat_num
          })
          console.log('第一次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    } else if (len == 2) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num1: that.data.seat_num
          })
          console.log('第一次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[1],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num2: that.data.seat_num
          })
          console.log('第二次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    } else if (len == 3) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num1: that.data.seat_num
          })
          console.log('第一次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[1],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num2: that.data.seat_num
          })
          console.log('第二次获取')
          console.log(res.data)
          console.log(that.data.seat_num2)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[2],
        method: "GET",
        success: function (res) {
          that.setData({
            seat_num: res.data.data.num,
          })
          that.setData({
            seat_num3: that.data.seat_num
          })
          console.log('第三次获取')
          console.log(res.data)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    }
  },


  tanc: function () {
    if (this.data.num_t == 0) {
      wx.showModal({
        title: '提示',
        content: '满足您要求的座位还有：0个\r\n请重新选择条件再试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('重新选择')
          }
        }
      })
    } else {
      this.rich()
    }
  },

  rich: function (e) {
    var that = this
    var mydata = this.data
    var len = that.data.time.length
    if (len == 1) {
      wx.showModal({
        title: '座位余量显示',
        content: '该预约时段剩余座位数为：' + that.data.seat_num1,
        confirmText: '预约座位',
        success: function (res) {
          if (res.confirm) {
            that.postseat()
          } else {
            console.log('取消预约')
          }
        }
      })

    } else if (len == 2) {
      wx.showModal({
        title: '座位余量显示',
        content: '第一预约时段剩余座位数为：' + that.data.seat_num1 + '\r\n第二预约时段剩余座位数为：' + that.data.seat_num2,
        confirmText: '预约座位',
        success: function (res) {
          if (res.confirm) {
            that.postseat()
          } else {
            console.log('取消预约')
          }
        }
      })

    } else if (len == 3) {
      wx.showModal({
        title: '座位余量显示',
        content: '第一预约时段剩余座位数为：' + that.data.seat_num1 + '\r\n第二预约时段剩余座位数为：' + that.data.seat_num2 + '\r\n第三预约时段剩余座位数为：' + that.data.seat_num3,
        confirmText: '预约座位',
        success: function (res) {
          if (res.confirm) {
            that.postseat()
          } else {
            console.log('取消预约')
          }
        }
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '网络波动导致获取数据异常，请稍后重试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {} else {}
        }
      })

    }
  },

  postseat: function () {
    var that = this;
    var len = this.data.time.length
    console.log('这是时间的长度：' + len)
    if (len == 1) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/request?unionid=" + that.data.unionid + "&area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            msg1: res.data[0].msg,
          })
          if (that.data.msg1 == 'failure') {
            that.setData({
              message1: res.data[0].data.message
            })
            that.tanc_result()
          } else if (that.data.msg1 == 'success') {
            that.setData({
              message1: '预约成功'
            })
            that.tanc_result()
          } else {
            that.setData({
              message1: '未知错误'
            })
            that.tanc_result()
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    } else if (len == 2) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/request?unionid=" + that.data.unionid + "&area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            msg1: res.data[0].msg,
          })
          if (that.data.msg1 == 'failure') {
            that.setData({
              message1: res.data[0].data.message
            })
            that.tanc_result()
          } else if (that.data.msg1 == 'success') {
            that.setData({
              message1: '预约成功'
            })
            that.tanc_result()
          } else {
            that.setData({
              message1: '未知错误'
            })
            that.tanc_result()
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/request?unionid=" + that.data.unionid + "&area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[1],
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            msg2: res.data[0].msg,
          })
          if (that.data.msg2 == 'failure') {
            that.setData({
              message2: res.data[0].data.message
            })
            that.tanc_result()
          } else if (that.data.msg2 == 'success') {
            that.setData({
              message2: '预约成功'
            })
            that.tanc_result()
          } else {
            that.setData({
              message2: '未知错误'
            })
            that.tanc_result()
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    } else if (len == 3) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/request?unionid=" + that.data.unionid + "&area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[0],
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            msg1: res.data[0].msg,
          })
          if (that.data.msg1 == 'failure') {
            that.setData({
              message1: res.data[0].data.message
            })
          } else if (that.data.msg1 == 'success') {
            that.setData({
              message1: '预约成功'
            })
          } else {
            that.setData({
              message1: '未知错误'
            })
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/request?unionid=" + that.data.unionid + "&area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[1],
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            msg2: res.data[0].msg,
          })
          if (that.data.msg2 == 'failure') {
            that.setData({
              message2: res.data[0].data.message
            })
          } else if (that.data.msg2 == 'success') {
            that.setData({
              message2: '预约成功'
            })
          } else {
            that.setData({
              message2: '未知错误'
            })
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/request?unionid=" + that.data.unionid + "&area_name=" + that.data.floor_data[that.data.floor_index].info + "&is_window=" + that.data.window_data[that.data.window_index].info + "&is_plug=" + that.data.plug_data[that.data.plug_index].info + "&time_slot=" + that.data.time[2],
        method: 'POST',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          that.setData({
            msg3: res.data[0].msg,
          })
          if (that.data.msg3 == 'failure') {
            that.setData({
              message3: res.data[0].data.message
            })
          } else if (that.data.msg3 == 'success') {
            that.setData({
              message3: '预约成功'
            })
          } else {
            that.setData({
              message3: '未知错误'
            })
          }
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      that.out_tanc()
    }

  },

  out_tanc(){
    var that=this
    setTimeout(function(){
      that.tanc_result()
    },800)
  },

  tanc_result: function () {
    var that = this
    var len = that.data.time.length
    if (len == 1) {
      wx.showModal({
        title: '预约结果',
        content: '该预约时段：' + that.data.message1,
        showCancel: false,
        success(res) {
          wx.redirectTo({
            url: '../appointment/appointment',
          })
        }
      })

    } else if (len == 2) {
      wx.showModal({
        title: '预约结果',
        content: '第一预约时段：' + that.data.message1 + '\r\n第二预约时段：' + that.data.message2,
        showCancel: false,
        success(res) {
          wx.redirectTo({
            url: '../appointment/appointment',
          })
        }
      })

    } else if (len == 3) {
      wx.showModal({
        title: '预约结果',
        content: '第一预约时段：' + that.data.message1 + '\r\n第二预约时段：' + that.data.message2 + '\r\n第三预约时段：' + that.data.message3,
        showCancel: false,
        success(res) {
          wx.redirectTo({
            url: '../appointment/appointment',
          })
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '网络波动导致获取数据异常，请稍后重试',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {} else {}
        }
      })
    }
  },

  getfloordata: function () {
    var that = this;
    var len = this.data.time.length
    console.log(len)
    if (len == 1) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            floorseat: res.data.data.num,
          })
          that.setData({
            floorseat1: that.data.floorseat
          })
          console.log('楼层信息获取一')
          console.log(res.data)
          console.log(that.data.floorseat1)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器，楼层余量信息无法更新',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      that.setData({
        floorseat2: 'kong',
        floorseat3: 'kong'
      })

    } else if (len == 2) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            floorseat: res.data.data.num,
          })
          that.setData({
            floorseat1: that.data.floorseat
          })
          console.log('楼层信息获取一')
          console.log(res.data)
          console.log(that.data.floorseat1)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器，楼层余量信息无法更新',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&time_slot=" + that.data.time[1],
        method: "GET",
        success: function (res) {
          that.setData({
            floorseat: res.data.data.num,
          })
          that.setData({
            floorseat2: that.data.floorseat
          })
          console.log('楼层信息获取二')
          console.log(res.data)
          console.log(that.data.floorseat2)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器，楼层余量信息无法更新',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      that.setData({
        floorseat3: 'kong'
      })
    } else if (len == 3) {
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&time_slot=" + that.data.time[0],
        method: "GET",
        success: function (res) {
          that.setData({
            floorseat: res.data.data.num,
          })
          that.setData({
            floorseat1: that.data.floorseat
          })
          console.log('楼层信息获取一')
          console.log(res.data)
          console.log(that.data.floorseat1)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器，楼层余量信息无法更新',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&time_slot=" + that.data.time[1],
        method: "GET",
        success: function (res) {
          that.setData({
            floorseat: res.data.data.num,
          })
          that.setData({
            floorseat2: that.data.floorseat
          })
          console.log('楼层信息获取二')
          console.log(res.data)
          console.log(that.data.floorseat2)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器，楼层余量信息无法更新',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
      wx.request({
        url: "https://zekaio.cn/library/v1/seat/left?area_name=" + that.data.floor_data[that.data.floor_index].info + "&time_slot=" + that.data.time[2],
        method: "GET",
        success: function (res) {
          that.setData({
            floorseat: res.data.data.num,
          })
          that.setData({
            floorseat3: that.data.floorseat
          })
          console.log('楼层信息获取三')
          console.log(res.data)
          console.log(that.data.floorseat3)
        },
        fail: function (err) {
          wx.showToast({
            title: '无法连接到服务器，楼层余量信息无法更新',
            icon: 'none',
            duration: 2000
          })
        },
        complete: function () {}
      })
    }

  },


  bindPickerChange_floor: function (e) {
    var that = this
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      floor_index: e.detail.value,
      floor: e.detail.value
    })
    this.getfloordata()
    this.getupdata()

  },

  bindPickerChange_plug: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      plug_index: e.detail.value,
      plug: e.detail.value
    })
    this.getupdata()
  },

  bindPickerChange_window: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      window_index: e.detail.value,
      window: e.detail.value
    })
    this.getupdata()
  },

  btn: function () {
    this.setData({
      showModal: true,
      sto_time: this.data.time,
      display: 1
    })
    console.log('存储')
    console.log(this.data.sto_time)
    this.getupdata()
  },

  // 禁止屏幕滚动
  preventTouchMove: function () {},

  // 弹出层里面的弹窗
  ok: function () {
    this.getmin()
    var to=this.data.seat_num1 + this.data.seat_num2 + this.data.seat_num3
    this.setData({
      num_t:to
    })
    console.log(this.data.time)
    var TIME=util.judgeTime(new Date());
    if (this.data.time.length == 0) {
      wx.showToast({
        title: '请选择预约时间！',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.min < TIME) {
      wx.showToast({
        title: '请选择正确的预约时间！\r\n预约时段不应在当前时间之前！',
        icon: 'none',
        duration: 3500
      })
    } else {
      var len = this.data.time.length
      this.setData({
        showModal: false,
        items: this.data.items1
      })

      if (len == '1') {
        console.log('长度为1')
        console.log(this.data.time[0])
        if (this.data.time[0] == '-1') {
          this.setData({
            timeshow1: "8:00-12:00"
          })
          console.log('-1时间段' + this.data.timeshow1)
        } else if (this.data.time[0] == '0') {
          this.setData({
            timeshow1: "12:00-18:00"
          })
          console.log('0时间段' + this.data.timeshow1)
        } else if (this.data.time[0] == '1') {
          this.setData({
            timeshow1: "18:00-22:00"
          })
          console.log('1时间段' + this.data.timeshow1)
        }
        console.log('0判断')
        this.setData({
          timeshow2: ''
        })
        this.setData({
          timeshow3: ''
        })


      } else if (len == '2') {
        if (this.data.time[0] == '-1') {
          this.setData({
            timeshow1: "8:00-12:00"
          })
          console.log('-1时间段' + this.data.timeshow1)
        } else if (this.data.time[0] == '0') {
          this.setData({
            timeshow1: "12:00-18:00"
          })
          console.log('0时间段' + this.data.timeshow1)
        } else if (this.data.time[0] == '1') {
          this.setData({
            timeshow1: "18:00-22:00"
          })
          console.log('1时间段' + this.data.timeshow1)
        }
        if (this.data.time[1] == '-1') {
          this.setData({
            timeshow2: "8:00-12:00"
          })
          console.log('-1时间段' + this.data.timeshow2)
        } else if (this.data.time[1] == '0') {
          this.setData({
            timeshow2: "12:00-18:00"
          })
          console.log('0时间段' + this.data.timeshow2)
        } else if (this.data.time[1] == '1') {
          this.setData({
            timeshow2: "18:00-22:00"
          })
          console.log('1时间段' + this.data.timeshow2)
        }

        this.setData({
          timeshow3: ''
        })

      } else if (len == '3') {
        if (this.data.time[0] == '-1') {
          this.setData({
            timeshow1: "8:00-12:00"
          })
          console.log('-1时间段' + this.data.timeshow1)
        } else if (this.data.time[0] == '0') {
          this.setData({
            timeshow1: "12:00-18:00"
          })
          console.log('0时间段' + this.data.timeshow1)
        } else if (this.data.time[0] == '1') {
          this.setData({
            timeshow1: "18:00-22:00"
          })
          console.log('1时间段' + this.data.timeshow1)
        }

        if (this.data.time[1] == '-1') {
          this.setData({
            timeshow2: "8:00-12:00"
          })
          console.log('-1时间段' + this.data.timeshow2)
        } else if (this.data.time[1] == '0') {
          this.setData({
            timeshow2: "12:00-18:00"
          })
          console.log('0时间段' + this.data.timeshow2)
        } else if (this.data.time[1] == '1') {
          this.setData({
            timeshow2: "18:00-22:00"
          })
          console.log('1时间段' + this.data.timeshow2)
        }

        if (this.data.time[2] == '-1') {
          this.setData({
            timeshow3: "8:00-12:00"
          })
          console.log('-1时间段' + this.data.timeshow3)
        } else if (this.data.time[2] == '0') {
          this.setData({
            timeshow3: "12:00-18:00"
          })
          console.log('0时间段' + this.data.timeshow3)
        } else if (this.data.time[2] == '1') {
          this.setData({
            timeshow3: "18:00-22:00"
          })
          console.log('1时间段' + this.data.timeshow3)
        }

      }

      this.getfloordata()
    }
    console.log('确认后')
    console.log(this.data.time)
    this.getupdata()
  },




  cancel: function () {
    var to=this.data.seat_num1 + this.data.seat_num2 + this.data.seat_num3
    this.setData({
      showModal: false,
      time: this.data.sto_time,
      num_t:to
    })
    console.log('取消')
    console.log(this.data.time)
    this.getupdata()
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
      time: e.detail.value
    })
  },

  getmin: function () {
    var len = this.data.time.length
    if (len == '1') {
      this.setData({
        min: this.data.time[0]
      })
    } else if (len == '2') {
      if (this.data.time[0] < this.data.time[1]) {
        this.setData({
          min: this.data.time[0]
        })
      } else {
        this.setData({
          min: this.data.time[1]
        })
      }
    } else {
      if (this.data.time[0] < this.data.time[1]) {
        if (this.data.time[0] < this.data.time[2]) {
          this.setData({
            min: this.data.time[0]
          })
        } else {
          this.setData({
            min: this.data.time[2]
          })
        }
      } else {
        if (this.data.time[1] < this.data.time[2]) {
          this.setData({
            min: this.data.time[1]
          })
        } else {
          this.setData({
            min: this.data.time[2]
          })
        }
      }
    }
    console.log('最小值为：'+this.data.min)
  }





}) //page end