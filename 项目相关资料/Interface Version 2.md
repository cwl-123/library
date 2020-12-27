# Interface *Version 2*
[TOC]
## U. 用户部分

### U1. 获取用户unionid

```http
GET /v1/usr/getunionid?mp_openid={mp_openid}
```

Response Body

```json
{
    "status": 200,
    "msg": "success",
    "data": "unionid"
}
```

### U2. 请求用户信息（昵称和头像和个性签名）

```http
GET /v1/usr/getmessage?unionid={unionid}
```

Response Body

```json
{
    "status": 200,
    "msg": "success",
    "data": {
        "unionid":"",
        "mp_openid":"",
        "nickname":"",
        "avatar":"",
        "sign":""
    }
}
```

### U3.上传个性签名

```http
POST /v1/usr/postsign?sign={sign}&unionid={unionid}
```

Response Body

```json
{
	"status": 200,
	"msg": "success",
	"data": null
}
```

### U4.上传用户信息

```http
POST /v1/usr/postmessage?unionid={unionid}&mp_openid={mp_openid}&nickname={nickname}&sign={sign}&avartar={avatar}
```

Response Body

```json
{
    "status": 200,
    "msg": "success",
    "data": null
}
```

  ## S.座位部分

  ### S1.获取座位余量 

  ```http
  GET /v1/seat/left？seat_id={seat_id}&area_name={area_name}&is_window={is_window}&is_plug={is_plug}&time_slot={time_slot}
  ```

  Response Body

  ```json
  {
      "status": 200,
      "msg": "success",
      "data": {
          num : int
          time_slot : int
      }
  }
  ```

  参数类型

```
seat_id   : String  可空
area_name : String	可空
is_window : int 取值0/1	可空
is_plug   : int 取值0/1	可空
time_slot : int 取值-1/0/1 不可空
```

 逻辑概述

```
服务这些功能：
	首页总余量，只传time_slot
	筛选时余量，传筛选的，如果time_slot多选传多个
```



  ### S2.上传座位申请 

  ```http
  POST /v1/seat/request？unionid={unionid}&seat_id={seat_id}&area_name={area_name}&is_window={is_window}&is_plug={is_plug}&time_slot={time_slot}
  ```

  Response Body 是一个 json 数组

​	成功

  ```json
  {
      "status": 200,
      "msg": "success",
      "data": {
      "seat_id":"",
      "time_slot":int,
      }
  }
  ```

​	已预定过

```
  {
      "status": 400,
      "msg": "failure",
      "data": {
      	"time_slot":int,
      	“message”:"当前时间段已预定过座位",
      }
  }
```

​	余量不足

```
  {
      "status": 400,
      "msg": "failure",
      "data": {
      	"time_slot":int,
      	“message”:"没有符合要求的座位",
      }
  }
```

  参数说明

```
unionid : String, 用来在occupy表中查询他请求的time_slot他是不是已经占用了, 非空
seat_id  : String, 用于收藏功能的指定预约，可空，空的时候是主页的两个搜索
area_name: String, 同上一个接口，可空
is_window : int 取值0/1	可空
is_plug   : int 取值0/1	可空
time_slot : int[] 取值-1/0/1	非空
```

 逻辑概述

```
这个接口对应的是三个核心功能：一键预约、筛选预约和指定预约。

无论哪种预约，都要传unionid和time_slot,用于在occupy表中查询用户是不是已经预约过了，已经预约过的时间段则结果为failure，没有预约的接着考虑。

之后，都要调用内部的getLeft函数判断想要的座位有无余量，若没有余量则结果为failure。

接下来是具体的逻辑：

一键预约：前端传过来union_id，当前time_slot，查余量，数据库里查时间段内没被占用的且符合条件的seat_id、area_name、is_window、is_plug(这么写主要是为了表示sql的逻辑，所以读起来比较怪)，取第一个。

筛选预约：前端传过来union_id，time_slot列表，area_name、is_window、is_plug（seat_id必然是空的，其他可空的为空，就代表任意，sql的逻辑和上面一样。

指定预约：前端传过来union_id，time_slot列表，seat_id，其他那些属性为空也就是不传，sql逻辑和上面一样。

之后把结果打包到一个数组里面返回。
```

  ### S3.查询座位被占用的时间段

  ```http
  GET /v1/seat/occupy?seat_id={seat_id}
  ```

  Response Body

  ```json
  {
  	"status": 200,
  	"msg": "success",
  	"data": {
  		"seat_id":"",
        "time_slot":[]
  	}
  }

 用于收藏功能
  ```

  ### S4.签到成功

  ```http
  POST /v1/seat/confirm？unionid={unionid}&seat_id={seat_id}&time_slot={time_slot}
  ```

  Response Body

  ```
  {
      "status": 200,
      "msg": "success",
      "data": ""
  }
  ```

 参数类型

```
uniodid 同上
seat_id 同上
time_slot 这里是一个值 int -1/0/1 因为每次只能签一次到
```

 逻辑概述

```
先拿union_id，seat_id和time_slot到occupy表里面查询有没有这条记录，没有则返回"当前时间段您没有预约此座位“，若有这条记录就把confirm属性变为1。
其实有重复签到的攻击可能，但是考虑到他打开扫一扫再识别再发送没有那么高频，服务器应该没问题，因为照这么说地话，不停地点预约也可以攻击服务器，前端可以考虑做一个重复点击多次不让点的功能。
```

## M.新版消息部分(删除收藏和添加收藏的注解改了)

### M1.获取预约信息列表 getList

```http
GET /v1/msg/messageList？unionid={unionid}
```

Response Body

```json
{
    "status": 200,
    "msg": "success",
    "data": {
        "unionid":"",
        "seat_id":"",
        "time_slot":num,
        "if_confirm":num
    }
}
```

### M2.获取消息更多信息（可扩充）

```http
GET /v1/msg/messageExtraInfo？seat_id={seat_id}
```

Response Body

```json
{
	"status": 200,
	"msg": "success",
	"data": {
		"seat_id":"",
		"area_name":"",
		"seat_type":num,
		"if_window":num,
		"if_plug":num,
		...
	}

}
```

### M3.取消预约

```http
DELETE /v1/msg/cancle？seat_id={seat_id}&unionid={unionid}&time_slot={time_slot}
//（删除占座表里的一条记录）
```

Response Body

```json
{
	"status": 200,
	"msg": "success",
	"data": null
}
```



### M4.查询用户收藏列表

```http
GET /v1/msg/collection？unionid={unionid}
```

Response Body

```json
{
	"status": 200,
	"msg": "success",
	"data":[string,string] //由string转化而来
}
```



### M5.添加收藏（为了和数据库保持一致，seat_id改为seat_list

```http
POST /v1/msg/addcollection？unionid={unionid}&seat_list={seat_list}
```

Response Body

```json
{
	"status": 200,
	"msg": "success",
	"data": null
}
```



### M6.删除收藏



```http
POST /v1/msg/deletecollection？unionid={unionid}&unionid={unionid}&seat_list={seat_list}
```

Response Body

```json
{
	"status": 200,
	"msg": "success",
	"data": null
}

```



## E.其他

其他预计可能增添功能：（后期再根据需求设计）

2.删除数据库

5.座位匹配算法(已经写在分配座位接口的逻辑里)

6.联系我们（是否需要更改数据库）

