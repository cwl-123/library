package com.library.library.pojo;

import lombok.Data;
import org.apache.ibatis.type.Alias;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Alias("favorMsg")
public class FavorMsg {
    /*private String msg_id;
    private int status;
    private int version;
    private int eyes;*/
    @Autowired
    private String unionid;
    private String seat_list;
    //private int seat_type;
    public FavorMsg() {
    }
    public FavorMsg(String unionid, String seat_list) {
        this.unionid=unionid;
        this.seat_list=seat_list;
    }
}
