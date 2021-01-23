package com.library.library.pojo;

import lombok.Data;
import org.apache.ibatis.type.Alias;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@Alias("seatExtra")
public class SeatExtra {
    /*private String msg_id;
    private int status;
    private int version;
    private int eyes;*/
    @Autowired
    private String seat_id;
    private String area_name;
    //private int seat_type;
    private int is_window;
    private int is_plug;

    public SeatExtra() {
    }
    public SeatExtra(String seat_id, String area_name, int is_window,int is_plug) {
        this.seat_id=seat_id;
        this.area_name=area_name;
        //this.seat_type=seat_type;
        this.is_window=is_window;
        this.is_plug=is_plug;
    }
}
