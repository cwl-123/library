package com.library.library.pojo;

import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
@Data
public class MessageContent implements Serializable {
    private static final long serialVersionUID = 1L;
    /*private String msg_id;
    private String source_id;
    private String message;
    private Timestamp occur_time;
    private int type;
    private String device_name;
    private String note;*/

    private String unionid;
    private String seat_id;
    private int time_slot;
    private int if_confirm;
    public MessageContent() {
    }

    public MessageContent(String unionid, MessageContentDto messageContentDto) {
        this.unionid = unionid;
        this.seat_id = messageContentDto.getSeat_id();
        this.time_slot = messageContentDto.getTime_slot();
        this.if_confirm= messageContentDto.getIf_confirm();
    }
}
