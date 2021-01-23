package com.library.library.VO;

public class SeatReply {
    private String seat_id;
    private int time_slot;
    public SeatReply(String seat_id, int time_slot)
    {
        this.seat_id = seat_id;
        this.time_slot = time_slot;
    }
    public int getTime_slot(){return time_slot;}
    public String getSeat_id(){return seat_id;}
}
