package com.library.library.service;

import com.library.library.VO.Result;
import com.library.library.pojo.User;
import org.apache.ibatis.annotations.Param;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Map;

public interface UserService {
    Result getUIdByMpOpenId(String mp_openid);

    Result getUserMsg(@Param("unionid") String unionid);

    Result postUsrSign(@Param("sign") String sign , @Param("unionid") String unionid);

    Result postUsrMessage(@Param("unionid") String unionid,@Param("mp_openid") String mp_openid,
    @Param("nickname") String nickname,@Param("avatar") String avatar, @Param("sign") String sign);
}
