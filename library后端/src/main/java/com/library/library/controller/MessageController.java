package com.library.library.controller;

import com.library.library.VO.Result;
import com.library.library.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@Validated
@RequestMapping("/v1/msg")
public class MessageController {
    @Autowired
    public MessageService messageService;

    public MessageController()
    {

    }

//    @Autowired
//    private BaseController baseController;

    //M1：获取预约信息列表 getList
   // @PassToken
    @GetMapping("/messageList")
    @ResponseBody
    public Result getMessageList(@RequestParam("unionid")String unionid)
    {
        return messageService.getMsgList(unionid);
    }

    //M2.获取消息更多信息（可扩充）
   // @UserLoginToken
    @GetMapping("/messageExtraInfo")
    @ResponseBody
    public Result getMessageExtraInfo(@RequestParam("seat_id") String seat_id)
    {
        return messageService.getMsgExtraInfo(seat_id);
    }
    //M3.取消预约
    @DeleteMapping("/cancle")
    @ResponseBody
    public Result cancle(@RequestParam("seat_id")String seat_id,
                @RequestParam("unionid")String unionid,
                @RequestParam("time_slot")int time_slot)
    {
        return messageService.cancle(seat_id,unionid,time_slot);
    }
    //M4:查看用户收藏列表
    @GetMapping("/collection")
    @ResponseBody
    public Result checkCollection(@RequestParam("unionid")String unionid)
    {
        return messageService.checkCollection(unionid);
    }
    //M5:添加收藏
    @PostMapping("/addcollection")
    @ResponseBody
    public Result addCollection(@RequestParam("unionid")String unionid,
                                @RequestParam("seat_list")String seat_list)
    {

        return messageService.addCollection(unionid,seat_list);
    }
    @PostMapping("/addocu")
    @ResponseBody
    public Result addOcu(@RequestParam("seat_id")String seat_id,
                         @RequestParam("area_name")String area_name,
                         @RequestParam("is_window")int is_window,
                         @RequestParam("is_plug")int is_plug)
    {
        return messageService.addOcu(seat_id,area_name,is_window,is_plug);
    }
    //M6:取消收藏
    @PostMapping("/deletecollection")
    @ResponseBody
    public Result deleteCollection(@RequestParam("unionid")String unionid,
                                   @RequestParam("seat_list")String seat_list)
    {
        return messageService.deleteCollection(unionid,seat_list);
    }


    @PostMapping("/clean")
    @ResponseBody
    public Result del()
    {
        return messageService.del();
    }


//接下去自己写其他接口，函数命名仿照上面的来
}