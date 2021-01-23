package com.library.library.pojo;

import com.alibaba.fastjson.JSONObject;
import lombok.Data;
import org.apache.ibatis.type.Alias;

@Data
@Alias("user")
public class User {

    private String unionid;

    private String mp_openid;

    private String nickname;

    private String avatar;

    private String sign;

    public User(){}

    public User(String unionid, String mp_openid, String nickname,String avatar, String sign) {
        this.unionid = unionid;
        this.mp_openid = mp_openid;
        this.nickname = nickname;
        this.avatar=avatar;
        this.sign = sign;
    }
}
