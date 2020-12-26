package com.library.library.dao;


import com.library.library.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {
    String getUnionIdByMpOpenId(@Param("mp_openid") String mp_openid);

    String getMaxUnionId();

    void InsertUnionId(@Param("unionid") String unionid,@Param("mp_openid") String mp_openid);

    User getUserMessage(@Param("unionid") String unionid);

    void postUserSign(@Param("sign") String sign , @Param("unionid") String unionid);

    void postUserMessage(@Param("unionid") String unionid,@Param("mp_openid") String mp_openid,
                         @Param("nickname") String nickname,@Param("avatar") String avatar, @Param("sign") String sign);
}
