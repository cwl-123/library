package com.library.library.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.library.library.VO.Result;
import com.library.library.dao.MessageDao;
import com.library.library.dao.SeatDao;
import com.library.library.dao.UserDao;
import com.library.library.pojo.User;
import com.library.library.service.UserService;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;




import java.util.List;
import java.util.Map;

@Service("UserService")
public class UserServiceImpl implements UserService {

    @Autowired
    private MessageDao messageDao;

    @Autowired
    private SeatDao seatDao;

    @Autowired
    private UserDao userDao;

    @Override
    public Result getUIdByMpOpenId(String mp_openid)
    {
        String uid = userDao.getUnionIdByMpOpenId(mp_openid);
        if(uid==null)
        {
            uid = userDao.getMaxUnionId();
            if(uid!=null)
            {
                int i = Integer.valueOf(uid).intValue();
                i++;
                uid = String.valueOf(i);
                while (uid.length() < 6)
                    uid = "0" + uid;
            }
            else
                uid="000000";
                userDao.InsertUnionId(uid, mp_openid);
        }
        return Result.OK().data(uid).build();
    }


    @Override
    public Result getUserMsg(String unionid)
    {
        User user = userDao.getUserMessage(unionid);
        return Result.OK().data(user).build();
    }

    @Override
    public Result postUsrSign(String sign,String unionid)
    {
        userDao.postUserSign(sign,unionid);
        return Result.OK().build();
    }

    @Override
    public Result postUsrMessage(String unionid,String mp_openid,String nickname,String avatar,String sign)
    {
        userDao.postUserMessage(unionid, mp_openid, nickname, avatar, sign);
        return Result.OK().build();
    }
}
