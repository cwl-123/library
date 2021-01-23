package com.library.library.service.impl;

import com.library.library.VO.Result;
import com.library.library.dao.MessageDao;
import com.library.library.dao.SeatDao;
import com.library.library.dao.UserDao;
import com.library.library.service.MessageService;
import com.library.library.pojo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.Message;
import org.springframework.stereotype.Service;
//import com.fasterxml.jackson.*;
import com.library.library.*;
import java.util.HashMap;
import java.util.Map;
import java.sql.Array;
import java.sql.ResultSet;
import  java.util.*;

@Service("MessageService")
public class MessageServiceImpl implements MessageService {


    @Autowired
    private MessageDao messageDao;

    @Autowired
    private SeatDao seatDao;

    @Autowired
    private UserDao userDao;

    @Override//**
    public Result getMsgList(String unionid) {
        List<com.library.library.pojo.Message> messageSeatList=messageDao.getMessageLst(unionid);
        /*List<MessageContent>messageContentList=new ArrayList<>();
        for(String messageId:messageSeatList)
        {
            Object a=messageDao.getMessageContentDto(messageId);
            MessageContentDto mcd;
            //MessageContent msc=new MessageContent(messageId,mcd);
        }*/
        //System.out.println(messageContentList);
        return Result.OK().data(messageSeatList).build();
    }

    @Override
    public void changeMsgStatus(String msg_id,int status){};

    @Override
    public Result getMsgExtraInfo(String seat_id) {

        List<SeatExtra>messageExtra=messageDao.getExMsg(seat_id);
        return Result.OK().data(messageExtra).build();
        //return null;
    }

    @Override
    public Result cancle(String seat_id,String unionid,int time_slot)
    {
        messageDao.cancle(seat_id,unionid,time_slot);
        return Result.OK().build();
    }

    @Override//*
    public Result checkCollection(String unionid)
    {
        String collectionList=messageDao.checkCollection(unionid);
        return Result.OK().data(collectionList).build();
        //return null;
    }

    @Override
    public Result addCollection(String unionid,String seat_list)
    {
        String tmp=(messageDao.checkCollection(unionid)==null?"":messageDao.checkCollection(unionid));

        if(tmp==null) {
            messageDao.addCollection(unionid,seat_list);
            return Result.OK().build();
        }
        String[]tmp3=tmp.split(",");
        boolean flag=false;
        for(int i=0;i<tmp3.length;i++)
            if(true)
            {
                boolean flag2=true;
                if(seat_list.length()!=tmp3[i].length())continue;
                for(int j=0;j<seat_list.length();j++)
                    if(seat_list.charAt(j)!=tmp3[i].charAt(j))
                        flag2=false;
                flag|=flag2;
            };
        if(flag==false)
        {
            if(tmp.length()!=0)tmp=tmp+","+seat_list;
            else tmp=seat_list;
        }
        messageDao.deleteCollection(unionid,seat_list);
        messageDao.addCollection(unionid,tmp);
        return Result.OK().build();
    }

    @Override
    public Result addOcu(String seat_id,String area_name,int is_window,int is_plug)
    {
        messageDao.addOcu(seat_id,area_name,is_window,is_plug);
        return Result.OK().build();
    }

    @Override
    public Result deleteCollection(String unionid,String seat_list)
    {
        String tmp=messageDao.checkCollection(unionid);
        if(tmp==null||tmp.length()==0)
        {
            return Result.OK().build();
        }
        String[]tmp3=tmp.split(",");
        String tmp4="";
        for(int i=0;i<tmp3.length;i++)
            if(true)
            {
                boolean flag=true;

                for(int j=0;j<seat_list.length();j++)
                    if(tmp3[i].charAt(j)!=seat_list.charAt(j))
                        flag=false;
                    if(flag==true)continue;
                if(tmp4.length()==0)
                tmp4=tmp4+tmp3[i];
                else tmp4=tmp4+","+tmp3[i];
            };
        messageDao.deleteCollection(unionid,seat_list);
        if(tmp4.length()!=0)
        messageDao.addCollection(unionid,tmp4);
        System.out.println(unionid);
        return Result.OK().build();
    }
    @Override
    public Result del()
    {
        messageDao.del();
        return Result.OK().build();
    }

}
