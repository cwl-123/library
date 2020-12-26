package com.library.library.controller;

import com.library.library.VO.Result;
import com.library.library.pojo.User;
import com.library.library.service.SeatService;
import com.library.library.service.UserService;
import org.apache.ibatis.annotations.Param;
import org.apache.logging.log4j.message.ReusableMessage;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@Validated
@RequestMapping("/v1/usr")
public class UserController  {
    @Autowired
    private UserService userService;

    @GetMapping("/getunionid")
    @ResponseBody
    public Result getunionid(@RequestParam("mp_openid")String mp_openid)
    {
        return userService.getUIdByMpOpenId(mp_openid);
    }

    @GetMapping("/getmessage")
    @ResponseBody
    public Result getmessage(@RequestParam("unionid")String unionid)
    {
        return userService.getUserMsg(unionid);
    }

    @PostMapping("/postsign")
    @ResponseBody
    public Result postsign(@RequestParam("sign") String sign , @RequestParam("unionid") String unionid)
    {
        return userService.postUsrSign(sign,unionid);
    }

    @PostMapping("/postmessage")
    @ResponseBody
    public Result postmessage(@RequestParam("unionid") String unionid,@RequestParam("mp_openid") String mp_openid,
                              @RequestParam("nickname") String nickname,@RequestParam("avatar") String avatar,@RequestParam("sign") String sign)
    {
        return userService.postUsrMessage(unionid,mp_openid,nickname,avatar,sign);
    }
//    @Autowired
//    private BaseController baseController;

//模仿MessageController，自己写其他接口，函数命名仿照上面的来
}