package com.library.library.service;

import com.library.library.VO.Result;
//import com.library.library.VO.MessageModel;
import java.util.Map;
import java.util.Set;
public interface MessageService {

    Result getMsgList(String unionid);

    void changeMsgStatus(String msg_id,int status);

    Result getMsgExtraInfo(String seat_id);

    Result cancle(String seat_id,String unionid,int time_slot);

    Result checkCollection(String unionid);

    Result addCollection(String unionid,String seat_list);

    Result addOcu(String seat_id,String area_name,int is_window,int is_plug);
    Result deleteCollection(String unionid,String seat_list);
    Result del();
}
